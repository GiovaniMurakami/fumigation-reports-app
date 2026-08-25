export function FormSection({ number, title, children }) {
  const headingId = `form-section-${String(number).replace(/\s+/g, "-")}`;
  return (
    <section className="form-section" aria-labelledby={headingId}>
      <div className="section-number" aria-hidden="true">
        {number}
      </div>
      <div className="form-section-content">
        <h2 id={headingId}>{title}</h2>
        {children}
      </div>
    </section>
  );
}
