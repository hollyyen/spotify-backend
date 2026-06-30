import { createContext, useContext, useState, useEffect } from "react";
import { api, getToken, setToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const { user } = await api.me();
        setUser(user);
      } catch {
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function signup(name, email, password) {
    const { token, user } = await api.signup(name, email, password);
    setToken(token);
    setUser(user);
  }

  async function login(email, password) {
    const { token, user } = await api.login(email, password);
    setToken(token);
    setUser(user);
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
