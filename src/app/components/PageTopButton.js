"use client";
import { useEffect } from "react";

export default function PageTopButton() {
  useEffect(() => {
    const el = document.getElementById("js-page-top");
    const onScroll = () => el?.classList.toggle("show", window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const TEXT = "YUSUKE ISHIYAMA PORTFOLIO ";
  const CHARS = Array.from(TEXT);
  const count = CHARS.length;
  const step = 360 / count;

  return (
    <button id="js-page-top" className="page-top" onClick={toTop} aria-label="ページトップへ" type="button">
      <div className="page-top__ring" aria-hidden="true" style={{ "--count": count, "--step": `${step}deg` }}>
        {CHARS.map((ch, i) => (
          <span key={`${ch}-${i}`} className="page-top__char" style={{ "--i": i }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>

      <span className="page-top__center" aria-hidden="true">TOP</span>
    </button>
  );
}
