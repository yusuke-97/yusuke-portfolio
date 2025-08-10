"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export default function MV() {
  const [startTitleAnim, setStartTitleAnim] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const firedRef = useRef(false);

  const title = "YUSUKE ISHIYAMA";

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

  const handleLastCharEnd = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    setShowBg(true);
    setTimeout(() => setShowTagline(true), 300);
  };

  return (
    <div className="mv">
      <div className="mv-container">
        <div className="mv-bg">
          <video
            className={`mv-container-video ${showBg ? "is-visible" : ""}`}
            src="/video/main.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
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
        <div
          className={`mv-scroll ${showTagline ? "is-visible" : ""}`}
          aria-hidden="true"
        >
          <span className="mv-scroll__label">scroll</span>
          <span className="mv-scroll__line" />
        </div>
      </div>
    </div>
  );
}
