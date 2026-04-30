import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../api/transactionApi";
import { getCategories } from "../api/categoryApi";
import toast from "react-hot-toast";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [txs, cats] = await Promise.all([
        getTransactions(),
        getCategories(),
      ]);
      setTransactions(txs);
      setCategories(cats);
      setError("");
    } catch (err) {
      setError("Failed to load transactions");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (tx) => {
    try {
      await addTransaction(tx);
      fetchData();
      toast.success("Transaction added");
    } catch {
      toast.error("Failed to add transaction");
    }
  };

  const handleEdit = (tx) => setEditing(tx);

  const handleUpdate = async (tx) => {
    try {
      await updateTransaction(editing._id, tx);
      setEditing(null);
      fetchData();
      toast.success("Transaction updated");
    } catch {
      toast.error("Failed to update transaction");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      fetchData();
      toast.success("Transaction deleted");
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <div className="space-y-8 min-w-0 break-words">
      <h1 className="text-3xl font-extrabold mb-2 text-blue-700 tracking-tight min-w-0 break-words">
        Transactions
      </h1>
      <div className="rounded-xl shadow bg-white p-4 sm:p-6 min-w-0 break-words">
        {editing ? (
          <div className="mb-4 min-w-0 break-words">
            <TransactionForm
              onSubmit={handleUpdate}
              initialData={editing}
              submitLabel="Update Transaction"
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <TransactionForm onSubmit={handleAdd} />
        )}
      </div>
      {error && <div className="text-red-500 min-w-0 break-words">{error}</div>}
      <div className="rounded-xl shadow bg-white p-4 sm:p-6 min-w-0 break-words">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
