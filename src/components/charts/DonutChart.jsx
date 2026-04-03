import React from "react";
import { formatCurrency } from "../../utils/helpers";

export function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumAngle = -Math.PI / 2;
  const R = 60,
    r = 36,
    cx = 80,
    cy = 80;

  const slices = data.map((d) => {
    const angle = (d.value / total) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(cumAngle);
    const y1 = cy + R * Math.sin(cumAngle);
    cumAngle += angle;
    const x2 = cx + R * Math.cos(cumAngle);
    const y2 = cy + R * Math.sin(cumAngle);
    const ix1 = cx + r * Math.cos(cumAngle);
    const iy1 = cy + r * Math.sin(cumAngle);
    const ix2 = cx + r * Math.cos(cumAngle - angle);
    const iy2 = cy + r * Math.sin(cumAngle - angle);
    const large = angle > Math.PI ? 1 : 0;
    return {
      ...d,
      path: `M${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} L${ix1},${iy1} A${r},${r} 0 ${large},0 ${ix2},${iy2} Z`,
      pct: ((d.value / total) * 100).toFixed(1),
    };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} opacity="0.9" />
        ))}
        <circle cx={cx} cy={cy} r={r - 2} fill="var(--bg-card)" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
          Expenses
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
          {formatCurrency(total)}
        </text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: 0 }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                background: s.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                color: "var(--text-secondary)",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}