import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { AppleIcon } from "../components/AppleIcon";
import { Layout } from "../components/Layout";
import { formCatalog } from "../formTemplates";
import { formatDate, formatDateOnly, formatValue } from "../utils/formatters";
import {
  fieldLabel,
  fumigationServiceFields,
  sanitizeField,
  shouldHideField,
  technicianResponsibleLabel,
} from "../utils/reportFields";

const normalizeControlName = (value) =>
  value === "Arm. Feromônio - Epdópterus"
    ? "Arm. Feromônio - Lepidópteros"
    : value;

const reportUsesLots = (item) =>
  item.tipoControle === "Fumigação" || item.tipoControle === "Carregamento";

const reportLots = (item) =>
  (Array.isArray(item.lotes) ? item.lotes : []).filter(
    (lote) => lote && lote !== item.numeroOs,
  );

const duplicatedDataKeys = (item, lotesQuantidades) => {
  const keys = new Set([
    "Data",
    "Controle",
    "Tipo de controle",
    "Tipo de Controle",
    "Lotes",
    "Lotes / quantidades",
  ]);
  if (item.empresa) keys.add("Empresa");
  if (item.cliente) keys.add("Cliente");
  if (item.produto) keys.add("Produto");
  if (item.quantidade || lotesQuantidades.length) keys.add("Quantidade");
  if (item.placaVeiculo) keys.add("Placa do veículo");
  if (item.unidadeCliente) {
    keys.add("Unidade do cliente");
    keys.add("Unidade / Cliente");
  }
  if (item.areaSetor) {
    keys.add("Área/Setor");
    keys.add("Área/Setor ");
    keys.add("Área / setor");
  }
  if (item.realizadoPor) {
    keys.add("Realizado por:");
    keys.add(technicianResponsibleLabel);
  }
  return keys;
};

const serviceDataEntries = (item, lotesQuantidades) => {
  const hiddenKeys = duplicatedDataKeys(item, lotesQuantidades);
  return Object.entries(item.dados || {}).filter(
    ([key, value]) => !hiddenKeys.has(key) && formatValue(value),
  );
};

const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const toIsoDate = (value) =>
  value ? new Date(`${value}T12:00:00`).toISOString() : undefined;

const compactObject = (entries) =>
  Object.fromEntries(
    Object.entries(entries).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined;
    }),
  );

const moveItem = (items, index, direction) => {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return items;
  const next = [...items];
  [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
  return next;
};

const moveItemTo = (items, fromIndex, toIndex) => {
  if (
    !Number.isInteger(fromIndex) ||
    !Number.isInteger(toIndex) ||
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length
  ) {
    return items;
  }
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};

const dataValueToInput = (value) => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
};

const serviceDataValueToInput = (field, value) => {
  if (field.type === "data") return toDateInput(value);
  if (field.type === "hora") return value ? String(value).slice(0, 5) : "";
  return dataValueToInput(value);
};

const fixedServiceFieldsForReport = (item) => {
  if (item.tipoControle === "Carregamento") {
    return [
      {
        key: "Observação",
        label: "Observação",
        type: "paragrafo",
        options: [],
      },
    ];
  }

  const sectionName = formCatalog.controlToSection[item.tipoControle];
  if (sectionName === "Fumigação") {
    return fumigationServiceFields.map((field) => ({
      ...field,
      options: [],
    }));
  }
  if (!sectionName) return [];

  const fields = (formCatalog.sections[sectionName] || [])
    .filter((field) => !shouldHideField(field, sectionName))
    .map(sanitizeField)
    .map((field) => ({
      key: fieldLabel(field),
      label: fieldLabel(field),
      type: field.type,
      options: field.options || [],
    }));

  return fields.filter(
    (field, index) => fields.findIndex((candidate) => candidate.key === field.key) === index,
  );
};

const serviceDataFieldsFromReport = (item) =>
  fixedServiceFieldsForReport(item).map((field) => ({
    ...field,
    value: serviceDataValueToInput(field, item.dados?.[field.key]),
  }));

