// src/components/Insights.jsx
import React from 'react';
import { useTransactions } from '../contexts/TransactionContext';
import { TrendingUp, AlertCircle, Award, Calendar, Target, Brain, Zap, BarChart3 } from 'lucide-react';

const Insights = () => {
  const { allTransactions } = useTransactions();

  const calculateInsights = () => {
    const expenses = allTransactions.filter(t => t.type === 'expense');
    const income = allTransactions.filter(t => t.type === 'income');
    
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    
    // Highest spending category
    const categorySpending = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    const highestCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
    
    // Monthly comparison
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    
    const currentMonthExpenses = expenses.filter(t => new Date(t.date).getMonth() === currentMonth)
      .reduce((sum, t) => sum + t.amount, 0);
    const lastMonthExpenses = expenses.filter(t => new Date(t.date).getMonth() === lastMonth)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyChange = lastMonthExpenses === 0 ? 0 :
      ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100);
    
    // Average daily spending
    const uniqueDays = new Set(expenses.map(t => t.date.split('T')[0])).size;
    const avgDailySpending = uniqueDays === 0 ? 0 : totalExpenses / uniqueDays;
    
    // Savings rate
    const savingsRate = totalIncome === 0 ? 0 : ((totalIncome - totalExpenses) / totalIncome * 100);
    
    return {
      highestCategory,
      monthlyChange,
      avgDailySpending,
      savingsRate,
      totalExpenses,
      totalIncome
    };
  };

  const insights = calculateInsights();

  const insightCards = [
    {
      title: 'Highest Spending',
      value: insights.highestCategory ? insights.highestCategory[0] : 'No data',
      subtitle: `$${insights.highestCategory ? insights.highestCategory[1].toLocaleString() : '0'}`,
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      description: 'Your biggest expense category'
    },
    {
      title: 'Monthly Change',
      value: `${Math.abs(insights.monthlyChange).toFixed(1)}%`,
      subtitle: insights.monthlyChange > 0 ? 'Higher than last month' : 'Lower than last month',
      icon: TrendingUp,
      color: insights.monthlyChange > 0 ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600',
      description: insights.monthlyChange > 0 ? 'Expenses increased' : 'Expenses decreased'
    },
    {
      title: 'Daily Average',
      value: `$${insights.avgDailySpending.toFixed(2)}`,
      subtitle: 'per day',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      description: 'Average daily spending'
    },
    {
      title: 'Savings Rate',
      value: `${insights.savingsRate.toFixed(1)}%`,
      subtitle: `of $${insights.totalIncome.toLocaleString()} income`,
      icon: Target,
      color: insights.savingsRate > 20 ? 'from-green-500 to-green-600' : 'from-yellow-500 to-yellow-600',
      description: insights.savingsRate > 20 ? 'Excellent savings!' : 'Consider saving more'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Insights</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">AI-powered analysis of your spending patterns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insightCards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className={`bg-linear-to-br ${card.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{card.subtitle}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{card.description}</p>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">AI Smart Recommendations</h3>
            <p className="text-blue-100 text-sm">Personalized insights based on your spending patterns</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {insights.savingsRate < 20 && (
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur rounded-xl">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-sm">
                Consider reducing expenses in {insights.highestCategory?.[0] || 'your spending'} to boost your savings rate
              </p>
            </div>
          )}
          {insights.monthlyChange > 15 && (
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur rounded-xl">
              <TrendingUp className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm">Your expenses increased significantly this month. Review your spending patterns.</p>
            </div>
          )}
          {insights.avgDailySpending > 100 && (
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur rounded-xl">
              <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <p className="text-sm">Your daily spending is above average. Try setting a daily budget limit.</p>
            </div>
          )}
          {insights.savingsRate > 30 && (
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur rounded-xl">
              <Award className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <p className="text-sm">Great job! Consider investing your surplus savings for better returns.</p>
            </div>
          )}
          {insights.savingsRate >= 20 && insights.savingsRate <= 30 && insights.monthlyChange <= 15 && insights.avgDailySpending <= 100 && (
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur rounded-xl">
              <Zap className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-sm">Great job! Your finances are looking healthy. Keep up the good work! 🎉</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Spending Summary</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${insights.totalExpenses.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Income</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${insights.totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Savings Goal</h3>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Progress towards 20% savings</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {Math.min(100, (insights.savingsRate / 20 * 100)).toFixed(0)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (insights.savingsRate / 20 * 100))}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {insights.savingsRate >= 20 
                ? "🎉 Congratulations! You've reached your savings goal!" 
                : `Need to save ${(20 - insights.savingsRate).toFixed(1)}% more to reach your goal`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;