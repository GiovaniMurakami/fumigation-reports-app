import { createContext, useContext, useState } from "react";
import { authStore } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(authStore.get());
  const login = (value) => { authStore.set(value); setAuth(value); };
  const logout = () => { authStore.clear(); setAuth(null); };
  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
