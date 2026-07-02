"use client";
import { useState } from "react";
import { Wrench, ClipboardList } from "lucide-react";
import ProveedoresCarousel from "./interface/ProveedoresCarousel";

const services = [
  {
    title: "Tanques Hidroneumáticos",
    description: "Sistemas de presión constante para aplicaciones industriales y residenciales con tecnología de vanguardia",
    image: "/Tanque_hidroneumatico.png",
    alt: "Tanque Hidroneumático",
    features: ["Presión constante", "Ahorro energético", "Larga durabilidad"],
    tag: "HIDRÁULICA",
  },
  {
    title: "Motores Baldor",
    description: "Motores eléctricos de alta eficiencia para todas tus necesidades industriales más exigentes",
    image: "/Motor_baldor.png",
    alt: "Motor Baldor",
    features: ["Alta eficiencia", "Bajo mantenimiento", "Tecnología avanzada"],
    tag: "ELÉCTRICO",
  },
  {
    title: "Soluciones Industriales",
    description: "Equipamiento completo para la industria con asesoría especializada, armado de bombas y visitas de campo",
    image: "/industria_bebidas.png",
    alt: "Industria",
    features: ["Soluciones integrales", "Asesoría técnica", "Instalación profesional"],
    tag: "INDUSTRIAL",
  },
];

const extraServices = [
  {
    num: "01",
    tag: "REPARACIÓN",
    title: "Reparación de Equipos",
    description: "Realizamos servicio de reparación de bombas, motores, reductores e hidroneumáticos, todo bajo una revisión previa y en nuestras instalaciones.",
    features: ["Diagnóstico previo", "Taller propio", "Refacciones originales"],
    Icon: Wrench,
  },
  {
    num: "02",
    tag: "ASESORÍA",
    title: "Asesoría Técnica",
    description: "Ofrecemos visitas técnicas para levantamiento de datos y propuestas de mejora en sus procesos productivos.",
    features: ["Visitas de campo", "Levantamiento de datos", "Propuestas de mejora"],
    Icon: ClipboardList,
  },
];

