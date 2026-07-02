"use client";
import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";

export default function GaleriaSection({ onLoad }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch("/api/galeria")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setItems(list);
        setLoaded(true);
        onLoad?.(list.length > 0);
      })
      .catch(() => { setLoaded(true); onLoad?.(false); });

    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!loaded || items.length === 0) return null;

  return (
    <section id="galeria" className="section-pad" style={{ background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <span className="eyebrow">// GALERÍA</span>
          <h2 style={{
            fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
            fontSize: "clamp(32px,4vw,44px)", textTransform: "uppercase",
            color: "var(--fg)", margin: 0, lineHeight: 1.05,
          }}>
            TRABAJOS <span style={{ color: "#D81F26" }}>REALIZADOS</span>
          </h2>
          <p style={{
            fontFamily: "'Archivo',sans-serif", fontSize: 15, color: "var(--muted)",
            marginTop: 10, maxWidth: 420,
          }}>
            Proyectos reales y casos de éxito que respaldan nuestra experiencia.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 4 }}>
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item)}
              style={{
                position: "relative", aspectRatio: "1",
                background: "var(--bg3)", border: "1px solid var(--line)",
                cursor: "pointer", overflow: "hidden", padding: 0,
              }}
            >
              <img
                src={item.imagen}
                alt={item.descripcion ?? `Trabajo ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(14,14,15,0)", transition: "background .2s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(14,14,15,0.55)";
                  e.currentTarget.querySelector("svg").style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(14,14,15,0)";
                  e.currentTarget.querySelector("svg").style.opacity = "0";
                }}
              >
                <ZoomIn size={28} color="#fff" style={{ opacity: 0, transition: "opacity .2s" }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(0,0,0,.92)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Cerrar imagen"
            style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(255,255,255,.1)", border: "none", cursor: "pointer",
              width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X size={22} color="#fff" />
          </button>
          <div
            style={{ maxWidth: 900, maxHeight: "85vh", width: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.imagen}
              alt={lightbox.descripcion ?? ""}
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", display: "block" }}
            />
            {lightbox.descripcion && (
              <p style={{
                fontFamily: "'Space Mono',monospace", fontSize: 11,
                color: "#9A9A9E", textAlign: "center", marginTop: 12,
                letterSpacing: 1, textTransform: "uppercase",
              }}>
                {lightbox.descripcion}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
