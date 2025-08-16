"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";

export default function MV() {
  const [startTitleAnim, setStartTitleAnim] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const firedRef = useRef(false);

  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const title = "YUSUKE ISHIYAMA";
  const BASE = process.env.NEXT_PUBLIC_BLOB_BASE || "";
  const srcHls = `${BASE}/video/hls/main.m3u8` || "/video/hls/main.m3u8";
  const srcMp4 = `${BASE}/video/main.mp4` || "/video/main.mp4";


  const lastVisibleIndex = useMemo(() => {
    const chars = title.split("");
    for (let i = chars.length - 1; i >= 0; i--) if (chars[i] !== " ") return i;
    return chars.length - 1;
  }, [title]);

  useEffect(() => {
    const onDone = () => setStartTitleAnim(true);
    document.addEventListener("loader:done", onDone);
    try {
     if (typeof window !== "undefined" && sessionStorage.getItem("loaderShown") === "1") {
       requestAnimationFrame(() => setStartTitleAnim(true));
     }
    } catch {}
    return () => document.removeEventListener("loader:done", onDone);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showBg) return;

    const playMp4 = () => {
      video.src = srcMp4;
      video.play().catch(() => {});
    };

    const canPlayNativeHls =
      video.canPlayType("application/vnd.apple.mpegURL") === "probably" ||
      video.canPlayType("application/vnd.apple.mpegURL") === "maybe";

    if (canPlayNativeHls) {
      video.src = srcHls;
      video.play().catch(playMp4);
      video.addEventListener("error", playMp4, { once: true });
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hlsRef.current = hls;
      hls.loadSource(srcHls);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(playMp4);
      });
      hls.on(Hls.Events.ERROR, (_ev, data) => {
        if (data?.fatal) {
          hls.destroy();
          hlsRef.current = null;
          playMp4();
        }
      });
      return () => { hls.destroy(); hlsRef.current = null; };
    }

    playMp4();
  }, [showBg, srcHls, srcMp4]);

  useEffect(() => {
    if (!showTagline) {
      document.body.classList.add("lock--mv");
      return () => document.body.classList.remove("lock--mv");
    } else {
      document.body.classList.remove("lock--mv");
    }
  }, [showTagline]);

  const handleLastCharEnd = async () => {
    if (firedRef.current) return;
    firedRef.current = true;
  
    try {
      await fetch("/api/hls-token", {
        cache: "no-store",
        credentials: "same-origin",
      });
    } catch (e) {
      console.warn("hls-token fetch failed", e);
    }
  
    setShowBg(true);
    setTimeout(() => setShowTagline(true), 300);
  };  

  return (
    <div className="mv">
      <div className="mv-container">
        <div className="mv-bg">
          <video
            ref={videoRef}
            className={`mv-container-video ${showBg ? "is-visible" : ""}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            aria-hidden="true"
          />
        </div>

        <h1 className="mv-title" aria-label={title}>
          <span className="sr-only">{title}</span>
          <div className={`mv-letters ${startTitleAnim ? "is-on" : ""}`} aria-hidden="true">
            {title.split("").map((ch, i) => {
              const isLast = i === lastVisibleIndex;
              return (
                <span
                  key={i}
                  className="mv-letter"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                  onTransitionEnd={isLast ? handleLastCharEnd : undefined}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </div>
        </h1>

        <div className="mv-text">
          <p className={`mv-sub ${showTagline ? "is-visible" : ""}`}>
            Engineering Dreams into Reality
          </p>
        </div>
        <div className={`mv-scroll ${showTagline ? "is-visible" : ""}`} aria-hidden="true">
          <span className="mv-scroll__label">scroll</span>
          <span className="mv-scroll__line" />
        </div>
      </div>
    </div>
  );
}
