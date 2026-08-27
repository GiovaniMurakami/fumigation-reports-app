import { Field } from "../Field";
import { fieldLabel } from "../../utils/reportFields";

const isProductField = (label) => /^produtos?(\s+utilizado)?$/i.test(label.trim());

const productParts = (option) => {
  const [name, ...details] = option.split(/\s+-\s+|\s+\/\s+/);
  return {
    name: name.trim(),
    detail: details.join(" / ").trim(),
  };
};

function ProductPicker({ field, label, value, onChange, required, multiple }) {
  const selected = multiple ? (Array.isArray(value) ? value : []) : (value ? [value] : []);
  const toggle = (option) => {
    if (!multiple) {
      onChange(field.entryId, selected.includes(option) ? "" : option);
      return;
    }
    onChange(field.entryId, selected.includes(option) ? selected.filter(item => item !== option) : [...selected, option]);
  };

  return (
    <div className="field product-field">
      <div className="field-title">
        <span>{label}{required && " *"}</span>
        {selected.length > 0 && <button type="button" className="link" onClick={() => onChange(field.entryId, multiple ? [] : "")}>Limpar</button>}
      </div>
      <div className="product-picker" role="group" aria-label={label}>
        {field.options.map(option => {
          const parts = productParts(option);
          const active = selected.includes(option);
          return (
            <button
              type="button"
              key={option}
              className={`product-option ${active ? "selected" : ""}`}
              aria-pressed={active}
              onClick={() => toggle(option)}
              title={option}
            >
              <span className="product-check">{active ? "✓" : "+"}</span>
              <span>
                <b>{parts.name}</b>
                {parts.detail && <small>{parts.detail}</small>}
              </span>
            </button>
          );
        })}
      </div>
      <small>{selected.length ? `${selected.length} selecionado${selected.length > 1 ? "s" : ""}` : "Selecione o produto utilizado no serviço."}</small>
    </div>
  );
}

const todayValue = () => {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

export function DynamicField({ field, value, onChange, required, withToday }) {
  const label = fieldLabel(field);
  if (field.type === "caixas_de_selecao") {
    if (isProductField(label)) return <ProductPicker field={field} label={label} value={value} onChange={onChange} required={required} multiple />;
    const selected = Array.isArray(value) ? value : [];
    return <label className="field"><span>{label}{required && " *"}</span><div className="checks">{field.options.map(option => <label key={option}><input type="checkbox" checked={selected.includes(option)} onChange={e => onChange(field.entryId, e.target.checked ? [...selected, option] : selected.filter(item => item !== option))}/>{option}</label>)}</div></label>;
  }
  if (field.type === "multipla_escolha" || field.type === "lista_suspensa" || field.type === "grade_multipla_escolha") {
    if (isProductField(label)) return <ProductPicker field={field} label={label} value={value} onChange={onChange} required={required} />;
    return <label className="field"><span>{label}{required && " *"}</span><select value={value} required={required} onChange={e => onChange(field.entryId, e.target.value)}><option value="">Selecione</option>{field.options.map(option => <option key={option} value={option}>{option}</option>)}</select>{field.description && <small>{field.description}</small>}</label>;
  }
  if (field.type === "paragrafo") return <Field label={`${label}${required ? " *" : ""}`} as="textarea" rows="4" value={value} onChange={val => onChange(field.entryId, val)} required={required}/>;
  if (field.type === "data") {
    if (withToday) {
      return (
        <div className="field">
          <span>{label}{required && " *"}</span>
          <div className="date-today-row">
            <input type="date" value={value} onChange={event => onChange(field.entryId, event.target.value)} required={required} />
            <button type="button" className="today-button" onClick={() => onChange(field.entryId, todayValue())}>Hoje</button>
          </div>
        </div>
      );
    }
    return <Field label={`${label}${required ? " *" : ""}`} type="date" value={value} onChange={val => onChange(field.entryId, val)} required={required}/>;
  }
  if (field.type === "hora") return <Field label={`${label}${required ? " *" : ""}`} type="time" value={value} onChange={val => onChange(field.entryId, val)} required={required}/>;
  return <Field label={`${label}${required ? " *" : ""}`} value={value} onChange={val => onChange(field.entryId, val)} required={required}/>;
}
