import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { AppleIcon } from "./AppleIcon";
import { Brand } from "./Brand";

export function Layout({ children }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const isAdmin = auth?.usuario?.role === "admin";
  const empresas = [
    ...new Set([
      ...(Array.isArray(auth?.usuario?.empresas) ? auth.usuario.empresas : []),
      auth?.usuario?.empresa,
    ].map((empresa) => empresa?.trim()).filter(Boolean)),
  ];
  const empresaResumo =
    empresas.length > 1
      ? `${empresas.length} empresas`
      : empresas[0] || (isAdmin || auth?.usuario?.role === "funcionario" ? "Todas as empresas" : "");

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink
          className="brand-link"
          to="/"
          aria-label="BioSafe Pest ? in?cio"
        >
          <Brand />
        </NavLink>
        {auth && (
          <>
            <button
              className="nav-toggle"
              type="button"
              aria-controls="primary-navigation"
              aria-label="Abrir menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((value) => !value)}
            >
              <AppleIcon name={navOpen ? "close" : "menu"} size={20} />
            </button>
            <nav
              id="primary-navigation"
              className={`account${navOpen ? " open" : ""}`}
              aria-label="Navega??o principal"
            >
              <span>
                Olá, <b>{auth.usuario.nome.split(" ")[0]}</b>
                {empresaResumo ? ` · ${empresaResumo}` : ""}
              </span>
              {isAdmin && (
                <button
                  className="link"
                  onClick={() => (setNavOpen(false), navigate("/empresas"))}
                >
                  Empresas
                </button>
              )}
              {isAdmin && (
                <button
                  className="link"
                  onClick={() => (setNavOpen(false), navigate("/usuarios"))}
                >
                  Usuários
                </button>
              )}
              <button
                className="link"
                onClick={() => {
                  setNavOpen(false);
                  logout();
                  navigate("/login");
                }}
              >
                Sair
              </button>
            </nav>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
