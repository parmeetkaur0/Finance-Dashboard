import React from "react";
import { useFinance } from "../contexts/FinanceContext";
import { SummaryCards } from "../components/dashboard/SummaryCards";
import { BalanceTrendChart } from "../components/dashboard/BalanceTrendChart";
import { SpendingBreakdown } from "../components/dashboard/SpendingBreakdown";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { Card } from "../components/common/Card";
import { BarChart } from "../components/charts/BarChart";
import { MONTHS } from "../utils/constants";

export function Overview() {
  const {
    balance,
    totalIncome,
    totalExpense,
    categoryBreakdown,
    monthlyData,
    transactions,
  } = useFinance();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <SummaryCards
        balance={balance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        monthlyData={monthlyData}
      />

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "16px" 
      }}>
        <BalanceTrendChart data={monthlyData.balance} labels={MONTHS} />
        <SpendingBreakdown data={categoryBreakdown} />
      </div>

      <Card>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
          Income vs Expenses
        </div>
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>Monthly comparison</div>
          <div style={{ display: "flex", gap: "12px", marginLeft: "auto" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "var(--text-secondary)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#4ade80", display: "inline-block" }} />
              Income
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "var(--text-secondary)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#f97316", display: "inline-block" }} />
              Expense
            </span>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <BarChart income={monthlyData.income} expenses={monthlyData.expense} labels={MONTHS} />
        </div>
      </Card>

      <RecentTransactions transactions={transactions} />
    </div>
  );
}