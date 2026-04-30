import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BudgetVsActualChart({
  categories,
  budgets,
  transactions,
  month,
}) {
  // Format amount in Indian Rupees for tooltip
  const formatRupees = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate actual spending per category for the month
  const actuals = categories
    .map((cat) => {
      const total = transactions
        .filter(
          (tx) =>
            tx.category &&
            typeof tx.category === "object" &&
            tx.category._id === cat._id &&
            tx.date.startsWith(month)
        )
        .reduce((sum, tx) => sum + tx.amount, 0);
      const budget =
        budgets.find(
          (b) =>
            b.category &&
            typeof b.category === "object" &&
            b.category._id === cat._id
        )?.amount || 0;
      return { name: cat.name, budget, actual: total };
    })
    .filter((d) => d.budget > 0 || d.actual > 0);

  return (
    <div className="w-full h-64 p-2 sm:p-4 bg-white rounded-lg shadow border border-gray-200 min-w-0 break-words flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={actuals}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatRupees(value)} />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
