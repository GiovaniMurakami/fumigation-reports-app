import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { AppleIcon } from "../components/AppleIcon";
import { Layout } from "../components/Layout";

const rolesSemEmpresaObrigatoria = new Set(["admin", "funcionario"]);

const empresasUsuario = (user) => {
  const empresas = Array.isArray(user.empresas) ? user.empresas : [];
  return [...new Set([...empresas, user.empresa].map((item) => item?.trim()).filter(Boolean))];
};

const roleLabel = {
  admin: "Admin",
  funcionario: "Leitura e escrita",
  leitor: "Leitura",
};

export function UsersAdmin() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [usuariosData, empresasData] = await Promise.all([
        api.listarUsuarios(),
        api.listarEmpresas(),
      ]);
      setUsers(usuariosData.itens || []);
      setEmpresas(empresasData.itens || []);
      setDrafts({});
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.usuario?.role === "admin") load();
  }, [auth?.usuario?.role]);

  if (auth?.usuario?.role !== "admin") return <Navigate to="/" replace />;

  const updateDraft = (id, patch) =>
    setDrafts((current) => ({
      ...current,
      [id]: { ...(current[id] || {}), ...patch },
    }));

  const roleSelecionada = (user) => drafts[user.id]?.role ?? user.role ?? "leitor";
  const empresasSelecionadas = (user) =>
    drafts[user.id]?.empresas ?? empresasUsuario(user);

  const toggleEmpresa = (user, empresaNome) => {
    const atuais = empresasSelecionadas(user);
    const selecionadas = atuais.includes(empresaNome)
      ? atuais.filter((item) => item !== empresaNome)
      : [...atuais, empresaNome];
    updateDraft(user.id, { empresas: selecionadas });
  };

  async function validar(user) {
    const role = roleSelecionada(user);
    const empresas = empresasSelecionadas(user);
    if (!rolesSemEmpresaObrigatoria.has(role) && !empresas.length) {
      setError("Usuários com permissão de leitura devem estar vinculados a pelo menos uma empresa.");
      return;
    }

    try {
      await api.validarUsuario(user.id, { empresas, role });
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <Layout>
      <button className="back" onClick={() => navigate("/")}>
        ← Voltar aos relatórios
      </button>
      <div className="page-head">
        <div>
          <p className="eyebrow">ADMIN</p>
          <h1>Acessos de usuários</h1>
          <p>Associe usuários a uma ou mais empresas e defina o perfil de permissão.</p>
        </div>
        <button className="secondary" onClick={() => navigate("/empresas")}>
          <AppleIcon name="building" size={17} />
          Empresas
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="empty">Carregando usuários…</div>
      ) : (
        <div className="users-list">
          {users.map((user) => {
            const role = roleSelecionada(user);
            const selecionadas = empresasSelecionadas(user);
            const acessoGlobal = rolesSemEmpresaObrigatoria.has(role) && !selecionadas.length;
            const empresasResumo = acessoGlobal
              ? "Todas as empresas"
              : `${selecionadas.length} empresa${selecionadas.length !== 1 ? "s" : ""}`;
            return (
              <section className="user-row" key={user.id}>
                <div className="user-profile">
                  <div className="user-avatar" aria-hidden="true">
                    {user.nome?.slice(0, 1).toUpperCase() || "U"}
                  </div>
                  <div className="user-profile-copy">
                    <div className="user-title-row">
                      <h3>{user.nome}</h3>
                      <span className={`status-pill ${user.status === "ativo" ? "active" : ""}`}>
                        {user.status}
                      </span>
                    </div>
                    <p>{user.email}</p>
                    <div className="user-meta">
                      <span>{roleLabel[role] || role}</span>
                      <span>{empresasResumo}</span>
                    </div>
                  </div>
                </div>
                <div className="user-actions">
                  <fieldset className="company-picker">
                    <div className="company-picker-head">
                      <legend>Empresas</legend>
                      <span>
                        {selecionadas.length}/{empresas.length}
                      </span>
                    </div>
                    <p>
                      {rolesSemEmpresaObrigatoria.has(role)
                        ? "Sem seleção, este perfil acessa todas as empresas."
                        : "Escolha ao menos uma empresa para este perfil."}
                    </p>
                    <div className="company-options">
                      {empresas.map((empresa) => (
                        <label
                          className={`company-option ${
                            selecionadas.includes(empresa.nome) ? "selected" : ""
                          }`}
                          key={empresa.id}
                        >
                          <input
                            checked={selecionadas.includes(empresa.nome)}
                            onChange={() => toggleEmpresa(user, empresa.nome)}
                            type="checkbox"
                          />
                          <span>{empresa.nome}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="access-controls">
                    <label className="field">
                      <span>Permissão</span>
                      <select
                        value={role}
                        onChange={(e) => updateDraft(user.id, { role: e.target.value })}
                      >
                        <option value="leitor">Leitura</option>
                        <option value="funcionario">Leitura e escrita</option>
                        <option value="admin">Admin</option>
                      </select>
                    </label>
                    <button className="primary" onClick={() => validar(user)}>
                      Salvar acesso
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
