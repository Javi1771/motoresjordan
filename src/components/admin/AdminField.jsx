const labelStyle = {
  display: "block",
  fontFamily: "'Space Mono',monospace",
  fontSize: 10, fontWeight: 700,
  color: "var(--muted)", textTransform: "uppercase",
  letterSpacing: 1, marginBottom: 6,
};

export const inputClass = "admin-input";
export const textareaClass = "admin-input";

export function Field({ label, required, children }) {
  return (
    <div>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: "#D81F26" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function Input({ label, required, value, ...props }) {
  return (
    <Field label={label} required={required}>
      <input className={inputClass} value={value ?? ""} {...props} />
    </Field>
  );
}

export function Textarea({ label, required, rows = 3, ...props }) {
  return (
    <Field label={label} required={required}>
      <textarea className={textareaClass} rows={rows} style={{ resize: "none" }} {...props} />
    </Field>
  );
}

export function Toggle({ label, checked, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1 }}>
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          position: "relative", width: 40, height: 20,
          background: checked ? "#D81F26" : "var(--bg3)",
          border: "1px solid var(--line)",
          cursor: "pointer", transition: "background .15s", flexShrink: 0,
        }}
      >
        <span style={{
          position: "absolute", top: 2,
          left: checked ? 21 : 2,
          width: 14, height: 14, background: "#fff",
          transition: "left .15s",
        }} />
      </button>
    </div>
  );
}

export function SaveButton({ loading, label = "Guardar" }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        width: "100%", background: "#D81F26", color: "#fff",
        border: "none", cursor: "pointer",
        fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
        fontSize: 15, letterSpacing: 1, textTransform: "uppercase",
        padding: "12px", opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? "GUARDANDO..." : `${label.toUpperCase()} →`}
    </button>
  );
}
