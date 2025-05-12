import { baseUrl, token_key } from "./constants";

import { checkRequest } from "./api";

export const setToken = (token) => {
  localStorage.setItem(token_key, token);
};

export const getToken = () => {
  return localStorage.getItem(token_key);
};

export const removeToken = () => {
  localStorage.removeItem(token_key);
};

export const checkToken = async (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRequest);
};

export const register = async ({ name, avatar, email, password }) => {
  console.log("Signup data being sent:", { name, avatar, email, password });
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return checkRequest(res);
};

export const login = async ({ email, password }) => {
  try {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const res = await fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("Server error response:", errorData);
      throw new Error(errorData.message || "Login failed");
    }
    const data = await checkRequest(res);
    if (data.token) {
      setToken(data.token);
      return await checkToken(data.token);
    }

    return data;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};

export const updateProfile = async (token, { name, avatar }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkRequest);
};
