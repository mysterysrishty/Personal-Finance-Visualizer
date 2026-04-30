import { getToken } from "./authToken";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://fullstack-personal-finance-vizualizer.onrender.com";
const API_URL = `${BASE_URL}/api/categories`;

export async function getCategories() {
  const token = getToken();
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function addCategory(data) {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add category");
  return res.json();
}

export async function deleteCategory(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
