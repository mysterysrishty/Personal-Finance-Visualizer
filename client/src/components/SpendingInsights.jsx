export default function SpendingInsights({
  categories,
  budgets,
  transactions,
  month,
}) {
  // Format amount in Indian Rupees
  const formatRupees = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate actual spending per category for the month
  const insights = categories
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

  const overBudget = insights.filter((i) => i.actual > i.budget);
  const underBudget = insights.filter(
    (i) => i.budget > 0 && i.actual <= i.budget
  );

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow border border-gray-200 bg-white mb-6">
      <h2 className="text-xl font-extrabold mb-2 text-blue-600 flex items-center gap-2">
        💡 Spending Insights for {month}
      </h2>
      {overBudget.length === 0 && underBudget.length === 0 && (
        <div>No budgets set for this month.</div>
      )}
      {overBudget.length > 0 && (
        <div className="text-red-600 mb-2">
          <strong>Over budget:</strong>
          <ul>
            {overBudget.map((i) => (
              <li key={i.name}>
                {i.name}: Over by {formatRupees(i.actual - i.budget)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {underBudget.length > 0 && (
        <div className="text-green-600">
          <strong>Within budget:</strong>
          <ul>
            {underBudget.map((i) => (
              <li key={i.name}>
                {i.name}: {formatRupees(i.budget - i.actual)} left
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
