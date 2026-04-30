import { useEffect, useState } from "react";
import CategoryAddForm from "../components/CategoryAddForm";
import { getCategories, addCategory, deleteCategory } from "../api/categoryApi";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const cats = await getCategories();
      setCategories(cats);
      setError("");
    } catch (err) {
      setError("Failed to load categories");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    try {
      await addCategory(data);
      fetchData();
      toast.success("Category added! 🎨");
    } catch {
      toast.error("Failed to add category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchData();
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="space-y-8 min-w-0 break-words">
      <h1 className="text-3xl font-extrabold mb-2 text-blue-700 tracking-tight min-w-0 break-words">
        Categories
      </h1>
      <div className="rounded-2xl shadow border border-gray-200 bg-white p-4 sm:p-8 min-w-0 break-words">
        <CategoryAddForm onCategoryAdded={fetchData} />
      </div>
      {error && <div className="text-red-500 min-w-0 break-words">{error}</div>}
      <div className="rounded-2xl shadow border border-gray-200 bg-white p-4 sm:p-8 min-w-0 break-words">
        {loading ? (
          <div className="text-lg text-blue-500 font-bold flex items-center gap-2 justify-center mt-4 min-w-0 break-words">
            ⏳ Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0 break-words">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 border border-gray-200 rounded-2xl bg-gray-50 shadow hover:shadow-lg transition-all cursor-pointer min-w-0 break-words flex-wrap"
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gray-300 flex items-center justify-center text-xl shadow min-w-0 break-words"
                  style={{ background: cat.color }}
                />
                <div className="flex-1 min-w-0 break-words">
                  <div className="font-extrabold text-lg sm:text-2xl text-gray-800 min-w-0 break-words">
                    {cat.name}
                  </div>
                  <div className="text-xs text-gray-400 min-w-0 break-words">
                    {cat.color}
                  </div>
                </div>
                <button
                  className="ml-auto px-3 py-2 rounded-lg bg-red-50 text-red-700 font-semibold text-sm shadow border border-red-200 hover:bg-red-100 transition-all"
                  title="Delete category"
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