function ExtraServiceRow({ num, tag, title, description, features, Icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="block lg:grid"
      style={{
        position: "relative",
        gridTemplateColumns: "72px 1fr 260px",
        background: hovered ? "var(--bg3)" : "var(--bg2)",
        borderTop: "1px solid var(--line)",
        borderRight: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        borderLeft: `4px solid ${hovered ? "#f02530" : "#D81F26"}`,
        overflow: "hidden",
        transition: "background .2s, border-color .2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Watermark number */}
      <div style={{
        position: "absolute", right: 28, top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Saira Condensed',sans-serif",
        fontWeight: 800, fontSize: 130, lineHeight: 1,
        color: "var(--line)", userSelect: "none", pointerEvents: "none",
        zIndex: 0, letterSpacing: -4,
      }}>
        {num}
      </div>

      {/* Icon column — hidden on mobile */}
      <div className="hidden lg:flex" style={{
        alignItems: "center", justifyContent: "center",
        background: "rgba(216,31,38,.07)",
        borderRight: "1px solid var(--line)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          width: 44, height: 44, background: "#D81F26",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: hovered ? "0 0 20px rgba(216,31,38,.35)" : "none",
          transition: "box-shadow .3s",
        }}>
          <Icon size={20} color="#fff" />
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: "28px 28px",
        position: "relative", zIndex: 1,
      }}>
        {/* Icon visible only on mobile — inline with tag */}
        <div className="flex lg:hidden" style={{
          alignItems: "center", gap: 12, marginBottom: 12,
        }}>
          <div style={{
            width: 36, height: 36, background: "#D81F26", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={16} color="#fff" />
          </div>
          <span style={{
            fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
            letterSpacing: 2, color: "#D81F26", textTransform: "uppercase",
          }}>
            // {tag}
          </span>
        </div>

        <span className="hidden lg:block" style={{
          fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
          letterSpacing: 2, color: "#D81F26", textTransform: "uppercase",
          marginBottom: 8,
        }}>
          // {tag}
        </span>
        <h3 style={{
          fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
          fontSize: "clamp(20px,2vw,28px)", textTransform: "uppercase",
          color: "var(--fg)", margin: 0, marginBottom: 10, lineHeight: 1,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: "'Archivo',sans-serif", fontSize: 14,
          color: "var(--muted)", lineHeight: 1.65, margin: 0,
        }}>
          {description}
        </p>

        {/* Features visible only on mobile */}
        <div className="flex lg:hidden" style={{
          flexDirection: "column", gap: 10, marginTop: 16,
          paddingTop: 16, borderTop: "1px solid var(--line)",
        }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, background: "#D81F26", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Archivo',sans-serif", fontSize: 13,
                fontWeight: 600, color: "var(--fg)",
              }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features — desktop only */}
      <div className="hidden lg:flex" style={{
        padding: "28px 32px",
        borderLeft: "1px solid var(--line)",
        flexDirection: "column",
        justifyContent: "center", gap: 12,
        position: "relative", zIndex: 1,
      }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 20, height: 20, background: "rgba(216,31,38,.12)",
              border: "1px solid rgba(216,31,38,.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <div style={{ width: 5, height: 5, background: "#D81F26" }} />
            </div>
            <span style={{
              fontFamily: "'Archivo',sans-serif", fontSize: 13,
              fontWeight: 600, color: "var(--fg)", whiteSpace: "nowrap",
            }}>
              {f}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const providers = [
  "aquapak.jpg","aro.png","barnes.jpg","Bell_Gossett_rgb.jpg","bonasa.jpg",
  "goulds.jpg","grundfos.jpg","LittleGiant.jpg","Logo-Evans-600.png","mann_pumps.png",
  "Myers_Logo.png","nord_drive_systems.jpg","OIP.jpg","oli-logo.png","Pedrollo.png",
  "q_pumps.png","sumitomo.jpg","trasnstecno.jpg","us_motors.jpg","wdm-pumms.png",
  "weg-logo.png","Yamada.jpg",
];

export default function Servicios() {
  return (
    <section
      id="services"
      className="section-pad"
      style={{ background: "var(--bg)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span className="eyebrow">// SERVICIOS</span>
          <h2 style={{
            fontFamily: "'Saira Condensed',sans-serif",
            fontWeight: 800, fontSize: "clamp(32px,4vw,44px)",
            textTransform: "uppercase", color: "var(--fg)",
            margin: 0, lineHeight: 1.05,
          }}>
            SOLUCIONES INDUSTRIALES<br />
            <span style={{ color: "#D81F26" }}>DE PRIMERA CLASE</span>
          </h2>
          <p style={{
            fontFamily: "'Archivo',sans-serif", fontSize: 16, color: "var(--muted)",
            lineHeight: 1.55, maxWidth: 580, marginTop: 14,
          }}>
            Equipamiento de vanguardia y soluciones integrales para todas tus necesidades industriales, respaldado por 15 años de experiencia.
          </p>
        </div>

        {/* Main service cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginBottom: 18 }}>
          {services.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg2)", border: "1px solid var(--cardline)",
                borderRadius: 3, overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "4/3", background: "var(--bg3)" }}>
                <img
                  src={s.image}
                  alt={s.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span style={{
                  position: "absolute", top: 10, left: 10,
                  background: "#D81F26", color: "#fff",
                  fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
                  padding: "4px 8px", borderRadius: 2,
                }}>
                  {s.tag}
                </span>
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
                  fontSize: 21, textTransform: "uppercase", color: "var(--fg)",
                  lineHeight: 1, margin: 0, marginBottom: 10,
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: "'Archivo',sans-serif", fontSize: 14,
                  color: "var(--muted)", lineHeight: 1.55, marginBottom: 20,
                }}>
                  {s.description}
                </p>
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 6, height: 6, background: "#D81F26", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, fontWeight: 600, color: "var(--fg)" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra services */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 72 }}>
          {extraServices.map((s, i) => <ExtraServiceRow key={i} {...s} />)}
        </div>

        {/* Providers */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 56 }}>
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">// SOCIOS COMERCIALES</span>
            <h3 style={{
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
              fontSize: "clamp(28px,3.5vw,40px)", textTransform: "uppercase",
              color: "var(--fg)", margin: 0, lineHeight: 1.05,
            }}>
              TRABAJAMOS CON LAS <span style={{ color: "#D81F26" }}>MEJORES MARCAS</span>
            </h3>
            <p style={{
              fontFamily: "'Archivo',sans-serif", fontSize: 15, color: "var(--muted)",
              marginTop: 10, maxWidth: 500,
            }}>
              Más de 20 proveedores líderes respaldan nuestros servicios con equipos de la más alta calidad.
            </p>
          </div>
          <ProveedoresCarousel providers={providers} />
        </div>
      </div>
    </section>
  );
}
