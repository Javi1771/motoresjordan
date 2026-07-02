"use client";
import { useState, useRef } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { inputClass } from "./AdminField";

export default function ImageUpload({ value, onChange, label = "Imagen" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error al subir imagen.");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Error de conexión al subir.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label style={{
        display: "block", fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
        color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6,
      }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          placeholder="/uploads/imagen.jpg o /Motor_baldor.png"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
            padding: "8px 12px", background: "var(--bg3)", border: "1px solid var(--line)",
            color: "var(--muted)", fontSize: 12, fontFamily: "'Archivo',sans-serif",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "border-color .15s, color .15s",
            opacity: uploading ? 0.5 : 1,
          }}
          onMouseEnter={(e) => { if (!uploading) { e.currentTarget.style.borderColor = "#D81F26"; e.currentTarget.style.color = "var(--fg)"; } }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--muted)"; }}
        >
          {uploading ? <Loader2 size={14} style={{ animation: "spin 0.7s linear infinite" }} /> : <Upload size={14} />}
          {uploading ? "Subiendo..." : "Subir"}
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      {error && (
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 12, color: "#D81F26", marginTop: 4 }}>
          {error}
        </p>
      )}
      {value && (
        <div style={{ marginTop: 8, position: "relative", display: "inline-block" }}>
          <img
            src={value}
            alt=""
            style={{ height: 80, width: "auto", objectFit: "contain", border: "1px solid var(--line)", background: "var(--bg)", display: "block" }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Eliminar imagen"
            style={{
              position: "absolute", top: -6, right: -6,
              width: 20, height: 20, borderRadius: "50%",
              background: "#D81F26", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X size={10} color="#fff" />
          </button>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
