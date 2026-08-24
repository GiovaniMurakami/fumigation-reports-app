import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Layout } from "../components/Layout";
import { formatDate, formatValue } from "../utils/formatters";

export function Detail({ shared = false }) {
  const { auth } = useAuth();
  const params = useParams(); const navigate = useNavigate(); const [item, setItem] = useState(null); const [error, setError] = useState(""); const [share, setShare] = useState("");
  const canWrite = auth?.usuario?.role === "admin" || auth?.usuario?.role === "funcionario";
  useEffect(() => { (shared ? api.publico(params.token) : api.buscar(params.id)).then(setItem).catch(e => setError(e.message)); }, [params.id, params.token, shared]);
  async function exportPdf() {
    try {
      if (shared) {
        window.open(api.pdfPublicoUrl(params.token), "_blank", "noopener,noreferrer");
        return;
      }
      const blob = await api.baixarPdf(item.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `relatorio-${item.numeroOs || item.id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e.message);
    }
  }
  async function doShare() { try { const data = await api.compartilhar(item.id); setShare(data.url); await navigator.clipboard?.writeText(data.url); } catch (e) { setError(e.message); } }
  async function shareWhatsApp() {
    const popup = window.open("about:blank", "_blank");
    try {
      const data = await api.compartilhar(item.id);
      setShare(data.url);
      const lotes = item.lotes.map(lote => `• ${lote}`).join("\n");
      const fotos = item.fotos.map((foto, index) => `${index + 1}. ${foto.url}`).join("\n") || "Sem fotos anexadas";
      const mensagem = [`*${item.tipoControle || "Relatório de controle de pragas"} — Bio Safe Pest*`, "", "*O.S. / identificador:*", lotes, "", `*Data:* ${formatDate(item.dataTratamento)}`, "", "*Fotos:*", fotos, "", `*Relatório completo:* ${data.url}`].join("\n");
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
  const dados = Object.entries(item.dados || {}).filter(([, value]) => formatValue(value));
  return <Layout>{!shared && <button className="back" onClick={() => navigate("/")}>← Voltar aos relatórios</button>}<div className="detail-head"><div><div className="lot-list"><span className="lot">OS {item.numeroOs || item.lotes?.[0]}</span>{item.empresa && <span className="lot alt">{item.empresa}</span>}{item.tipoControle && <span className="lot alt">{item.tipoControle}</span>}</div><h1>{item.tipoControle || "Relatório de controle"}</h1><p>{formatDate(item.dataTratamento)}</p></div><div className="detail-actions"><button className="secondary" onClick={exportPdf}>Exportar PDF</button>{!shared && canWrite && <><button className="secondary" onClick={doShare}>↗ Copiar link</button><button className="whatsapp" onClick={shareWhatsApp}>Compartilhar no WhatsApp</button></>}</div></div>{error && <div className="error">{error}</div>}{share && <div className="share-box"><b>Link público do relatório</b><input readOnly value={share}/></div>}<div className="detail-grid"><section className="detail-card"><h2>Identificação</h2><dl><div><dt>Empresa</dt><dd>{item.empresa || "-"}</dd></div><div><dt>Unidade</dt><dd>{item.unidadeCliente || "-"}</dd></div><div><dt>Área / setor</dt><dd>{item.areaSetor || "-"}</dd></div><div><dt>Realizado por</dt><dd>{item.realizadoPor || "-"}</dd></div></dl></section><section className="detail-card"><h2>Dados do serviço</h2>{dados.length ? <dl>{dados.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{formatValue(value)}</dd></div>)}</dl> : <p className="muted">Nenhum campo adicional informado.</p>}</section></div><section className="detail-card photos-card"><h2>Evidências fotográficas</h2>{item.fotos?.length ? <div className="photos">{item.fotos.map(f => <a href={f.url} target="_blank" rel="noreferrer" key={f.chave}><img src={f.url} alt={f.nome}/></a>)}</div> : <p className="muted">Nenhuma foto anexada.</p>}</section>{shared && <p className="public-note">Relatório compartilhado por meio de link seguro da Bio Safe Pest.</p>}</Layout>;
}
