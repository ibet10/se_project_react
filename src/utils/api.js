const baseUrl = "http://localhost:3001";

// Response Checker
export function checkRequest(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
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
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return checkRequest(res);
}

// DELETE/items
export async function deleteItem(id) {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
  return checkRequest(res);
}

/* 
const baseUrl = "http://localhost:3001";

//PROCESS SERVER REQUESTS
function checkRequest(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// GET/items
export async function getItems() {
  const res = await fetch(`${baseUrl}/items`);
  return checkRequest(res);
}

// POST/items
export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((res) => checkRequest(res));
};

// DELETE/items
export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => checkRequest(res));
};
*/
