import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api, apiBaseUrl } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Field } from "../components/Field";
import { Layout } from "../components/Layout";

const emptyEmpresa = { nome: "", unidades: [], areasSetores: [] };
const emptyGlobais = { assinaturas: [] };

const normalizeList = (items) => items?.length ? items : [""];
const cleanItems = (items) => [...new Set((items || []).map(item => item.trim()).filter(Boolean))];
const assinaturaPreviewUrl = url => url ? `${apiBaseUrl}/imagens/proxy?url=${encodeURIComponent(url)}` : "";
const nomeArquivo = file => (file?.name || "Assinatura").replace(/\.[^.]+$/, "").trim().slice(0, 120) || "Assinatura";

function ChipTextList({ label, values, onChange, placeholder, emptyText, draftValue, onDraftChange }) {
  const [localDraft, setLocalDraft] = useState("");
  const draft = draftValue ?? localDraft;
  const setDraft = onDraftChange ?? setLocalDraft;
  const items = cleanItems(values);

  const addItem = () => {
    const value = draft.trim();
    if (!value) return;
    onChange(cleanItems([...items, value]));
    setDraft("");
  };

  const removeItem = (item) => {
    const nextItems = items.filter(current => current !== item);
    onChange(nextItems, { removed: item });
  };

  return (
    <section className="chip-editor">
      <div className="chip-editor-head">
        <h3>{label}</h3>
        <span>{items.length} item{items.length !== 1 && "s"}</span>
      </div>
      <div className="chip-input-row">
        <input
          value={draft}
          aria-label={label}
          placeholder={placeholder}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
        />
        <button type="button" className="secondary" onClick={addItem}>Adicionar</button>
      </div>
      <div className="chip-list-panel">
        {items.length === 0 ? (
          <p className="muted chip-empty">{emptyText}</p>
        ) : (
          <div className="chip-list">
            {items.map(item => (
              <button type="button" className="chip-item" key={item} onClick={() => removeItem(item)} title="Remover">
                <span>{item}</span>
                <b>×</b>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function EmpresasAdmin() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [empresaForm, setEmpresaForm] = useState(emptyEmpresa);
  const [globaisForm, setGlobaisForm] = useState(emptyGlobais);
  const [funcionariosForm, setFuncionariosForm] = useState([""]);
  const [funcionarioDraft, setFuncionarioDraft] = useState("");
  const [clientesForm, setClientesForm] = useState([""]);
  const [clienteDraft, setClienteDraft] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const [empresasData, globaisData, funcionariosData, clientesData] = await Promise.all([
      api.listarEmpresas(),
      api.obterCadastrosGlobais(),
      api.listarFuncionarios(),
      api.listarClientes(),
    ]);
    setEmpresas(empresasData.itens || []);
    setGlobaisForm({ assinaturas: globaisData.cadastro?.assinaturas || [] });
    setFuncionariosForm(normalizeList((funcionariosData.itens || []).map(funcionario => funcionario.nome)));
    setClientesForm(normalizeList((clientesData.itens || []).map(cliente => cliente.nome)));
  };

  useEffect(() => {
    if (auth?.usuario?.role === "admin") load().catch(e => setError(e.message));
  }, [auth?.usuario?.role]);

  if (auth?.usuario?.role !== "admin") return <Navigate to="/" replace />;

  const empresaPayload = () => ({
    nome: empresaForm.nome,
    unidades: cleanItems(empresaForm.unidades),
    areasSetores: cleanItems(empresaForm.areasSetores),
  });

  const selectEmpresa = (empresa) => {
    setSelectedId(empresa.id);
    setEmpresaForm({
      nome: empresa.nome || "",
      unidades: empresa.unidades || [],
      areasSetores: empresa.areasSetores || [],
    });
    setError("");
    setSuccess("");
  };

  const novaEmpresa = () => {
    setSelectedId("");
    setEmpresaForm(emptyEmpresa);
    setError("");
    setSuccess("");
  };

  async function salvarEmpresa(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      if (selectedId) await api.atualizarEmpresa(selectedId, empresaPayload());
      else await api.criarEmpresa(empresaPayload());
      await load();
      setSuccess("Empresa salva.");
      if (!selectedId) novaEmpresa();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function persistirFuncionarios(funcionarios, mensagem) {
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const data = await api.salvarFuncionarios({ funcionarios: cleanItems(funcionarios) });
      setFuncionariosForm(normalizeList((data.itens || []).map(funcionario => funcionario.nome)));
      setFuncionarioDraft("");
      setSuccess(mensagem);
    } catch (err) {
      setError(err.message);
      await load().catch(() => {});
    } finally {
      setBusy(false);
    }
  }

  async function adicionarFuncionario(funcionarios) {
    await persistirFuncionarios(funcionarios, "Funcionário adicionado.");
  }

  async function persistirClientes(clientes, mensagem) {
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const data = await api.salvarClientes({ clientes: cleanItems(clientes) });
      setClientesForm(normalizeList((data.itens || []).map(cliente => cliente.nome)));
      setClienteDraft("");
      setSuccess(mensagem);
    } catch (err) {
      setError(err.message);
      await load().catch(() => {});
    } finally {
      setBusy(false);
    }
  }

  async function adicionarCliente(clientes) {
    await persistirClientes(clientes, "Cliente adicionado.");
  }

  async function persistirAssinaturas(assinaturas, mensagem) {
    const assinaturasValidas = assinaturas.map(assinatura => ({
      ...assinatura,
      nome: (assinatura.nome || "").trim(),
      cargo: (assinatura.cargo || "").trim(),
    }));
    if (assinaturasValidas.some(assinatura => assinatura.nome.length < 2)) {
      setError("Informe um nome com pelo menos 2 caracteres para a assinatura.");
      return;
    }
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const data = await api.salvarCadastrosGlobais({ assinaturas: assinaturasValidas });
      setGlobaisForm({ assinaturas: data.cadastro?.assinaturas || [] });
      setSuccess(mensagem);
    } catch (err) {
      setError(err.message);
      await load().catch(() => {});
    } finally {
      setBusy(false);
    }
  }

  async function adicionarAssinatura(file) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const uploaded = await api.upload(file);
      const assinatura = { ...uploaded, nome: nomeArquivo(file), cargo: "" };
      const assinaturas = [...globaisForm.assinaturas, assinatura];
      setGlobaisForm({ assinaturas });
      await persistirAssinaturas(assinaturas, "Assinatura adicionada.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function removerFuncionario(funcionarios, action) {
    setFuncionariosForm(funcionarios);
    if (!action?.removed) return;
    await persistirFuncionarios(funcionarios, `Funcionario "${action.removed}" removido.`);
  }

  async function removerCliente(clientes, action) {
    setClientesForm(clientes);
    if (!action?.removed) return;
    await persistirClientes(clientes, `Cliente "${action.removed}" removido.`);
  }

  const updateAssinatura = (index, patch) => setGlobaisForm(current => ({
    ...current,
    assinaturas: current.assinaturas.map((assinatura, itemIndex) => itemIndex === index ? { ...assinatura, ...patch } : assinatura),
  }));

  const salvarAssinaturaAtual = async () => {
    await persistirAssinaturas(globaisForm.assinaturas, "Assinatura atualizada.");
  };

  async function removerAssinatura(index) {
    const assinatura = globaisForm.assinaturas[index];
    const assinaturas = globaisForm.assinaturas.filter((_, itemIndex) => itemIndex !== index);
    setGlobaisForm(current => ({ ...current, assinaturas }));
    await persistirAssinaturas(assinaturas, `Assinatura${assinatura?.nome ? ` de "${assinatura.nome}"` : ""} removida.`);
  }

  return (
    <Layout>
      <button className="back" onClick={() => navigate("/")}>← Voltar aos relatórios</button>
      <div className="page-head">
        <div>
          <p className="eyebrow">ADMIN</p>
          <h1>Empresas e cadastros</h1>
          <p>Empresas controlam unidades e áreas. Funcionários e assinaturas são cadastros globais.</p>
        </div>
        <button className="secondary" onClick={novaEmpresa}>Nova empresa</button>
      </div>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <div className="admin-grid">
        <aside className="admin-list">
          {empresas.map(empresa => (
            <button key={empresa.id} className={selectedId === empresa.id ? "active" : ""} onClick={() => selectEmpresa(empresa)}>
              <b>{empresa.nome}</b>
              <span>{empresa.unidades?.length || 0} unidade(s)</span>
            </button>
          ))}
        </aside>
        <div className="admin-stack">
          <form className="detail-card" onSubmit={salvarEmpresa}>
            <h2>Empresa</h2>
            <Field label="Nome da empresa" value={empresaForm.nome} onChange={nome => setEmpresaForm({ ...empresaForm, nome })} required />
            <div className="dynamic-grid compact-master-grid">
              <ChipTextList
                label="Unidade / cliente"
                values={empresaForm.unidades}
                onChange={unidades => setEmpresaForm({ ...empresaForm, unidades })}
                placeholder="Ex.: Ingredion Balsa Nova"
                emptyText="Nenhuma unidade cadastrada."
              />
              <ChipTextList
                label="Área / setor"
                values={empresaForm.areasSetores}
                onChange={areasSetores => setEmpresaForm({ ...empresaForm, areasSetores })}
                placeholder="Ex.: Almoxarifado"
                emptyText="Nenhuma área cadastrada."
              />
            </div>
            <div className="form-actions">
              <button className="primary" disabled={busy}>{busy ? "Salvando..." : "Salvar empresa"}</button>
            </div>
          </form>

          <section className="detail-card">
            <h2>Funcionários</h2>
            <ChipTextList
              label="Funcionário"
              values={funcionariosForm}
              onChange={(funcionarios, action) => action?.removed ? removerFuncionario(funcionarios, action) : adicionarFuncionario(funcionarios)}
              draftValue={funcionarioDraft}
              onDraftChange={setFuncionarioDraft}
              placeholder="Nome do funcionário"
              emptyText="Nenhum funcionário cadastrado."
            />
          </section>

          <section className="detail-card">
            <h2>Clientes</h2>
            <ChipTextList
              label="Cliente"
              values={clientesForm}
              onChange={(clientes, action) => action?.removed ? removerCliente(clientes, action) : adicionarCliente(clientes)}
              draftValue={clienteDraft}
              onDraftChange={setClienteDraft}
              placeholder="Nome do cliente"
              emptyText="Nenhum cliente cadastrado."
            />
          </section>

          <section className="detail-card">
            <h2>Assinaturas</h2>
            <section className="signature-box compact-signature-box">
              <div className="chip-editor-head">
                <h3>Assinaturas do PDF</h3>
                <span>{globaisForm.assinaturas.length} item{globaisForm.assinaturas.length !== 1 && "s"}</span>
              </div>
              <div className="signature-toolbar">
                <label className="secondary file-button">
                  Adicionar assinatura
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => adicionarAssinatura(e.target.files?.[0])} />
                </label>
              </div>
              <div className="signature-list-panel">
                {globaisForm.assinaturas.length === 0 ? (
                  <p className="muted chip-empty">Nenhuma assinatura cadastrada.</p>
                ) : (
                  <div className="signature-list">
                    {globaisForm.assinaturas.map((assinatura, index) => (
                      <div className="signature-item compact-signature-item" key={assinatura.chave || index}>
                        {assinatura.url && <img src={assinaturaPreviewUrl(assinatura.url)} alt={`Assinatura de ${assinatura.nome || "responsável"}`} />}
                        <Field label="Nome" value={assinatura.nome || ""} onChange={nome => updateAssinatura(index, { nome })} onBlur={salvarAssinaturaAtual} required />
                        <Field label="Cargo" value={assinatura.cargo || ""} onChange={cargo => updateAssinatura(index, { cargo })} onBlur={salvarAssinaturaAtual} />
                        <button type="button" className="link" disabled={busy} onClick={() => removerAssinatura(index)}>Remover</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </div>
    </Layout>
  );
}
