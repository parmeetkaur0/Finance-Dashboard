import React from "react";

export function LineChart({ data, labels, color = "#4ade80" }) {
  const W = 400,
    H = 90;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 8) - 4;
    return [x, y];
  });

  const d = pts
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");
  const areaD = `${d} L${W},${H} L0,${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} width="100%" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#areaGrad)" />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill={color} />
          <text x={x} y={H + 16} textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}