"use client";
import { RefreshCw, Award, Shield, Users, Zap, Scale } from "lucide-react";

const valores = [
  { label: "Constancia",      Icon: RefreshCw },
  { label: "Calidad",         Icon: Award     },
  { label: "Responsabilidad", Icon: Shield    },
  { label: "Compañerismo",    Icon: Users     },
  { label: "Sinergia",        Icon: Zap       },
  { label: "Honestidad",      Icon: Scale     },
];

export default function MisionVision() {
  return (
    <section className="section-pad" style={{ background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span className="eyebrow">// IDENTIDAD CORPORATIVA</span>
          <h2 style={{
            fontFamily: "'Saira Condensed',sans-serif",
            fontWeight: 800, fontSize: "clamp(32px,4vw,44px)",
            textTransform: "uppercase", color: "var(--fg)",
            margin: 0, lineHeight: 1.05,
          }}>
            MISIÓN, VISIÓN<br />
            <span style={{ color: "#D81F26" }}>Y VALORES</span>
          </h2>
        </div>

        {/* Visión + Misión */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 18,
          marginBottom: 48,
        }}>
          {/* Visión */}
          <div style={{
            background: "#0E0E0F",
            border: "1px solid #232327",
            padding: "36px 32px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: 4,
              bottom: 0, background: "#D81F26",
            }} />
            <span style={{
              fontFamily: "'Space Mono',monospace", fontSize: 10,
              fontWeight: 700, letterSpacing: 2, color: "#D81F26",
              textTransform: "uppercase", display: "block", marginBottom: 16,
            }}>
              // VISIÓN
            </span>
            <p style={{
              fontFamily: "'Saira Condensed',sans-serif",
              fontWeight: 700, fontSize: "clamp(20px,2.5vw,26px)",
              color: "#EDEDED", lineHeight: 1.25, margin: 0,
              textTransform: "uppercase",
            }}>
              Ganarnos la confianza y reconocimiento del sector comercial e industrial.
            </p>
          </div>

          {/* Misión */}
          <div style={{
            background: "#0E0E0F",
            border: "1px solid #232327",
            padding: "36px 32px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: 4,
              bottom: 0, background: "#D81F26",
            }} />
            <span style={{
              fontFamily: "'Space Mono',monospace", fontSize: 10,
              fontWeight: 700, letterSpacing: 2, color: "#D81F26",
              textTransform: "uppercase", display: "block", marginBottom: 16,
            }}>
              // MISIÓN
            </span>
            <p style={{
              fontFamily: "'Saira Condensed',sans-serif",
              fontWeight: 700, fontSize: "clamp(20px,2.5vw,26px)",
              color: "#EDEDED", lineHeight: 1.25, margin: 0,
              textTransform: "uppercase",
            }}>
              Brindar soluciones efectivas a todas las necesidades de bombeo y transmisión de potencia.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div>
          <div style={{ marginBottom: 28 }}>
            <span className="eyebrow">// NUESTROS VALORES</span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}>
            {valores.map(({ label, Icon }, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--line)",
                  padding: "24px 20px",
                  display: "flex", flexDirection: "column",
                  alignItems: "flex-start", gap: 14,
                  transition: "border-color .2s, transform .2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#D81F26";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 40, height: 40,
                  background: "rgba(216,31,38,.12)",
                  border: "1px solid rgba(216,31,38,.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={18} color="#D81F26" />
                </div>
                <div style={{
                  fontFamily: "'Saira Condensed',sans-serif",
                  fontWeight: 700, fontSize: 18,
                  textTransform: "uppercase", color: "var(--fg)",
                  letterSpacing: 0.5,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