const serviceDataFieldsToObject = (item, fields) => {
  const editableKeys = new Set(fields.map((field) => field.key));
  const dados = Object.fromEntries(
    Object.entries(item.dados || {}).filter(([key]) => !editableKeys.has(key)),
  );

  for (const field of fields) {
    const value = String(field.value || "").trim();
    if (value) dados[field.key] = value;
    else delete dados[field.key];
  }

  return dados;
};

const photoKey = (photo, index) => photo.chave || photo.url || String(index);
const fileKey = (file, index) => `${file.name}-${file.size}-${file.lastModified}-${index}`;

const dropIndexFromPoint = (clientX, clientY, selector) => {
  const target = document.elementFromPoint(clientX, clientY)?.closest(selector);
  const index = Number(target?.dataset.sortIndex);
  return Number.isInteger(index) ? index : null;
};

const editStateFromReport = (item) => ({
  empresa: item.empresa || "",
  cliente: item.cliente || "",
  produto: item.produto || "",
  quantidade: item.quantidade || "",
  placaVeiculo: item.placaVeiculo || "",
  unidadeCliente: item.unidadeCliente || "",
  areaSetor: item.areaSetor || "",
  realizadoPor: item.realizadoPor || "",
  dataTratamento: toDateInput(item.dataTratamento),
  dataInicio: toDateInput(item.dataInicio),
  dataFim: toDateInput(item.dataFim),
  lotes: reportLots(item).join("\n"),
  lotesQuantidades: Array.isArray(item.lotesQuantidades)
    ? item.lotesQuantidades.map((linha) => ({
        lote: linha.lote || "",
        quantidade: linha.quantidade || "",
      }))
    : [],
  dadosCampos: serviceDataFieldsFromReport(item),
  fotos: Array.isArray(item.fotos) ? item.fotos : [],
  novosArquivos: [],
});

const linesToList = (value) =>
  value.split(/\n|,/).map((line) => line.trim()).filter(Boolean);

const initialFieldOptions = (entryId) =>
  formCatalog.initialFields.find((field) => field.entryId === entryId)?.options || [];

