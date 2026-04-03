import React from "react";
import { Card } from "../common/Card";
import { formatCurrency } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../utils/constants";

export function RecentTransactions({ transactions }) {
  return (
    <Card>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px" }}>
        Recent transactions
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {transactions.slice(0, 5).map((tx) => (
          <div
            key={tx.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "10px",
              background: "var(--hover-bg)",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                flexShrink: 0,
                background: `${CATEGORY_COLORS[tx.category] || "#888"}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              {tx.type === "income" ? "↑" : "↓"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {tx.desc}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "2px" }}>
                {tx.date} ·{" "}
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 8px",
                    borderRadius: "5px",
                    fontSize: "11px",
                    fontWeight: 500,
                    background: `${CATEGORY_COLORS[tx.category] || "#888"}22`,
                    color: CATEGORY_COLORS[tx.category] || "#888",
                  }}
                >
                  {tx.category}
                </span>
              </div>
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: tx.type === "income" ? "#4ade80" : "#f97316",
                flexShrink: 0,
              }}
            >
              {tx.type === "income" ? "+" : ""}
              {formatCurrency(tx.amount)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}