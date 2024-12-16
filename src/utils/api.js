const baseUrl = "http://localhost:3001";

/*PROCESS SERVER REQUESTS*/
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

/*
async function getItems() {
  const res = await fetch(`${baseUrl}/items`);
  return await (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}
export { getItems };  

export const addItem = (item) => 
  fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  }). then((res) => res.json());
  
export const deleteItem = (id) => 
  fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
  */
