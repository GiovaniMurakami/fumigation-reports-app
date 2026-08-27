import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Field } from "../components/Field";
import { FormSection } from "../components/FormSection";
import { Layout } from "../components/Layout";
import { DynamicField } from "../components/reports/DynamicField";
import { RepeatableNestFields } from "../components/reports/RepeatableNestFields";
import { RepeatableRodentFields } from "../components/reports/RepeatableRodentFields";
import { RepeatableTrapFields } from "../components/reports/RepeatableTrapFields";
import { formCatalog } from "../formTemplates";
import { formatValue, valueOf } from "../utils/formatters";
import {
  fieldLabel,
  getTrapRows,
  masterFieldIds,
  repeatableTrapSections,
  rodentStatusHelp,
  sanitizeField,
  shouldHideField,
} from "../utils/reportFields";

const initialReport = {
  empresa: "",
  assinaturaIds: [],
  dadosIniciais: {},
  dadosAtividade: {},
};

const fumigationStartDateId = "entry.1661451672";
const fumigationEndDateId = "entry.2031509747";

const dateToIso = (value) =>
  value ? new Date(`${value}T12:00:00`).toISOString() : undefined;

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

function FumigationLots({ values, onChange }) {
  const update = (index, value) =>
    onChange(
      values.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  const remove = (index) =>
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  return (
    <div className="lotes-fields">
      {values.map((lote, index) => (
        <div className="lote-row" key={index}>
          <Field
            label={`Lote ${index + 1}`}
            value={lote}
            onChange={(value) => update(index, value)}
            placeholder="Ex.: LT-2026-0842"
          />
          {values.length > 1 && (
            <button
              type="button"
              className="remove-lote"
              onClick={() => remove(index)}
              aria-label={`Remover lote ${index + 1}`}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="add-lote"
        onClick={() => onChange([...values, ""])}
      >
        ＋ Adicionar outro lote
      </button>
    </div>
  );
}

export function NewReport() {
  const { auth } = useAuth();
  const [form, setForm] = useState(initialReport);
  const [empresas, setEmpresas] = useState([]);
  const [cadastrosGlobais, setCadastrosGlobais] = useState({ assinaturas: [] });
  const [funcionarios, setFuncionarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [repeatableValues, setRepeatableValues] = useState({});
  const [fumigationLotes, setFumigationLotes] = useState([""]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const setInitial = (entryId, value) =>
    setForm({
      ...form,
      dadosIniciais: { ...form.dadosIniciais, [entryId]: value },
    });
  const setActivity = (entryId, value) =>
    setForm({
      ...form,
      dadosAtividade: { ...form.dadosAtividade, [entryId]: value },
    });
  const controle = valueOf(form.dadosIniciais, "entry.1424091944");
  const isLoadingReport = controle === "Carregamento";
  const sectionName = formCatalog.controlToSection[controle];
  const hasLotes = sectionName === "Fumigação" || sectionName === "Carregamento";
  const rawActivityFields = sectionName
    ? formCatalog.sections[sectionName] || []
    : [];
  const activityFields =
    sectionName === "Fumigação"
      ? []
      : rawActivityFields
          .filter((field) => !shouldHideField(field, sectionName))
          .map(sanitizeField);
  const trapRows = repeatableTrapSections.has(sectionName)
    ? getTrapRows(rawActivityFields)
    : [];
  const initialFields = formCatalog.initialFields.filter(
    (field) =>
      field.entryId !== "entry.2017707091" &&
      field.entryId !== "entry.1424091944" &&
      !masterFieldIds.has(field.entryId),
  );
  const dataValue = valueOf(form.dadosIniciais, "entry.1365655116");
  const userRole = auth?.usuario?.role;
  const userEmpresas = [
    ...new Set([
      ...(Array.isArray(auth?.usuario?.empresas) ? auth.usuario.empresas : []),
      auth?.usuario?.empresa,
    ].map((empresa) => empresa?.trim()).filter(Boolean)),
  ];
  const userEmpresa = userEmpresas.length === 1 ? userEmpresas[0] : "";
  const canWrite = userRole === "admin" || userRole === "funcionario";
  const empresaRelatorio = userEmpresa || form.empresa;
  const empresaSelecionada =
    empresas.find((empresa) => empresa.nome === empresaRelatorio) || null;

  useEffect(() => {
    if (userEmpresa && !form.empresa)
      setForm((current) => ({ ...current, empresa: userEmpresa }));
  }, [userEmpresa, form.empresa]);
  useEffect(() => {
    Promise.all([
      api.listarEmpresas(),
      api.obterCadastrosGlobais(),
      api.listarFuncionarios(),
      api.listarClientes(),
    ])
      .then(([empresasData, globaisData, funcionariosData, clientesData]) => {
        setEmpresas(empresasData.itens || []);
        setCadastrosGlobais(globaisData.cadastro || { assinaturas: [] });
        setFuncionarios(funcionariosData.itens || []);
        setClientes(clientesData.itens || []);
      })
      .catch(() => {
        setEmpresas([]);
        setCadastrosGlobais({ assinaturas: [] });
        setFuncionarios([]);
        setClientes([]);
      });
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!empresaRelatorio) {
      setError("Selecione a empresa do relatório.");
      return;
    }
    if (!canWrite) {
      setError("Seu perfil possui apenas permissão de leitura.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const baseFields = Object.fromEntries(
        initialFields
          .map((field) => [
            fieldLabel(field),
            valueOf(form.dadosIniciais, field.entryId),
          ])
          .filter(([, value]) => value),
      );
      const activityValues = { ...form.dadosAtividade };
      const dados = Object.fromEntries(
        activityFields
          .map((field) => [
            fieldLabel(field),
            formatValue(activityValues[field.entryId]),
          ])
          .filter(([, value]) => value),
      );
      if (
        sectionName === "Captura de pombos" &&
        valueOf(form.dadosAtividade, "captura_pombos_quantidade")
      )
        dados["Quantidade capturado"] = valueOf(
          form.dadosAtividade,
          "captura_pombos_quantidade",
        );
      const repeatableDados = repeatableTrapSections.has(sectionName)
        ? {
            [sectionName]: (repeatableValues[sectionName] || [])
              .map((item, index) => ({ Item: index + 1, ...item }))
              .filter((item) =>
                Object.entries(item).some(
                  ([key, value]) => key !== "Item" && formatValue(value),
                ),
              ),
          }
        : {};
      const nestDados =
        sectionName === "Captura de ninhos"
          ? {
              "Captura de ninhos": (repeatableValues[sectionName] || [])
                .map((item, index) => ({ Item: index + 1, ...item }))
                .filter((item) =>
                  Object.entries(item).some(
                    ([key, value]) => key !== "Item" && formatValue(value),
                  ),
                ),
            }
          : {};
      const rodentDados =
        sectionName === "Isca roedores - Ratol / GS"
          ? {
              "Isca roedores": (repeatableValues[sectionName] || [])
                .map((item, index) => ({ Ponto: index + 1, ...item }))
                .filter((item) =>
                  Object.entries(item).some(
                    ([key, value]) => key !== "Ponto" && formatValue(value),
                  ),
                ),
            }
          : {};
      if (files.length) setUploadProgress({ done: 0, total: files.length });
      const fotos = await uploadFiles(files, (done) =>
        setUploadProgress({ done, total: files.length }),
      );
      const dataTratamento = dateToIso(dataValue) || new Date().toISOString();
      const dataInicio =
        controle === "Fumigação"
          ? dateToIso(valueOf(form.dadosAtividade, fumigationStartDateId))
          : undefined;
      const dataFim =
        controle === "Fumigação"
          ? dateToIso(valueOf(form.dadosAtividade, fumigationEndDateId))
          : undefined;
      const lotesRelatorio = hasLotes
        ? fumigationLotes.map((lote) => lote.trim()).filter(Boolean)
        : [];
      const item = await api.criar({
        empresa: empresaRelatorio,
        assinaturaIds: form.assinaturaIds,
        cliente:
          controle === "Carregamento"
            ? valueOf(form.dadosAtividade, "carregamento_cliente")
            : undefined,
        produto:
          controle === "Carregamento"
            ? valueOf(form.dadosAtividade, "carregamento_produto")
            : undefined,
        quantidade:
          controle === "Carregamento"
            ? valueOf(form.dadosAtividade, "carregamento_quantidade")
            : undefined,
        placaVeiculo:
          controle === "Carregamento"
            ? valueOf(form.dadosAtividade, "carregamento_placa_veiculo")
            : undefined,
        dataTratamento,
        dataInicio,
        dataFim,
        lotes: hasLotes ? lotesRelatorio : undefined,
        formularioTitulo: formCatalog.formTitle,
        unidadeCliente: isLoadingReport
          ? undefined
          : valueOf(form.dadosIniciais, "entry.1721614377"),
        areaSetor: isLoadingReport
          ? undefined
          : valueOf(form.dadosIniciais, "entry.1994831449"),
        tipoControle: controle,
        realizadoPor: isLoadingReport
          ? undefined
          : valueOf(form.dadosIniciais, "entry.558955180"),
        dados: {
          ...baseFields,
          ...dados,
          ...repeatableDados,
          ...nestDados,
          ...rodentDados,
          ...(hasLotes
            ? {
                Lotes: lotesRelatorio,
              }
            : {}),
          ...(controle === "Carregamento"
            ? {
                Cliente: valueOf(form.dadosAtividade, "carregamento_cliente"),
                Produto: valueOf(form.dadosAtividade, "carregamento_produto"),
                Quantidade: valueOf(form.dadosAtividade, "carregamento_quantidade"),
                "Placa do veículo": valueOf(form.dadosAtividade, "carregamento_placa_veiculo"),
              }
            : {}),
        },
        fotos,
      });
      navigate(`/relatorios/${item.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      setUploadProgress(null);
    }
  }

  if (!canWrite)
    return (
      <Layout>
        <button className="back" onClick={() => navigate("/")}>
          ← Voltar aos relatórios
        </button>
        <div className="empty">
          <b>Permissão somente leitura</b>
          <span>Seu usuário não pode cadastrar relatórios.</span>
        </div>
      </Layout>
    );
  return (
    <Layout>
      <button className="back" onClick={() => navigate("/")}>
        ← Voltar aos relatórios
      </button>
      <div className="form-heading">
        <p className="eyebrow">NOVO REGISTRO</p>
        <h1>Registro de controle de pragas</h1>
        <p>
          A O.S. será gerada automaticamente ao salvar no padrão OS-DDMMAA/001.
        </p>
      </div>
      <form className="report-form" onSubmit={submit}>
        <FormSection number="01" title="Empresa e controle">
          <div className="dynamic-grid">
            <label className="field">
              <span>Empresa</span>
              <select
                value={form.empresa}
                required
                disabled={Boolean(userEmpresa)}
                onChange={(e) =>
                  setForm({ ...form, empresa: e.target.value, assinaturaIds: [] })
                }
              >
                <option value="">Selecione</option>
                {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.nome}>
                    {empresa.nome}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Controle *</span>
              <select
                value={controle}
                required
                onChange={(e) => setInitial("entry.1424091944", e.target.value)}
              >
                <option value="">Selecione</option>
                {formCatalog.controlOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </FormSection>
        {controle && (
          <FormSection number="02" title="Identificação">
            <div className="dynamic-grid">
              {!isLoadingReport && (
                <>
                  <label className="field">
                    <span>Unidade / Cliente</span>
                    <select
                      value={valueOf(form.dadosIniciais, "entry.1721614377")}
                      onChange={(e) => setInitial("entry.1721614377", e.target.value)}
                    >
                      <option value="">Selecione</option>
                      {(empresaSelecionada?.unidades || []).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span>Área / setor</span>
                    <select
                      value={valueOf(form.dadosIniciais, "entry.1994831449")}
                      onChange={(e) => setInitial("entry.1994831449", e.target.value)}
                    >
                      <option value="">Selecione</option>
                      {(empresaSelecionada?.areasSetores || []).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span>Realizado por</span>
                    <select
                      value={valueOf(form.dadosIniciais, "entry.558955180")}
                      onChange={(e) => setInitial("entry.558955180", e.target.value)}
                    >
                      <option value="">Selecione</option>
                      {funcionarios.map((funcionario) => (
                        <option key={funcionario.id} value={funcionario.nome}>
                          {funcionario.nome}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}
              {initialFields.map((field) => (
                <DynamicField
                  key={field.entryId}
                  field={field}
                  value={valueOf(form.dadosIniciais, field.entryId)}
                  onChange={setInitial}
                  withToday={field.entryId === "entry.1365655116"}
                />
              ))}
              {cadastrosGlobais.assinaturas?.length > 0 && (
                <fieldset className="signature-picker">
                  <legend>Assinaturas no PDF</legend>
                  <p>Selecione quem deve aparecer no documento.</p>
                  <div className="signature-options">
                    {cadastrosGlobais.assinaturas.map((assinatura) => (
                      <label
                        className={`signature-option${
                          form.assinaturaIds.includes(assinatura.id)
                            ? " selected"
                            : ""
                        }`}
                        key={assinatura.id}
                      >
                        <input
                          type="checkbox"
                          checked={form.assinaturaIds.includes(assinatura.id)}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              assinaturaIds: event.target.checked
                                ? [...current.assinaturaIds, assinatura.id]
                                : current.assinaturaIds.filter(
                                    (id) => id !== assinatura.id,
                                  ),
                            }))
                          }
                        />
                        <span className="signature-check" aria-hidden="true">
                          ?
                        </span>
                        <span className="signature-option-copy">
                          <b>{assinatura.nome}</b>
                          <small>{assinatura.cargo || "Assinante"}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          </FormSection>
        )}
        {controle && (
          <FormSection number="03" title={sectionName || controle}>
            {hasLotes && (
              <FumigationLots
                values={fumigationLotes}
                onChange={setFumigationLotes}
              />
            )}
            {sectionName === "Fumigação" && (
              <>
                <div className="dynamic-grid">
                  <Field
                    label="Data início"
                    type="date"
                    value={valueOf(form.dadosAtividade, fumigationStartDateId)}
                    onChange={(value) =>
                      setActivity(fumigationStartDateId, value)
                    }
                  />
                  <Field
                    label="Data fim"
                    type="date"
                    value={valueOf(form.dadosAtividade, fumigationEndDateId)}
                    onChange={(value) => setActivity(fumigationEndDateId, value)}
                  />
                </div>
              </>
            )}
            {sectionName === "Isca roedores - Ratol / GS" && (
              <div className="field-help">
                {rodentStatusHelp.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            )}
            {sectionName === "Carregamento" && (
              <div className="dynamic-grid">
                <label className="field">
                  <span>Cliente</span>
                  <select
                    value={valueOf(form.dadosAtividade, "carregamento_cliente")}
                    onChange={(e) => setActivity("carregamento_cliente", e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.nome}>
                        {cliente.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <Field
                  label="Produto"
                  value={valueOf(form.dadosAtividade, "carregamento_produto")}
                  onChange={(value) => setActivity("carregamento_produto", value)}
                />
                <Field
                  label="Quantidade"
                  value={valueOf(form.dadosAtividade, "carregamento_quantidade")}
                  onChange={(value) => setActivity("carregamento_quantidade", value)}
                  placeholder="Ex.: 24.000 kg"
                />
                <Field
                  label="Placa do veículo"
                  value={valueOf(form.dadosAtividade, "carregamento_placa_veiculo")}
                  onChange={(value) => setActivity("carregamento_placa_veiculo", value.toUpperCase())}
                  placeholder="Ex.: ABC1D23"
                />
              </div>
            )}
            <div className="dynamic-grid">
              {activityFields.map((field) => (
                <DynamicField
                  key={field.entryId}
                  field={field}
                  value={valueOf(form.dadosAtividade, field.entryId)}
                  onChange={setActivity}
                />
              ))}
              {sectionName === "Captura de pombos" && (
                <Field
                  label="Quantidade capturado"
                  value={valueOf(
                    form.dadosAtividade,
                    "captura_pombos_quantidade",
                  )}
                  onChange={(value) =>
                    setActivity("captura_pombos_quantidade", value)
                  }
                />
              )}
            </div>
            {sectionName === "Captura de ninhos" && (
              <RepeatableNestFields
                values={repeatableValues[sectionName] || [{}]}
                onChange={(items) =>
                  setRepeatableValues({
                    ...repeatableValues,
                    [sectionName]: items,
                  })
                }
              />
            )}
            {sectionName === "Isca roedores - Ratol / GS" && (
              <RepeatableRodentFields
                values={repeatableValues[sectionName] || [{}]}
                onChange={(items) =>
                  setRepeatableValues({
                    ...repeatableValues,
                    [sectionName]: items,
                  })
                }
              />
            )}
            {trapRows.length > 0 && (
              <RepeatableTrapFields
                sectionName={sectionName}
                rows={trapRows}
                values={repeatableValues[sectionName] || [{}]}
                onChange={(items) =>
                  setRepeatableValues({
                    ...repeatableValues,
                    [sectionName]: items,
                  })
                }
              />
            )}
          </FormSection>
        )}
        {controle && (
          <FormSection number="04" title="Evidências fotográficas">
            <label className="dropzone">
              <b>Evidências fotográficas</b>
              <span>JPG, PNG ou WebP • máximo 10 MB por foto</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
              />
            </label>
            {files.length > 0 && (
              <>
                <p className="muted file-count">
                  {files.length} foto{files.length !== 1 ? "s" : ""} selecionada
                  {files.length !== 1 ? "s" : ""}
                </p>
                <div className="file-list">
                  {files.map((file, index) => (
                    <span key={`${file.name}-${file.size}-${file.lastModified}-${index}`}>
                      {file.name}
                    </span>
                  ))}
                </div>
              </>
            )}
            {uploadProgress && (
              <div className="notice">
                Enviando fotos: {uploadProgress.done}/{uploadProgress.total}
              </div>
            )}
          </FormSection>
        )}
        {error && <div className="error">{error}</div>}
        <div className="form-actions">
          <button
            type="button"
            className="secondary"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
          <button className="primary" disabled={busy}>
            {busy ? "Salvando relatório…" : "Salvar relatório"}
          </button>
        </div>
      </form>
    </Layout>
  );
}
