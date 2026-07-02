"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { fmtDate } from "@/lib/fmt";

export default function PromocionesSection({ onLoad }) {
  const [promociones, setPromociones] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/promociones")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setPromociones(list);
        setLoaded(true);
        onLoad?.(list.length > 0);
      })
      .catch(() => { setLoaded(true); onLoad?.(false); });
  }, []);

  if (!loaded || promociones.length === 0) return null;

  function cotizar(promo) {
    const msg = `Hola, me interesa la promoción: *${promo.titulo}*. ¿Podría darme más información?`;
    window.open(`https://wa.me/524273762379?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <section id="promociones" className="section-pad" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <span className="eyebrow">// OFERTAS ESPECIALES</span>
          <h2 style={{
            fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
            fontSize: "clamp(32px,4vw,44px)", textTransform: "uppercase",
            color: "var(--fg)", margin: 0, lineHeight: 1.05,
          }}>
            PROMOCIONES <span style={{ color: "#D81F26" }}>ACTIVAS</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
          {promociones.map((promo) => (
            <div
              key={promo.id}
              style={{
                background: "var(--bg2)", border: "1px solid var(--cardline)",
                borderRadius: 3, overflow: "hidden",
              }}
            >
              {/* Image */}
              {promo.imagen && (
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <img
                    src={promo.imagen}
                    alt={promo.titulo}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}

              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                  <h3 style={{
                    fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
                    fontSize: 20, textTransform: "uppercase", color: "var(--fg)",
                    lineHeight: 1, margin: 0, flex: 1,
                  }}>
                    {promo.titulo}
                  </h3>
                  {promo.descuento && (
                    <span style={{
                      background: "#D81F26", color: "#fff",
                      fontFamily: "'Space Mono',monospace", fontSize: 11, fontWeight: 700,
                      padding: "4px 8px", borderRadius: 2, flexShrink: 0,
                    }}>
                      -{promo.descuento}%
                    </span>
                  )}
                </div>

                {promo.descripcion && (
                  <p style={{
                    fontFamily: "'Archivo',sans-serif", fontSize: 14,
                    color: "var(--muted)", lineHeight: 1.55, marginBottom: 14,
                  }}>
                    {promo.descripcion}
                  </p>
                )}

                {promo.fechaFin && (
                  <p style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 10,
                    color: "var(--faint)", textTransform: "uppercase", marginBottom: 16,
                  }}>
                    VÁLIDO HASTA {fmtDate(promo.fechaFin)}
                  </p>
                )}

                <button
                  onClick={() => cotizar(promo)}
                  style={{
                    width: "100%", background: "#D81F26", color: "#fff",
                    border: "none", cursor: "pointer",
                    fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
                    fontSize: 14, letterSpacing: 1, textTransform: "uppercase",
                    padding: "12px 16px", display: "flex",
                    alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  <FaWhatsapp size={15} /> APROVECHAR OFERTA →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
