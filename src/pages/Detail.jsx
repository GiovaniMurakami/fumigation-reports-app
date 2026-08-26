import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { AppleIcon } from "../components/AppleIcon";
import { Layout } from "../components/Layout";
import { formatDate, formatDateOnly, formatValue } from "../utils/formatters";

export function Detail({ shared = false }) {
  const { auth } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [share, setShare] = useState("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [photoOrientations, setPhotoOrientations] = useState({});
  const canWrite =
    auth?.usuario?.role === "admin" || auth?.usuario?.role === "funcionario";

  useEffect(() => {
    (shared ? api.publico(params.token) : api.buscar(params.id))
      .then((data) => {
        setItem(data);
        setSelectedPhotoIndex(null);
        setPhotoOrientations({});
      })
      .catch((e) => setError(e.message));
  }, [params.id, params.token, shared]);

  useEffect(() => {
    if (selectedPhotoIndex == null) return undefined;

    function handleKeyDown(event) {
      const total = item?.fotos?.length || 0;
      if (event.key === "Escape") setSelectedPhotoIndex(null);
      if (event.key === "ArrowLeft" && total > 1) {
        setSelectedPhotoIndex((index) => (index - 1 + total) % total);
      }
      if (event.key === "ArrowRight" && total > 1) {
        setSelectedPhotoIndex((index) => (index + 1) % total);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item?.fotos?.length, selectedPhotoIndex]);

  async function exportPdf() {
    try {
      const { baixarPdfRelatorio } = await import("../services/pdfRelatorio");
      await baixarPdfRelatorio(item);
    } catch {
      setError("Não foi possível gerar o PDF neste navegador.");
    }
  }

  async function doShare() {
    try {
      const data = await api.compartilhar(item.id);
      setShare(data.url);
      await navigator.clipboard?.writeText(data.url);
    } catch (e) {
      setError(e.message);
    }
  }

  async function shareWhatsApp() {
    const popup = window.open("about:blank", "_blank");
    try {
      const data = await api.compartilhar(item.id);
      setShare(data.url);
      const lotes = item.lotes.map((lote) => `• ${lote}`).join("\n");
      const fotos =
        item.fotos.map((foto, index) => `${index + 1}. ${foto.url}`).join("\n") ||
        "Sem fotos anexadas";
      const periodo = [
        item.dataInicio && `*Início:* ${formatDateOnly(item.dataInicio)}`,
        item.dataFim && `*Fim:* ${formatDateOnly(item.dataFim)}`,
      ].filter(Boolean);
      const mensagem = [
        `*${item.tipoControle || "Relatório de controle de pragas"} — Bio Safe Pest*`,
        "",
        "*O.S. / identificador:*",
        lotes,
        "",
        `*Data:* ${formatDate(item.dataTratamento)}`,
        ...periodo.flatMap((line) => ["", line]),
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

  if (error && !item)
    return (
      <Layout>
        <div className="empty">
          <b>{error}</b>
        </div>
      </Layout>
    );

  if (!item)
    return (
      <Layout>
        <div className="empty">Carregando relatório…</div>
      </Layout>
    );

  const dados = Object.entries(item.dados || {}).filter(([, value]) =>
    formatValue(value),
  );
  const selectedPhoto =
    selectedPhotoIndex == null ? null : item.fotos?.[selectedPhotoIndex];
  const photoKey = (photo, index) => photo.chave || photo.url || String(index);
  const registerPhotoOrientation = (photo, index, event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    const orientation =
      naturalHeight > naturalWidth * 1.12
        ? "portrait"
        : naturalWidth > naturalHeight * 1.12
          ? "landscape"
          : "square";
    const key = photoKey(photo, index);
    setPhotoOrientations((current) =>
      current[key] === orientation ? current : { ...current, [key]: orientation },
    );
  };
  const navigatePhoto = (direction) => {
    const total = item.fotos?.length || 0;
    if (!total) return;
    setSelectedPhotoIndex((index) => (index + direction + total) % total);
  };

  return (
    <Layout>
      {!shared && (
        <button className="back" onClick={() => navigate("/")}>
          ← Voltar aos relatórios
        </button>
      )}
      <div className="detail-head">
        <div>
          <div className="lot-list">
            <span className="lot">{item.numeroOs || item.lotes?.[0]}</span>
            {item.empresa && <span className="lot alt">{item.empresa}</span>}
            {item.tipoControle && (
              <span className="lot alt">{item.tipoControle}</span>
            )}
          </div>
          <h1>{item.tipoControle || "Relatório de controle"}</h1>
          <p>{formatDate(item.dataTratamento)}</p>
        </div>
        <div className="detail-actions">
          <button className="secondary" onClick={exportPdf}>
            Exportar PDF
          </button>
          {!shared && canWrite && (
            <>
              <button className="secondary" onClick={doShare}>
                ↗ Copiar link
              </button>
              <button className="whatsapp" onClick={shareWhatsApp}>
                Compartilhar no WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {share && (
        <div className="share-box">
          <b>Link público do relatório</b>
          <input readOnly value={share} />
        </div>
      )}
      <div className="detail-grid">
        <section className="detail-card">
          <h2>Identificação</h2>
          <dl>
            <div>
              <dt>Empresa</dt>
              <dd>{item.empresa || "-"}</dd>
            </div>
            <div>
              <dt>Unidade</dt>
              <dd>{item.unidadeCliente || "-"}</dd>
            </div>
            <div>
              <dt>Área / setor</dt>
              <dd>{item.areaSetor || "-"}</dd>
            </div>
            <div>
              <dt>Realizado por</dt>
              <dd>{item.realizadoPor || "-"}</dd>
            </div>
            {item.dataInicio && (
              <div>
                <dt>Data início</dt>
                <dd>{formatDateOnly(item.dataInicio)}</dd>
              </div>
            )}
            {item.dataFim && (
              <div>
                <dt>Data fim</dt>
                <dd>{formatDateOnly(item.dataFim)}</dd>
              </div>
            )}
          </dl>
        </section>
        <section className="detail-card">
          <h2>Dados do serviço</h2>
          {dados.length ? (
            <dl>
              {dados.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{formatValue(value)}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="muted">Nenhum campo adicional informado.</p>
          )}
        </section>
      </div>
      <section className="detail-card photos-card">
        <h2>Evidências fotográficas</h2>
        {item.fotos?.length ? (
          <div className="photos">
            {item.fotos.map((f, index) => (
              <button
                className={`photo-item ${photoOrientations[photoKey(f, index)] || "photo-loading"}`}
                key={photoKey(f, index)}
                onClick={() => setSelectedPhotoIndex(index)}
                type="button"
              >
                <img
                  src={f.url}
                  alt={f.nome}
                  onLoad={(event) => registerPhotoOrientation(f, index, event)}
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="muted">Nenhuma foto anexada.</p>
        )}
      </section>
      {selectedPhoto && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.nome || "Evidência fotográfica"}
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <button
            className="photo-lightbox-close"
            onClick={() => setSelectedPhotoIndex(null)}
            type="button"
          >
            <AppleIcon name="close" size={22} />
          </button>
          {item.fotos.length > 1 && (
            <button
              className="photo-lightbox-nav photo-lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                navigatePhoto(-1);
              }}
              type="button"
            >
              <AppleIcon name="chevronLeft" size={28} />
            </button>
          )}
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedPhoto.url} alt={selectedPhoto.nome} />
            {selectedPhoto.nome && <figcaption>{selectedPhoto.nome}</figcaption>}
          </figure>
          {item.fotos.length > 1 && (
            <button
              className="photo-lightbox-nav photo-lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                navigatePhoto(1);
              }}
              type="button"
            >
              <AppleIcon name="chevronRight" size={28} />
            </button>
          )}
        </div>
      )}
      {shared && (
        <p className="public-note">
          Relatório compartilhado por meio de link seguro da Bio Safe Pest.
        </p>
      )}
    </Layout>
  );
}
