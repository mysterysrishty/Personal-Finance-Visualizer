import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function CategoryPieChart({ transactions, categories }) {
  // Group by category
  const data = categories
    .map((cat) => {
      const total = transactions
        .filter(
          (tx) =>
            tx.category &&
            typeof tx.category === "object" &&
            tx.category._id === cat._id
        )
        .reduce((sum, tx) => sum + tx.amount, 0);
      return { name: cat.name, value: total, color: cat.color };
    })
    .filter((d) => d.value > 0);

  return (
    <div className="w-full h-64 p-2 sm:p-4 bg-white rounded-lg shadow border border-gray-200 min-w-0 break-words flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color || "#8884d8"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
