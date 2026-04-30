export default function CategorySelect({ categories, value, onChange }) {
  return (
    <select
      className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-white hover:border-blue-300 transition-all duration-200 appearance-none cursor-pointer"
      style={{ minWidth: 0, maxWidth: "100%" }}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      required
    >
      <option value="" disabled>
        🏷️ Pick a category
      </option>
      {categories.map((cat) => (
        <option
          key={cat._id}
          value={cat._id}
          className="flex items-center gap-2"
        >
          <span style={{ color: cat.color }}>●</span> {cat.name}
        </option>
      ))}
    </select>
  );
}
