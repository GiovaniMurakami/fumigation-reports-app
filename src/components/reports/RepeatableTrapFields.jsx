export function RepeatableTrapFields({ sectionName, rows, values, onChange }) {
  const items = values.length ? values : [{}];
  const updateItem = (index, row, value) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [row]: value } : item));
  const addItem = () => onChange([...items, {}]);
  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

  return <div className="repeatable-block">{items.map((item, index) => <section className="repeatable-item" key={index}><div className="repeatable-head"><h3>{sectionName.includes("luminosas") ? "Armadilha" : "Isca"} {index + 1}</h3>{items.length > 1 && <button type="button" className="link" onClick={() => removeItem(index)}>Remover</button>}</div><div className="dynamic-grid">{rows.map(row => <label className="field" key={row.name}><span>{row.name}</span><select value={item[row.name] || ""} onChange={e => updateItem(index, row.name, e.target.value)}><option value="">Selecione</option>{row.options.map(option => <option key={option} value={option}>{option}</option>)}</select></label>)}</div></section>)}<button type="button" className="add-lote" onClick={addItem}>＋ Adicionar {sectionName.includes("luminosas") ? "armadilha" : "isca"}</button></div>;
}
