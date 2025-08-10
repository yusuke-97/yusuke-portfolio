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
  const srcHls = "/video/hls/main.m3u8";

  const lastVisibleIndex = useMemo(() => {
    const chars = title.split("");
    for (let i = chars.length - 1; i >= 0; i--) if (chars[i] !== " ") return i;
    return chars.length - 1;
  }, [title]);

  useEffect(() => {
    const onDone = () => setStartTitleAnim(true);
    document.addEventListener("loader:done", onDone);
    return () => document.removeEventListener("loader:done", onDone);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showBg) return;

    const canPlayNativeHls =
      video.canPlayType("application/vnd.apple.mpegURL") === "probably" ||
      video.canPlayType("application/vnd.apple.mpegURL") === "maybe";

    if (canPlayNativeHls) {
      video.src = srcHls;
      video.play().catch(() => {});
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(srcHls);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [showBg, srcHls]);

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
