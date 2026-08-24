export function Field({ label, onChange, as, ...props }) {
  const Tag = as || "input";
  return <label className="field"><span>{label}</span><Tag {...props} onChange={e => onChange(e.target.value)} /></label>;
}
