import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyExpensesChart({ transactions }) {
  // Format amount in Indian Rupees for tooltip
  const formatRupees = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Group by month
  const data = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const found = acc.find((item) => item.month === month);
    if (found) {
      found.total += tx.amount;
    } else {
      acc.push({ month, total: tx.amount });
    }
    return acc;
  }, []);

  return (
    <div className="w-full h-64 p-2 sm:p-4 bg-white rounded-lg shadow border border-gray-200 min-w-0 break-words flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => formatRupees(value)} />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
