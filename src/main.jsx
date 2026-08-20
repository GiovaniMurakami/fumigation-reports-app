import { StrictMode, createContext, useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { api, authStore } from "./api";
import "./styles.css";
import "./lotes.css";

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [auth, setAuth] = useState(authStore.get());
  const login = (value) => { authStore.set(value); setAuth(value); };
  const logout = () => { authStore.clear(); setAuth(null); };
  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}
const useAuth = () => useContext(AuthContext);
const formatDate = (value) => new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

function Brand() { return <div className="brand"><span className="brand-mark">G</span><span>Galpex<small>Rastreabilidade de tratamentos</small></span></div>; }
function Layout({ children }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  return <><header><Brand />{auth && <div className="account"><span>Olá, <b>{auth.usuario.nome.split(" ")[0]}</b></span><button className="link" onClick={() => { logout(); navigate("/login"); }}>Sair</button></div>}</header><main>{children}</main></>;
}
function Login() {
  const { auth, login } = useAuth(); const navigate = useNavigate();
  const [mode, setMode] = useState("login"); const [form, setForm] = useState({ nome: "", email: "", senha: "" }); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  if (auth) return <Navigate to="/" replace />;
  async function submit(e) { e.preventDefault(); setBusy(true); setError(""); try { if (mode === "cadastro") { await api.cadastro(form); setMode("login"); setError("Conta criada. Entre com seus dados."); } else { const data = await api.login(form); login(data); navigate("/"); } } catch (err) { setError(err.message); } finally { setBusy(false); } }
  return <div className="auth-page"><section className="auth-copy"><Brand /><p className="eyebrow">EVIDÊNCIA. CONTROLE. CONFIANÇA.</p><h1>Tratamentos documentados do campo ao cliente.</h1><p>Centralize relatórios de fumigação, fotos e informações por lote em um único lugar seguro.</p><div className="feature-row"><span>✓ Evidências fotográficas</span><span>✓ Busca rápida por lote</span><span>✓ Compartilhamento seguro</span></div></section><section className="auth-card"><div className="tabs"><button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Entrar</button><button className={mode === "cadastro" ? "active" : ""} onClick={() => setMode("cadastro")}>Criar conta</button></div><h2>{mode === "login" ? "Bem-vindo de volta" : "Comece agora"}</h2><p>{mode === "login" ? "Acesse seus relatórios e lotes." : "Cadastre sua equipe em poucos segundos."}</p><form onSubmit={submit}>{mode === "cadastro" && <Field label="Nome" value={form.nome} onChange={nome => setForm({ ...form, nome })} required />}<Field label="E-mail" type="email" value={form.email} onChange={email => setForm({ ...form, email })} required /><Field label="Senha" type="password" minLength="8" value={form.senha} onChange={senha => setForm({ ...form, senha })} required />{error && <div className={error.startsWith("Conta criada") ? "success" : "error"}>{error}</div>}<button className="primary full" disabled={busy}>{busy ? "Aguarde…" : mode === "login" ? "Entrar na plataforma" : "Criar minha conta"}</button></form></section></div>;
}
function Field({ label, onChange, as, ...props }) { const Tag = as || "input"; return <label className="field"><span>{label}</span><Tag {...props} onChange={e => onChange(e.target.value)} /></label>; }
function Guard({ children }) { return useAuth().auth ? children : <Navigate to="/login" replace />; }

