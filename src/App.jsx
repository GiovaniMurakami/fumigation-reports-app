import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { Guard } from "./components/Guard";
import { Dashboard } from "./pages/Dashboard";
import { Detail } from "./pages/Detail";
import { EmpresasAdmin } from "./pages/EmpresasAdmin";
import { Login } from "./pages/Login";
import { NewReport } from "./pages/NewReport";
import { UsersAdmin } from "./pages/UsersAdmin";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/compartilhado/:token" element={<Detail shared />} />
          <Route
            path="/"
            element={
              <Guard>
                <Dashboard />
              </Guard>
            }
          />
          <Route
            path="/novo"
            element={
              <Guard>
                <NewReport />
              </Guard>
            }
          />
          <Route
            path="/empresas"
            element={
              <Guard>
                <EmpresasAdmin />
              </Guard>
            }
          />
          <Route
            path="/usuarios"
            element={
              <Guard>
                <UsersAdmin />
              </Guard>
            }
          />
          <Route
            path="/relatorios/:id"
            element={
              <Guard>
                <Detail />
              </Guard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
