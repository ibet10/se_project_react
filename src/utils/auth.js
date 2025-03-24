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
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await checkRequest(res);
  if (data.token) {
    setToken(data.token);
    return await checkToken(data.token);
  }

  return data;
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
