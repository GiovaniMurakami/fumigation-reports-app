export function FormSection({ number, title, children }) {
  return <section className="form-section"><div className="section-number">{number}</div><div><h2>{title}</h2>{children}</div></section>;
}
