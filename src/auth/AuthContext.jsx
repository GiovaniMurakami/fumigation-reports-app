import { createContext, useContext, useEffect, useState } from "react";
import { api, authStore } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(authStore.get());
  useEffect(() => authStore.subscribe(setAuth), []);
  const login = (value) => { authStore.set(value); setAuth(value); };
  const logout = () => {
    const refreshToken = authStore.get()?.refreshToken;
    if (refreshToken) void api.logout(refreshToken).catch(() => {});
    authStore.clear();
    setAuth(null);
  };
  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
