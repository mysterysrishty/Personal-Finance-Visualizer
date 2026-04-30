import { useState } from "react";

export default function BudgetForm({
  categories,
  budgets,
  month,
  onSetBudget,
}) {
  const [values, setValues] = useState(() => {
    const map = {};
    categories.forEach((cat) => {
      const found = budgets.find((b) => b.category._id === cat._id);
      map[cat._id] = found ? found.amount : "";
    });
    return map;
  });
  const [error, setError] = useState("");

  const handleChange = (catId, value) => {
    setValues((v) => ({ ...v, [catId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const cat of categories) {
      const val = values[cat._id];
      if (val && isNaN(Number(val))) {
        setError("Budget must be a number");
        return;
      }
    }
    setError("");
    categories.forEach((cat) => {
      const amount = Number(values[cat._id]);
      if (amount > 0) {
        onSetBudget({ category: cat._id, month, amount });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 p-8 bg-white rounded-2xl shadow border border-gray-200 flex flex-col"
    >
      <h2 className="text-2xl font-extrabold text-blue-600 mb-4 flex items-center gap-2 justify-center">
        🎯 Set Budgets for {month}
      </h2>
      {error && (
        <div className="text-red-500 text-center font-bold">{error}</div>
      )}
      {categories.length === 0 && (
        <div className="text-gray-400 text-center">
          No categories found. Add a category first!
        </div>
      )}
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 min-w-0 break-words w-full"
        >
          <label className="w-32 font-bold text-lg text-gray-700 flex items-center gap-2 min-w-0 break-words">
            {cat.name}{" "}
            <span
              className="w-5 h-5 rounded-full border border-gray-300 inline-block"
              style={{ background: cat.color }}
            ></span>
          </label>
          <input
            type="number"
            value={values[cat._id]}
            onChange={(e) => handleChange(cat._id, e.target.value)}
            className="input input-bordered w-full xs:w-32 text-lg rounded-lg px-4 py-2 border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 bg-white placeholder-gray-400 min-w-0 break-words"
            min="0"
            placeholder="e.g. 5000"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-3 mt-2 rounded-lg bg-blue-600 text-white text-xl font-bold shadow hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
      >
        Save Budgets
      </button>
    </form>
  );
}
