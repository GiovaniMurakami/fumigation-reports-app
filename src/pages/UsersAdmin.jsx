import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Layout } from "../components/Layout";

const rolesSemEmpresaObrigatoria = new Set(["admin", "funcionario"]);

const empresasUsuario = (user) => {
  const empresas = Array.isArray(user.empresas) ? user.empresas : [];
  return [...new Set([...empresas, user.empresa].map((item) => item?.trim()).filter(Boolean))];
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
            return (
              <section className="user-row" key={user.id}>
                <div>
                  <h3>{user.nome}</h3>
                  <p>{user.email}</p>
                  <div className="lot-list">
                    <span className={`lot ${user.status === "ativo" ? "alt" : ""}`}>
                      {user.status}
                    </span>
                    <span className="lot alt">{user.role || "leitor"}</span>
                    {acessoGlobal ? (
                      <span className="lot alt">Todas as empresas</span>
                    ) : (
                      selecionadas.map((empresa) => (
                        <span className="lot alt" key={empresa}>
                          {empresa}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div className="user-actions">
                  <fieldset className="company-picker">
                    <legend>Empresas</legend>
                    {rolesSemEmpresaObrigatoria.has(role) && (
                      <p>Nenhuma empresa selecionada libera acesso a todas.</p>
                    )}
                    <div className="company-options">
                      {empresas.map((empresa) => (
                        <label className="company-option" key={empresa.id}>
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
              </section>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
