import React from "react";
import { Card } from "../common/Card";
import { DonutChart } from "../charts/DonutChart";

export function SpendingBreakdown({ data }) {
  return (
    <Card>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
        Spending breakdown
      </div>
      <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "16px" }}>
        By category
      </div>
      <DonutChart data={data.slice(0, 6)} />
    </Card>
  );
}