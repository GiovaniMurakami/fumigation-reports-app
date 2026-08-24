import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Brand } from "./Brand";

export function Layout({ children }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const isAdmin = auth?.usuario?.role === "admin";

  return <><header><Brand />{auth && <><button className="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded={navOpen} onClick={() => setNavOpen(value => !value)}><span/><span/><span/></button><div className={`account${navOpen ? " open" : ""}`}><span>Olá, <b>{auth.usuario.nome.split(" ")[0]}</b>{auth.usuario.empresa ? ` · ${auth.usuario.empresa}` : ""}</span>{isAdmin && <button className="link" onClick={() => (setNavOpen(false), navigate("/empresas"))}>Empresas</button>}{isAdmin && <button className="link" onClick={() => (setNavOpen(false), navigate("/usuarios"))}>Usuários</button>}<button className="link" onClick={() => { setNavOpen(false); logout(); navigate("/login"); }}>Sair</button></div></>}</header><main>{children}</main></>;
}
