import { baseUrl } from "./constants";
import { getToken } from "./auth";
// REMOVE - const baseUrl = "http://localhost:3001";

// Response Checker
export function checkRequest(res) {
  if (!res.ok) {
    return res
      .json()
      .then((err) => Promise.reject(err))
      .catch(() => Promise.reject(`Error: ${res.status}`));
  }
  return res.json();
}

// GET/items
export async function getItems(weatherType = "") {
  const query = weatherType ? `?weather_like=${weatherType}` : "";
  const res = await fetch(`${baseUrl}/items${query}`);
  return checkRequest(res);
}

// POST/items
export async function addItem(item) {
  console.log("Data being sent to server:", item);
  try {
    const res = await fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Server error response for addItem:", errorData);
      throw new Error(errorData.message || `Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log("AddItem error details:", error);
    throw error;
  }
}

// DELETE/items
export async function deleteItem(id) {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  });
  return checkRequest(res);
}

// PUT /items/:id/likes
export async function addCardLike(id) {
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  });
  return checkRequest(res);
}

// DELETE /items/:id/likes
export async function removeCardLike(id) {
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  });
  return checkRequest(res);
}
