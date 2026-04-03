import React from "react";
import { Card } from "../common/Card";
import { formatCurrency } from "../../utils/helpers";

export function CategoryBreakdown({ categories, totalExpense }) {
  return (
    <Card>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
        Expense breakdown by category
      </div>
      <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "20px" }}>
        All-time distribution
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {categories.map((category, i) => {
          const pct = (category.value / totalExpense) * 100;
          return (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "2px",
                      background: category.color,
                      display: "inline-block",
                    }}
                  />
                  {category.label}
                </span>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{formatCurrency(category.value)}</strong>{" "}
                  <span style={{ fontSize: "11px" }}>({pct.toFixed(1)}%)</span>
                </span>
              </div>
              <div
                style={{
                  height: "6px",
                  background: "var(--border)",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: category.color,
                    borderRadius: "3px",
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}