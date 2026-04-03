// src/components/Dashboard.jsx
import React from 'react';
import { useTransactions } from '../contexts/TransactionContext';
import SummaryCard from './dashboard/SummaryCards';
import BalanceTrend from './BalanceTrend';
import SpendingBreakdown from './dashboard/SpendingBreakdown';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const Dashboard = () => {
  const { totalIncome, totalExpenses, totalBalance, allTransactions } = useTransactions();
  const savingsRate = totalIncome > 0 ? ((totalBalance / totalIncome) * 100).toFixed(1) : 0;

  const summaryData = [
    {
      title: 'Total Balance',
      value: `$${totalBalance.toLocaleString()}`,
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
      trend: '+12.5%',
      trendUp: true,
      description: 'Total available balance'
    },
    {
      title: 'Total Income',
      value: `$${totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      trend: '+8.2%',
      trendUp: true,
      description: 'Total money received'
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: 'from-red-500 to-red-600',
      trend: '+3.1%',
      trendUp: false,
      description: 'Total money spent'
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      icon: PiggyBank,
      color: savingsRate > 20 ? 'from-green-500 to-green-600' : 'from-yellow-500 to-yellow-600',
      trend: savingsRate > 20 ? '+5.4%' : '-2.1%',
      trendUp: savingsRate > 20,
      description: 'of total income saved'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's your financial overview for this month
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <BalanceTrend transactions={allTransactions} />
        <SpendingBreakdown transactions={allTransactions} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Quick Transfer</h3>
          <p className="text-blue-100 text-sm mb-4">Send money instantly</p>
          <button className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-all">
            Transfer Now →
          </button>
        </div>
        
        <div className="bg-linear-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Budget Planning</h3>
          <p className="text-purple-100 text-sm mb-4">Set monthly budgets</p>
          <button className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-all">
            Plan Budget →
          </button>
        </div>
        
        <div className="bg-linear-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Financial Goals</h3>
          <p className="text-green-100 text-sm mb-4">Track your progress</p>
          <button className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-all">
            View Goals →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;