import React, { createContext, useContext, useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { INITIAL_TRANSACTIONS, MONTHLY_BALANCE, MONTHLY_INCOME, MONTHLY_EXPENSE } from "../utils/mockData";
import { CATEGORY_COLORS } from "../utils/constants";
import { calculateTotals, getCategoryBreakdown, formatCurrency } from "../utils/helpers";

const FinanceContext = createContext();

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }
  return context;
}

export function FinanceProvider({ children }) {
  const [role, setRole] = useLocalStorage("role", "admin");
  const transactionHelpers = useTransactions(INITIAL_TRANSACTIONS);

  const { transactions } = transactionHelpers;
  const { totalIncome, totalExpense, balance } = calculateTotals(transactions);
  const categoryBreakdown = useMemo(
    () => getCategoryBreakdown(transactions, CATEGORY_COLORS),
    [transactions]
  );

  const topCategory = categoryBreakdown[0];

  const insightCards = useMemo(
    () => [
      {
        title: "Top spending",
        value: topCategory ? topCategory.label : "—",
        sub: topCategory ? formatCurrency(topCategory.value) : "No data",
        color: "249,115,22",
        icon: "🔥",
      },
      {
        title: "Savings rate",
        value:
          totalIncome > 0
            ? `${(((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)}%`
            : "—",
        sub: "of total income",
        color: "74,222,128",
        icon: "📈",
      },
      {
        title: "Avg transaction",
        value: formatCurrency(
          totalExpense / (transactions.filter((t) => t.type === "expense").length || 1)
        ),
        sub: "per expense entry",
        color: "99,102,241",
        icon: "⚡",
      },
      {
        title: "Monthly balance",
        value: formatCurrency(MONTHLY_BALANCE[5] - MONTHLY_BALANCE[4]),
        sub: "vs. last month",
        color: "251,191,36",
        icon: "📊",
      },
    ],
    [topCategory, totalIncome, totalExpense, transactions]
  );

  return (
    <FinanceContext.Provider
      value={{
        role,
        setRole,
        transactions: transactionHelpers.transactions,
        filteredTransactions: transactionHelpers.filteredTransactions,
        addTransaction: transactionHelpers.addTransaction,
        updateTransaction: transactionHelpers.updateTransaction,
        deleteTransaction: transactionHelpers.deleteTransaction,
        filters: transactionHelpers.filters,
        totalIncome,
        totalExpense,
        balance,
        categoryBreakdown,
        topCategory,
        insightCards,
        monthlyData: {
          balance: MONTHLY_BALANCE,
          income: MONTHLY_INCOME,
          expense: MONTHLY_EXPENSE,
        },
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}