import { useId } from "react";
import { DateInput } from "./DateInput";

export function Field({ label, onChange, as, id, hint, withTime = false, type, ...props }) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const Tag = as || "input";
  const usesDateInput = Tag === "input" && (type === "date" || type === "datetime-local");

  return (
    <label className="field" htmlFor={fieldId}>
      <span>{label}</span>
      {usesDateInput ? (
        <DateInput
          {...props}
          withTime={withTime || type === "datetime-local"}
          id={fieldId}
          aria-describedby={hintId}
          onChange={onChange}
        />
      ) : (
        <Tag
          {...props}
          type={type}
          id={fieldId}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {hint && <small id={hintId}>{hint}</small>}
    </label>
  );
}
