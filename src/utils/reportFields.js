export const rodentStatusHelp = [
  "CO - Consumido: quando houve o consumo",
  "DE - Desgastado: quando a placa sofreu desgaste natural",
  "AU - Ausente: quando houve extravio ou subtração da isca/placa",
  "OB - Obstruído: quando não é possível alcançar o local da placa de captura",
  "IN - Intacto: quando não há captura e a placa permanece como da última vistoria",
];

export const repeatableTrapSections = new Set([
  "Armadilhas luminosas ",
  "Armadilhas feromônio - Coleópterus",
  "Armadilhas feromônio - Lepdópteros",
]);

export const masterFieldIds = new Set(["entry.1721614377", "entry.1994831449", "entry.558955180"]);
export const nestRemovalOptions = ["Apenas remoção", "Repelente Thursan"];
export const rodentStatusOptions = ["CO - Consumido", "DE - Desgastado", "AU - Ausente", "OB - Obstruído", "IN - Intacto"];

export const fieldLabel = (field) => {
  if (field.label && field.row) return `${field.label} - ${field.row}`;
  if (field.label) return field.label;
  if (field.row) return field.row;
  if (field.options?.includes("Enviar OS")) return "Encaminhamento";
  return field.entryId;
};

export const isNestCaptureDetail = (field) => {
  const label = field.label || "";
  return label.startsWith("Início de intervalo")
    || label.startsWith("Fim de intervalo")
    || label === "Remoção de ninhos"
    || label === "Quantidade de ninhos removidos"
    || label === "Quantidade Ovos"
    || label === "Quantidade Filhotes"
    || label.trim() === "Observação";
};

export const isRodentBaitPoint = (field) => field.section === "Isca roedores - Ratol / GS"
  && field.type === "grade_multipla_escolha"
  && /^\d+$/.test(field.row || "");

export const shouldHideField = (field, sectionName) => {
  const label = field.label || "";
  if (field.type === "upload_arquivo") return true;
  if (sectionName === "Captura de pombos" && label.startsWith("Início de intervalo")) return true;
  if (sectionName === "Captura de pombos" && label.startsWith("Fim de intervalo")) return true;
  if (sectionName === "Captura de pombos" && label === "Quantidade capturado") return true;
  if (sectionName === "Captura de ninhos" && isNestCaptureDetail(field)) return true;
  if (sectionName === "Isca roedores - Ratol / GS" && isRodentBaitPoint(field)) return true;
  if (field.options?.includes("Finalizar registro") && field.options?.includes("Complementar o registro")) return true;
  if (label.includes("Adicionar captura de ninhos") || label.includes("Adicionar captura de pombos")) return true;
  if (label === "Registro ultimo porta isca") return true;
  if (repeatableTrapSections.has(sectionName) && /^Isca \d+$/i.test(label)) return true;
  return false;
};

export const sanitizeField = (field) => {
  if (field.description?.includes("CO - Consumido")) return { ...field, description: null };
  return field;
};

export const getTrapRows = (fields) => {
  const rows = [];
  for (const field of fields) {
    if (!/^Isca \d+$/i.test(field.label || "") || !field.row) continue;
    if (!rows.some(row => row.name === field.row)) rows.push({ name: field.row, options: field.options });
  }
  return rows;
};
