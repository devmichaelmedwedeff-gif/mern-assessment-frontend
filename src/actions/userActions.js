import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4000/api", withCredentials: true });

export function setToken(token) {
  localStorage.setItem("auth", "true");
  localStorage.setItem("token", token);
}
export function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("auth");
}
export function getToken() {
  return localStorage.getItem("token");
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      // Best-effort redirect if we're in a browser context
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }
    }
    return Promise.reject(error);
  }
);

export async function register(email, password) {
  const { data } = await api.post("/auth/register", { email, password });
  const token = data?.accessToken || data?.token || data?.jwt;
  if (token) setToken(token);
  return data;
}

export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  const token = data?.accessToken || data?.token || data?.jwt;
  if (!token) {
  } else {
    if (token) setToken(token);
  }
  return data;
}

export async function fetchItems() {
  const { data } = await api.get("/items/list");
  return data;
}

export async function createItem(payload) {
  const { data } = await api.post("/items", payload);
  return data;
}

export async function getItem(id) {
  const { data } = await api.get(`/items/${id}`);
  return data;
}

export async function updateItem(id, payload) {
  const { data } = await api.put(`/items/${id}`, payload);
  return data;
}

export async function deleteItem(id) {
  await api.delete(`/items/${id}`);
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch {}
  clearToken();
  if (typeof window !== "undefined") {
    window.location.replace("/login");
  }
}

export async function fetchMe() {
  const { data } = await api.get("/auth/me");
  return data;
}
