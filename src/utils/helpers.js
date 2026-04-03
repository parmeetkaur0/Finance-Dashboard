export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateTotals = (transactions) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = Math.abs(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0)
  );
  const balance = totalIncome - totalExpense;
  return { totalIncome, totalExpense, balance };
};

export const getCategoryBreakdown = (transactions, categoryColors) => {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
    });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({
      label,
      value,
      color: categoryColors[label] || "#888",
    }));
};

export const exportToCSV = (transactions) => {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const csvData = transactions.map((t) => [
    t.date,
    t.desc,
    t.category,
    t.type,
    t.amount,
  ]);
  const csvContent = [
    headers.join(","),
    ...csvData.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions_${new Date().toISOString()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};