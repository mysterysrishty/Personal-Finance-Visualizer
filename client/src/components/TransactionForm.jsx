import { useState, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import { getCategories } from "../api/categoryApi";

export default function TransactionForm({
  onSubmit,
  initialData = {},
  submitLabel = "Add Transaction",
}) {
  const [amount, setAmount] = useState(initialData.amount || "");
  const [date, setDate] = useState(
    initialData.date ? initialData.date.slice(0, 10) : ""
  );
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category?._id || "");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      setError("All fields are required!");
      return;
    }
    setError("");
    onSubmit({ amount: Number(amount), date, description, category });
    // If not editing, reset fields after add
    if (!initialData || Object.keys(initialData).length === 0) {
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <span className="text-2xl text-white">💰</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {submitLabel}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Amount Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-green-500">₹</span>
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">
                ₹
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 text-lg rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-white placeholder-gray-400 transition-all duration-200"
                placeholder="0"
                step="1"
                min="0"
              />
            </div>
          </div>

          {/* Date Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-green-500">📅</span>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-white transition-all duration-200"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-purple-500">📝</span>
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-white placeholder-gray-400 transition-all duration-200"
              placeholder="e.g. Groceries, Rent, Entertainment..."
            />
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-orange-500">🏷️</span>
              Category
            </label>
            <CategorySelect
              categories={categories}
              value={category}
              onChange={setCategory}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-xl">✨</span>
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
