import React, { useState } from "react";
import { useFinance } from "../contexts/FinanceContext";
import { TransactionFilters } from "../components/transactions/TransactionFilters";
import { TransactionTable } from "../components/transactions/TransactionTable";
import { TransactionForm } from "../components/transactions/TransactionForm";

export function Transactions({ onAddClick }) {
  const {
    role,
    filteredTransactions,
    filters,
    updateTransaction,
    deleteTransaction,
  } = useFinance();

  const [editingTransaction, setEditingTransaction] = useState(null);

  const isAdmin = role === "admin";

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSaveEdit = (updatedData) => {
    updateTransaction(editingTransaction.id, updatedData);
    setEditingTransaction(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TransactionFilters
        search={filters.search}
        setSearch={filters.setSearch}
        filterCat={filters.filterCat}
        setFilterCat={filters.setFilterCat}
        filterType={filters.filterType}
        setFilterType={filters.setFilterType}
        resultCount={filteredTransactions.length}
      />

      <TransactionTable
        transactions={filteredTransactions}
        sortKey={filters.sortKey}
        sortDir={filters.sortDir}
        onSort={filters.toggleSort}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
      />

      {editingTransaction && (
        <TransactionForm
          initialData={{
            date: editingTransaction.date,
            desc: editingTransaction.desc,
            amount: String(Math.abs(editingTransaction.amount)),
            category: editingTransaction.category,
            type: editingTransaction.type,
          }}
          onClose={() => setEditingTransaction(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}