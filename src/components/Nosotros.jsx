import React from "react";

const applications = [
  { title: "CONSTRUCCIÓN", desc: "Bombas para achique, concreto y agua en obra" },
  { title: "INDUSTRIA", desc: "Procesos químicos, alimentos, farmacéutico" },
  { title: "RIEGO", desc: "Sistemas de irrigación agrícola y residencial" },
  { title: "CONTRA INCENDIO", desc: "Equipos certificados para protección civil" },
];

const cards = [
  { num: "01", label: "TRABAJO COOPERATIVO", value: "El conocimiento compartido y la sinergia entre equipo y cliente son la base de cada proyecto exitoso." },
  { num: "02", label: "ESPECIALISTAS", value: "Expertos en motores eléctricos, bombas, reductores y transmisión de potencia para industria y comercio." },
  { num: "03", label: "CALIDAD PREMIUM", value: "Refacciones genuinas y marcas líderes mundiales: Siemens, WEG, Pentair, Leeson y más." },
  { num: "04", label: "SECTORES DIVERSOS", value: "Atendemos farmacéutico, alimenticio, construcción, agrícola, residencial e industrial." },
  { num: "05", label: "SERVICIO RÁPIDO", value: "Stock permanente y entregas express para minimizar tiempos de paro en tu operación." },
  { num: "06", label: "COMPROMISO TOTAL", value: "Recomendados por la excelencia en atención y servicio posventa. Tu satisfacción es nuestra meta." },
];

const stats = [
  { number: "18+", label: "AÑOS DE\nEXPERIENCIA" },
  { number: "2", label: "SUCURSALES\nQUERÉTARO" },
  { number: "100%", label: "SATISFACCIÓN\nGARANTIZADA" },
];

export default function Nosotros() {
  return (
    <section id="about" style={{ background: "var(--bg)" }}>

      {/* ── Applications band (always black) ─── */}
      <div className="section-pad" style={{ background: "#0E0E0F" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1280, margin: "0 auto", gap: 48, alignItems: "start" }}>
          {/* Left: text */}
          <div>
            <span className="eyebrow">// APLICACIONES</span>
            <h2 style={{
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
              fontSize: "clamp(28px,3.5vw,42px)", textTransform: "uppercase",
              color: "#EDEDED", margin: 0, marginBottom: 16, lineHeight: 1.05,
            }}>
              ¿POR QUÉ ELEGIR<br />
              <span style={{ color: "#D81F26" }}>JORDAN?</span>
            </h2>
            <p style={{
              fontFamily: "'Archivo',sans-serif", fontSize: 16,
              color: "#9A9A9E", lineHeight: 1.55, maxWidth: 440, marginBottom: 12,
            }}>
              Somos una empresa proactiva, de origen queretano, fundada en el año 2008 y dedicada al comercio de motores eléctricos, motobombas, reductores y equipo de control.
            </p>
            <p style={{
              fontFamily: "'Archivo',sans-serif", fontSize: 16,
              color: "#9A9A9E", lineHeight: 1.55, maxWidth: 440, marginBottom: 0,
            }}>
              Con más de <strong style={{ color: "#D81F26" }}>18 años de experiencia</strong>, somos líderes en soluciones de bombeo industrial, transmisión de potencia y control industrial en San Juan del Río, Querétaro.
            </p>

            {/* Trust stats */}
            <div style={{ display: "flex", gap: 0, marginTop: 40, borderTop: "1px solid #232327" }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  flex: 1, padding: "20px 16px",
                  borderRight: i < stats.length - 1 ? "1px solid #232327" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
                    fontSize: 32, color: "#EDEDED", lineHeight: 1,
                  }}>
                    {s.number}
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 10,
                    color: "#6A6A70", whiteSpace: "pre-line", marginTop: 4,
                    textTransform: "uppercase", lineHeight: 1.4,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: application tiles */}
          <div className="nosotros-apps-grid">
            {applications.map((a, i) => (
              <div key={i} style={{
                background: "#161618", border: "1px solid #26262A",
                padding: "20px 18px",
              }}>
                <div style={{
                  width: 10, height: 10, background: "#D81F26",
                  marginBottom: 14,
                }} />
                <div style={{
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
                  fontSize: 19, textTransform: "uppercase", color: "#EDEDED",
                  lineHeight: 1, marginBottom: 8,
                }}>
                  {a.title}
                </div>
                <div style={{
                  fontFamily: "'Space Mono',monospace", fontSize: 10,
                  color: "#6A6A70", lineHeight: 1.5,
                }}>
                  {a.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content cards ─────────────────────────────── */}
      <div className="section-pad" style={{ background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <span className="eyebrow">// NUESTRA FILOSOFÍA</span>
            <h3 style={{
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
              fontSize: 32, textTransform: "uppercase", color: "var(--fg)",
              margin: 0,
            }}>
              LO QUE NOS DISTINGUE
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
            {cards.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg)", border: "1px solid var(--line)",
                  padding: "24px 22px", position: "relative", overflow: "hidden",
                  transition: "border-color .2s, transform .2s",
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
                {/* Number watermark */}
                <div style={{
                  position: "absolute", top: 12, right: 16,
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
                  fontSize: 52, color: "var(--line)", lineHeight: 1, userSelect: "none",
                }}>
                  {c.num}
                </div>
                {/* Red accent bar */}
                <div style={{ width: 28, height: 3, background: "#D81F26", marginBottom: 16 }} />
                <div style={{
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
                  fontSize: 17, textTransform: "uppercase", color: "var(--fg)",
                  lineHeight: 1.1, marginBottom: 10,
                }}>
                  {c.label}
                </div>
                <p style={{
                  fontFamily: "'Archivo',sans-serif", fontSize: 13,
                  color: "var(--muted)", lineHeight: 1.65, margin: 0,
                }}>
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
