export default function DashboardSummary({ transactions, categories }) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const recent = transactions.slice(0, 5);
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat._id, cat])
  );
  const categoryTotals = categories
    .map((cat) => ({
      name: cat.name,
      total: transactions
        .filter(
          (tx) =>
            tx.category &&
            typeof tx.category === "object" &&
            tx.category._id === cat._id
        )
        .reduce((sum, tx) => sum + tx.amount, 0),
      color: cat.color,
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  // Format amount in Indian Rupees
  const formatRupees = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Expenses Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl border border-blue-200/50 p-6 hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-bold text-white">Total Expenses</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-white mb-2">
              {formatRupees(total)}
            </div>
            <p className="text-blue-100 text-sm">Sum of all transactions</p>
          </div>
        </div>
      </div>

      {/* Category Breakdown Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
            <span className="text-xl text-white">🏷️</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Category Breakdown
          </h3>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
          {categoryTotals.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">📊</span>
              <p className="text-gray-500 text-sm">No category data</p>
            </div>
          ) : (
            categoryTotals.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ background: cat.color }}
                  ></div>
                  <span className="font-medium text-gray-800 truncate max-w-32">
                    {cat.name}
                  </span>
                </div>
                <span className="font-bold text-blue-600">
                  {formatRupees(cat.total)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Transactions Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
            <span className="text-xl text-white">📝</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Recent Transactions
          </h3>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
          {recent.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">📋</span>
              <p className="text-gray-500 text-sm">No recent transactions</p>
            </div>
          ) : (
            recent.map((tx) => {
              const cat =
                tx.category &&
                typeof tx.category === "object" &&
                categoryMap[tx.category._id];
              return (
                <div
                  key={tx._id}
                  className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-blue-600">
                      {formatRupees(tx.amount)}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm mb-2 line-clamp-2">
                    {tx.description}
                  </p>
                  {cat && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full border border-white shadow-sm"
                        style={{ background: cat.color }}
                      ></div>
                      <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                        {cat.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
