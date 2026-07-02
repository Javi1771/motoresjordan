"use client";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { fmtDateLong } from "@/lib/fmt";

const GOOGLE_MAPS_URL =
  "https://www.google.com.mx/maps/place/Moto-Bombas+y+Reductores+Jordan+S.A+de+C.V./@20.3917469,-99.9957687,935m/data=!3m3!1e3!4b1!5s0x85d30b628732a6ab:0xac2f3bcd1e252bed!4m6!3m5!1s0x85d30b6280a9afff:0x80a19ba652dc9adb!8m2!3d20.391747!4d-99.9908978!16s%2Fg%2F11bx89x828?hl=es";

const STATIC_REVIEWS = [
  {
    nombre: "Victor Castro",
    fuente: "Hace 5 meses · Google",
    texto: "Lo relacionado a motobombas si están surtidos. Lo que buscaba en repuestos si lo encontré y buena atención.",
    rating: 5,
    initials: "VC",
  },
  {
    nombre: "Andrea Hernández",
    fuente: "Hace 8 meses · Google",
    texto: "Manejan gran variedad de marcas y equipos, el servicio brindado fue excelente, 100% recomendados.",
    rating: 5,
    initials: "AH",
  },
  {
    nombre: "Gloria González",
    fuente: "Hace 2 años · Google",
    texto: "Excelente servicio y asesoría. Manejan varias marcas y sus precios son muy buenos, además de que cuentan con un gran stock de productos para entrega inmediata.",
    rating: 5,
    initials: "GG",
  },
];

function ReviewCard({ nombre, fuente, texto, rating, initials, fromGoogle }) {
  return (
    <div
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--cardline)",
        borderRadius: 3,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        transition: "border-color .2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D81F26")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--cardline)")}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
        {Array.from({ length: rating }).map((_, j) => (
          <span key={j} style={{ color: "#D81F26", fontSize: 14 }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: "'Archivo',sans-serif", fontSize: 15, fontStyle: "italic",
        color: "var(--fg)", lineHeight: 1.65, marginBottom: 24, flex: 1,
      }}>
        "{texto}"
      </p>

      {/* Author */}
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, background: fromGoogle ? "#D81F26" : "var(--bg)",
          border: fromGoogle ? "none" : "1px solid var(--line)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 13,
            color: fromGoogle ? "#fff" : "var(--muted)",
          }}>
            {initials}
          </span>
        </div>
        <div>
          <div style={{
            fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
            fontSize: 16, textTransform: "uppercase", color: "var(--fg)", lineHeight: 1,
          }}>
            {nombre}
          </div>
          <div style={{
            fontFamily: "'Space Mono',monospace", fontSize: 9,
            color: "var(--muted)", marginTop: 4, letterSpacing: 1,
          }}>
            {fuente}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonios() {
  const [dbReviews, setDbReviews] = useState([]);

  useEffect(() => {
    fetch("/api/resenas")
      .then((r) => r.json())
      .then((data) => setDbReviews(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const allReviews = [
    ...STATIC_REVIEWS.map((r) => ({ ...r, fromGoogle: true })),
    ...dbReviews.map((r) => ({
      nombre: r.nombre,
      fuente: "A TRAVÉS DE ESTE SISTEMA",
      texto: r.mensaje,
      rating: r.rating,
      initials: r.nombre.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
      fromGoogle: false,
    })),
  ];

  return (
    <section id="testimonios" className="section-pad" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 40, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="eyebrow">// CLIENTES SATISFECHOS</span>
            <h2 style={{
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
              fontSize: "clamp(32px,4vw,44px)", textTransform: "uppercase",
              color: "var(--fg)", margin: 0, lineHeight: 1.05,
            }}>
              LO QUE DICEN<br />
              <span style={{ color: "#D81F26" }}>NUESTROS CLIENTES</span>
            </h2>
          </div>

          {/* Google Badge */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              border: "1px solid var(--cardline)", padding: "10px 16px",
              textDecoration: "none", background: "var(--bg2)",
              transition: "border-color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D81F26")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--cardline)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--muted)", letterSpacing: 1 }}>MÁS DE 40 RESEÑAS</div>
              <div style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 13, color: "var(--fg)", display: "flex", alignItems: "center", gap: 4 }}>
                VER EN GOOGLE <ExternalLink size={11} />
              </div>
            </div>
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
          {allReviews.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
