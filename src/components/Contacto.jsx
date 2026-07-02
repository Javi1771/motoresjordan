"use client";
import React, { useState } from "react";
import { Send, Mail, CheckCircle, AlertCircle, MapPin, Phone, Clock, Truck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const MAPS_CENTRO = "https://www.google.com.mx/maps/place/Moto-Bombas+y+Reductores+Jordan+S.A+de+C.V./@20.3917469,-99.9957687,935m/data=!3m3!1e3!4b1!5s0x85d30b628732a6ab:0xac2f3bcd1e252bed!4m6!3m5!1s0x85d30b6280a9afff:0x80a19ba652dc9adb!8m2!3d20.391747!4d-99.9908978!16s%2Fg%2F11bx89x828?hl=es";
const MAPS_INDUSTRIAL = "https://www.google.com.mx/maps/@20.366105,-99.9574319,3a,75y,144.67h,92.4t/data=!3m7!1e1!3m5!1s0WbjlgXpECyG4Ch1diDCIw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-2.4039200749683403%26panoid%3D0WbjlgXpECyG4Ch1diDCIw%26yaw%3D144.66835371465618!7i16384!8i8192?hl=es";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  function validate() {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido";
    if (!/^\d{10}$/.test(form.telefono.replace(/\D/g, ""))) e.telefono = "10 dígitos";
    if (!form.mensaje.trim()) e.mensaje = "Requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function change(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setStatusMsg(data.error ?? "Error al enviar. Intenta de nuevo.");
      } else {
        setStatus("success");
        setStatusMsg("¡Mensaje enviado! Te contactaremos pronto.");
        setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
      }
    } catch {
      setStatus("error");
      setStatusMsg("Error de conexión.");
    }
  }

  function whatsApp() {
    if (!validate()) return;
    const msg = `Hola, solicito cotización.\n\n*Nombre:* ${form.nombre}\n*Email:* ${form.email}\n*Teléfono:* ${form.telefono}\n\n*Mensaje:*\n${form.mensaje}`;
    window.open(`https://wa.me/524273762379?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const fieldStyle = (field) => ({
    width: "100%", padding: "12px 14px",
    background: "var(--bg)", border: `1px solid ${errors[field] ? "#D81F26" : "var(--line)"}`,
    color: "var(--fg)", fontFamily: "'Archivo',sans-serif", fontSize: 14,
    outline: "none", boxSizing: "border-box",
    borderRadius: 0,
  });

  const labelStyle = {
    fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
    color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1,
    display: "block", marginBottom: 6,
  };

  return (
    <section id="contacto" className="section-pad" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* CTA Band (always red) */}
        <div
          className="contacto-cta"
          style={{
            background: "#D81F26", padding: "40px 48px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 24, marginBottom: 60,
          }}
        >
          <div>
            <h2 style={{
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
              fontSize: "clamp(28px,4vw,42px)", textTransform: "uppercase",
              color: "#0E0E0F", margin: 0, lineHeight: 1,
            }}>
              ¿LISTO PARA COTIZAR?
            </h2>
            <p style={{
              fontFamily: "'Archivo',sans-serif", fontSize: 16, fontWeight: 600,
              color: "#2A0A0C", marginTop: 8,
            }}>
              Expertos en soluciones de bombeo industrial con más de 15 años de experiencia
            </p>
          </div>
          <a
            href="https://wa.me/524273762379"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#0E0E0F", color: "#fff", border: "none", cursor: "pointer",
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
              letterSpacing: 1, padding: "14px 28px", textTransform: "uppercase",
              textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <FaWhatsapp size={18} /> CONTACTAR AHORA →
          </a>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 48, alignItems: "start" }}>

          {/* Contact info + Sucursales */}
          <div>
            <span className="eyebrow">// CONTACTO</span>
            <h3 style={{
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
              fontSize: 32, textTransform: "uppercase", color: "var(--fg)",
              margin: 0, marginBottom: 24,
            }}>
              ENCUENTRA TU SUCURSAL
            </h3>

            {/* Cobertura */}
            <div style={{
              display: "flex", gap: 12, alignItems: "center",
              padding: "12px 16px", marginBottom: 24,
              background: "rgba(216,31,38,.06)", border: "1px solid rgba(216,31,38,.2)",
            }}>
              <Truck size={16} color="#D81F26" style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--fg)" }}>
                Envío a toda la <strong>República Mexicana</strong> mediante fleteras
              </span>
            </div>

            {/* Sucursal Centro */}
            <div style={{ border: "1px solid var(--line)", marginBottom: 16, overflow: "hidden" }}>
              <a
                href={MAPS_CENTRO}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", height: 160, overflow: "hidden" }}
              >
                <img
                  src="/direccion1.jpg"
                  alt="Sucursal Centro"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 60%)" }} />
                <div style={{
                  position: "absolute", bottom: 10, left: 12,
                  fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#fff",
                  letterSpacing: 1, display: "flex", alignItems: "center", gap: 6,
                }}>
                  <MapPin size={11} color="#D81F26" /> VER EN GOOGLE MAPS →
                </div>
              </a>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16, textTransform: "uppercase", color: "var(--fg)", marginBottom: 8 }}>
                  SUCURSAL CENTRO
                </div>
                <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.55, marginBottom: 8 }}>
                  C. José María Morelos 126-C, Centro<br />76800 San Juan del Río, Qro.
                </div>
                <a href="tel:4272724036" style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <Phone size={11} /> 427 272 4036
                </a>
              </div>
            </div>

            {/* Sucursal Industrial */}
            <div style={{ border: "1px solid var(--line)", overflow: "hidden" }}>
              <a
                href={MAPS_INDUSTRIAL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", height: 160, overflow: "hidden" }}
              >
                <img
                  src="/direccion2.jpg"
                  alt="Sucursal Parque Industrial"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 60%)" }} />
                <div style={{
                  position: "absolute", bottom: 10, left: 12,
                  fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#fff",
                  letterSpacing: 1, display: "flex", alignItems: "center", gap: 6,
                }}>
                  <MapPin size={11} color="#D81F26" /> VER EN GOOGLE MAPS →
                </div>
              </a>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16, textTransform: "uppercase", color: "var(--fg)", marginBottom: 8 }}>
                  SUCURSAL PARQUE INDUSTRIAL
                </div>
                <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.55, marginBottom: 8 }}>
                  Plaza de las Naciones, Prol. Av. México No. 5-1, Local 11<br />Parque Industrial Nuevo San Juan, C.P. 76806, Qro.
                </div>
                <a href="tel:4271011168" style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <Phone size={11} /> 427 101 1168
                </a>
              </div>
            </div>

            {/* Horario */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", marginTop: 16, borderTop: "1px solid var(--line)" }}>
              <Clock size={14} color="#D81F26" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--muted)", letterSpacing: 1, marginBottom: 2 }}>HORARIO</div>
                <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--fg)" }}>Lunes – Viernes · 8:00 – 16:00 hrs</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contacto-form-pad" style={{ background: "var(--bg2)", border: "1px solid var(--line)", padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, background: "#D81F26", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Send size={18} color="#fff" />
              </div>
              <h3 style={{
                fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
                fontSize: 22, textTransform: "uppercase", color: "var(--fg)", margin: 0,
              }}>
                SOLICITA UNA COTIZACIÓN
              </h3>
            </div>

            {status === "success" && (
              <div style={{ marginBottom: 16, padding: "12px 16px", background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.3)", display: "flex", gap: 10, alignItems: "center" }}>
                <CheckCircle size={16} color="#22c55e" />
                <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "#22c55e" }}>{statusMsg}</span>
              </div>
            )}
            {status === "error" && (
              <div style={{ marginBottom: 16, padding: "12px 16px", background: "rgba(216,31,38,.1)", border: "1px solid rgba(216,31,38,.3)", display: "flex", gap: 10, alignItems: "center" }}>
                <AlertCircle size={16} color="#D81F26" />
                <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "#D81F26" }}>{statusMsg}</span>
              </div>
            )}

            <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label htmlFor="contacto-nombre" style={labelStyle}>Nombre <span style={{ color: "#D81F26" }}>*</span></label>
                <input id="contacto-nombre" type="text" name="nombre" value={form.nombre} onChange={change}
                  style={fieldStyle("nombre")} placeholder="Tu nombre completo" autoComplete="name" />
                {errors.nombre && <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26", marginTop: 4, display: "block" }}>{errors.nombre}</span>}
              </div>

              <div className="contacto-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label htmlFor="contacto-email" style={labelStyle}>Email <span style={{ color: "#D81F26" }}>*</span></label>
                  <input id="contacto-email" type="email" name="email" value={form.email} onChange={change}
                    style={fieldStyle("email")} placeholder="Tu mejor email" autoComplete="email" />
                  {errors.email && <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26", marginTop: 4, display: "block" }}>{errors.email}</span>}
                </div>
                <div>
                  <label htmlFor="contacto-telefono" style={labelStyle}>Teléfono <span style={{ color: "#D81F26" }}>*</span></label>
                  <input id="contacto-telefono" type="tel" name="telefono" value={form.telefono} onChange={change}
                    style={fieldStyle("telefono")} placeholder="4271234567" autoComplete="tel" />
                  {errors.telefono && <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26", marginTop: 4, display: "block" }}>{errors.telefono}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="contacto-mensaje" style={labelStyle}>Mensaje <span style={{ color: "#D81F26" }}>*</span></label>
                <textarea id="contacto-mensaje" name="mensaje" rows={4} value={form.mensaje} onChange={change}
                  style={{ ...fieldStyle("mensaje"), resize: "none" }}
                  placeholder="Describe tu proyecto, tipo de equipo requerido, especificaciones..." />
                {errors.mensaje && <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26", marginTop: 4, display: "block" }}>{errors.mensaje}</span>}
              </div>

              <div className="contacto-btns">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%", background: "#D81F26", color: "#fff", border: "none",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
                    letterSpacing: 1, textTransform: "uppercase", padding: "14px 12px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    opacity: status === "loading" ? 0.6 : 1, transition: "opacity .15s",
                  }}
                  onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = status === "loading" ? "0.6" : "1"; }}
                >
                  {status === "loading" ? (
                    <div style={{ width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", flexShrink: 0 }} />
                  ) : (
                    <Mail size={16} style={{ flexShrink: 0 }} />
                  )}
                  {status === "loading" ? "ENVIANDO..." : "ENVIAR POR CORREO"}
                </button>
                <button
                  type="button"
                  onClick={whatsApp}
                  style={{
                    width: "100%", background: "#25D366", color: "#fff", border: "none", cursor: "pointer",
                    fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
                    letterSpacing: 1, textTransform: "uppercase", padding: "14px 12px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "opacity .15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  <FaWhatsapp size={18} style={{ flexShrink: 0 }} /> ENVIAR POR WHATSAPP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
