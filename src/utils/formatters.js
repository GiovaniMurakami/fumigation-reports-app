export const formatDate = (value) => new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date(value));

export const valueOf = (values, entryId) => values[entryId] || "";

export const formatValue = (value) => {
  if (value == null || value === "") return "";
  if (Array.isArray(value)) return value.map((item, index) => {
    if (item && typeof item === "object" && !item.nome && !item.url) {
      const entries = Object.entries(item).filter(([key, val]) => key !== "Item" && formatValue(val));
      if (!entries.length) return "";
      return `${item.Item || item.Ponto || `Item ${index + 1}`}: ${entries.map(([key, val]) => `${key}: ${formatValue(val)}`).join("; ")}`;
    }
    return formatValue(item);
  }).filter(Boolean).join(" | ");
  if (typeof value === "object") {
    if (value.nome) return value.nome;
    if (value.url) return value.url;
    return Object.entries(value).map(([key, val]) => `${key}: ${formatValue(val)}`).filter(Boolean).join("; ");
  }
  return String(value);
};
