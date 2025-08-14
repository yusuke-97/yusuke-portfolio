"use client";
import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const NAME = "YUSUKE ISHIYAMA";
  const nonSpaceLetters = NAME.split("").filter((c) => c !== " ");
  const totalSteps = nonSpaceLetters.length;
  const totalDurationMs = 3000;

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shown = sessionStorage.getItem("loaderShown");
    if (!shown) {
      setVisible(true);
      document.body.classList.add("lock--loader");
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const tick = (t) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      let p = Math.min((elapsed / totalDurationMs) * 100, 100);
      if (p > 99.6) p = 100;

      setProgress(p);
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          document.body.classList.remove("lock--loader");
          sessionStorage.setItem("loaderShown", "1");
          document.dispatchEvent(new Event("loader:done"));
        }, 120);
      }
    };
    
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [visible]);

  const stepFloat = (progress / 100) * (totalSteps - 1);
  const letterIndex = Math.round(stepFloat);
  const currentChar = nonSpaceLetters[letterIndex] ?? "";

  const size = 220;
  const stroke = 2;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress / 100);

  if (!visible) return null;

  return (
    <div className="loader__backdrop">
      <div className="loader__wrap">
        <div className="loader__ringWrap">
          <svg
            className="loader__ring"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              <circle
                cx={size/2}
                cy={size/2}
                r={r}
                fill="none"
                stroke="#64748B"
                strokeWidth={stroke}
              />
              <circle
                cx={size/2}
                cy={size/2}
                r={r}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            </g>
          </svg>
  
          <svg className="loader__char" viewBox={`0 0 ${size} ${size}`}>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="600"
            fontSize="72"
            fill="#F1F5F9"
          >
            {currentChar}
          </text>

          </svg>
        </div>
  
        <div className="loader__percent">{Math.floor(progress)}%</div>
      </div>
    </div>
  );
}
