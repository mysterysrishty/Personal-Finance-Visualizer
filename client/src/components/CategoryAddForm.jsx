import { useState } from "react";
import { addCategory } from "../api/categoryApi";

export default function CategoryAddForm({ onCategoryAdded }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#8884d8");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Name is required!");
      return;
    }
    setError("");
    setSuccess("");
    try {
      await addCategory({ name, color });
      setName("");
      setColor("#8884d8");
      setSuccess("🎉 Category added!");
      if (onCategoryAdded) onCategoryAdded();
    } catch {
      setError("Failed to add category");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-5 p-8 bg-white rounded-lg shadow border border-gray-200 flex flex-col"
    >
      <h2 className="text-2xl font-extrabold text-blue-600 mb-4 flex items-center gap-2 justify-center">
        Add Category
      </h2>
      {error && (
        <div className="text-red-500 text-center font-bold">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-center font-bold">{success}</div>
      )}
      <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 min-w-0 break-words w-full">
        <label className="block mb-2 font-bold text-lg text-gray-700 min-w-0 break-words">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full text-lg rounded-lg px-6 py-3 border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 bg-white placeholder-gray-400 min-w-0 break-words"
          placeholder="e.g. Food, Rent, Shopping"
        />
      </div>
      <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 min-w-0 break-words w-full">
        <label className="block mb-2 font-bold text-lg text-gray-700 min-w-0 break-words">
          Color
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-10 p-0 border border-gray-300 rounded-lg shadow min-w-0 break-words"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-2 rounded-lg bg-blue-600 text-white text-xl font-bold shadow hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
      >
        Add Category
      </button>
    </form>
  );
}
