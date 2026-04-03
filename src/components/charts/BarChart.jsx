import React from "react";

export function BarChart({ income, expenses, labels }) {
  const maxVal = Math.max(...income, ...expenses);
  const H = 140;
  const W = 400;
  const barW = 14;
  const gap = 8;
  const groupW = barW * 2 + gap;
  const groupGap = (W - labels.length * groupW) / (labels.length + 1);

  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} width="100%" style={{ overflow: "visible" }}>
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = H - t * H;
        return (
          <g key={i}>
            <line x1={0} y1={y} x2={W} y2={y} stroke="var(--border)" strokeWidth="1" />
            <text x={-4} y={y + 4} textAnchor="end" fontSize="9" fill="var(--text-tertiary)">
              {Math.round((t * maxVal) / 1000)}k
            </text>
          </g>
        );
      })}
      {labels.map((label, i) => {
        const x = groupGap + i * (groupW + groupGap);
        const iH = (income[i] / maxVal) * H;
        const eH = (expenses[i] / maxVal) * H;
        return (
          <g key={i}>
            <rect x={x} y={H - iH} width={barW} height={iH} rx="3" fill="#4ade80" opacity="0.85" />
            <rect
              x={x + barW + gap}
              y={H - eH}
              width={barW}
              height={eH}
              rx="3"
              fill="#f97316"
              opacity="0.85"
            />
            <text
              x={x + barW + gap / 2}
              y={H + 14}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-tertiary)"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}