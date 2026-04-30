import { useEffect, useState } from "react";
import DashboardSummary from "../components/DashboardSummary";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import SpendingInsights from "../components/SpendingInsights";
import { getTransactions } from "../api/transactionApi";
import { getCategories } from "../api/categoryApi";
import { getBudgets } from "../api/budgetApi";

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [month, setMonth] = useState(getCurrentMonth());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [txs, cats, buds] = await Promise.all([
        getTransactions(),
        getCategories(),
        getBudgets(month),
      ]);
      setTransactions(txs);
      setCategories(cats);
      setBudgets(buds);
      setError("");
    } catch (err) {
      setError("Failed to load dashboard data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [month]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight flex items-center gap-3">
              <span className="text-4xl">📊</span>
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track your spending and manage your finances effectively
            </p>
          </div>
          <div className="flex flex-col w-full max-w-xs md:w-auto">
            <label
              htmlFor="dashboard-month"
              className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <span className="text-blue-500">📅</span>
              Select Month
            </label>
            <input
              id="dashboard-month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-4 py-3 text-lg rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Dashboard Summary Cards */}
      <DashboardSummary transactions={transactions} categories={categories} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <span className="text-xl text-white">📈</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Monthly Expenses
            </h2>
          </div>
          <MonthlyExpensesChart transactions={transactions} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <span className="text-xl text-white">🥧</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Category Breakdown
            </h2>
          </div>
          <CategoryPieChart
            transactions={transactions}
            categories={categories}
          />
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
            <span className="text-xl text-white">💡</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Spending Insights</h2>
        </div>
        <SpendingInsights
          categories={categories}
          budgets={budgets}
          transactions={transactions}
          month={month}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 animate-pulse">
              <span className="text-2xl text-white">⏳</span>
            </div>
            <p className="text-lg font-semibold text-gray-600">
              Loading dashboard...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
