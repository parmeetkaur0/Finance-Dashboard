import { useState, useMemo } from "react";

export function useTransactions(initialTransactions) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: Date.now() },
    ]);
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (search) {
      result = result.filter(
        (t) =>
          t.desc.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCat !== "All") {
      result = result.filter((t) => t.category === filterCat);
    }

    if (filterType !== "All") {
      result = result.filter((t) => t.type === filterType);
    }

    result.sort((a, b) => {
      let va = a[sortKey];
      let vb = b[sortKey];
      if (sortKey === "amount") {
        va = Math.abs(a.amount);
        vb = Math.abs(b.amount);
      }
      return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

    return result;
  }, [transactions, search, filterCat, filterType, sortKey, sortDir]);

  return {
    transactions,
    setTransactions,
    filteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filters: {
      search,
      setSearch,
      filterCat,
      setFilterCat,
      filterType,
      setFilterType,
      sortKey,
      sortDir,
      toggleSort,
    },
  };
}