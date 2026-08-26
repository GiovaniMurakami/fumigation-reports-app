import { jsPDF } from "jspdf";
import { apiBaseUrl } from "../api";

const colors = { dark: [10, 46, 24], green: [21, 99, 50], lime: [168, 214, 58], text: [24, 49, 44], muted: [100, 116, 139], line: [220, 232, 223], light: [246, 250, 247] };
const page = { width: 210, height: 297, margin: 15, content: 180, footer: 282 };

const titleByType = {
  "Captura de pombos": "RELATÓRIO DE CAPTURA DE POMBOS",
  "Retirada de ninhos": "RELATÓRIO DE RETIRADA DE NINHOS, OVOS E FILHOTES",
  "Isca roedores - Ratol / GS": "RELATÓRIO DE ISCAS PARA ROEDORES",
  "Armadilhas luminósas": "RELATÓRIO DE ARMADILHAS LUMINOSAS",
  "Arm. Feromônio - Coleopterus": "RELATÓRIO DE ARMADILHAS FEROMÔNIO - COLEÓPTERUS",
  "Arm. Feromônio - Epdópterus": "RELATÓRIO DE ARMADILHAS FEROMÔNIO - LEPDÓPTEROS",
  "Pulverização Manual": "RELATÓRIO DE REALIZAÇÃO DE SERVIÇO DE PULVERIZAÇÃO",
  "Pulverização Mecanizada": "RELATÓRIO DE REALIZAÇÃO DE SERVIÇO DE PULVERIZAÇÃO MECANIZADA",
  "Fumigação": "RELATÓRIO DE FUMIGAÇÃO",
  "Termonebulização": "RELATÓRIO DE TERMONEBULIZAÇÃO",
  "Limpeza de armazém": "RELATÓRIO DE LIMPEZA DE ARMAZÉM",
  "Serviços de manutenção": "RELATÓRIO DE SERVIÇO DE MANUTENÇÃO",
};

const textValue = value => {
  if (value == null || value === "") return "";
  if (Array.isArray(value)) return value.map(textValue).filter(Boolean).join(" • ");
  if (typeof value === "object") return Object.entries(value).map(([key, item]) => `${key}: ${textValue(item)}`).filter(Boolean).join("; ");
  return String(value);
};

const formatDate = value => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? textValue(value) : new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date);
};

const formatDateOnly = value => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? textValue(value) : new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(date);
};

const isS3Url = url => {
  try { return /\.s3(?:[.-][a-z0-9-]+)?\.amazonaws\.com$/i.test(new URL(url, window.location.origin).hostname); }
  catch { return false; }
};

const blobToDataUrl = blob => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(blob);
});

const fetchImage = async url => {
  const response = await fetch(url, { mode: "cors", credentials: "omit", cache: "no-store", headers: { Accept: "image/*" } });
  if (!response.ok) throw new Error(`Imagem indisponível (${response.status}).`);
  const blob = await response.blob();
  if (!blob.type.startsWith("image/")) throw new Error("O recurso retornado não é uma imagem.");
  return blobToDataUrl(blob);
};

const fetchDataUrl = async url => {
  if (!url) return null;
  const absoluteUrl = new URL(url, window.location.origin).toString();
  const candidates = isS3Url(absoluteUrl) && apiBaseUrl
    ? [`${apiBaseUrl}/imagens/proxy?url=${encodeURIComponent(absoluteUrl)}`, absoluteUrl]
    : [absoluteUrl];
  for (const candidate of candidates) {
    try { return await fetchImage(candidate); } catch { /* tenta a próxima origem */ }
  }
  return null;
};

const sectionTitle = (doc, title, y) => {
  doc.setTextColor(...colors.green).setFont("helvetica", "bold").setFontSize(8).text(title.toUpperCase(), page.margin, y);
  doc.setDrawColor(...colors.line).line(page.margin, y + 3, page.width - page.margin, y + 3);
  return y + 8;
};

