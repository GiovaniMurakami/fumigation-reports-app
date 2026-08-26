import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { AppleIcon } from "../components/AppleIcon";
import { Layout } from "../components/Layout";
import { formatDate } from "../utils/formatters";

export function Dashboard() {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [pagination, setPagination] = useState({
    pagina: 1,
    limite: 20,
    total: 0,
    totalPaginas: 0,
    temProximaPagina: false,
    temPaginaAnterior: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const load = async (lote = appliedQuery, pagina = 1) => {
    setLoading(true);
    try {
      const response = await api.listar({
        lote,
        pagina,
        limite: pagination.limite,
      });
      setItems(response.itens || []);
      setPagination(response.paginacao || {
        pagina,
        limite: pagination.limite,
        total: response.itens?.length || 0,
        totalPaginas: 1,
        temProximaPagina: false,
        temPaginaAnterior: pagina > 1,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load("", 1);
  }, []);
  const isGlobalAdmin =
    auth?.usuario?.role === "admin" && !auth?.usuario?.empresa;
  const hasCompany = Boolean(auth?.usuario?.empresa);
  const canWrite =
    isGlobalAdmin ||
    (hasCompany &&
      (auth?.usuario?.role === "admin" ||
        auth?.usuario?.role === "funcionario"));
  return (
    <Layout>
      <div className="page-head">
        <div>
          <p className="eyebrow">PAINEL DE CONTROLE</p>
          <h1>Relatórios de controle de pragas</h1>
          <p>Consulte o histórico ou registre um novo serviço.</p>
        </div>
        {canWrite && (
          <button className="primary" onClick={() => navigate("/novo")}>
            ＋ Novo relatório
          </button>
        )}
      </div>
      {!isGlobalAdmin && !hasCompany ? (
        <div className="notice">
          Seu usuário ainda não está vinculado a uma empresa.
        </div>
      ) : (
        !canWrite && (
          <div className="notice">
            Seu perfil possui permissão somente de leitura.
          </div>
        )
      )}
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          const nextQuery = query.trim();
          setAppliedQuery(nextQuery);
          load(nextQuery, 1);
        }}
      >
        <span>⌕</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por O.S., tipo, unidade ou lote"
          aria-label="Buscar relat?rios"
        />
        <button>Buscar</button>
      </form>
      <div className="section-title">
        <h2>Relatórios recentes</h2>
        <span>
          {pagination.total} registro{pagination.total !== 1 && "s"}
        </span>
      </div>
      {loading ? (
        <div className="empty">Carregando relatórios…</div>
      ) : items.length === 0 ? (
        <div className="empty">
          <b>Nenhum relatório encontrado</b>
          <span>Cadastre seu primeiro serviço ou altere a busca.</span>
        </div>
      ) : (
        <>
          <div className="report-grid">
            {items.map((item) => (
              <article
                className="report-card"
                key={item.id}
                onClick={() => navigate(`/relatorios/${item.id}`)}
                tabIndex={0}
                role="link"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ")
                    navigate(`/relatorios/${item.id}`);
                }}
              >
                {item.fotos[0]?.url ? (
                  <img src={item.fotos[0].url} alt="Evidência do serviço" />
                ) : (
                  <div className="report-placeholder">
                    <AppleIcon name="document" size={28} />
                    <span>BioSafe Pest</span>
                  </div>
                )}
                <div>
                  <div className="lot-list">
                    <span className="lot">
                      {item.numeroOs || item.lotes?.[0]}
                    </span>
                    {item.empresa && (
                      <span className="lot alt">{item.empresa}</span>
                    )}
                  </div>
                  <h3>{item.tipoControle || "Relatório de controle"}</h3>
                  <p>
                    {item.unidadeCliente ||
                      item.areaSetor ||
                      "Sem unidade informada"}
                  </p>
                  <footer>
                    <span>{formatDate(item.dataTratamento)}</span>
                    <b>Ver relatório →</b>
                  </footer>
                </div>
              </article>
            ))}
          </div>
          {pagination.totalPaginas > 1 && (
            <nav className="pagination" aria-label="Paginação de relatórios">
              <button
                className="secondary pagination-button"
                disabled={loading || !pagination.temPaginaAnterior}
                onClick={() => load(appliedQuery, pagination.pagina - 1)}
                type="button"
              >
                <AppleIcon name="chevronLeft" size={17} />
                Anterior
              </button>
              <span>
                Página {pagination.pagina} de {pagination.totalPaginas}
              </span>
              <button
                className="secondary pagination-button"
                disabled={loading || !pagination.temProximaPagina}
                onClick={() => load(appliedQuery, pagination.pagina + 1)}
                type="button"
              >
                Próxima
                <AppleIcon name="chevronRight" size={17} />
              </button>
            </nav>
          )}
        </>
      )}
    </Layout>
  );
}
