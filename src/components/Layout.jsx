import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Brand } from "./Brand";

export function Layout({ children }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = auth?.usuario?.role === "admin";

  return <><header><Brand />{auth && <div className="account"><span>Olá, <b>{auth.usuario.nome.split(" ")[0]}</b>{auth.usuario.empresa ? ` · ${auth.usuario.empresa}` : ""}</span>{isAdmin && <button className="link" onClick={() => navigate("/empresas")}>Empresas</button>}{isAdmin && <button className="link" onClick={() => navigate("/usuarios")}>Usuários</button>}<button className="link" onClick={() => { logout(); navigate("/login"); }}>Sair</button></div>}</header><main>{children}</main></>;
}
