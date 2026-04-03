import React from "react";
import { useFinance } from "../contexts/FinanceContext";
import { InsightCards } from "../components/insights/InsightCards";
import { MonthlyComparison } from "../components/insights/MonthlyComparison";
import { CategoryBreakdown } from "../components/insights/CategoryBreakdown";
import { MONTHS } from "../utils/constants";

export function Insights() {
  const { insightCards, categoryBreakdown, totalExpense, monthlyData } = useFinance();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <InsightCards insights={insightCards} />

      <MonthlyComparison months={MONTHS} income={monthlyData.income} expenses={monthlyData.expense} />

      <CategoryBreakdown categories={categoryBreakdown} totalExpense={totalExpense} />
    </div>
  );
}