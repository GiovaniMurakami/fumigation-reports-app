import { useId } from "react";
import { DateInput } from "./DateInput";

export function Field({ label, onChange, as, id, hint, ...props }) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const Tag = as || "input";

  return (
    <label className="field" htmlFor={fieldId}>
      <span>{label}</span>
      {Tag === "input" && props.type === "date" ? (
        <DateInput
          {...props}
          id={fieldId}
          aria-describedby={hintId}
          onChange={onChange}
        />
      ) : (
        <Tag
          {...props}
          id={fieldId}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {hint && <small id={hintId}>{hint}</small>}
    </label>
  );
}
