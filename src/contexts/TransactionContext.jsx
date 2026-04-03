// src/context/TransactionContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockTransactions } from '../utils/mockData';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    search: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [role, setRole] = useState('admin');

  // Load initial data
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(mockTransactions);
    }
  }, []);

  // Save to localStorage and apply filters
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    applyFilters();
  }, [transactions, filters]);

  const applyFilters = () => {
    let filtered = [...transactions];

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let aVal = a[filters.sortBy];
      let bVal = b[filters.sortBy];
      
      if (filters.sortBy === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (filters.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredTransactions(filtered);
  };

  const addTransaction = (transaction) => {
    if (role === 'viewer') return;
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const editTransaction = (id, updatedTransaction) => {
    if (role === 'viewer') return;
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, ...updatedTransaction, date: t.date } : t
    ));
  };

  const deleteTransaction = (id) => {
    if (role === 'viewer') return;
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalBalance = totalIncome - totalExpenses;

  return (
    <TransactionContext.Provider value={{
      transactions: filteredTransactions,
      allTransactions: transactions,
      filters,
      role,
      setRole,
      addTransaction,
      editTransaction,
      deleteTransaction,
      updateFilters,
      totalIncome,
      totalExpenses,
      totalBalance
    }}>
      {children}
    </TransactionContext.Provider>
  );
};