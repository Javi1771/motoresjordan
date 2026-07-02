"use client";
import { useEffect, useState } from "react";
import { fmtDate } from "@/lib/fmt";

export default function ArticulosSection({ onLoad }) {
  const [articulos, setArticulos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/articulos")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setArticulos(list);
        setLoaded(true);
        onLoad?.(list.length > 0);
      })
      .catch(() => { setLoaded(true); onLoad?.(false); });
  }, []);

  if (!loaded || articulos.length === 0) return null;

  return (
    <section id="articulos" className="section-pad" style={{ background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div style={{ marginBottom: 36 }}>
          <span className="eyebrow">// BLOG & NOTICIAS</span>
          <h2 style={{
            fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
            fontSize: "clamp(28px,3.5vw,40px)", textTransform: "uppercase",
            color: "var(--fg)", margin: 0, lineHeight: 1.05,
          }}>
            ARTÍCULOS <span style={{ color: "#D81F26" }}>Y NOTICIAS</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 18,
        }}>
          {articulos.map((art) => (
            <article
              key={art.id}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--cardline)",
                overflow: "hidden",
                display: "flex", flexDirection: "column",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D81F26")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--cardline)")}
            >
              {art.imagen && (
                <div style={{ aspectRatio: "16/9", overflow: "hidden", flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.imagen}
                    alt={art.titulo}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                </div>
              )}

              <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{
                  fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
                  color: "var(--faint)", letterSpacing: 2, textTransform: "uppercase",
                  marginBottom: 10,
                }}>
                  {fmtDate(art.creadoEn)}
                </div>

                <h3 style={{
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
                  fontSize: "clamp(18px,1.8vw,22px)", textTransform: "uppercase",
                  color: "var(--fg)", lineHeight: 1.1, margin: "0 0 12px",
                }}>
                  {art.titulo}
                </h3>

                <p style={{
                  fontFamily: "'Archivo',sans-serif", fontSize: 14,
                  color: "var(--muted)", lineHeight: 1.6, margin: 0,
                  flex: 1,
                  display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {art.contenido}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