function SelectOrInput({ value, options, onChange }) {
  if (options?.length) {
    const selectOptions = options.includes(value)
      ? options
      : [value, ...options].filter(Boolean);
    return (
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Selecione</option>
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  return <input value={value} onChange={(event) => onChange(event.target.value)} />;
}

function ServiceDataValueField({ line, index, onChange }) {
  if (line.options?.length) {
    const selectOptions = line.options.includes(line.value)
      ? line.options
      : [line.value, ...line.options].filter(Boolean);
    return (
      <select
        value={line.value}
        onChange={(event) => onChange(index, "value", event.target.value)}
      >
        <option value="">Selecione</option>
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  if (line.type === "data") {
    return (
      <input
        type="date"
        value={line.value}
        onChange={(event) => onChange(index, "value", event.target.value)}
      />
    );
  }
  if (line.type === "hora") {
    return (
      <input
        type="time"
        value={line.value}
        onChange={(event) => onChange(index, "value", event.target.value)}
      />
    );
  }
  if (line.type === "resposta_curta") {
    return (
      <input
        value={line.value}
        onChange={(event) => onChange(index, "value", event.target.value)}
      />
    );
  }
  return (
    <textarea
      rows="2"
      value={line.value}
      onChange={(event) => onChange(index, "value", event.target.value)}
    />
  );
}

async function uploadFiles(files, onProgress) {
  const results = [];
  let nextIndex = 0;
  let done = 0;
  const workers = Array.from({ length: Math.min(4, files.length) }, async () => {
    while (nextIndex < files.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await api.upload(files[index]);
      done += 1;
      onProgress(done);
    }
  });
  await Promise.all(workers);
  return results;
}

export function Detail({ shared = false }) {
  const { auth } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [share, setShare] = useState("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [photoOrientations, setPhotoOrientations] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editUploadProgress, setEditUploadProgress] = useState(null);
  const [draggingPhotoIndex, setDraggingPhotoIndex] = useState(null);
  const [dragOverPhotoIndex, setDragOverPhotoIndex] = useState(null);
  const [draggingFileIndex, setDraggingFileIndex] = useState(null);
  const [dragOverFileIndex, setDragOverFileIndex] = useState(null);
  const [sortAnimationId, setSortAnimationId] = useState(0);
  const [newFilePreviews, setNewFilePreviews] = useState({});
  const canWrite =
    auth?.usuario?.role === "admin" || auth?.usuario?.role === "funcionario";
  const canManageReport = !shared && auth?.usuario?.role === "admin";

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

  useEffect(() => {
    const files = editForm?.novosArquivos || [];
    if (!files.length) {
      setNewFilePreviews({});
      return undefined;
    }

    const previews = Object.fromEntries(
      files.map((file, index) => [fileKey(file, index), URL.createObjectURL(file)]),
    );
    setNewFilePreviews(previews);

    return () => {
      Object.values(previews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [editForm?.novosArquivos]);

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

  function openEditModal() {
    setError("");
    setEditForm(editStateFromReport(item));
    setEditOpen(true);
  }

  function updateEditField(field, value) {
    setEditForm((current) => ({ ...current, [field]: value }));
  }

  function updateEditLotQuantity(index, field, value) {
    setEditForm((current) => ({
      ...current,
      lotesQuantidades: current.lotesQuantidades.map((linha, linhaIndex) =>
        linhaIndex === index ? { ...linha, [field]: value } : linha,
      ),
    }));
  }

  function updateServiceDataField(index, field, value) {
    setEditForm((current) => ({
      ...current,
      dadosCampos: current.dadosCampos.map((linha, linhaIndex) =>
        linhaIndex === index ? { ...linha, [field]: value } : linha,
      ),
    }));
  }

  function removeEditPhoto(index) {
    setEditForm((current) => ({
      ...current,
      fotos: current.fotos.filter((_, photoIndex) => photoIndex !== index),
    }));
  }

  function moveEditPhoto(index, direction) {
    setEditForm((current) => ({
      ...current,
      fotos: moveItem(current.fotos, index, direction),
    }));
  }

  function reorderEditPhoto(fromIndex, toIndex) {
    setEditForm((current) => ({
      ...current,
      fotos: moveItemTo(current.fotos, fromIndex, toIndex),
    }));
    setSortAnimationId((current) => current + 1);
  }

  function removeNewFile(index) {
    setEditForm((current) => ({
      ...current,
      novosArquivos: current.novosArquivos.filter((_, fileIndex) => fileIndex !== index),
    }));
  }

  function moveNewFile(index, direction) {
    setEditForm((current) => ({
      ...current,
      novosArquivos: moveItem(current.novosArquivos, index, direction),
    }));
  }

  function reorderNewFile(fromIndex, toIndex) {
    setEditForm((current) => ({
      ...current,
      novosArquivos: moveItemTo(current.novosArquivos, fromIndex, toIndex),
    }));
    setSortAnimationId((current) => current + 1);
  }

  function startTouchPhotoSort(index, event) {
    if (event.pointerType === "mouse") return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDraggingPhotoIndex(index);
    setDragOverPhotoIndex(index);
  }

  function moveTouchPhotoSort(event) {
    if (draggingPhotoIndex == null || event.pointerType === "mouse") return;
    event.preventDefault();
    const index = dropIndexFromPoint(event.clientX, event.clientY, "[data-photo-sort]");
    if (index != null) setDragOverPhotoIndex(index);
  }

  function finishTouchPhotoSort(event) {
    if (draggingPhotoIndex == null || event.pointerType === "mouse") return;
    event.preventDefault();
    const index =
      dropIndexFromPoint(event.clientX, event.clientY, "[data-photo-sort]") ??
      dragOverPhotoIndex;
    reorderEditPhoto(draggingPhotoIndex, index);
    setDraggingPhotoIndex(null);
    setDragOverPhotoIndex(null);
  }

  function startTouchFileSort(index, event) {
    if (event.pointerType === "mouse") return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDraggingFileIndex(index);
    setDragOverFileIndex(index);
  }

  function moveTouchFileSort(event) {
    if (draggingFileIndex == null || event.pointerType === "mouse") return;
    event.preventDefault();
    const index = dropIndexFromPoint(event.clientX, event.clientY, "[data-file-sort]");
    if (index != null) setDragOverFileIndex(index);
  }

  function finishTouchFileSort(event) {
    if (draggingFileIndex == null || event.pointerType === "mouse") return;
    event.preventDefault();
    const index =
      dropIndexFromPoint(event.clientX, event.clientY, "[data-file-sort]") ??
      dragOverFileIndex;
    reorderNewFile(draggingFileIndex, index);
    setDraggingFileIndex(null);
    setDragOverFileIndex(null);
  }

  async function saveEdit(event) {
    event.preventDefault();
    setSavingEdit(true);
    setError("");
    try {
      const usesLots = reportUsesLots(item);
      const isLoadingEdit = item.tipoControle === "Carregamento";
      const dados = serviceDataFieldsToObject(item, editForm.dadosCampos);
      const lotesQuantidades = isLoadingEdit
        ? editForm.lotesQuantidades
            .map((linha) => ({
              lote: linha.lote.trim(),
              quantidade: linha.quantidade.trim(),
            }))
            .filter((linha) => linha.lote || linha.quantidade)
        : [];
      if (isLoadingEdit && lotesQuantidades.some((linha) => !linha.lote || !linha.quantidade)) {
        throw new Error("Informe lote e quantidade em todas as linhas do carregamento.");
      }
      let novasFotos = [];
      if (editForm.novosArquivos.length) {
        setEditUploadProgress({ done: 0, total: editForm.novosArquivos.length });
        novasFotos = await uploadFiles(editForm.novosArquivos, (done) =>
          setEditUploadProgress({ done, total: editForm.novosArquivos.length }),
        );
      }
      const payload = compactObject({
        empresa: editForm.empresa.trim(),
        cliente: editForm.cliente.trim(),
        produto: editForm.produto.trim(),
        quantidade: editForm.quantidade.trim(),
        placaVeiculo: editForm.placaVeiculo.trim().toUpperCase(),
        unidadeCliente: editForm.unidadeCliente.trim(),
        areaSetor: editForm.areaSetor.trim(),
        realizadoPor: editForm.realizadoPor.trim(),
        dataTratamento: toIsoDate(editForm.dataTratamento),
        dataInicio: editForm.dataInicio ? toIsoDate(editForm.dataInicio) : null,
        dataFim: editForm.dataFim ? toIsoDate(editForm.dataFim) : null,
        lotes: usesLots && !isLoadingEdit ? linesToList(editForm.lotes) : undefined,
        lotesQuantidades: isLoadingEdit ? lotesQuantidades : undefined,
        dados,
        fotos: [...editForm.fotos, ...novasFotos],
      });
      const updated = await api.atualizar(item.id, payload);
      setItem(updated);
      setEditOpen(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setSavingEdit(false);
      setEditUploadProgress(null);
    }
  }

  async function confirmDelete() {
    setDeleting(true);
    setError("");
    try {
      await api.excluir(item.id);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setDeleteOpen(false);
    } finally {
      setDeleting(false);
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

  const isLoadingReport = item.tipoControle === "Carregamento";
  const usesLots = reportUsesLots(item);
  const lotesQuantidades = Array.isArray(item.lotesQuantidades)
    ? item.lotesQuantidades.filter((linha) => linha?.lote || linha?.quantidade)
    : [];
  const lotesRelatorio = reportLots(item);
  const dados = serviceDataEntries(item, lotesQuantidades);
  const selectedPhoto =
    selectedPhotoIndex == null ? null : item.fotos?.[selectedPhotoIndex];
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
              <span className="lot alt">{normalizeControlName(item.tipoControle)}</span>
            )}
          </div>
          <h1>{normalizeControlName(item.tipoControle) || "Relatório de controle"}</h1>
          <p>{formatDate(item.dataTratamento)}</p>
        </div>
        <div className="detail-actions-panel">
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
          {canManageReport && (
            <div className="admin-report-actions" aria-label="Ações administrativas do relatório">
              <button className="secondary" onClick={openEditModal}>
                Editar relatório
              </button>
              <button className="danger" onClick={() => setDeleteOpen(true)}>
                Excluir relatório
              </button>
            </div>
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
            {!isLoadingReport && (
              <div>
                <dt>Unidade</dt>
                <dd>{item.unidadeCliente || "-"}</dd>
              </div>
            )}
            {item.cliente && (
              <div>
                <dt>Cliente</dt>
                <dd>{item.cliente}</dd>
              </div>
            )}
            {item.produto && (
              <div>
                <dt>Produto</dt>
                <dd>{item.produto}</dd>
              </div>
            )}
            {!lotesQuantidades.length && lotesRelatorio.length > 0 && (
              <div>
                <dt>Lotes</dt>
                <dd>{lotesRelatorio.join(" | ")}</dd>
              </div>
            )}
            {item.quantidade && !lotesQuantidades.length && (
              <div>
                <dt>Quantidade</dt>
                <dd>{item.quantidade}</dd>
              </div>
            )}
            {lotesQuantidades.length > 0 && (
              <div>
                <dt>Quantidade por lote</dt>
                <dd className="lot-quantities">
                  {lotesQuantidades.map((linha, index) => (
                    <span key={`${linha.lote}-${index}`}>
                      <b>{linha.lote || "-"}</b>
                      {linha.quantidade || "-"}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {item.placaVeiculo && (
              <div>
                <dt>Placa do veículo</dt>
                <dd>{item.placaVeiculo}</dd>
              </div>
            )}
            {!isLoadingReport && (
              <>
                <div>
                  <dt>Área / setor</dt>
                  <dd>{item.areaSetor || "-"}</dd>
                </div>
                <div>
                  <dt>{technicianResponsibleLabel}</dt>
                  <dd>{item.realizadoPor || "-"}</dd>
                </div>
              </>
            )}
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
      {editOpen && editForm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Editar relatório">
          <form className="modal-card edit-report-modal" onSubmit={saveEdit}>
            <div className="modal-head">
              <div>
                <p className="eyebrow">ADMIN</p>
                <h2>Editar relatório</h2>
              </div>
              <button className="modal-close" onClick={() => setEditOpen(false)} type="button">
                <AppleIcon name="close" size={20} />
              </button>
            </div>
            <div className="dynamic-grid">
              <label className="field">
                <span>Empresa</span>
                <input value={editForm.empresa} onChange={(e) => updateEditField("empresa", e.target.value)} />
              </label>
              <label className="field">
                <span>Data</span>
                <input type="date" value={editForm.dataTratamento} onChange={(e) => updateEditField("dataTratamento", e.target.value)} />
              </label>
              {!isLoadingReport && (
                <>
                  <label className="field">
                    <span>Unidade</span>
                    <SelectOrInput
                      value={editForm.unidadeCliente}
                      options={initialFieldOptions("entry.1721614377")}
                      onChange={(value) => updateEditField("unidadeCliente", value)}
                    />
                  </label>
                  <label className="field">
                    <span>Área / setor</span>
                    <SelectOrInput
                      value={editForm.areaSetor}
                      options={initialFieldOptions("entry.1994831449")}
                      onChange={(value) => updateEditField("areaSetor", value)}
                    />
                  </label>
                  <label className="field">
                    <span>{technicianResponsibleLabel}</span>
                    <SelectOrInput
                      value={editForm.realizadoPor}
                      options={initialFieldOptions("entry.558955180")}
                      onChange={(value) => updateEditField("realizadoPor", value)}
                    />
                  </label>
                </>
              )}
              {isLoadingReport && (
                <>
                  <label className="field">
                    <span>Cliente</span>
                    <input value={editForm.cliente} onChange={(e) => updateEditField("cliente", e.target.value)} />
                  </label>
                  <label className="field">
                    <span>Produto</span>
                    <input value={editForm.produto} onChange={(e) => updateEditField("produto", e.target.value)} />
                  </label>
                  <label className="field">
                    <span>Placa do veículo</span>
                    <input value={editForm.placaVeiculo} onChange={(e) => updateEditField("placaVeiculo", e.target.value.toUpperCase())} />
                  </label>
                </>
              )}
              {item.dataInicio && (
                <label className="field">
                  <span>Data início</span>
                  <input type="date" value={editForm.dataInicio} onChange={(e) => updateEditField("dataInicio", e.target.value)} />
                </label>
              )}
              {item.dataFim && (
                <label className="field">
                  <span>Data fim</span>
                  <input type="date" value={editForm.dataFim} onChange={(e) => updateEditField("dataFim", e.target.value)} />
                </label>
              )}
            </div>
            {isLoadingReport ? (
              <div className="edit-lots">
                <div className="modal-subhead">
                  <h3>Lotes e quantidades</h3>
                  <button
                    className="link"
                    type="button"
                    onClick={() =>
                      updateEditField("lotesQuantidades", [
                        ...editForm.lotesQuantidades,
                        { lote: "", quantidade: "" },
                      ])
                    }
                  >
                    + Adicionar lote
                  </button>
                </div>
                {editForm.lotesQuantidades.map((linha, index) => (
                  <div className="edit-lot-row" key={index}>
                    <label className="field">
                      <span>Lote {index + 1}</span>
                      <input value={linha.lote} onChange={(e) => updateEditLotQuantity(index, "lote", e.target.value)} />
                    </label>
                    <label className="field">
                      <span>Quantidade</span>
                      <input value={linha.quantidade} onChange={(e) => updateEditLotQuantity(index, "quantidade", e.target.value)} />
                    </label>
                    {editForm.lotesQuantidades.length > 1 && (
                      <button
                        className="remove-lote"
                        type="button"
                        onClick={() =>
                          updateEditField(
                            "lotesQuantidades",
                            editForm.lotesQuantidades.filter((_, linhaIndex) => linhaIndex !== index),
                          )
                        }
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : usesLots ? (
              <label className="field">
                <span>Lotes</span>
                <textarea rows="3" value={editForm.lotes} onChange={(e) => updateEditField("lotes", e.target.value)} />
              </label>
            ) : null}
            <div className="edit-data-fields">
              <div className="modal-subhead">
                <h3>Dados do serviço</h3>
              </div>
              {editForm.dadosCampos.length ? (
                <div className="edit-fixed-data-grid">
                  {editForm.dadosCampos.map((linha, index) => (
                    <label className="field" key={linha.key}>
                      <span>{linha.label}</span>
                      <ServiceDataValueField
                        line={linha}
                        index={index}
                        onChange={updateServiceDataField}
                      />
                    </label>
                  ))}
                </div>
              ) : (
                <p className="muted edit-empty">
                  Este controle não possui campos complementares fixos.
                </p>
              )}
            </div>
            <div className="edit-photos">
              <div className="modal-subhead">
                <h3>Evidências fotográficas</h3>
                <span className="muted">
                  {editForm.fotos.length} atual{editForm.fotos.length !== 1 && "is"}
                </span>
              </div>
              {editForm.fotos.length ? (
                <div className="edit-photo-list">
                  {editForm.fotos.map((foto, index) => (
                    <div
                      className={[
                        "edit-photo-item",
                        draggingPhotoIndex === index ? "is-dragging" : "",
                        dragOverPhotoIndex === index ? "is-drag-over" : "",
                        sortAnimationId ? "is-sorted" : "",
                      ].filter(Boolean).join(" ")}
                      data-photo-sort
                      data-sort-index={index}
                      draggable
                      key={`${photoKey(foto, index)}-${sortAnimationId}`}
                      onDragStart={(event) => {
                        setDraggingPhotoIndex(index);
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", String(index));
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                        setDragOverPhotoIndex(index);
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        reorderEditPhoto(draggingPhotoIndex, index);
                        setDraggingPhotoIndex(null);
                        setDragOverPhotoIndex(null);
                      }}
                      onDragEnd={() => {
                        setDraggingPhotoIndex(null);
                        setDragOverPhotoIndex(null);
                      }}
                    >
                      <button
                        className="drag-handle"
                        type="button"
                        aria-label={`Arrastar foto ${index + 1}`}
                        title="Arrastar para ordenar"
                        onPointerDown={(event) => startTouchPhotoSort(index, event)}
                        onPointerMove={moveTouchPhotoSort}
                        onPointerUp={finishTouchPhotoSort}
                        onPointerCancel={() => {
                          setDraggingPhotoIndex(null);
                          setDragOverPhotoIndex(null);
                        }}
                      >
                        ⋮⋮
                      </button>
                      <img
                        className="edit-photo-thumb"
                        src={foto.url}
                        alt={foto.nome || `Foto ${index + 1}`}
                      />
                      <div className="edit-photo-meta">
                        <span>{index + 1}. {foto.nome || `Foto ${index + 1}`}</span>
                        <small>Evidência atual</small>
                        <div className="photo-order-actions">
                          <button
                            type="button"
                            onClick={() => moveEditPhoto(index, -1)}
                            disabled={index === 0}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveEditPhoto(index, 1)}
                            disabled={index === editForm.fotos.length - 1}
                          >
                            ↓
                          </button>
                          <button
                            className="danger"
                            type="button"
                            onClick={() => removeEditPhoto(index)}
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="muted edit-empty">Nenhuma foto mantida no relatório.</p>
              )}
              <label className="dropzone edit-photo-dropzone">
                <b>Adicionar novas fotos</b>
                <span>JPG, PNG ou WebP - máximo 10 MB por foto</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={(event) =>
                    updateEditField("novosArquivos", [
                      ...editForm.novosArquivos,
                      ...Array.from(event.target.files || []),
                    ])
                  }
                />
              </label>
              {editForm.novosArquivos.length > 0 && (
                <div className="edit-new-file-list">
                  {editForm.novosArquivos.map((file, index) => (
                    <div
                      className={[
                        "edit-photo-item",
                        "edit-new-file-item",
                        draggingFileIndex === index ? "is-dragging" : "",
                        dragOverFileIndex === index ? "is-drag-over" : "",
                        sortAnimationId ? "is-sorted" : "",
                      ].filter(Boolean).join(" ")}
                      data-file-sort
                      data-sort-index={index}
                      draggable
                      key={`${fileKey(file, index)}-${sortAnimationId}`}
                      onDragStart={(event) => {
                        setDraggingFileIndex(index);
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", String(index));
                      }}
                      onDragOver={(event) => {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = "move";
                        setDragOverFileIndex(index);
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        reorderNewFile(draggingFileIndex, index);
                        setDraggingFileIndex(null);
                        setDragOverFileIndex(null);
                      }}
                      onDragEnd={() => {
                        setDraggingFileIndex(null);
                        setDragOverFileIndex(null);
                      }}
                    >
                      <button
                        className="drag-handle"
                        type="button"
                        aria-label={`Arrastar nova foto ${index + 1}`}
                        title="Arrastar para ordenar"
                        onPointerDown={(event) => startTouchFileSort(index, event)}
                        onPointerMove={moveTouchFileSort}
                        onPointerUp={finishTouchFileSort}
                        onPointerCancel={() => {
                          setDraggingFileIndex(null);
                          setDragOverFileIndex(null);
                        }}
                      >
                        ⋮⋮
                      </button>
                      <img
                        className="edit-photo-thumb"
                        src={newFilePreviews[fileKey(file, index)]}
                        alt={file.name}
                      />
                      <div className="edit-photo-meta">
                        <span>{editForm.fotos.length + index + 1}. {file.name}</span>
                        <small>Nova foto</small>
                        <div className="photo-order-actions">
                          <button
                            type="button"
                            onClick={() => moveNewFile(index, -1)}
                            disabled={index === 0}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveNewFile(index, 1)}
                            disabled={index === editForm.novosArquivos.length - 1}
                          >
                            ↓
                          </button>
                          <button
                            className="danger"
                            type="button"
                            onClick={() => removeNewFile(index)}
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editUploadProgress && (
                <p className="muted file-count">
                  Enviando fotos: {editUploadProgress.done}/{editUploadProgress.total}
                </p>
              )}
            </div>
            <div className="modal-actions">
              <button className="secondary" onClick={() => setEditOpen(false)} type="button" disabled={savingEdit}>
                Cancelar
              </button>
              <button className="primary" type="submit" disabled={savingEdit}>
                {savingEdit ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>
      )}
      {deleteOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Confirmar exclusão">
          <div className="modal-card confirm-delete-modal">
            <div className="modal-danger-icon">
              <AppleIcon name="close" size={22} />
            </div>
            <h2>Excluir relatório?</h2>
            <p>
              Esta ação remove o relatório {item.numeroOs || item.id} permanentemente.
              As fotos enviadas para o armazenamento não serão apagadas automaticamente.
            </p>
            <div className="modal-actions">
              <button className="secondary" onClick={() => setDeleteOpen(false)} type="button" disabled={deleting}>
                Cancelar
              </button>
              <button className="danger" onClick={confirmDelete} type="button" disabled={deleting}>
                {deleting ? "Excluindo..." : "Sim, excluir"}
              </button>
            </div>
          </div>
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
