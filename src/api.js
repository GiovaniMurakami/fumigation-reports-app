const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

if (import.meta.env.PROD && !configuredApiUrl) {
  throw new Error("VITE_API_URL não foi configurada no build de produção.");
}

const developmentApiUrl = import.meta.env.DEV ? "http://localhost:3000" : "";
export const apiBaseUrl = (configuredApiUrl || developmentApiUrl).replace(/\/$/, "");
const storageKey = "fumigadoc.auth";
const authChangedEvent = "fumigadoc.auth.changed";

export const authStore = {
  get: () => { try { return JSON.parse(localStorage.getItem(storageKey) || "null"); } catch { return null; } },
  set: (value) => {
    localStorage.setItem(storageKey, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(authChangedEvent, { detail: value }));
  },
  clear: () => {
    localStorage.removeItem(storageKey);
    window.dispatchEvent(new CustomEvent(authChangedEvent, { detail: null }));
  },
  subscribe: (listener) => {
    const handler = (event) => listener(event.detail ?? authStore.get());
    window.addEventListener(authChangedEvent, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(authChangedEvent, handler);
      window.removeEventListener("storage", handler);
    };
  },
};

let refreshPromise = null;

async function refreshAuth() {
  const auth = authStore.get();
  if (!auth?.refreshToken) throw new Error("Sessão inválida ou expirada.");
  if (!refreshPromise) {
    refreshPromise = fetch(`${apiBaseUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: auth.refreshToken }),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.mensagem || "Sessão inválida ou expirada.");
        authStore.set(data);
        return data;
      })
      .catch((error) => {
        authStore.clear();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function send(path, options = {}, authenticated = true) {
  const auth = authStore.get();
  const headers = { ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}), ...options.headers };
  if (authenticated && auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  const response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers });
  if (response.status === 204) return { response, data: null };
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

async function request(path, options = {}, authenticated = true, retryRefresh = true) {
  const { response, data } = await send(path, options, authenticated);
  if (response.ok) return data;
  if (response.status === 401 && authenticated && retryRefresh) {
    try {
      await refreshAuth();
      return request(path, options, authenticated, false);
    } catch {
      authStore.clear();
    }
  }
  if (response.status === 401 && authenticated) authStore.clear();
  const errors = data.erros ? Object.values(data.erros).flat().join(" ") : "";
  throw new Error(errors || data.mensagem || "Não foi possível concluir a operação.");
}

export const api = {
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }, false),
  logout: (refreshToken) => request("/auth/logout", { method: "POST", body: JSON.stringify({ refreshToken }) }, false),
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
  listarClientes: () => request("/clientes"),
  salvarClientes: (body) => request("/clientes", { method: "PUT", body: JSON.stringify(body) }),
  listar: ({ lote = "", dataOs = "", tipoControle = "", ordenar = "", pagina = 1, limite = 20 } = {}) => {
    const params = new URLSearchParams({
      pagina: String(pagina),
      limite: String(limite),
    });
    if (lote) params.set("lote", lote);
    if (dataOs) params.set("dataOs", dataOs);
    if (tipoControle) params.set("tipoControle", tipoControle);
    if (ordenar) params.set("ordenar", ordenar);
    return request(`/relatorios?${params.toString()}`);
  },
  buscar: (id) => request(`/relatorios/${id}`),
  criar: (body) => request("/relatorios", { method: "POST", body: JSON.stringify(body) }),
  atualizar: (id, body) => request(`/relatorios/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) }),
  excluir: (id) => request(`/relatorios/${encodeURIComponent(id)}`, { method: "DELETE" }),
  compartilhar: (id) => request(`/relatorios/${id}/compartilhar`, { method: "POST" }),
  publico: (token) => request(`/publico/relatorios/${encodeURIComponent(token)}`, {}, false),
  async upload(file) {
    const signed = await request("/uploads/url", { method: "POST", body: JSON.stringify({ nome: file.name, contentType: file.type, tamanho: file.size }) });
    const upload = await fetch(signed.uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
    if (!upload.ok) throw new Error(`Falha ao enviar ${file.name}.`);
    return { url: signed.url, chave: signed.chave, nome: file.name, contentType: file.type };
  },
};
