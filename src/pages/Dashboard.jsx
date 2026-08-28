import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { AppleIcon } from "../components/AppleIcon";
import { Layout } from "../components/Layout";
import { formatDate } from "../utils/formatters";

const normalizeControlName = (value) =>
  value === "Arm. Feromônio - Epdópterus"
    ? "Arm. Feromônio - Lepidópteros"
    : value;

const dateTime = (value) => {
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const sortRecent = (reports) =>
  [...reports].sort((a, b) => dateTime(b.dataTratamento) - dateTime(a.dataTratamento));

const buildControlFolders = (reports) =>
  sortRecent(reports).reduce((folders, report) => {
    const tipoControle = normalizeControlName(report.tipoControle || "Relatório de controle");
    const current = folders.get(tipoControle) || {
      tipoControle,
      total: 0,
      latestDate: report.dataTratamento,
      cover: report.fotos?.[0]?.url || "",
    };
    current.total += 1;
    if (!current.cover && report.fotos?.[0]?.url) current.cover = report.fotos[0].url;
    if (dateTime(report.dataTratamento) > dateTime(current.latestDate)) {
      current.latestDate = report.dataTratamento;
    }
    folders.set(tipoControle, current);
    return folders;
  }, new Map());

const resumoRelatorio = (item) => {
  const lotesQuantidades = Array.isArray(item.lotesQuantidades)
    ? item.lotesQuantidades.filter((linha) => linha?.lote || linha?.quantidade)
    : [];
  if (lotesQuantidades.length) {
    return lotesQuantidades
      .map((linha) => `${linha.lote || "-"}: ${linha.quantidade || "-"}`)
      .join(" | ");
  }
  return (
    item.cliente ||
    item.produto ||
    item.quantidade ||
    item.placaVeiculo ||
    item.unidadeCliente ||
    item.areaSetor ||
    "Sem unidade informada"
  );
};

function ReportCard({ item, onOpen }) {
  return (
    <article
      className="report-card"
      onClick={onOpen}
      tabIndex={0}
      role="link"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen();
      }}
    >
      {item.fotos?.[0]?.url ? (
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
        <h3>{normalizeControlName(item.tipoControle) || "Relatório de controle"}</h3>
        <p>{resumoRelatorio(item)}</p>
        <footer>
          <span>{formatDate(item.dataTratamento)}</span>
          <b>Ver relatório →</b>
        </footer>
      </div>
    </article>
  );
}

export function Dashboard() {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [dataOs, setDataOs] = useState("");
  const [appliedDataOs, setAppliedDataOs] = useState("");
  const [selectedControl, setSelectedControl] = useState("");
  const [latestItems, setLatestItems] = useState([]);
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
  const load = async (
    lote = appliedQuery,
    pagina = 1,
    dataOsFiltro = appliedDataOs,
    tipoControle = selectedControl,
  ) => {
    setLoading(true);
    try {
      const response = await api.listar({
        lote,
        dataOs: dataOsFiltro,
        tipoControle,
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
  const loadLatest = async (lote = appliedQuery, dataOsFiltro = appliedDataOs) => {
    const response = await api.listar({
      lote,
      dataOs: dataOsFiltro,
      ordenar: "criados",
      pagina: 1,
      limite: 3,
    });
    setLatestItems(response.itens || []);
  };
  useEffect(() => {
    load("", 1, "");
    loadLatest("", "");
  }, []);
  const hasActiveFilters = Boolean(appliedQuery || appliedDataOs || selectedControl);
  const clearFilters = () => {
    setQuery("");
    setDataOs("");
    setAppliedQuery("");
    setAppliedDataOs("");
    setSelectedControl("");
    load("", 1, "", "");
    loadLatest("", "");
  };
  const openControlFolder = (tipoControle) => {
    setSelectedControl(tipoControle);
    load(appliedQuery, 1, appliedDataOs, tipoControle);
  };
  const closeControlFolder = () => {
    setSelectedControl("");
    load(appliedQuery, 1, appliedDataOs, "");
    loadLatest(appliedQuery, appliedDataOs);
  };
  const controlFolders = [...buildControlFolders(items).values()];
  const sortedItems = sortRecent(items);
  const userEmpresas = [
    ...new Set([
      ...(Array.isArray(auth?.usuario?.empresas) ? auth.usuario.empresas : []),
      auth?.usuario?.empresa,
    ].map((empresa) => empresa?.trim()).filter(Boolean)),
  ];
  const hasCompany = Boolean(userEmpresas.length);
  const canWrite =
    auth?.usuario?.role === "admin" || auth?.usuario?.role === "funcionario";
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
      {!canWrite && !hasCompany ? (
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
        className="dashboard-filters"
        onSubmit={(e) => {
          e.preventDefault();
          const nextQuery = query.trim();
          const nextDataOs = dataOs;
          setAppliedQuery(nextQuery);
          setAppliedDataOs(nextDataOs);
          load(nextQuery, 1, nextDataOs, selectedControl);
          if (!selectedControl) loadLatest(nextQuery, nextDataOs);
        }}
      >
        <label className="filter-field filter-field-search">
          <span>Busca</span>
          <div>
            <AppleIcon name="search" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O.S., cliente, lote, produto ou placa"
              aria-label="Buscar relatórios"
            />
          </div>
        </label>
        <label className="filter-field filter-field-date">
          <span>Data da O.S.</span>
          <input
            type="date"
            value={dataOs}
            onChange={(e) => setDataOs(e.target.value)}
            aria-label="Filtrar por data da O.S."
          />
        </label>
        <div className="filter-actions">
          {hasActiveFilters && (
            <button
              className="secondary"
              type="button"
              onClick={clearFilters}
            >
              Limpar
            </button>
          )}
          <button className="primary" type="submit">
            Buscar
          </button>
        </div>
      </form>
      <div className="section-title">
        <div>
          <h2>{selectedControl || "Pastas de relatórios"}</h2>
          {selectedControl && (
            <button
              className="link folder-back"
              type="button"
              onClick={closeControlFolder}
            >
              ← Voltar às pastas
            </button>
          )}
        </div>
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
          {!selectedControl && (
            <div className="folder-grid">
              {controlFolders.map((folder) => (
                <button
                  className="folder-card"
                  key={folder.tipoControle}
                  type="button"
                  onClick={() => openControlFolder(folder.tipoControle)}
                >
                  {folder.cover ? (
                    <img src={folder.cover} alt="" />
                  ) : (
                    <span className="folder-placeholder">
                      <AppleIcon name="document" size={28} />
                    </span>
                  )}
                  <span className="folder-copy">
                    <b>{folder.tipoControle}</b>
                    <small>
                      {folder.total} relatório{folder.total !== 1 && "s"} · Mais recente em{" "}
                      {formatDate(folder.latestDate)}
                    </small>
                  </span>
                </button>
              ))}
            </div>
          )}
          {selectedControl && (
            <div className="report-grid">
              {sortedItems.map((item) => (
                <ReportCard
                  key={item.id}
                  item={item}
                  onOpen={() => navigate(`/relatorios/${item.id}`)}
                />
              ))}
            </div>
          )}
          {!selectedControl && latestItems.length > 0 && (
            <>
              <div className="section-title latest-title">
                <h2>Últimos relatórios criados</h2>
                <span>3 mais recentes</span>
              </div>
              <div className="report-grid latest-report-grid">
                {latestItems.map((item) => (
                  <ReportCard
                    key={item.id}
                    item={item}
                    onOpen={() => navigate(`/relatorios/${item.id}`)}
                  />
                ))}
              </div>
            </>
          )}
          {selectedControl && pagination.totalPaginas > 1 && (
            <nav className="pagination" aria-label="Paginação de relatórios">
              <button
                className="secondary pagination-button"
                disabled={loading || !pagination.temPaginaAnterior}
                onClick={() => load(appliedQuery, pagination.pagina - 1, appliedDataOs, selectedControl)}
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
                onClick={() => load(appliedQuery, pagination.pagina + 1, appliedDataOs, selectedControl)}
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
