const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

if (import.meta.env.PROD && !configuredApiUrl) {
  throw new Error("VITE_API_URL não foi configurada no build de produção.");
}

const developmentApiUrl = import.meta.env.DEV ? "http://localhost:3000" : "";
export const apiBaseUrl = (configuredApiUrl || developmentApiUrl).replace(/\/$/, "");
const storageKey = "fumigadoc.auth";

export const authStore = {
  get: () => { try { return JSON.parse(localStorage.getItem(storageKey) || "null"); } catch { return null; } },
  set: (value) => localStorage.setItem(storageKey, JSON.stringify(value)),
  clear: () => localStorage.removeItem(storageKey),
};

async function request(path, options = {}, authenticated = true) {
  const auth = authStore.get();
  const headers = { ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}), ...options.headers };
  if (authenticated && auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  const response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers });
  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && authenticated) authStore.clear();
    const errors = data.erros ? Object.values(data.erros).flat().join(" ") : "";
    throw new Error(errors || data.mensagem || "Não foi possível concluir a operação.");
  }
  return data;
}

export const api = {
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }, false),
  cadastro: (body) => request("/auth/cadastro", { method: "POST", body: JSON.stringify(body) }, false),
  listarUsuarios: () => request("/usuarios"),
  validarUsuario: (id, body) => request(`/usuarios/${encodeURIComponent(id)}/validar`, { method: "PATCH", body: JSON.stringify(body) }),
  listarEmpresas: () => request("/empresas"),
  criarEmpresa: (body) => request("/empresas", { method: "POST", body: JSON.stringify(body) }),
  atualizarEmpresa: (id, body) => request(`/empresas/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(body) }),
  obterCadastrosGlobais: () => request("/cadastros-globais"),
  salvarCadastrosGlobais: (body) => request("/cadastros-globais", { method: "PUT", body: JSON.stringify(body) }),
  listarFuncionarios: () => request("/funcionarios"),
  salvarFuncionarios: (body) => request("/funcionarios", { method: "PUT", body: JSON.stringify(body) }),
  listar: (lote = "") => request(`/relatorios?lote=${encodeURIComponent(lote)}`),
  buscar: (id) => request(`/relatorios/${id}`),
  criar: (body) => request("/relatorios", { method: "POST", body: JSON.stringify(body) }),
  compartilhar: (id) => request(`/relatorios/${id}/compartilhar`, { method: "POST" }),
  publico: (token) => request(`/publico/relatorios/${encodeURIComponent(token)}`, {}, false),
  async upload(file) {
    const signed = await request("/uploads/url", { method: "POST", body: JSON.stringify({ nome: file.name, contentType: file.type, tamanho: file.size }) });
    const upload = await fetch(signed.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
    if (!upload.ok) throw new Error(`Falha ao enviar ${file.name}.`);
    return { url: signed.url, chave: signed.chave, nome: file.name, contentType: file.type };
  },
};
