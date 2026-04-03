import React from "react";
import { Card } from "../common/Card";
import { LineChart } from "../charts/LineChart";

export function BalanceTrendChart({ data, labels }) {
  return (
    <Card>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
        Balance trend
      </div>
      <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "16px" }}>
        monthly overview
      </div>
      <LineChart data={data} labels={labels} color="#818cf8" />
    </Card>
  );
}