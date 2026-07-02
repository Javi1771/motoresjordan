"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Megaphone, ImageIcon, FileText, Images, Settings, Star, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  {
    label: "CATÁLOGO",    sub: "Productos",           href: "/admin/catalogo",
    icon: Package,        endpoint: "/api/admin/productos",  color: "#D81F26",
    desc: "Aquí gestionas todos los productos que aparecen en la sección 'Catálogo' del sitio web. Puedes agregar productos nuevos, editar los existentes o eliminarlos. Cada producto tiene nombre, descripción, precio, categoría e imagen.",
    steps: [
      "Haz clic en '+ NUEVO PRODUCTO' para agregar uno.",
      "Rellena el nombre, descripción corta y precio.",
      "Sube una imagen del producto (preferentemente cuadrada).",
      "Activa el producto para que aparezca en el sitio. Si lo desactivas, se oculta sin borrarlo.",
      "Marca 'Destacado' si quieres que aparezca primero en el catálogo.",
    ],
    warning: "Si un producto no está activo, los clientes no lo verán aunque exista en el sistema.",
  },
  {
    label: "PROMOCIONES", sub: "Ofertas activas",     href: "/admin/promociones",
    icon: Megaphone,      endpoint: "/api/admin/promociones", color: "#f97316",
    desc: "Crea y administra las ofertas y descuentos que aparecen en la sección 'Promociones' del sitio. Puedes configurar una fecha de vencimiento para que las promociones se oculten automáticamente cuando expiren.",
    steps: [
      "Haz clic en '+ NUEVA PROMOCIÓN' para crear una.",
      "Escribe el título del descuento o promoción (ej. '20% en motores Baldor').",
      "Sube una imagen llamativa para atraer atención.",
      "Configura la fecha de fin. Cuando llegue esa fecha, la promoción desaparece sola del sitio.",
      "Si no pones fecha de fin, la promoción se muestra indefinidamente.",
    ],
    warning: "Las secciones 'Catálogo' y 'Promociones' solo aparecen en el menú del sitio si tienen al menos un elemento activo.",
  },
  {
    label: "BANNERS",     sub: "Imágenes destacadas", href: "/admin/banners",
    icon: ImageIcon,      endpoint: "/api/admin/banners",     color: "#8b5cf6",
    desc: "Los banners son imágenes grandes que se muestran en el inicio o cabecera del sitio, generalmente en un carrusel o slider. Son ideales para anuncios importantes, nuevas colecciones o eventos especiales.",
    steps: [
      "Haz clic en '+ NUEVO BANNER' para agregar uno.",
      "Sube la imagen (recomendado: 1920×600 píxeles, formato panorámico).",
      "Agrega un título y descripción opcional que se muestre sobre la imagen.",
      "Define el orden de aparición. El número más bajo aparece primero.",
      "Desactiva un banner si quieres ocultarlo temporalmente sin borrarlo.",
    ],
    warning: "Imágenes muy pesadas (más de 1 MB) ralentizan el sitio. Comprímelas antes de subirlas.",
  },
  {
    label: "GALERÍA",     sub: "Trabajos realizados", href: "/admin/galeria",
    icon: Images,         endpoint: "/api/admin/galeria",     color: "#06b6d4",
    desc: "La galería muestra fotografías de proyectos completados, instalaciones realizadas o equipos en operación. Es una sección de portafolio que genera confianza en los clientes potenciales.",
    steps: [
      "Haz clic en '+ NUEVA FOTO' para agregar imágenes.",
      "Sube la fotografía del trabajo realizado.",
      "Agrega una descripción breve que explique el proyecto (ej. 'Instalación de bomba centrífuga para empresa farmacéutica').",
      "Las imágenes se muestran en cuadrícula. Formato cuadrado (1:1) se ve mejor.",
      "Elimina fotos antiguas o de baja calidad para mantener la galería profesional.",
    ],
    warning: "La sección 'Galería' solo aparece en el menú del sitio si tiene al menos una foto.",
  },
  {
    label: "ARTÍCULOS",   sub: "Blog y noticias",     href: "/admin/articulos",
    icon: FileText,       endpoint: "/api/admin/articulos",   color: "#22c55e",
    desc: "Publica noticias, guías técnicas, consejos de mantenimiento o novedades del sector industrial. Los artículos ayudan a posicionar el sitio en Google y demuestran experiencia técnica.",
    steps: [
      "Haz clic en '+ NUEVO ARTÍCULO' para crear uno.",
      "Escribe un título claro y descriptivo.",
      "Agrega el contenido: puede ser texto, listas, instrucciones, etc.",
      "Sube una imagen de portada representativa.",
      "Publica el artículo cuando esté listo. Puedes guardarlo como borrador si no está terminado.",
    ],
    warning: "Publica artículos con regularidad (al menos una vez al mes) para mantener el sitio activo y mejorar su posicionamiento en buscadores.",
  },
  {
    label: "RESEÑAS",     sub: "Opiniones clientes",  href: "/admin/resenas",
    icon: Star,           endpoint: "/api/admin/resenas",     color: "#eab308",
    desc: "Aquí aparecen las opiniones que los clientes envían desde el formulario de contacto del sitio. Puedes aprobarlas para que sean visibles en el sitio, o rechazarlas si no son apropiadas.",
    steps: [
      "Revisa las nuevas reseñas pendientes de aprobación.",
      "Lee el comentario y calificación del cliente.",
      "Aprueba las reseñas positivas y reales para que aparezcan en el sitio.",
      "Rechaza o elimina reseñas falsas, inapropiadas o de spam.",
      "Las reseñas aprobadas aparecen en la sección de testimonios del sitio.",
    ],
    warning: "Responder y moderar reseñas aumenta la confianza de los visitantes. Revísalas al menos una vez a la semana.",
  },
];

