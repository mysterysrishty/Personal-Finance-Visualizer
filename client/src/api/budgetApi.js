import { getToken } from "./authToken";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://fullstack-personal-finance-vizualizer.onrender.com";
const API_URL = `${BASE_URL}/api/budgets`;

export async function getBudgets(month) {
  const token = getToken();
  const url = month ? `${API_URL}?month=${month}` : API_URL;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch budgets");
  return res.json();
}

export async function setBudget(data) {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to set budget");
  return res.json();
}

export async function updateBudget(id, amount) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) throw new Error("Failed to update budget");
  return res.json();
}

export async function deleteBudget(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete budget");
  return res.json();
}
