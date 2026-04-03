import React from "react";
import { Card } from "../common/Card";
import { Sparkline } from "../charts/Sparkline";
import { formatCurrency } from "../../utils/helpers";

export function SummaryCards({ balance, totalIncome, totalExpense, monthlyData }) {
  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance),
      sub: "Net worth this period",
      color: "99,102,241",
      spark: monthlyData.balance,
      sColor: "#818cf8",
    },
    {
      label: "Total Income",
      value: formatCurrency(totalIncome),
      sub: "Total income received",
      color: "74,222,128",
      spark: monthlyData.income,
      sColor: "#4ade80",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpense),
      sub: "Total expenses paid",
      color: "249,115,22",
      spark: monthlyData.expense,
      sColor: "#f97316",
    },
  ];

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
      gap: "16px" 
    }}>
      {cards.map((card, i) => (
        <Card
          key={i}
          style={{
            background: `linear-gradient(135deg, rgba(${card.color},0.12) 0%, rgba(${card.color},0.04) 100%)`,
            border: `1px solid rgba(${card.color},0.2)`,
          }}
        >
          <div style={{ fontSize: "12px", color: `rgba(${card.color},0.8)`, marginBottom: "8px", fontWeight: 500 }}>
            {card.label}
          </div>
          <div
            style={{
              fontSize: "clamp(20px, 5vw, 26px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "4px",
              letterSpacing: "-0.5px",
            }}
          >
            {card.value}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{card.sub}</span>
            <Sparkline data={card.spark} color={card.sColor} />
          </div>
        </Card>
      ))}
    </div>
  );
}