export default function AdminDashboard() {
  const [counts,       setCounts]       = useState({});
  const [loadingCounts,setLoadingCounts]= useState(true);
  const [guideOpen,    setGuideOpen]    = useState(false);
  const [activeGuide,  setActiveGuide]  = useState(null);

  useEffect(() => {
    let remaining = sections.length;
    sections.forEach(async ({ endpoint, label }) => {
      try {
        const res  = await fetch(endpoint);
        const data = res.ok ? await res.json() : [];
        setCounts((p) => ({ ...p, [label]: Array.isArray(data) ? data.length : 0 }));
      } catch {
        setCounts((p) => ({ ...p, [label]: 0 }));
      } finally {
        remaining--;
        if (remaining === 0) setLoadingCounts(false);
      }
    });
  }, []);

  const totalItems = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          // PANEL DE CONTROL
        </div>
        <h1 className="admin-dash-h1">
          BIENVENIDO AL ADMIN
        </h1>
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "var(--faint)", margin: 0 }}>
          Gestiona el contenido de Motores Jordan desde aquí.{" "}
          {!loadingCounts && (
            <span style={{ color: "var(--muted)" }}>{totalItems} registros en total.</span>
          )}
        </p>
      </div>

      {/* Stat cards */}
      <div className="admin-stat-grid">
        {sections.map(({ label, sub, href, icon: Icon, color }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "var(--bg2)", border: "1px solid var(--line)",
                padding: "18px 18px 16px", position: "relative", overflow: "hidden",
                transition: "border-color .15s, transform .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ width: 32, height: 32, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>
                  <Icon size={15} color={color} />
                </div>
                <div style={{
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 32,
                  color: counts[label] !== undefined ? "var(--fg)" : "var(--line)",
                  lineHeight: 1, transition: "color .2s",
                }}>
                  {counts[label] !== undefined ? counts[label] : "—"}
                </div>
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: "var(--fg)", letterSpacing: 1, textTransform: "uppercase" }}>
                {label}
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)", letterSpacing: 1, marginTop: 3 }}>
                {sub}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Guía rápida toggle */}
      <div style={{ marginBottom: 36 }}>
        <button
          onClick={() => setGuideOpen(!guideOpen)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--bg2)", border: "1px solid var(--line)",
            padding: "12px 20px", cursor: "pointer", width: "100%",
            fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
            color: "#D81F26", letterSpacing: 2, textTransform: "uppercase",
            textAlign: "left", transition: "border-color .15s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#D81F26"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line)"}
        >
          <span style={{ flex: 1 }}>// GUÍA RÁPIDA DEL PANEL</span>
          {guideOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {guideOpen && (
          <div style={{ border: "1px solid var(--line)", borderTop: "none", background: "var(--bg2)" }}>
            {/* Section selector — tabs on desktop, <select> on mobile */}
            <div className="admin-guide-tabs-desktop">
              {sections.map(({ label, color, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setActiveGuide(activeGuide === label ? null : label)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "10px 16px", border: "none", borderRight: "1px solid var(--line)",
                    borderBottom: activeGuide === label ? `2px solid ${color}` : "2px solid transparent",
                    background: activeGuide === label ? `${color}10` : "transparent",
                    cursor: "pointer", flexShrink: 0,
                    fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
                    color: activeGuide === label ? color : "var(--faint)",
                    letterSpacing: 1, textTransform: "uppercase",
                    transition: "all .15s",
                  }}
                >
                  <Icon size={12} color={activeGuide === label ? color : undefined} />
                  {label}
                </button>
              ))}
            </div>
            <div className="admin-guide-tabs-mobile">
              <select
                className="admin-input"
                value={activeGuide ?? ""}
                onChange={(e) => setActiveGuide(e.target.value || null)}
                style={{ fontSize: 12, padding: "9px 12px" }}
              >
                <option value="">— Selecciona una sección —</option>
                {sections.map(({ label }) => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
            </div>

            {/* Guide content */}
            {activeGuide ? (
              (() => {
                const s = sections.find((x) => x.label === activeGuide);
                return (
                  <div className="admin-guide-content">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <s.icon size={16} color={s.color} />
                      <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 18, color: "var(--fg)", textTransform: "uppercase", letterSpacing: 1 }}>
                        {s.label}
                      </span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: s.color, letterSpacing: 1 }}>
                        {s.sub}
                      </span>
                    </div>
                    {/* What this section does */}
                    <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "var(--muted)", lineHeight: 1.65, margin: "0 0 20px", overflowWrap: "break-word" }}>
                      {s.desc}
                    </p>

                    {/* Step-by-step */}
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: s.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
                      CÓMO USARLO — PASO A PASO:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                      {s.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", overflow: "hidden" }}>
                          <div style={{
                            width: 20, height: 20, background: s.color,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, marginTop: 1,
                            fontFamily: "'Saira Condensed',monospace", fontSize: 11, color: "#fff", fontWeight: 700,
                          }}>
                            {i + 1}
                          </div>
                          <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--fg)", lineHeight: 1.6, flex: 1, minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" }}>{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Warning */}
                    {s.warning && (
                      <div style={{
                        display: "flex", gap: 10, padding: "12px 14px",
                        background: "rgba(234,179,8,.08)", border: "1px solid rgba(234,179,8,.25)",
                        marginBottom: 16, overflow: "hidden",
                      }}>
                        <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
                        <span style={{ fontFamily: "'Archivo',sans-serif", fontSize: 12, color: "var(--muted)", lineHeight: 1.5, flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>{s.warning}</span>
                      </div>
                    )}

                    <Link
                      href={s.href}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontFamily: "'Space Mono',monospace", fontSize: 10,
                        color: "#fff", textDecoration: "none", letterSpacing: 1,
                        background: s.color, padding: "9px 18px",
                        transition: "opacity .15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >
                      IR A {s.label} <ArrowRight size={11} />
                    </Link>
                  </div>
                );
              })()
            ) : (
              <div className="admin-guide-content">
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#D81F26", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
                  CÓMO FUNCIONA ESTE PANEL
                </div>
                <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "var(--fg)", margin: "0 0 12px", lineHeight: 1.65, maxWidth: 600 }}>
                  Este panel de administración te permite controlar todo el contenido que aparece en el sitio web de Motores Jordan, sin necesidad de saber programar.
                </p>
                <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", margin: "0 0 16px", lineHeight: 1.65, maxWidth: 600 }}>
                  Selecciona una de las secciones de arriba para ver instrucciones detalladas de cómo usarla. Cada sección corresponde a una parte visible del sitio web.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {sections.map(({ label, color, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => setActiveGuide(label)}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "6px 12px", border: `1px solid ${color}30`,
                        background: `${color}10`, cursor: "pointer",
                        fontFamily: "'Space Mono',monospace", fontSize: 9,
                        color: color, letterSpacing: 1, textTransform: "uppercase",
                      }}
                    >
                      <Icon size={11} /> {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick access */}
      <div style={{ background: "var(--bg2)", border: "1px solid var(--line)" }}>
        <div style={{
          padding: "14px 20px", borderBottom: "1px solid var(--line)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700, color: "#D81F26", letterSpacing: 2, textTransform: "uppercase" }}>
            // ACCESOS RÁPIDOS
          </span>
          <Link href="/admin/configuracion" style={{
            fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)",
            textDecoration: "none", letterSpacing: 1, display: "flex", alignItems: "center", gap: 4,
          }}>
            <Settings size={11} /> CONFIGURACIÓN
          </Link>
        </div>

        {/* Desktop: table */}
        <div className="admin-quick-table" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
            <thead>
              <tr style={{ background: "var(--bg3)" }}>
                {["SECCIÓN", "DESCRIPCIÓN", "REGISTROS", ""].map((h, i) => (
                  <th key={i} style={{
                    fontFamily: "'Space Mono',monospace", fontSize: 9,
                    color: "#D81F26", padding: "10px 20px", letterSpacing: 1,
                    borderBottom: "1px solid var(--line)",
                    textAlign: i < 2 ? "left" : "right",
                    textTransform: "uppercase",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sections.map(({ label, sub, href, color }, idx) => (
                <tr
                  key={href}
                  style={{ background: idx % 2 === 0 ? "var(--bg2)" : "var(--bg3)" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = `${color}08`}
                  onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? "var(--bg2)" : "var(--bg3)"}
                >
                  <td style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--fg)", padding: "11px 20px", letterSpacing: 1, borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 3, height: 14, background: color, flexShrink: 0 }} />
                      {label}
                    </div>
                  </td>
                  <td style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)", padding: "11px 20px", letterSpacing: 1, borderBottom: "1px solid var(--line)" }}>
                    {sub}
                  </td>
                  <td style={{ fontFamily: "'Saira Condensed',sans-serif", fontSize: 16, color: "var(--muted)", padding: "11px 20px", letterSpacing: 1, borderBottom: "1px solid var(--line)", textAlign: "right", fontWeight: 700 }}>
                    {counts[label] !== undefined ? counts[label] : "—"}
                  </td>
                  <td style={{ padding: "11px 20px", borderBottom: "1px solid var(--line)", textAlign: "right" }}>
                    <Link href={href} style={{
                      fontFamily: "'Space Mono',monospace", fontSize: 9,
                      color: "#D81F26", textDecoration: "none", letterSpacing: 1,
                      display: "inline-flex", alignItems: "center", gap: 4,
                    }}>
                      GESTIONAR <ArrowRight size={10} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: cards grid */}
        <div className="admin-quick-cards">
          {sections.map(({ label, sub, href, color, icon: Icon }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "var(--bg3)", border: "1px solid var(--line)",
                  padding: "14px 12px", display: "flex", flexDirection: "column", gap: 8,
                  transition: "border-color .15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = color}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line)"}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Icon size={14} color={color} />
                  <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: counts[label] !== undefined ? "var(--fg)" : "var(--faint)", lineHeight: 1 }}>
                    {counts[label] !== undefined ? counts[label] : "—"}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, color: "var(--fg)", letterSpacing: 1, textTransform: "uppercase" }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "var(--faint)", letterSpacing: 1, marginTop: 2 }}>
                    {sub}
                  </div>
                </div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: color, letterSpacing: 1, display: "flex", alignItems: "center", gap: 4 }}>
                  GESTIONAR <ArrowRight size={9} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
