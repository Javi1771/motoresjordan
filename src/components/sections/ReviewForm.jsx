"use client";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Star, Lightbulb } from "lucide-react";

const labelS = {
  fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
  color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1,
  display: "block", marginBottom: 6,
};

const inputS = (err) => ({
  width: "100%", padding: "11px 14px",
  background: "var(--bg)", border: `1px solid ${err ? "#D81F26" : "var(--line)"}`,
  color: "var(--fg)", fontFamily: "'Archivo',sans-serif", fontSize: 14,
  outline: "none", boxSizing: "border-box", borderRadius: 0,
});

export default function ReviewForm() {
  const [form, setForm] = useState({ nombre: "", email: "", tipo: "resena", rating: 5, mensaje: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [hover, setHover] = useState(0);

  function change(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.mensaje.trim()) e.mensaje = "Requerido";
    if (form.mensaje.length > 1000) e.mensaje = "Máx 1000 caracteres";
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: parseInt(form.rating) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setTimeout(() => setStatus(null), 4000);
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(null), 4000);
    }
  }

  if (status === "success") {
    return (
      <section className="section-pad" style={{ background: "var(--bg2)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <CheckCircle size={24} color="#22c55e" />
          </div>
          <h3 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 26, textTransform: "uppercase", color: "var(--fg)", margin: "0 0 12px" }}>
            {form.tipo === "resena" ? "¡GRACIAS POR TU RESEÑA!" : "¡GRACIAS POR TU PROPUESTA!"}
          </h3>
          <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>
            {form.tipo === "resena"
              ? "Tu reseña será revisada y publicada pronto si cumple con nuestros estándares."
              : "Hemos recibido tu propuesta de mejora. La revisaremos con atención."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="review-form" className="section-pad" style={{ background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 48, alignItems: "start" }}>

          {/* Left: context */}
          <div>
            <span className="eyebrow">// TU OPINIÓN IMPORTA</span>
            <h2 style={{
              fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
              fontSize: "clamp(28px,3.5vw,40px)", textTransform: "uppercase",
              color: "var(--fg)", margin: "0 0 16px", lineHeight: 1.05,
            }}>
              COMPARTE TU<br />
              <span style={{ color: "#D81F26" }}>EXPERIENCIA</span>
            </h2>
            <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 15, color: "var(--muted)", lineHeight: 1.65, maxWidth: 400, marginBottom: 32 }}>
              ¿Nos visaste o compraste con nosotros? Cuéntanos cómo fue tu experiencia o envíanos una propuesta de mejora. Tu retroalimentación nos ayuda a crecer.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { icon: Star, label: "RESEÑA", desc: "Comparte tu experiencia con nuestros productos y atención" },
                { icon: Lightbulb, label: "PROPUESTA", desc: "Ayúdanos a mejorar nuestro servicio o sitio web" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ width: 32, height: 32, background: "var(--bg)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={14} color="#D81F26" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: "var(--fg)", letterSpacing: 1 }}>{label}</div>
                    <div style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: "var(--bg)", border: "1px solid var(--line)", padding: 32 }}>

            {status === "error" && (
              <div style={{ marginBottom: 16, padding: "12px 16px", background: "rgba(216,31,38,.08)", border: "1px solid rgba(216,31,38,.3)", display: "flex", gap: 10, alignItems: "center" }}>
                <AlertCircle size={15} color="#D81F26" />
                <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "#D81F26" }}>Error al enviar. Inténtalo de nuevo.</span>
              </div>
            )}

            <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Tipo selector */}
              <div>
                <label style={labelS}>Tipo de envío</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { v: "resena", icon: Star, label: "RESEÑA" },
                    { v: "propuesta", icon: Lightbulb, label: "PROPUESTA" },
                  ].map(({ v, icon: Icon, label }) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, tipo: v }))}
                      style={{
                        padding: "10px 12px", border: `1px solid ${form.tipo === v ? "#D81F26" : "var(--line)"}`,
                        background: form.tipo === v ? "rgba(216,31,38,.08)" : "transparent",
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                        transition: "all .15s",
                      }}
                    >
                      <Icon size={13} color={form.tipo === v ? "#D81F26" : "var(--muted)"} />
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: 1, color: form.tipo === v ? "#D81F26" : "var(--muted)" }}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating (only for reseña) */}
              {form.tipo === "resena" && (
                <div>
                  <label style={labelS}>Calificación</label>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onMouseEnter={() => setHover(n)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setForm((p) => ({ ...p, rating: n }))}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", fontSize: 22, lineHeight: 1 }}
                      >
                        <span style={{ color: n <= (hover || form.rating) ? "#D81F26" : "var(--line)", transition: "color .1s" }}>★</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Nombre */}
              <div>
                <label htmlFor="review-nombre" style={labelS}>Nombre <span style={{ color: "#D81F26" }}>*</span></label>
                <input id="review-nombre" name="nombre" value={form.nombre} onChange={change} style={inputS(errors.nombre)} placeholder="Tu nombre" />
                {errors.nombre && <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#D81F26", marginTop: 4, display: "block" }}>{errors.nombre}</span>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="review-email" style={labelS}>Email <span style={{ color: "var(--muted)" }}>(opcional)</span></label>
                <input id="review-email" name="email" type="email" value={form.email} onChange={change} style={inputS(false)} placeholder="Tu mejor email" />
              </div>

              {/* Mensaje */}
              <div>
                <label style={labelS}>
                  {form.tipo === "resena" ? "Tu reseña" : "Tu propuesta"} <span style={{ color: "#D81F26" }}>*</span>
                </label>
                <textarea
                  name="mensaje"
                  rows={4}
                  value={form.mensaje}
                  onChange={change}
                  maxLength={1000}
                  style={{ ...inputS(errors.mensaje), resize: "none" }}
                  placeholder={form.tipo === "resena" ? "¿Cómo fue tu experiencia con Motores Jordan?" : "¿Qué podríamos mejorar?"}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  {errors.mensaje && <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#D81F26" }}>{errors.mensaje}</span>}
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--muted)", marginLeft: "auto" }}>{form.mensaje.length}/1000</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  background: "#D81F26", color: "#fff", border: "none", cursor: "pointer",
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
                  letterSpacing: 1, textTransform: "uppercase", padding: "14px 20px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  opacity: status === "loading" ? 0.6 : 1, transition: "opacity .15s",
                }}
              >
                {status === "loading" ? (
                  <div style={{ width: 15, height: 15, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
                ) : <Send size={15} />}
                {status === "loading" ? "ENVIANDO..." : "ENVIAR →"}
              </button>

              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--muted)", margin: 0, lineHeight: 1.6, letterSpacing: 0.5 }}>
                Las reseñas son revisadas antes de publicarse · Las propuestas son confidenciales
              </p>
            </form>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
