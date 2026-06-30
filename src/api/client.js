// Central place for talking to the backend. Set VITE_API_URL in a .env file
// once you deploy the backend; falls back to localhost for local dev.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

async function request(path, { method = "GET", body, isFormData = false } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  return data;
}

export const api = {
  signup: (name, email, password) =>
    request("/api/auth/signup", { method: "POST", body: { name, email, password } }),
  login: (email, password) =>
    request("/api/auth/login", { method: "POST", body: { email, password } }),
  me: () => request("/api/auth/me"),

  getSongs: () => request("/api/songs"),
  uploadSong: (formData) => request("/api/songs", { method: "POST", body: formData, isFormData: true }),
  deleteSong: (id) => request(`/api/songs/${id}`, { method: "DELETE" }),
  logPlay: (id) => request(`/api/songs/${id}/play`, { method: "POST", body: {} }),
  toggleSave: (id) => request(`/api/songs/${id}/save`, { method: "POST", body: {} }),

  getStatsOverview: () => request("/api/stats/overview"),
  getStatsTrend: () => request("/api/stats/trend"),

  getAudience: () => request("/api/audience"),

  updateProfile: (formData) => request("/api/profile", { method: "PATCH", body: formData, isFormData: true }),
};

export { getToken, setToken };
