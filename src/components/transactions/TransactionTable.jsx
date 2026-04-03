import React from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { formatCurrency } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../utils/constants";

export function TransactionTable({ transactions, sortKey, sortDir, onSort, isAdmin, onEdit, onDelete }) {
  const getBadgeStyle = (type) => ({
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
    background: type === "income" ? "rgba(74,222,128,0.15)" : "rgba(249,115,22,0.15)",
    color: type === "income" ? "#4ade80" : "#f97316",
  });

  const getTagStyle = (category) => ({
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "5px",
    fontSize: "11px",
    fontWeight: 500,
    background: `${CATEGORY_COLORS[category] || "#888"}22`,
    color: CATEGORY_COLORS[category] || "#888",
  });

  const columns = [
    { key: "date", label: "Date" },
    { key: "desc", label: "Description" },
    { key: "category", label: "Category" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount" },
    ...(isAdmin ? [{ key: "actions", label: "" }] : []),
  ];

  return (
    <Card style={{ padding: 0, overflow: "auto" }}>
      <div style={{ overflowX: "auto", minWidth: "600px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.key !== "actions" && onSort(col.key)}
                  style={{
                    padding: "12px 16px",
                    textAlign: col.key === "amount" ? "right" : "left",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    cursor: col.key !== "actions" ? "pointer" : "default",
                    userSelect: "none",
                    background: "rgba(255,255,255,0.02)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span style={{ marginLeft: "4px", opacity: 0.6 }}>{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
             </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 5}
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "var(--text-tertiary)",
                    fontSize: "14px",
                  }}
                >
                  No transactions found
                </td>
              </tr>
            )}
            {transactions.map((tx, i) => (
              <tr
                key={tx.id}
                style={{
                  borderBottom: "1px solid var(--border)",
                  background: i % 2 === 0 ? "transparent" : "var(--hover-bg)",
                  transition: "background 0.1s",
                }}
              >
                <td style={{ padding: "12px 16px", fontSize: "12px", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                  {tx.date}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: "13px",
                    color: "var(--text-primary)",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tx.desc}
                </td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  <span style={getTagStyle(tx.category)}>{tx.category}</span>
                </td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  <span style={getBadgeStyle(tx.type)}>{tx.type}</span>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    textAlign: "right",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: tx.type === "income" ? "#4ade80" : "#f97316",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tx.type === "income" ? "+" : ""}
                  {formatCurrency(tx.amount)}
                </td>
                {isAdmin && (
                  <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                      <Button variant="ghost" onClick={() => onEdit(tx)} style={{ padding: "5px 10px", fontSize: "11px" }}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => onDelete(tx.id)} style={{ padding: "5px 10px", fontSize: "11px" }}>
                        Del
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}