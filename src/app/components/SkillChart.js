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

    if (!ctx) return;

    // すでにインスタンスがある場合は破棄
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["HTML/CSS", "JavaScript", "jQuery", "Vue.js", "Laravel", "PHP"],
        datasets: [
          {
            label: "My Skill Level",
            data: [5, 4, 4, 3, 4, 4],
            backgroundColor: "rgba(0, 66, 173, 0.2)",
            borderColor: "#0042AD",
            borderWidth: 2,
            pointBackgroundColor: "#001B47",
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
              color: "#333",
              font: { size: 14 },
            },
            pointLabels: {
              color: "#333",
              font: { size: 16 },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
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
