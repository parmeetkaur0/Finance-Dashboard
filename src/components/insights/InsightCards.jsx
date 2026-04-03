import React from "react";
import { Card } from "../common/Card";

export function InsightCards({ insights }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
      {insights.map((insight, i) => (
        <Card
          key={i}
          style={{
            background: `linear-gradient(135deg, rgba(${insight.color},0.12) 0%, rgba(${insight.color},0.04) 100%)`,
            border: `1px solid rgba(${insight.color},0.2)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: `rgba(${insight.color},0.75)`,
                  fontWeight: 600,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {insight.title}
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.5px",
                }}
              >
                {insight.value}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "4px" }}>{insight.sub}</div>
            </div>
            <div style={{ fontSize: "24px" }}>{insight.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}