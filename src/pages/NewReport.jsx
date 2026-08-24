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
import { fieldLabel, getTrapRows, masterFieldIds, repeatableTrapSections, rodentStatusHelp, sanitizeField, shouldHideField } from "../utils/reportFields";

const initialReport = { empresa: "", assinaturaIds: [], dadosIniciais: {}, dadosAtividade: {} };

function FumigationLots({ values, onChange }) {
  const update = (index, value) => onChange(values.map((item, itemIndex) => itemIndex === index ? value : item));
  const remove = index => onChange(values.filter((_, itemIndex) => itemIndex !== index));
  return <div className="lotes-fields">{values.map((lote, index) => <div className="lote-row" key={index}><Field label={`Lote ${index + 1} *`} value={lote} onChange={value => update(index, value)} placeholder="Ex.: LT-2026-0842" required />{values.length > 1 && <button type="button" className="remove-lote" onClick={() => remove(index)} aria-label={`Remover lote ${index + 1}`}>×</button>}</div>)}<button type="button" className="add-lote" onClick={() => onChange([...values, ""])}>＋ Adicionar outro lote</button></div>;
}

export function NewReport() {
  const { auth } = useAuth();
  const [form, setForm] = useState(initialReport);
  const [empresas, setEmpresas] = useState([]);
  const [cadastrosGlobais, setCadastrosGlobais] = useState({ assinaturas: [] });
  const [funcionarios, setFuncionarios] = useState([]);
  const [files, setFiles] = useState([]);
  const [repeatableValues, setRepeatableValues] = useState({});
  const [fumigationLotes, setFumigationLotes] = useState([""]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const setInitial = (entryId, value) => setForm({ ...form, dadosIniciais: { ...form.dadosIniciais, [entryId]: value } });
  const setActivity = (entryId, value) => setForm({ ...form, dadosAtividade: { ...form.dadosAtividade, [entryId]: value } });
  const controle = valueOf(form.dadosIniciais, "entry.1424091944");
  const sectionName = formCatalog.controlToSection[controle];
  const rawActivityFields = sectionName ? formCatalog.sections[sectionName] || [] : [];
  const activityFields = sectionName === "Fumigação" ? [] : rawActivityFields.filter(field => !shouldHideField(field, sectionName)).map(sanitizeField);
  const trapRows = repeatableTrapSections.has(sectionName) ? getTrapRows(rawActivityFields) : [];
  const initialFields = formCatalog.initialFields.filter(field => field.entryId !== "entry.2017707091" && !masterFieldIds.has(field.entryId));
  const dataValue = valueOf(form.dadosIniciais, "entry.1365655116");
  const userRole = auth?.usuario?.role;
  const userEmpresa = auth?.usuario?.empresa || "";
  const isGlobalAdmin = userRole === "admin" && !userEmpresa;
  const canWrite = isGlobalAdmin || (Boolean(userEmpresa) && (userRole === "admin" || userRole === "funcionario"));
  const empresaRelatorio = userEmpresa || form.empresa;
  const empresaSelecionada = empresas.find(empresa => empresa.nome === empresaRelatorio) || null;

  useEffect(() => {
    if (userEmpresa && !form.empresa) setForm(current => ({ ...current, empresa: userEmpresa }));
  }, [userEmpresa, form.empresa]);
  useEffect(() => {
    Promise.all([api.listarEmpresas(), api.obterCadastrosGlobais(), api.listarFuncionarios()])
      .then(([empresasData, globaisData, funcionariosData]) => {
        setEmpresas(empresasData.itens || []);
        setCadastrosGlobais(globaisData.cadastro || { assinaturas: [] });
        setFuncionarios(funcionariosData.itens || []);
      })
      .catch(() => {
        setEmpresas([]);
        setCadastrosGlobais({ assinaturas: [] });
        setFuncionarios([]);
      });
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!empresaRelatorio) { setError("Selecione a empresa do relatório."); return; }
    if (!canWrite) { setError("Seu perfil possui apenas permissão de leitura."); return; }
    if (controle === "Fumigação" && !files.length) { setError("Selecione ao menos uma foto como evidência."); return; }
    setBusy(true);
    setError("");
    try {
      const baseFields = Object.fromEntries(initialFields.map(field => [fieldLabel(field), valueOf(form.dadosIniciais, field.entryId)]).filter(([, value]) => value));
      const activityValues = { ...form.dadosAtividade };
      const dados = Object.fromEntries(activityFields.map(field => [fieldLabel(field), formatValue(activityValues[field.entryId])]).filter(([, value]) => value));
      if (sectionName === "Captura de pombos" && valueOf(form.dadosAtividade, "captura_pombos_quantidade")) dados["Quantidade capturado"] = valueOf(form.dadosAtividade, "captura_pombos_quantidade");
      const repeatableDados = repeatableTrapSections.has(sectionName) ? { [sectionName]: (repeatableValues[sectionName] || []).map((item, index) => ({ Item: index + 1, ...item })).filter(item => Object.entries(item).some(([key, value]) => key !== "Item" && formatValue(value))) } : {};
      const nestDados = sectionName === "Captura de ninhos" ? { "Captura de ninhos": (repeatableValues[sectionName] || []).map((item, index) => ({ Item: index + 1, ...item })).filter(item => Object.entries(item).some(([key, value]) => key !== "Item" && formatValue(value))) } : {};
      const rodentDados = sectionName === "Isca roedores - Ratol / GS" ? { "Isca roedores": (repeatableValues[sectionName] || []).map((item, index) => ({ Ponto: index + 1, ...item })).filter(item => Object.entries(item).some(([key, value]) => key !== "Ponto" && formatValue(value))) } : {};
      const fotos = await Promise.all(files.map(api.upload));
      const dataTratamento = dataValue ? new Date(`${dataValue}T12:00:00`).toISOString() : new Date().toISOString();
      const item = await api.criar({
        empresa: empresaRelatorio,
        assinaturaIds: form.assinaturaIds,
        dataTratamento,
        lotes: controle === "Fumigação" ? fumigationLotes.map(lote => lote.trim()).filter(Boolean) : undefined,
        formularioTitulo: formCatalog.formTitle,
        unidadeCliente: valueOf(form.dadosIniciais, "entry.1721614377"),
        areaSetor: valueOf(form.dadosIniciais, "entry.1994831449"),
        tipoControle: controle,
        realizadoPor: valueOf(form.dadosIniciais, "entry.558955180"),
        dados: { ...baseFields, ...dados, ...repeatableDados, ...nestDados, ...rodentDados, ...(controle === "Fumigação" ? { Lotes: fumigationLotes.map(lote => lote.trim()).filter(Boolean) } : {}) },
        fotos,
      });
      navigate(`/relatorios/${item.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!userEmpresa && !isGlobalAdmin) return <Layout><button className="back" onClick={() => navigate("/")}>← Voltar aos relatórios</button><div className="empty"><b>Empresa não vinculada</b><span>Associe este usuário a uma empresa antes de cadastrar relatórios.</span></div></Layout>;
  if (!canWrite) return <Layout><button className="back" onClick={() => navigate("/")}>← Voltar aos relatórios</button><div className="empty"><b>Permissão somente leitura</b><span>Seu usuário não pode cadastrar relatórios.</span></div></Layout>;
  return <Layout><button className="back" onClick={() => navigate("/")}>← Voltar aos relatórios</button><div className="form-heading"><p className="eyebrow">NOVO REGISTRO</p><h1>Registro de controle de pragas</h1><p>A O.S. será gerada automaticamente ao salvar no padrão OS-DDMMAA/001.</p></div><form className="report-form" onSubmit={submit}><FormSection number="01" title="Empresa"><label className="field"><span>Empresa</span><select value={form.empresa} required disabled={Boolean(userEmpresa)} onChange={e => setForm({ ...form, empresa: e.target.value, assinaturaIds: [] })}><option value="">Selecione</option>{empresas.map(empresa => <option key={empresa.id} value={empresa.nome}>{empresa.nome}</option>)}</select></label></FormSection><FormSection number="02" title="Identificação"><div className="dynamic-grid"><label className="field"><span>Unidade / Cliente *</span><select value={valueOf(form.dadosIniciais, "entry.1721614377")} required onChange={e => setInitial("entry.1721614377", e.target.value)}><option value="">Selecione</option>{(empresaSelecionada?.unidades || []).map(item => <option key={item} value={item}>{item}</option>)}</select></label><label className="field"><span>Área / setor</span><select value={valueOf(form.dadosIniciais, "entry.1994831449")} onChange={e => setInitial("entry.1994831449", e.target.value)}><option value="">Selecione</option>{(empresaSelecionada?.areasSetores || []).map(item => <option key={item} value={item}>{item}</option>)}</select></label><label className="field"><span>Realizado por</span><select value={valueOf(form.dadosIniciais, "entry.558955180")} onChange={e => setInitial("entry.558955180", e.target.value)}><option value="">Selecione</option>{funcionarios.map(funcionario => <option key={funcionario.id} value={funcionario.nome}>{funcionario.nome}</option>)}</select></label>{cadastrosGlobais.assinaturas?.length > 0 && <label className="field"><span>Assinaturas no PDF</span><div className="checks">{cadastrosGlobais.assinaturas.map(assinatura => <label key={assinatura.id}><input type="checkbox" checked={form.assinaturaIds.includes(assinatura.id)} onChange={e => setForm({ ...form, assinaturaIds: e.target.checked ? [...form.assinaturaIds, assinatura.id] : form.assinaturaIds.filter(id => id !== assinatura.id) })}/>{assinatura.nome}</label>)}</div></label>}</div>{initialFields.map(field => <DynamicField key={field.entryId} field={field} value={valueOf(form.dadosIniciais, field.entryId)} onChange={setInitial} required={field.required || field.entryId === "entry.1424091944" || field.entryId === "entry.1365655116"} />)}</FormSection>{controle && <FormSection number="03" title={sectionName || controle}>{sectionName === "Fumigação" && <FumigationLots values={fumigationLotes} onChange={setFumigationLotes} />}{sectionName === "Isca roedores - Ratol / GS" && <div className="field-help">{rodentStatusHelp.map(line => <span key={line}>{line}</span>)}</div>}<div className="dynamic-grid">{activityFields.map(field => <DynamicField key={field.entryId} field={field} value={valueOf(form.dadosAtividade, field.entryId)} onChange={setActivity} />)}{sectionName === "Captura de pombos" && <Field label="Quantidade capturado" value={valueOf(form.dadosAtividade, "captura_pombos_quantidade")} onChange={value => setActivity("captura_pombos_quantidade", value)} />}</div>{sectionName === "Captura de ninhos" && <RepeatableNestFields values={repeatableValues[sectionName] || [{}]} onChange={(items) => setRepeatableValues({ ...repeatableValues, [sectionName]: items })} />}{sectionName === "Isca roedores - Ratol / GS" && <RepeatableRodentFields values={repeatableValues[sectionName] || [{}]} onChange={(items) => setRepeatableValues({ ...repeatableValues, [sectionName]: items })} />}{trapRows.length > 0 && <RepeatableTrapFields sectionName={sectionName} rows={trapRows} values={repeatableValues[sectionName] || [{}]} onChange={(items) => setRepeatableValues({ ...repeatableValues, [sectionName]: items })} />}</FormSection>}<FormSection number="04" title="Evidências fotográficas"><label className="dropzone"><b>Evidências fotográficas</b><span>JPG, PNG ou WebP • máximo 10 MB por foto</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => setFiles(Array.from(e.target.files).slice(0, 12))}/></label>{files.length > 0 && <div className="file-list">{files.map(file => <span key={file.name}>{file.name}</span>)}</div>}</FormSection>{error && <div className="error">{error}</div>}<div className="form-actions"><button type="button" className="secondary" onClick={() => navigate("/")}>Cancelar</button><button className="primary" disabled={busy}>{busy ? "Salvando relatório…" : "Salvar relatório"}</button></div></form></Layout>;
}
