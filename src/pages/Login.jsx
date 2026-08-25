import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Brand } from "../components/Brand";
import { Field } from "../components/Field";

export function Login() {
  const { auth, login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (auth) return <Navigate to="/" replace />;
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (mode === "cadastro") {
        const data = await api.cadastro(form);
        setMode("login");
        setError(
          data.mensagem || "Cadastro recebido. Aguarde validação do admin.",
        );
      } else {
        const data = await api.login(form);
        login(data);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-page">
      <section className="auth-copy">
        <Brand />
        <p className="eyebrow">EVIDÊNCIA. CONTROLE. CONFIANÇA.</p>
        <h1>Tratamentos documentados do campo ao cliente.</h1>
        <p>
          Centralize relatórios de fumigação, fotos e informações por lote em um
          único lugar seguro.
        </p>
        <div className="feature-row">
          <span>✓ Evidências fotográficas</span>
          <span>✓ Busca rápida por lote</span>
          <span>✓ Compartilhamento seguro</span>
        </div>
      </section>
      <section className="auth-card">
        <div className="tabs" role="tablist" aria-label="Tipo de acesso">
          <button
            className={mode === "login" ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            onClick={() => setMode("login")}
          >
            Entrar
          </button>
          <button
            className={mode === "cadastro" ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={mode === "cadastro"}
            onClick={() => setMode("cadastro")}
          >
            Criar conta
          </button>
        </div>
        <h2>{mode === "login" ? "Bem-vindo de volta" : "Solicitar acesso"}</h2>
        <p>
          {mode === "login"
            ? "Acesse seus relatórios e lotes."
            : "Um admin irá validar a empresa e as permissões."}
        </p>
        <form onSubmit={submit}>
          {mode === "cadastro" && (
            <Field
              label="Nome"
              value={form.nome}
              onChange={(nome) => setForm({ ...form, nome })}
              required
            />
          )}
          <Field
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(email) => setForm({ ...form, email })}
            required
          />
          <Field
            label="Senha"
            type="password"
            minLength="8"
            value={form.senha}
            onChange={(senha) => setForm({ ...form, senha })}
            required
          />
          {error && (
            <div
              className={
                error.includes("admin") ||
                error.includes("criado") ||
                error.includes("recebido")
                  ? "success"
                  : "error"
              }
            >
              {error}
            </div>
          )}
          <button className="primary full" disabled={busy}>
            {busy
              ? "Aguarde…"
              : mode === "login"
                ? "Entrar na plataforma"
                : "Solicitar acesso"}
          </button>
        </form>
      </section>
    </div>
  );
}
