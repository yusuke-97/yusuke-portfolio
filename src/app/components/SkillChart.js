"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SkillChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    const getFontSize = () => (window.innerWidth >= 768 ? 16 : 14);

    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const initialFontSize = getFontSize();

    chartInstanceRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["HTML/CSS", "JavaScript", "jQuery", "Vue.js", "Laravel", "PHP"],
        datasets: [
          {
            label: "My Skill Level",
            data: [4, 3, 3, 2, 3, 3],
            backgroundColor: "rgba(239, 224, 174, 0.2)",
            borderColor: "#EFE0AE",
            borderWidth: 2,
            pointBackgroundColor: "#EFE0AE",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              color: "#F1F5F9",
              font: { size: initialFontSize },
              showLabelBackdrop: false,
            },
            pointLabels: {
              color: "#F1F5F9",
              font: { size: initialFontSize },
            },
            grid: {
              color: "rgba(241, 245, 249, 0.4)",
            },
            angleLines: {
              color: "rgba(241, 245, 249, 0.4)",
            },
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <canvas id="skillChart" ref={chartRef}></canvas>
    </div>
  );
}
