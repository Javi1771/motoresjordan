"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function AdminModal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.6)" }}
        onClick={onClose}
      />
      <div style={{
        position: "relative", background: "var(--bg2)", border: "1px solid var(--line)",
        width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 60px rgba(0,0,0,.4)",
      }}>
        <div style={{
          height: 4,
          background: "repeating-linear-gradient(135deg, #D81F26 0 12px, var(--bg2) 12px 24px)",
        }} />
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px", borderBottom: "1px solid var(--line)",
        }}>
          <h3 style={{
            fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
            fontSize: 18, textTransform: "uppercase", color: "var(--fg)", margin: 0,
            letterSpacing: 1,
          }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--faint)", padding: 4, display: "flex" }}
          >
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}
