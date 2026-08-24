import { Field } from "../Field";
import { nestRemovalOptions } from "../../utils/reportFields";

export function RepeatableNestFields({ values, onChange }) {
  const items = values.length ? values : [{}];
  const updateItem = (index, key, value) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  const addItem = () => onChange([...items, {}]);
  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

  return <div className="repeatable-block">{items.map((item, index) => <section className="repeatable-item" key={index}><div className="repeatable-head"><h3>Ninho {index + 1}</h3>{items.length > 1 && <button type="button" className="link" onClick={() => removeItem(index)}>Remover</button>}</div><div className="dynamic-grid"><Field label="Início de intervalo" type="date" value={item["Início de intervalo"] || ""} onChange={value => updateItem(index, "Início de intervalo", value)} /><Field label="Fim de intervalo" type="date" value={item["Fim de intervalo"] || ""} onChange={value => updateItem(index, "Fim de intervalo", value)} /><label className="field"><span>Remoção de ninhos</span><select value={item["Remoção de ninhos"] || ""} onChange={e => updateItem(index, "Remoção de ninhos", e.target.value)}><option value="">Selecione</option>{nestRemovalOptions.map(option => <option key={option} value={option}>{option}</option>)}</select></label><Field label="Quantidade de ninhos removidos" value={item["Quantidade de ninhos removidos"] || ""} onChange={value => updateItem(index, "Quantidade de ninhos removidos", value)} /><Field label="Quantidade Ovos" value={item["Quantidade Ovos"] || ""} onChange={value => updateItem(index, "Quantidade Ovos", value)} /><Field label="Quantidade Filhotes" value={item["Quantidade Filhotes"] || ""} onChange={value => updateItem(index, "Quantidade Filhotes", value)} /><Field label="Observação" as="textarea" rows="3" value={item["Observação"] || ""} onChange={value => updateItem(index, "Observação", value)} /></div></section>)}<button type="button" className="add-lote" onClick={addItem}>＋ Adicionar ninho</button></div>;
}
