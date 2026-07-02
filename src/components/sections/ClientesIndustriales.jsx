"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ClientesIndustriales() {
  const [images, setImages] = useState([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch("/api/images/marcas")
      .then((r) => r.json())
      .then((d) => setImages(d.images || []))
      .catch(() => setImages([]));
  }, []);

  if (images.length === 0) return null;

  const list = [...images, ...images, ...images];

  return (
    <section className="section-pad" style={{ background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", marginBottom: 40 }}>
        <span className="eyebrow">// CONFIANZA INDUSTRIAL</span>
        <h2 style={{
          fontFamily: "'Saira Condensed',sans-serif",
          fontWeight: 800, fontSize: "clamp(28px,3.5vw,40px)",
          textTransform: "uppercase", color: "var(--fg)",
          margin: 0, lineHeight: 1.05,
        }}>
          CLIENTES <span style={{ color: "#D81F26" }}>INDUSTRIALES</span>
        </h2>
        <p style={{
          fontFamily: "'Archivo',sans-serif", fontSize: 15,
          color: "var(--muted)", marginTop: 12, maxWidth: 540,
        }}>
          A continuación, se presentan algunos de nuestros principales clientes en la industria.
        </p>
      </div>

      {/* Marquee carousel */}
      <div
        style={{ overflow: "hidden", position: "relative", cursor: "grab" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade masks */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: "linear-gradient(to right, var(--bg2), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: "linear-gradient(to left, var(--bg2), transparent)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "flex", gap: 20,
          animation: "marquee 35s linear infinite",
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}>
          {list.map((file, i) => (
            <div
              key={i}
              style={{
                width: 160, height: 100,
                background: "var(--bg)",
                border: "1px solid var(--cardline)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "16px 20px", flexShrink: 0,
                transition: "border-color .2s",
                position: "relative",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D81F26")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--cardline)")}
            >
              <Image
                src={`/marcas/${file}`}
                alt={`Cliente ${i % images.length + 1}`}
                fill
                sizes="160px"
                style={{ objectFit: "contain", padding: "12px 16px" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(-33.333% - 7px)); }
          }
        `}</style>
      </div>
    </section>
  );
}