const header = (doc, title, identifier, logo) => {
  doc.setFillColor(...colors.dark).rect(0, 0, page.width, 32, "F");
  doc.setFillColor(...colors.lime).rect(0, 30.5, page.width, 1.5, "F");
  if (logo) try { doc.addImage(logo, "PNG", page.margin, 5, 20, 20, undefined, "FAST"); } catch { /* mantém nome da marca */ }
  doc.setTextColor(255, 255, 255).setFont("helvetica", "bold").setFontSize(13);
  doc.text(doc.splitTextToSize(title, 125), 40, 10);
  doc.setTextColor(220, 232, 223).setFont("helvetica", "normal").setFontSize(7).text("BIOSAFE PEST  •  SERVIÇOS SANITÁRIOS", 40, 23);
  if (identifier) {
    const badge = { x: 158, y: 18, width: 37, height: 9 };
    doc.setFillColor(...colors.green).roundedRect(badge.x, badge.y, badge.width, badge.height, 2, 2, "F");
    doc.setTextColor(255, 255, 255).setFont("helvetica", "bold").setFontSize(6);
    doc.text(textValue(identifier), badge.x + badge.width / 2, badge.y + badge.height / 2, { align: "center", baseline: "middle", maxWidth: badge.width - 5 });
  }
};

const identification = (doc, item, startY) => {
  const fields = [
    ["EMPRESA", item.empresa],
    ["CLIENTE / UNIDADE", item.unidadeCliente || item.formularioTitulo],
    ["ÁREA / SETOR", item.areaSetor],
    ["REALIZADO POR", item.realizadoPor],
    ["DATA", formatDate(item.dataTratamento)],
    ["TIPO DE CONTROLE", item.tipoControle],
    ...(item.dataInicio ? [["DATA INÍCIO", formatDateOnly(item.dataInicio)]] : []),
    ...(item.dataFim ? [["DATA FIM", formatDateOnly(item.dataFim)]] : []),
  ];
  let y = startY;
  for (let row = 0; row < Math.ceil(fields.length / 3); row += 1) {
    const rowFields = fields.slice(row * 3, row * 3 + 3);
    doc.setFont("helvetica", "bold").setFontSize(7);
    const heights = rowFields.map(([, value]) => Math.max(16, 10 + doc.splitTextToSize(textValue(value) || "-", 50).length * 3.2));
    const height = Math.max(...heights);
    rowFields.forEach(([label, value], column) => {
      const x = page.margin + column * 61;
      doc.setFillColor(...colors.light).setDrawColor(...colors.line).roundedRect(x, y, 58, height, 1.5, 1.5, "FD");
      doc.setTextColor(...colors.muted).setFont("helvetica", "bold").setFontSize(5.5).text(label, x + 3, y + 4);
      doc.setTextColor(...colors.text).setFontSize(7).text(doc.splitTextToSize(textValue(value) || "-", 51), x + 3, y + 9);
    });
    y += height + 2;
  }
  return y + 2;
};

const measureData = (doc, entries, fontSize) => {
  const rows = [];
  for (let index = 0; index < entries.length; index += 2) {
    const height = Math.max(...entries.slice(index, index + 2).map(entry => {
      doc.setFont("helvetica", "bold").setFontSize(Math.max(3, fontSize - 1));
      const labelHeight = doc.splitTextToSize(entry.key.toUpperCase(), 86).length * fontSize * 0.38;
      doc.setFont("helvetica", "normal").setFontSize(fontSize);
      const valueHeight = doc.splitTextToSize(entry.value, 86).length * fontSize * 0.38;
      return labelHeight + valueHeight + 3;
    }));
    rows.push(height);
  }
  return rows;
};

const drawData = (doc, entries, y, maxHeight) => {
  y = sectionTitle(doc, "Dados do serviço", y);
  if (!entries.length) {
    doc.setTextColor(...colors.muted).setFont("helvetica", "normal").setFontSize(7).text("Nenhum campo adicional informado.", page.margin, y);
    return y + 6;
  }
  let fontSize = 7;
  let heights = measureData(doc, entries, fontSize);
  while (heights.reduce((sum, height) => sum + height, 0) > maxHeight && fontSize > 2) {
    fontSize -= 0.25;
    heights = measureData(doc, entries, fontSize);
  }
  let top = y;
  entries.forEach((entry, index) => {
    const row = Math.floor(index / 2);
    if (index > 0 && index % 2 === 0) top += heights[row - 1];
    const x = page.margin + (index % 2) * 91;
    doc.setTextColor(...colors.muted).setFont("helvetica", "bold").setFontSize(Math.max(3, fontSize - 1));
    const labels = doc.splitTextToSize(entry.key.toUpperCase(), 86);
    doc.text(labels, x, top);
    const labelHeight = labels.length * fontSize * 0.38;
    doc.setTextColor(...colors.text).setFont("helvetica", "normal").setFontSize(fontSize).text(doc.splitTextToSize(entry.value, 86), x, top + labelHeight + 1);
  });
  return y + heights.reduce((sum, height) => sum + height, 0);
};