function Dashboard() {
  const [items, setItems] = useState([]); const [query, setQuery] = useState(""); const [loading, setLoading] = useState(true); const navigate = useNavigate();
  const load = async (lote = "") => { setLoading(true); try { setItems((await api.listar(lote)).itens); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  return <Layout><div className="page-head"><div><p className="eyebrow">PAINEL DE CONTROLE</p><h1>Relatórios de fumigação</h1><p>Consulte o histórico ou registre um novo tratamento.</p></div><button className="primary" onClick={() => navigate("/novo")}>＋ Novo relatório</button></div><form className="search" onSubmit={e => { e.preventDefault(); load(query); }}><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar pelo número ou código do lote"/><button>Buscar lote</button></form><div className="section-title"><h2>Relatórios recentes</h2><span>{items.length} registro{items.length !== 1 && "s"}</span></div>{loading ? <div className="empty">Carregando relatórios…</div> : items.length === 0 ? <div className="empty"><b>Nenhum relatório encontrado</b><span>Cadastre seu primeiro tratamento ou altere a busca.</span></div> : <div className="report-grid">{items.map(item => <article className="report-card" key={item.id} onClick={() => navigate(`/relatorios/${item.id}`)}><img src={item.fotos[0]?.url} alt="Evidência do lote"/><div><div className="lot-list">{item.lotes.map(lote => <span className="lot" key={lote}>LOTE {lote}</span>)}</div><h3>{item.lotes.length} lote{item.lotes.length !== 1 && "s"}</h3><footer><span>{formatDate(item.dataTratamento)}</span><b>Ver relatório →</b></footer></div></article>)}</div>}</Layout>;
}
const initialReport = { lotes: [""], dataTratamento: "" };
function NewReport() {
  const [form, setForm] = useState(initialReport); const [files, setFiles] = useState([]); const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const navigate = useNavigate();
  const update = key => value => setForm({ ...form, [key]: value });
  const updateLote = (index, value) => setForm({ ...form, lotes: form.lotes.map((lote, i) => i === index ? value : lote) });
  const addLote = () => setForm({ ...form, lotes: [...form.lotes, ""] });
  const removeLote = index => setForm({ ...form, lotes: form.lotes.filter((_, i) => i !== index) });
  async function submit(e) { e.preventDefault(); if (!files.length) return setError("Selecione ao menos uma foto como evidência."); setBusy(true); setError(""); try { const fotos = await Promise.all(files.map(api.upload)); const item = await api.criar({ ...form, dataTratamento: new Date(form.dataTratamento).toISOString(), fotos }); navigate(`/relatorios/${item.id}`); } catch (err) { setError(err.message); } finally { setBusy(false); } }
  return <Layout><button className="back" onClick={() => navigate("/")}>← Voltar aos relatórios</button><div className="form-heading"><p className="eyebrow">NOVO REGISTRO</p><h1>Relatório de tratamento</h1><p>Informe os lotes e anexe as evidências do serviço.</p></div><form className="report-form" onSubmit={submit}><FormSection number="01" title="Identificação"><div className="lotes-fields">{form.lotes.map((lote, index) => <div className="lote-row" key={index}><Field label={`Lote ${index + 1} *`} value={lote} onChange={value => updateLote(index, value)} placeholder="Ex.: LT-2026-0842" required/>{form.lotes.length > 1 && <button type="button" className="remove-lote" onClick={() => removeLote(index)} aria-label={`Remover lote ${index + 1}`}>×</button>}</div>)}<button type="button" className="add-lote" onClick={addLote}>＋ Adicionar outro lote</button></div><Field label="Data e hora *" type="datetime-local" value={form.dataTratamento} onChange={update("dataTratamento")} required/></FormSection><FormSection number="02" title="Evidências fotográficas"><label className="dropzone"><b>＋ Adicionar fotos</b><span>JPG, PNG ou WebP • máximo 10 MB por foto</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => setFiles(Array.from(e.target.files).slice(0, 12))}/></label>{files.length > 0 && <div className="file-list">{files.map(file => <span key={file.name}>{file.name}</span>)}</div>}</FormSection>{error && <div className="error">{error}</div>}<div className="form-actions"><button type="button" className="secondary" onClick={() => navigate("/")}>Cancelar</button><button className="primary" disabled={busy}>{busy ? `Enviando ${files.length} foto(s)…` : "Salvar relatório"}</button></div></form></Layout>;
}
function FormSection({ number, title, children }) { return <section className="form-section"><div className="section-number">{number}</div><div><h2>{title}</h2>{children}</div></section>; }
function Detail({ shared = false }) {
  const params = useParams(); const navigate = useNavigate(); const [item, setItem] = useState(null); const [error, setError] = useState(""); const [share, setShare] = useState("");
  useEffect(() => { (shared ? api.publico(params.token) : api.buscar(params.id)).then(setItem).catch(e => setError(e.message)); }, [params.id, params.token, shared]);
  async function doShare() { try { const data = await api.compartilhar(item.id); setShare(data.url); await navigator.clipboard?.writeText(data.url); } catch (e) { setError(e.message); } }
  async function shareWhatsApp() {
    const popup = window.open("about:blank", "_blank");
    try {
      const data = await api.compartilhar(item.id);
      setShare(data.url);
      const lotes = item.lotes.map(lote => `• ${lote}`).join("\n");
      const fotos = item.fotos.map((foto, index) => `${index + 1}. ${foto.url}`).join("\n");
      const mensagem = [
        "*Relatório de fumigação — Galpex*",
        "",
        "*Lotes presentes:*",
        lotes,
        "",
        `*Data:* ${formatDate(item.dataTratamento)}`,
        "",
        "*Fotos:*",
        fotos,
        "",
        `*Relatório completo:* ${data.url}`,
      ].join("\n");
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
      if (popup) popup.location.href = whatsappUrl;
      else window.location.href = whatsappUrl;
    } catch (e) {
      popup?.close();
      setError(e.message);
    }
  }
  if (error && !item) return <Layout><div className="empty"><b>{error}</b></div></Layout>;
  if (!item) return <Layout><div className="empty">Carregando relatório…</div></Layout>;
  return <Layout>{!shared && <button className="back" onClick={() => navigate("/")}>← Voltar aos relatórios</button>}<div className="detail-head"><div><div className="lot-list">{item.lotes.map(lote => <span className="lot" key={lote}>LOTE {lote}</span>)}</div><h1>Relatório de fumigação</h1><p>{formatDate(item.dataTratamento)}</p></div>{!shared && <div className="detail-actions"><button className="secondary" onClick={doShare}>↗ Copiar link</button><button className="whatsapp" onClick={shareWhatsApp}>Compartilhar no WhatsApp</button></div>}</div>{error && <div className="error">{error}</div>}{share && <div className="share-box"><b>Link público do relatório</b><input readOnly value={share}/></div>}<section className="detail-card"><h2>Evidências fotográficas</h2><div className="photos">{item.fotos.map(f => <a href={f.url} target="_blank" rel="noreferrer" key={f.chave}><img src={f.url} alt={f.nome}/></a>)}</div></section>{shared && <p className="public-note">Relatório compartilhado por meio de link seguro da Galpex.</p>}</Layout>;
}
function App() { return <AuthProvider><BrowserRouter><Routes><Route path="/login" element={<Login/>}/><Route path="/compartilhado/:token" element={<Detail shared/>}/><Route path="/" element={<Guard><Dashboard/></Guard>}/><Route path="/novo" element={<Guard><NewReport/></Guard>}/><Route path="/relatorios/:id" element={<Guard><Detail/></Guard>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></BrowserRouter></AuthProvider>; }

createRoot(document.getElementById("root")).render(<StrictMode><App/></StrictMode>);
