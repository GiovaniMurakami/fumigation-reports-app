import { useEffect, useRef, useState } from "react";

const isoToBrazilianDate = (value) => {
  const iso = String(value || "").slice(0, 10);
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "";
  return `${match[3]}/${match[2]}/${match[1]}`;
};

const maskBrazilianDate = (value) => {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const brazilianDateToIso = (value) => {
  const match = String(value || "").match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return "";
  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const isValid =
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day);
  return isValid ? `${year}-${month}-${day}` : "";
};

const isoToDate = (value) => {
  const iso = String(value || "").slice(0, 10);
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
};

const dateToIso = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const monthLabel = (date) =>
  new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);

const calendarDays = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmptyDays = (firstDay.getDay() + 6) % 7;
  return [
    ...Array.from({ length: leadingEmptyDays }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1)),
  ];
};

export function DateInput({ value, onChange, onBlur, placeholder = "dd/mm/aaaa", ...props }) {
  const [displayValue, setDisplayValue] = useState(isoToBrazilianDate(value));
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => isoToDate(value) || new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    if (!focused) setDisplayValue(isoToBrazilianDate(value));
  }, [focused, value]);

  useEffect(() => {
    const selectedDate = isoToDate(value);
    if (selectedDate && !open) setVisibleMonth(selectedDate);
  }, [open, value]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  const handleChange = (event) => {
    const nextDisplayValue = maskBrazilianDate(event.target.value);
    setDisplayValue(nextDisplayValue);

    if (!nextDisplayValue) {
      onChange("");
      return;
    }

    const nextValue = brazilianDateToIso(nextDisplayValue);
    if (nextValue) {
      onChange(nextValue);
      setVisibleMonth(isoToDate(nextValue));
    }
  };

  const selectDate = (date) => {
    const nextValue = dateToIso(date);
    setDisplayValue(isoToBrazilianDate(nextValue));
    setVisibleMonth(date);
    setOpen(false);
    onChange(nextValue);
  };

  const moveMonth = (amount) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  const selectedValue = String(value || "").slice(0, 10);
  const days = calendarDays(visibleMonth);

  return (
    <div className={`date-input ${open ? "is-open" : ""}`} ref={containerRef}>
      <div className="date-input-control">
        <input
          {...props}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          pattern="\d{2}/\d{2}/\d{4}"
          placeholder={placeholder}
          value={displayValue}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          onChange={handleChange}
        />
        <button
          className="date-input-toggle"
          type="button"
          aria-label="Abrir calendário"
          onClick={() => setOpen((current) => !current)}
        >
          Cal.
        </button>
      </div>
      {open && (
        <div className="date-calendar" role="dialog" aria-label="Calendário">
          <div className="date-calendar-head">
            <button type="button" aria-label="Mês anterior" onClick={() => moveMonth(-1)}>
              &lt;
            </button>
            <b>{monthLabel(visibleMonth)}</b>
            <button type="button" aria-label="Próximo mês" onClick={() => moveMonth(1)}>
              &gt;
            </button>
          </div>
          <div className="date-calendar-weekdays" aria-hidden="true">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="date-calendar-grid">
            {days.map((date, index) =>
              date ? (
                <button
                  className={dateToIso(date) === selectedValue ? "active" : ""}
                  key={dateToIso(date)}
                  type="button"
                  onClick={() => selectDate(date)}
                >
                  {date.getDate()}
                </button>
              ) : (
                <span key={`empty-${index}`} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
