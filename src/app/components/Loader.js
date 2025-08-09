"use client";
import { useEffect, useRef, useState } from "react";

export default function Loader() {
  const NAME = "YUSUKE ISHIYAMA";
  const nonSpaceLetters = NAME.split("").filter((c) => c !== " "); // 14文字
  const totalSteps = nonSpaceLetters.length;
  const totalDurationMs = 3000; // 全体速度（調整可）

  const [progress, setProgress] = useState(0); // 0..100
  const [visible, setVisible] = useState(true);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const tick = (t) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      let p = Math.min((elapsed / totalDurationMs) * 100, 100);
      if (p > 99.6) p = 100; // 最終文字で100%

      setProgress(p);
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 120);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // いま表示する “非空白の n 文字目” を決定
  const stepFloat = (progress / 100) * (totalSteps - 1);
  const letterIndex = Math.round(stepFloat); // 0..totalSteps-1
  const currentChar = nonSpaceLetters[letterIndex] ?? "";

  // 円形ロード（12時スタート）
  const size = 220;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress / 100);

  if (!visible) return null;

  return (
    <div className="loader__backdrop">
      <div className="loader__wrap">
        <div className="loader__ringWrap">
          {/* リング */}
          <svg
            className="loader__ring"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              {/* 背景グレーリング */}
              <circle
                cx={size/2}
                cy={size/2}
                r={r}
                fill="none"
                stroke="#64748B"     // 灰色
                strokeWidth={stroke}
              />
              {/* 進捗リング */}
              <circle
                cx={size/2}
                cy={size/2}
                r={r}
                fill="none"
                stroke="#F1F5F9"     // 白系
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            </g>
          </svg>
  
          {/* ★ 中央文字（リングの上に絶対配置） */}
          <svg className="loader__char" viewBox={`0 0 ${size} ${size}`}>
          <text
            x="50%" y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Montserrat', system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="64"
            fill="#1E293B"
            stroke="#F1F5F9"
            strokeWidth="4"
            strokeLinejoin="round"
            paintOrder="stroke"
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
