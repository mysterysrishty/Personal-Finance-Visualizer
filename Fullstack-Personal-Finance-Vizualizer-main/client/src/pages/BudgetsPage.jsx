import { useEffect, useState } from "react";
import BudgetForm from "../components/BudgetForm";
import BudgetVsActualChart from "../components/BudgetVsActualChart";
import SpendingInsights from "../components/SpendingInsights";
import { getCategories } from "../api/categoryApi";
import {
  getBudgets,
  setBudget,
  updateBudget,
  deleteBudget,
} from "../api/budgetApi";
import { getTransactions } from "../api/transactionApi";
import toast from "react-hot-toast";

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

// Helper: max height for budget tables
const BUDGET_TABLE_MAX_HEIGHT = "320px";

export default function BudgetsPage() {
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(getCurrentMonth());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingBudget, setEditingBudget] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [allBudgets, setAllBudgets] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cats, buds, txs, allBuds] = await Promise.all([
        getCategories(),
        getBudgets(month),
        getTransactions(),
        getBudgets(), // fetch all budgets for grouping
      ]);
      setCategories(cats);
      setBudgets(buds);
      setTransactions(txs);
      setAllBudgets(allBuds);
      setError("");
    } catch (err) {
      setError("Failed to load budgets");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [month]);

  const handleSetBudget = async (data) => {
    try {
      await setBudget(data);
      fetchData();
      toast.success("Budget saved! 🎯");
    } catch {
      toast.error("Failed to save budget");
    }
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setEditAmount(budget.amount);
  };

  const handleUpdateBudget = async () => {
    try {
      await updateBudget(editingBudget._id, Number(editAmount));
      setEditingBudget(null);
      setEditAmount("");
      fetchData();
      toast.success("Budget updated!");
    } catch {
      toast.error("Failed to update budget");
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await deleteBudget(id);
      setDeletingId(null);
      fetchData();
      toast.success("Budget deleted!");
    } catch {
      toast.error("Failed to delete budget");
    }
  };

  return (
    <div className="space-y-8 min-w-0 break-words">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2 min-w-0 break-words flex-wrap">
        <h1 className="text-3xl font-extrabold flex-1 text-blue-700 tracking-tight min-w-0 break-words">
          Budgets
        </h1>
        <div className="flex flex-col w-full max-w-xs md:w-auto md:ml-4">
          <label
            htmlFor="budgets-month"
            className="text-sm font-medium text-gray-600 mb-1 md:mb-0 md:sr-only"
          >
            Month
          </label>
          <input
            id="budgets-month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input input-bordered w-full text-lg rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 bg-white transition min-w-0 break-words"
          />
        </div>
      </div>
      {error && <div className="text-red-500 min-w-0 break-words">{error}</div>}
      <div className="rounded-2xl shadow border border-gray-200 bg-white p-4 sm:p-8 min-w-0 break-words">
        <BudgetForm
          categories={categories}
          budgets={budgets}
          month={month}
          onSetBudget={handleSetBudget}
        />

        {/* List all budgets for the user for this month */}
        <h3 className="text-xl font-bold mt-10 mb-4 text-blue-700 flex items-center gap-2">
          <span>📋</span> All Your Budgets (Grouped by Month & Year)
        </h3>
        <div className="flex flex-col gap-8">
          {Object.entries(
            allBudgets.reduce((acc, b) => {
              if (!acc[b.month]) acc[b.month] = [];
              acc[b.month].push(b);
              return acc;
            }, {})
          )
            .sort((a, b) => b[0].localeCompare(a[0])) // newest month first
            .map(([monthKey, monthBudgets]) => (
              <div
                key={monthKey}
                className="rounded-2xl shadow border border-gray-200 bg-white"
              >
                <div className="px-6 pt-6 pb-2 flex items-center gap-2">
                  <span className="font-bold text-lg text-blue-700">
                    {monthKey}
                  </span>
                </div>
                <div
                  className="overflow-x-auto"
                  style={{ maxHeight: BUDGET_TABLE_MAX_HEIGHT }}
                >
                  <table className="min-w-full bg-white rounded-xl">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 align-middle">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 align-middle">
                          Amount
                        </th>
                        <th className="px-4 py-2 text-sm font-bold text-gray-700 align-middle w-36">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthBudgets.map((b) => (
                        <tr
                          key={b._id}
                          className="border-b border-gray-100 hover:bg-blue-50 transition"
                        >
                          <td className="px-4 py-2 flex items-center gap-2 align-middle">
                            <span
                              className="w-4 h-4 rounded-full border border-gray-300 inline-block"
                              style={{ background: b.category.color }}
                            ></span>
                            <span className="font-medium text-gray-800">
                              {b.category.name}
                            </span>
                          </td>
                          <td className="px-4 py-2 font-bold text-blue-700 text-lg align-middle">
                            {editingBudget && editingBudget._id === b._id ? (
                              <input
                                type="number"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                className="w-24 px-2 py-1 rounded border border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                                min="0"
                              />
                            ) : (
                              b.amount
                            )}
                          </td>
                          <td className="px-4 py-2 align-middle">
                            <div className="flex gap-2 justify-center items-center">
                              {editingBudget && editingBudget._id === b._id ? (
                                <>
                                  <button
                                    className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                    onClick={handleUpdateBudget}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                                    onClick={() => setEditingBudget(null)}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="px-3 py-1 rounded bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition"
                                    onClick={() => handleEditBudget(b)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="px-3 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                                    onClick={() => handleDeleteBudget(b._id)}
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="rounded-2xl shadow border border-gray-200 bg-white p-4 sm:p-8 min-w-0 break-words">
        <SpendingInsights
          categories={categories}
          budgets={budgets}
          transactions={transactions}
          month={month}
        />
      </div>
      <div className="rounded-2xl shadow border border-gray-200 bg-white p-4 sm:p-8 min-w-0 break-words">
        <BudgetVsActualChart
          categories={categories}
          budgets={budgets}
          transactions={transactions}
          month={month}
        />
      </div>
      {loading && (
        <div className="text-lg text-green-500 font-bold flex items-center gap-2 justify-center mt-4 min-w-0 break-words">
          ⏳ Loading...
        </div>
      )}
    </div>
  );
}