const drawSignatures = (doc, signatures, images) => {
  if (!signatures.length) return 273;
  const blockHeight = signatures.length * 19 + 7;
  let y = 278 - blockHeight;
  y = sectionTitle(doc, "Assinaturas", y);
  signatures.forEach((signature, index) => {
    const top = y + index * 19;
    const x = 112;
    if (images[index]) try { doc.addImage(images[index], x + 5, top, 72, 10, undefined, "FAST"); } catch { /* mantém identificação */ }
    doc.setDrawColor(156, 163, 175).line(x + 5, top + 11, 190, top + 11);
    doc.setTextColor(...colors.text).setFont("helvetica", "bold").setFontSize(6.5).text(signature.nome || "-", 151, top + 14, { align: "center" });
    doc.setTextColor(...colors.muted).setFont("helvetica", "normal").setFontSize(5.5).text(signature.cargo || "", 151, top + 17, { align: "center" });
  });
  return 278 - blockHeight;
};

const photoBox = (doc, photo, image, x, y, width, height, index) => {
  doc.setFillColor(...colors.light).setDrawColor(...colors.line).roundedRect(x, y, width, height, 1.5, 1.5, "FD");
  if (image) try { doc.addImage(image, x + 1, y + 1, width - 2, height - 6, undefined, "FAST"); } catch { /* mantém legenda */ }
  doc.setTextColor(...colors.muted).setFont("helvetica", "normal").setFontSize(5).text(doc.splitTextToSize(photo.nome || `Foto ${index + 1}`, width - 4), x + width / 2, y + height - 3, { align: "center" });
};

const drawPhotos = (doc, photos, images, title, logo, y, firstPageLimit) => {
  if (!photos.length) return;
  let index = 0;
  const available = firstPageLimit - y;
  if (available >= 28) {
    y = sectionTitle(doc, "Evidências fotográficas", y);
    const height = Math.min(42, firstPageLimit - y);
    const count = Math.min(3, photos.length);
    for (; index < count; index += 1) photoBox(doc, photos[index], images[index], page.margin + index * 61, y, 57, height, index);
  }
  while (index < photos.length) {
    doc.addPage();
    header(doc, title, "ANEXO FOTOGRÁFICO", logo);
    let top = sectionTitle(doc, "Evidências fotográficas", 42);
    const limit = Math.min(index + 6, photos.length);
    for (let local = 0; index < limit; index += 1, local += 1) photoBox(doc, photos[index], images[index], page.margin + (local % 2) * 91, top + Math.floor(local / 2) * 76, 86, 70, index);
  }
};

const footer = doc => {
  const pages = doc.getNumberOfPages();
  for (let number = 1; number <= pages; number += 1) {
    doc.setPage(number).setDrawColor(...colors.line).line(page.margin, page.footer, page.width - page.margin, page.footer);
    doc.setTextColor(...colors.muted).setFont("helvetica", "normal").setFontSize(5.5).text("BioSafe Pest • Evidência, controle e confiança", page.margin, 287);
    doc.text(`Página ${number} de ${pages}`, page.width - page.margin, 287, { align: "right" });
  }
};

export async function baixarPdfRelatorio(item) {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const title = titleByType[item.tipoControle] || "RELATÓRIO DE CONTROLE DE PRAGAS";
  const [logo, photoImages, signatureImages] = await Promise.all([
    fetchDataUrl("/biosafe-shield.png"),
    Promise.all((item.fotos || []).map(photo => fetchDataUrl(photo.url))),
    Promise.all((item.assinaturas || []).map(signature => fetchDataUrl(signature.url))),
  ]);
  header(doc, title, item.numeroOs || item.lotes?.[0] || "", logo);
  let y = identification(doc, item, 39);
  const signatureTop = drawSignatures(doc, item.assinaturas || [], signatureImages);
  const photoReserve = item.fotos?.length ? 52 : 0;
  const entries = Object.entries(item.dados || {}).map(([key, value]) => ({ key, value: textValue(value) })).filter(entry => entry.value);
  y = drawData(doc, entries, y, Math.max(25, signatureTop - y - photoReserve - 5));
  drawPhotos(doc, item.fotos || [], photoImages, title, logo, y + 3, signatureTop - 3);
  footer(doc);
  doc.save(`relatorio-${item.numeroOs || item.id}.pdf`.replace(/[^\w.-]+/g, "-"));
}
