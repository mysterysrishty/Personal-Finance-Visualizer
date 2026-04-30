export default function TransactionList({ transactions, onEdit, onDelete }) {
  // Format amount in Indian Rupees
  const formatRupees = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!transactions.length)
    return (
      <div className="text-gray-400 text-center text-lg mt-4">
        🦄 No transactions yet! Add your first one above.
      </div>
    );
  return (
    <ul className="space-y-6">
      {transactions.map((tx) => (
        <li
          key={tx._id}
          className="flex flex-col xs:flex-row flex-wrap justify-between items-start xs:items-center bg-white rounded-2xl shadow border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all group min-w-0 break-words gap-2 xs:gap-4"
        >
          <div className="min-w-0 break-words">
            <div className="font-extrabold text-2xl text-blue-600 flex items-center gap-2 min-w-0 break-words">
              {formatRupees(tx.amount)}
            </div>
            <div className="text-lg text-gray-800 mt-1 min-w-0 break-words">
              {new Date(tx.date).toLocaleDateString()} —{" "}
              <span className="font-bold min-w-0 break-words">
                {tx.description}
              </span>
            </div>
            {tx.category && (
              <div className="text-sm mt-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 inline-block font-semibold shadow min-w-0 break-words border border-gray-300">
                {tx.category.name}
              </div>
            )}
          </div>
          <div className="space-x-2 flex min-w-0 break-words">
            <button
              className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold text-lg shadow hover:bg-blue-100 transition-all flex items-center gap-1 border border-blue-200"
              onClick={() => onEdit(tx)}
              title="Edit"
            >
              Edit
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-50 text-red-700 font-semibold text-lg shadow hover:bg-red-100 transition-all flex items-center gap-1 border border-red-200"
              onClick={() => onDelete(tx._id)}
              title="Delete"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
