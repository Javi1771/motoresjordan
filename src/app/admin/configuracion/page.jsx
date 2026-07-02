"use client";
import { useEffect, useState } from "react";
import { Input, SaveButton } from "@/components/admin/AdminField";

const EMPTY = {
  telefono1: "", telefono2: "", correo: "", whatsapp: "",
  direccion1: "", direccion2: "", horario: "",
  facebook: "", instagram: "", textoHero: "", subtextoHero: "",
};

function Section({ title, children }) {
  return (
    <div style={{ background: "var(--bg2)", border: "1px solid var(--line)", padding: 20 }}>
      <h2 style={{
        fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
        color: "var(--fg)", margin: "0 0 16px", paddingBottom: 12,
        borderBottom: "1px solid var(--line)", textTransform: "uppercase", letterSpacing: 1,
      }}>
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {children}
      </div>
    </div>
  );
}

export default function ConfiguracionPage() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/configuracion")
      .then((r) => r.json())
      .then((data) => { setForm({ ...EMPTY, ...data }); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); setSaving(true); setError(""); setSuccess(false);
    try {
      const res = await fetch("/api/admin/configuracion", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error."); return; }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch { setError("Error de conexión."); }
    finally { setSaving(false); }
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0", fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--faint)" }}>
        Cargando configuración...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--fg)", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
          Configuración del sitio
        </h1>
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
          Administra la información de contacto y textos principales.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {error && (
          <div style={{ padding: "11px 14px", background: "rgba(216,31,38,.08)", border: "1px solid rgba(216,31,38,.25)", color: "#D81F26", fontFamily: "'Archivo',sans-serif", fontSize: 13 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ padding: "11px 14px", background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.25)", color: "#22c55e", fontFamily: "'Archivo',sans-serif", fontSize: 13 }}>
            ✓ Configuración guardada correctamente.
          </div>
        )}

        <Section title="Contacto">
          <div className="admin-2col">
            <Input label="Teléfono 1" value={form.telefono1}
              onChange={(e) => set("telefono1", e.target.value)} placeholder="427 272 4036" />
            <Input label="Teléfono 2" value={form.telefono2}
              onChange={(e) => set("telefono2", e.target.value)} placeholder="427 101 1168" />
            <Input label="Correo" type="email" value={form.correo}
              onChange={(e) => set("correo", e.target.value)} placeholder="contacto@motoresjordanmx.com" />
            <Input label="WhatsApp (solo dígitos)" value={form.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)} placeholder="524273762379" />
          </div>
        </Section>

        <Section title="Direcciones">
          <Input label="Sucursal 1" value={form.direccion1}
            onChange={(e) => set("direccion1", e.target.value)}
            placeholder="C. José María Morelos 126-C, Centro, San Juan del Río" />
          <Input label="Sucursal 2" value={form.direccion2}
            onChange={(e) => set("direccion2", e.target.value)}
            placeholder="Plaza de las Naciones, Parque Industrial..." />
          <Input label="Horario de atención" value={form.horario}
            onChange={(e) => set("horario", e.target.value)} placeholder="Lunes a Viernes: 8:00 - 16:00" />
        </Section>

        <Section title="Redes sociales">
          <div style={{ padding: "10px 14px", background: "rgba(216,31,38,.06)", border: "1px solid rgba(216,31,38,.18)", fontFamily: "'Archivo',sans-serif", fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
            Estas URLs se usan en el SEO del sitio (Google Knowledge Graph). Agrega las URLs completas de tus perfiles.
          </div>
          <div className="admin-2col">
            <Input label="Facebook (URL)" value={form.facebook}
              onChange={(e) => set("facebook", e.target.value)} placeholder="https://www.facebook.com/motoresjordan" />
            <Input label="Instagram (URL)" value={form.instagram}
              onChange={(e) => set("instagram", e.target.value)} placeholder="https://www.instagram.com/motoresjordan" />
          </div>
          <Input label="Google Business (URL)" value={form.googleBusiness ?? ""}
            onChange={(e) => set("googleBusiness", e.target.value)} placeholder="https://g.page/motoresjordan" />
        </Section>

        <Section title="Textos del Hero (página de inicio)">
          <Input label="Texto principal del hero" value={form.textoHero}
            onChange={(e) => set("textoHero", e.target.value)}
            placeholder="Soluciones profesionales en sistemas de bombeo..." />
          <Input label="Subtexto del hero" value={form.subtextoHero}
            onChange={(e) => set("subtextoHero", e.target.value)}
            placeholder="con tecnología de vanguardia" />
        </Section>

        <div style={{ maxWidth: 280 }}>
          <SaveButton loading={saving} label="Guardar configuración" />
        </div>
      </form>
    </div>
  );
}
