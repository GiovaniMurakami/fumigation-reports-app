import { Field } from "../Field";
import { rodentStatusOptions } from "../../utils/reportFields";

export function RepeatableRodentFields({ values, onChange }) {
  const items = values.length ? values : [{}];
  const updateItem = (index, key, value) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  const addItem = () => onChange([...items, {}]);
  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

  return <div className="repeatable-block">{items.map((item, index) => <section className="repeatable-item" key={index}><div className="repeatable-head"><h3>Ponto {index + 1}</h3>{items.length > 1 && <button type="button" className="link" onClick={() => removeItem(index)}>Remover</button>}</div><div className="dynamic-grid"><label className="field"><span>Status</span><select value={item.Status || ""} onChange={e => updateItem(index, "Status", e.target.value)}><option value="">Selecione</option>{rodentStatusOptions.map(option => <option key={option} value={option}>{option}</option>)}</select></label><Field label="Observação" value={item.Observação || ""} onChange={value => updateItem(index, "Observação", value)} /></div></section>)}<button type="button" className="add-lote" onClick={addItem}>＋ Adicionar ponto</button></div>;
}
