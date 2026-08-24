import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Layout } from "../components/Layout";

export function UsersAdmin() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); setError(""); try { const [usuariosData, empresasData] = await Promise.all([api.listarUsuarios(), api.listarEmpresas()]); setUsers(usuariosData.itens); setEmpresas(empresasData.itens || []); } catch (e) { setError(e.message); } finally { setLoading(false); } };
  useEffect(() => { if (auth?.usuario?.role === "admin") load(); }, [auth?.usuario?.role]);
  if (auth?.usuario?.role !== "admin") return <Navigate to="/" replace />;
  const updateDraft = (id, patch) => setDrafts(current => ({ ...current, [id]: { ...(current[id] || {}), ...patch } }));
  async function validar(user) {
    const draft = drafts[user.id] || {};
    try {
      await api.validarUsuario(user.id, { empresa: draft.empresa || user.empresa, role: draft.role || user.role || "leitor" });
      await load();
    } catch (e) {
      setError(e.message);
    }
  }
  return <Layout><button className="back" onClick={() => navigate("/")}>← Voltar aos relatórios</button><div className="page-head"><div><p className="eyebrow">ADMIN</p><h1>Acessos de usuários</h1><p>Associe cada usuário a uma empresa e defina o perfil de permissão.</p></div><button className="secondary" onClick={() => navigate("/empresas")}>Empresas</button></div>{error && <div className="error">{error}</div>}{loading ? <div className="empty">Carregando usuários…</div> : <div className="users-list">{users.map(user => <section className="user-row" key={user.id}><div><h3>{user.nome}</h3><p>{user.email}</p><div className="lot-list"><span className={`lot ${user.status === "ativo" ? "alt" : ""}`}>{user.status}</span><span className="lot alt">{user.role || "leitor"}</span>{user.empresa && <span className="lot alt">{user.empresa}</span>}</div></div><div className="user-actions"><label className="field"><span>Empresa</span><select value={drafts[user.id]?.empresa ?? user.empresa ?? ""} onChange={e => updateDraft(user.id, { empresa: e.target.value })}><option value="">Selecione</option>{empresas.map(empresa => <option key={empresa.id} value={empresa.nome}>{empresa.nome}</option>)}</select></label><label className="field"><span>Permissão</span><select value={drafts[user.id]?.role ?? user.role ?? "leitor"} onChange={e => updateDraft(user.id, { role: e.target.value })}><option value="leitor">Leitura</option><option value="funcionario">Leitura e escrita</option><option value="admin">Admin</option></select></label><button className="primary" onClick={() => validar(user)}>Salvar acesso</button></div></section>)}</div>}</Layout>;
}
