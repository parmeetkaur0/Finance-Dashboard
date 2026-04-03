import React from "react";
import { Card } from "../common/Card";
import { formatCurrency } from "../../utils/helpers";

export function MonthlyComparison({ months, income, expenses }) {
  return (
    <Card>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
        Monthly income vs expenses
      </div>
      <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "20px" }}>
        monthly comparison
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "400px" }}>
          <thead>
            <tr>
              {["Month", "Income", "Expenses", "Net", "Savings Rate"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "8px 12px",
                    textAlign: h === "Month" ? "left" : "right",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {months.map((month, i) => {
              const net = income[i] - expenses[i];
              const sr = ((net / income[i]) * 100).toFixed(1);
              return (
                <tr key={month} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 12px", fontSize: "13px", color: "var(--text-primary)", fontWeight: 500 }}>
                    {month} 2026
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      color: "#4ade80",
                      fontWeight: 600,
                    }}
                  >
                    {formatCurrency(income[i])}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      color: "#f97316",
                      fontWeight: 600,
                    }}
                  >
                    {formatCurrency(expenses[i])}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontSize: "13px",
                      color: net >= 0 ? "#4ade80" : "#f87171",
                      fontWeight: 600,
                    }}
                  >
                    {formatCurrency(net)}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: parseFloat(sr) > 20 ? "rgba(74,222,128,0.15)" : "rgba(251,191,36,0.15)",
                        color: parseFloat(sr) > 20 ? "#4ade80" : "#fbbf24",
                      }}
                    >
                      {sr}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}