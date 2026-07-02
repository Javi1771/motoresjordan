"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn, MdSchedule } from "react-icons/md";
import { MapPin } from "lucide-react";

const STATIC_NAV = [
  { label: "Inicio",      href: "/#hero",        dynamic: false },
  { label: "Servicios",   href: "/#services",    dynamic: false },
  { label: "Catálogo",    href: "/#catalogo",    dynamic: true,  api: "/api/productos" },
  { label: "Promociones", href: "/#promociones", dynamic: true,  api: "/api/promociones" },
  { label: "Galería",     href: "/#galeria",     dynamic: true,  api: "/api/galeria" },
  { label: "Nosotros",    href: "/#about",       dynamic: false },
  { label: "Contacto",    href: "/#contacto",    dynamic: false },
];

const marcas = [
  "Baldor", "Goulds", "Grundfos", "Pedrollo", "WEG",
  "Sumitomo", "Nord", "Yamada", "Barnes", "US Motors", "+10 más",
];

const contactInfo = [
  { icon: MdLocationOn, label: "CENTRO",     value: "C. José María Morelos 126-C, San Juan del Río, Qro." },
  { icon: MdLocationOn, label: "PARQUE INDUSTRIAL", value: "Parque Industrial Nuevo San Juan, Local 11, San Juan del Río, Qro." },
  { icon: MdPhone,      label: "TELÉFONOS",   value: "427 272 4036 · 427 101 1168" },
  { icon: MdSchedule,   label: "HORARIO",    value: "Lun–Vie · 8:00–16:00 hrs" },
];

function HoverLink({ href, children }) {
  return (
    <a
      href={href}
      style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", textDecoration: "none", transition: "color .15s", display: "inline-block" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#D81F26"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [hasContent, setHasContent] = useState({});

  useEffect(() => {
    STATIC_NAV.filter((l) => l.dynamic).forEach(async ({ api, label }) => {
      try {
        const res = await fetch(api);
        const data = res.ok ? await res.json() : [];
        setHasContent((p) => ({ ...p, [label]: Array.isArray(data) && data.length > 0 }));
      } catch {
        setHasContent((p) => ({ ...p, [label]: false }));
      }
    });
  }, []);

  const navLinks = STATIC_NAV.filter(({ dynamic, label }) => !dynamic || hasContent[label] === true);

  return (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--line)" }}>

      {/* ── CTA Strip ─────────────────────────────────── */}
      <div className="footer-cta-strip" style={{ background: "#D81F26" }}>
          <div>
            <div style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", textTransform: "uppercase", letterSpacing: 1, lineHeight: 1 }}>
              ¿Necesitas cotizar un equipo?
            </div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "rgba(255,255,255,.75)", marginTop: 4 }}>
              Respondemos en menos de 2 horas en horario de oficina.
            </div>
          </div>
          <a
            href="https://wa.me/524273762379?text=Hola%2C%20me%20interesa%20solicitar%20una%20cotizaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#D81F26",
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 15,
              letterSpacing: 1, textTransform: "uppercase", padding: "12px 24px",
              textDecoration: "none", flexShrink: 0,
              transition: "opacity .15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            <FaWhatsapp size={18} /> COTIZAR →
          </a>
      </div>

      {/* ── Main grid ─────────────────────────────────── */}
      <div className="footer-main-pad" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-grid">

          {/* Col 1: Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, background: "#D81F26", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff" }}>J</span>
              </div>
              <div>
                <div style={{ display: "flex", gap: 4 }}>
                  <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 17, color: "var(--fg)", letterSpacing: 1 }}>MOTORES</span>
                  <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 17, color: "#D81F26", letterSpacing: 1 }}>JORDAN</span>
                </div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "var(--faint)", letterSpacing: 1, marginTop: 2 }}>
                  S.A. DE C.V.
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 22, maxWidth: 260 }}>
              Especialistas en sistemas de bombeo, transmisión de potencia y motores eléctricos. Más de 15 años sirviendo a la industria mexicana.
            </p>

            {/* Badges */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {["15+ años", "2 sucursales", "Querétaro"].map((b) => (
                <span key={b} style={{
                  fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)",
                  border: "1px solid var(--line)", padding: "3px 8px", letterSpacing: 1,
                }}>
                  {b}
                </span>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { href: "https://wa.me/524273762379", icon: FaWhatsapp, label: "WhatsApp", hoverColor: "#25D366" },
                { href: "mailto:contacto@motoresjordanmx.com", icon: MdEmail, label: "Email", hoverColor: "#D81F26" },
              ].map(({ href, icon: Icon, label, hoverColor }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36, background: "var(--bg3)",
                    border: "1px solid var(--line)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    textDecoration: "none", color: "var(--faint)",
                    transition: "border-color .15s, color .15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = hoverColor; e.currentTarget.style.color = hoverColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--faint)"; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Nav */}
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: "#D81F26", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
              // NAVEGACIÓN
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <HoverLink href={href}>{label}</HoverLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Marcas */}
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: "#D81F26", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
              // MARCAS
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {marcas.map((m) => (
                <span
                  key={m}
                  style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 9,
                    color: "var(--faint)", border: "1px solid var(--line)",
                    padding: "4px 8px", letterSpacing: 1,
                    transition: "border-color .15s, color .15s", cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D81F26"; e.currentTarget.style.color = "#D81F26"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--faint)"; }}
                >
                  {m}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 24, padding: "14px 16px", background: "var(--bg3)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#D81F26", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                DISTRIBUIDORES AUTORIZADOS
              </div>
              <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 12, color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
                Representamos marcas líderes en bombeo industrial, motores eléctricos y transmisión de potencia.
              </p>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: "#D81F26", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
              // CONTACTO
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 10 }}>
                  <Icon size={13} color="#D81F26" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#D81F26", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--muted)", lineHeight: 1.55, letterSpacing: 0.5 }}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: "1px solid var(--line)", paddingTop: 22 }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)", letterSpacing: 1, margin: 0 }}>
            © <span suppressHydrationWarning>{year}</span> MOTO-BOMBAS Y REDUCTORES JORDAN S.A. DE C.V. · TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={10} color="var(--faint)" />
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)", letterSpacing: 1, margin: 0 }}>
              SAN JUAN DEL RÍO, QUERÉTARO · MÉXICO
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
