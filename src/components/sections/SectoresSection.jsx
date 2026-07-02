"use client";
import { useState } from "react";
import { Factory, Store, Home, Hotel } from "lucide-react";

const sectores = [
  {
    label: "Industria",
    Icon: Factory,
    desc: "Procesos industriales, manufactura y producción a gran escala.",
  },
  {
    label: "Revendedores",
    Icon: Store,
    desc: "Distribuidores y revendedores especializados en equipamiento industrial.",
  },
  {
    label: "Doméstico",
    Icon: Home,
    desc: "Sistemas de presión, filtración y bombeo para uso residencial.",
  },
  {
    label: "Hotelería",
    Icon: Hotel,
    desc: "Instalaciones hidráulicas y de climatización para hoteles y complejos.",
  },
];

function SectorCard({ label, Icon, desc }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: "#141416",
        border: `1px solid ${hovered ? "#D81F26" : "#232327"}`,
        padding: "32px 26px",
        display: "flex", flexDirection: "column", gap: 18,
        transition: "border-color .2s, transform .25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 40, height: 40,
        borderLeft: "1px solid #232327",
        borderBottom: "1px solid #232327",
        transition: "border-color .2s",
        borderColor: hovered ? "#D81F26" : "#232327",
      }} />

      {/* Icon */}
      <div style={{
        width: 52, height: 52,
        background: hovered ? "rgba(216,31,38,.18)" : "rgba(216,31,38,.08)",
        border: `1px solid ${hovered ? "rgba(216,31,38,.4)" : "rgba(216,31,38,.15)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background .2s, border-color .2s",
      }}>
        <Icon size={24} color="#D81F26" />
      </div>

      {/* Text */}
      <div>
        <div style={{
          fontFamily: "'Saira Condensed',sans-serif",
          fontWeight: 800, fontSize: 24,
          textTransform: "uppercase", color: "#EDEDED",
          lineHeight: 1, marginBottom: 10,
        }}>
          {label}
        </div>
        <p style={{
          fontFamily: "'Archivo',sans-serif", fontSize: 13,
          color: "#6A6A70", lineHeight: 1.65, margin: 0,
        }}>
          {desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 2, background: "#D81F26",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform .3s",
      }} />
    </div>
  );
}

export default function SectoresSection() {
  return (
    <section className="section-pad" style={{ background: "#0E0E0F" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <span className="eyebrow">// SECTORES</span>
          <h2 style={{
            fontFamily: "'Saira Condensed',sans-serif",
            fontWeight: 800, fontSize: "clamp(28px,4vw,44px)",
            textTransform: "uppercase", color: "#EDEDED",
            margin: 0, lineHeight: 1.05,
          }}>
            ATENDEMOS LOS<br />
            <span style={{ color: "#D81F26" }}>SIGUIENTES SECTORES</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}>
          {sectores.map((s, i) => <SectorCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}
