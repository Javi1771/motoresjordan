"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { fmtPrice } from "@/lib/fmt";

export default function CatalogoDestacado({ onLoad }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [catActiva, setCatActiva] = useState("todos");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/productos")
      .then((r) => r.json())
      .then((prods) => {
        const hasContent = Array.isArray(prods) && prods.length > 0;
        if (hasContent) {
          setProductos(prods);
          const cats = [...new Set(prods.map((p) => p.categoria?.nombre).filter(Boolean))];
          setCategorias(cats);
        }
        setLoaded(true);
        onLoad?.(hasContent);
      })
      .catch(() => { setLoaded(true); onLoad?.(false); });
  }, []);

  if (!loaded || productos.length === 0) return null;

  const filtrados = catActiva === "todos"
    ? productos
    : productos.filter((p) => p.categoria?.nombre === catActiva);

  function cotizar(p) {
    const msg = `Hola, me interesa el producto: *${p.nombre}*${p.precio ? `\nPrecio referencia: ${fmtPrice(p.precio)} MXN` : ""}\n¿Podrían darme más información?`;
    window.open(`https://wa.me/524273762379?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <section id="catalogo" className="section-pad" style={{ background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <span className="eyebrow">// CATÁLOGO</span>
          <h2 style={{
            fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
            fontSize: "clamp(32px,4vw,44px)", textTransform: "uppercase",
            color: "var(--fg)", margin: 0, lineHeight: 1.05,
          }}>
            NUESTROS PRODUCTOS
          </h2>
          <p style={{
            fontFamily: "'Archivo',sans-serif", fontSize: 15, color: "var(--muted)",
            marginTop: 10, maxWidth: 480,
          }}>
            Equipos industriales de las mejores marcas, disponibles para entrega inmediata.
          </p>
        </div>

        {/* Filter chips */}
        {categorias.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 32 }}>
            <span style={{
              fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--faint)",
              textTransform: "uppercase", letterSpacing: 1, marginRight: 4,
            }}>
              FILTRAR:
            </span>
            {["todos", ...categorias].map((cat) => (
              <button
                key={cat}
                onClick={() => setCatActiva(cat)}
                style={{
                  border: catActiva === cat ? "1px solid #D81F26" : "1px solid var(--line)",
                  background: catActiva === cat ? "#D81F26" : "transparent",
                  color: catActiva === cat ? "#fff" : "var(--fg)",
                  fontFamily: "'Archivo',sans-serif", fontSize: 13, fontWeight: 600,
                  padding: "8px 16px", borderRadius: 2, cursor: "pointer",
                  transition: "all .15s",
                }}
              >
                {cat === "todos" ? "Todos" : cat}
              </button>
            ))}
          </div>
        )}

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18 }}>
          {filtrados.map((p) => (
            <div
              key={p.id}
              style={{
                background: "var(--bg)", border: "1px solid var(--cardline)",
                borderRadius: 3, overflow: "hidden",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", aspectRatio: "4/3", background: "var(--bg3)" }}>
                {p.imagen ? (
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: 16 }}
                  />
                ) : (
                  <div
                    className="img-placeholder"
                    style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--faint)" }}>
                      SIN FOTO
                    </span>
                  </div>
                )}
                {p.destacado && (
                  <span style={{
                    position: "absolute", top: 8, left: 8,
                    background: "#D81F26", color: "#fff",
                    fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
                    padding: "4px 8px", borderRadius: 2,
                  }}>
                    DESTACADO
                  </span>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "16px 16px 0" }}>
                {p.categoria && (
                  <div style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 10,
                    color: "var(--muted)", textTransform: "uppercase",
                    letterSpacing: 1, marginBottom: 6,
                  }}>
                    {p.categoria.nombre}
                  </div>
                )}
                <h3 style={{
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
                  fontSize: 18, textTransform: "uppercase", color: "var(--fg)",
                  lineHeight: 1, margin: 0, marginBottom: 8,
                }}>
                  {p.nombre}
                </h3>
                {p.descripcion && (
                  <p style={{
                    fontFamily: "'Archivo',sans-serif", fontSize: 13,
                    color: "var(--muted)", lineHeight: 1.5,
                    overflow: "hidden", display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    marginBottom: 12,
                  }}>
                    {p.descripcion}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div style={{
                padding: "12px 16px",
                borderTop: "1px solid var(--cardline)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginTop: 8,
              }}>
                {p.precio != null ? (
                  <span style={{
                    fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
                    fontSize: 23, color: "var(--fg)",
                  }}>
                    {fmtPrice(p.precio)}
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)", fontWeight: 400, marginLeft: 4 }}>MXN</span>
                  </span>
                ) : (
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--faint)" }}>CONSULTAR PRECIO</span>
                )}
                <button
                  onClick={() => cotizar(p)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    border: "1px solid #D81F26", color: "#D81F26", background: "transparent",
                    fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
                    fontSize: 13, letterSpacing: 1, padding: "7px 14px",
                    cursor: "pointer", textTransform: "uppercase",
                  }}
                >
                  <FaWhatsapp size={13} /> FICHA →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
