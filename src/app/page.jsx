"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { track } from "@vercel/analytics";

import ThemeToggle from "../components/ThemeToggle";
import Servicios from "../components/Servicios";
import Contacto from "../components/Contacto";
import Nosotros from "../components/Nosotros";
import Footer from "../components/Footer";
import CatalogoDestacado from "../components/sections/CatalogoDestacado";
import PromocionesSection from "../components/sections/PromocionesSection";
import GaleriaSection from "../components/sections/GaleriaSection";
import Testimonios from "../components/sections/Testimonios";
import ReviewForm from "../components/sections/ReviewForm";
import MisionVision from "../components/sections/MisionVision";
import ClientesIndustriales from "../components/sections/ClientesIndustriales";
import SectoresSection from "../components/sections/SectoresSection";
import ImageCarousel from "../components/interface/ImageCarousel";
import BannersSection from "../components/sections/BannersSection";
import ArticulosSection from "../components/sections/ArticulosSection";

const ALL_NAV_LINKS = [
  { label: "Servicios",   id: "services",    always: true },
  { label: "Catálogo",    id: "catalogo",    always: false },
  { label: "Promociones", id: "promociones", always: false },
  { label: "Galería",     id: "galeria",     always: false },
  { label: "Artículos",   id: "articulos",   always: false },
  { label: "Nosotros",    id: "about",       always: true },
  { label: "Contacto",    id: "contacto",    always: true },
];

const STATS = [
  { number: "15+",  label: "AÑOS DE\nEXPERIENCIA" },
  //{ number: "100+", label: "PRODUCTOS\nEN STOCK" },
  { number: "2",    label: "SUCURSALES\nEN QRO." },
  { number: "100%", label: "SATISFACCIÓN\nGARANTIZADA" },
];

function NavLink({ label, num, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const lit = active || hovered;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", background: "none", border: "none",
        cursor: "pointer", padding: "20px 12px 18px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
      }}
    >
      {/* Number tag */}
      <span style={{
        fontFamily: "'Space Mono',monospace", fontSize: 8, fontWeight: 700,
        letterSpacing: 2, lineHeight: 1,
        color: active ? "#D81F26" : hovered ? "rgba(216,31,38,.6)" : "var(--faint)",
        transition: "color .2s",
      }}>
        {num}
      </span>

      {/* Label */}
      <span style={{
        fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
        fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase",
        color: active ? "#fff" : hovered ? "#EDEDED" : "#9A9A9E",
        transition: "color .2s", lineHeight: 1,
      }}>
        {label}
      </span>

      {/* Animated underline */}
      <span style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        height: 2, background: "#D81F26",
        width: lit ? "100%" : "0%",
        transition: "width .25s ease",
      }} />
    </button>
  );
}

const HERO_SIDE_IMAGES = ["/triangulo.png", "/Engranajes.png"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [heroImage, setHeroImage] = useState(null);
  // null = still loading, true = has content, false = empty → hide from nav
  const [sectionVisible, setSectionVisible] = useState({ catalogo: null, promociones: null, galeria: null, articulos: null });

  const heroRef       = useRef(null);
  const servicesRef   = useRef(null);
  const catalogoRef   = useRef(null);
  const promocionesRef= useRef(null);
  const galeriaRef    = useRef(null);
  const articulosRef  = useRef(null);
  const aboutRef      = useRef(null);
  const contactRef    = useRef(null);

  const sectionRefs = {
    hero:       heroRef,
    services:   servicesRef,
    catalogo:   catalogoRef,
    promociones:promocionesRef,
    galeria:    galeriaRef,
    articulos:  articulosRef,
    about:      aboutRef,
    contacto:   contactRef,
  };

  // Only show dynamic nav items once we know they have content
  const navLinks = ALL_NAV_LINKS.filter(({ id, always }) =>
    always || sectionVisible[id] === true
  );

  useLayoutEffect(() => {
    setHeroImage(HERO_SIDE_IMAGES[Math.floor(Math.random() * HERO_SIDE_IMAGES.length)]);
  }, []);

  function markVisible(id, hasContent) {
    setSectionVisible((prev) => ({ ...prev, [id]: hasContent }));
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      let found = "hero";
      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { top, bottom } = ref.current.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) { found = id; break; }
        }
      }
      if (found !== activeSection) {
        setActiveSection(found);
        window.history.replaceState({}, "", found === "hero" ? "/" : `/#${found}`);
        track("section_view", { path: found === "hero" ? "/" : `/#${found}` });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection]);

  function scrollTo(id) {
    setMenuOpen(false);
    const ref = sectionRefs[id];
    if (!ref?.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - 66;
    requestAnimationFrame(() => window.scrollTo({ top, behavior: "smooth" }));
  }

  function openWhatsApp(msg = "Hola, me interesa solicitar una cotización para equipos de bombeo. ¿Podrían ayudarme?") {
    window.open(`https://wa.me/524273762379?text=${encodeURIComponent(msg)}`, "_blank");
    track("click_whatsapp", { seccion: activeSection });
  }

  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── Floating WhatsApp ──────────────────────────── */}
      <button
        onClick={() => openWhatsApp()}
        aria-label="Contactar por WhatsApp"
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 50,
          background: "#25D366", color: "#fff",
          width: 52, height: 52, borderRadius: "50%", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 20px rgba(37,211,102,.4)",
          transition: "transform .15s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <FaWhatsapp size={24} />
      </button>

      {/* ── Header ────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        height: 66, background: "#0E0E0F",
        borderBottom: scrolled ? "1px solid #232327" : "1px solid transparent",
        transition: "border-color .2s",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%",
          padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            aria-label="Ir al inicio — Motores Jordan"
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{
              width: 32, height: 32, background: "#D81F26",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ color: "#fff", fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 18 }}>J</span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: 1 }}>MOTORES</span>
                <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "#D81F26", letterSpacing: 1 }}>JORDAN</span>
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#6A6A70", letterSpacing: 1, marginTop: 2 }}>
                SISTEMAS DE BOMBEO
              </div>
            </div>
          </button>

          {/* Desktop nav — only shows sections with content */}
          <nav aria-label="Navegación principal" style={{ alignItems: "center", gap: 4 }} className="hidden lg:flex">
            {navLinks.map(({ label, id }, idx) => {
              const active = activeSection === id;
              return (
                <NavLink
                  key={id}
                  label={label}
                  num={String(idx + 1).padStart(2, "0")}
                  active={active}
                  onClick={() => scrollTo(id)}
                />
              );
            })}
          </nav>

          {/* Right: toggle + CTA */}
          <div style={{ alignItems: "center", gap: 12 }} className="hidden lg:flex">
            <ThemeToggle icon />
            <button
              onClick={() => openWhatsApp()}
              aria-label="Solicitar cotización por WhatsApp"
              style={{
                background: "#D81F26", color: "#fff", border: "none", cursor: "pointer",
                fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 14,
                letterSpacing: 1, padding: "10px 22px", textTransform: "uppercase",
                transition: "background .15s",
                display: "flex", alignItems: "center", gap: 7,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f02530"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#D81F26"}
            >
              <FaWhatsapp size={15} /> COTIZAR →
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#EDEDED" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Caution stripe ────────────────────────────── */}
      <div style={{ marginTop: 66 }}>
        <div className="stripe-caution" />
      </div>

      {/* ── Mobile menu drawer ────────────────────────── */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 35, display: "flex" }}>
          {/* Backdrop */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)" }}
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer from right */}
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "min(300px,85vw)",
            background: "var(--bg2)", borderLeft: "1px solid var(--line)",
            display: "flex", flexDirection: "column", overflowY: "auto",
            zIndex: 1,
          }}>
            {/* Drawer header */}
            <div style={{
              height: 66, display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 20px", borderBottom: "1px solid var(--line)", flexShrink: 0,
            }}>
              <div style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "var(--fg)", letterSpacing: 1 }}>
                MENÚ
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--faint)", padding: 4 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Menú móvil" style={{ flex: 1, padding: "4px 0" }}>
              {navLinks.map(({ label, id }, idx) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      width: "100%", textAlign: "left",
                      padding: "13px 20px", background: active ? "rgba(216,31,38,.06)" : "none",
                      border: "none", cursor: "pointer",
                      borderLeft: active ? "3px solid #D81F26" : "3px solid transparent",
                      transition: "background .15s, border-color .15s",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
                      color: active ? "#D81F26" : "var(--faint)", letterSpacing: 1,
                      minWidth: 20, flexShrink: 0,
                    }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700,
                      fontSize: 17, letterSpacing: 1.5, textTransform: "uppercase",
                      color: active ? "#D81F26" : "var(--fg)",
                      transition: "color .15s",
                    }}>
                      {label}
                    </span>
                    {active && (
                      <span style={{
                        marginLeft: "auto", fontFamily: "'Space Mono',monospace",
                        fontSize: 10, color: "#D81F26",
                      }}>←</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid var(--line)", flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)", letterSpacing: 1, textTransform: "uppercase" }}>TEMA</span>
                <ThemeToggle icon />
              </div>
              <button
                onClick={() => { openWhatsApp(); setMenuOpen(false); }}
                aria-label="Solicitar cotización por WhatsApp"
                style={{
                  background: "#D81F26", color: "#fff", border: "none", cursor: "pointer",
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
                  letterSpacing: 1, padding: "13px 16px", textTransform: "uppercase",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <FaWhatsapp size={17} /> COTIZAR POR WHATSAPP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Hero ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="hero"
        className="section-pad"
        style={{
          background: "#0E0E0F",
          minHeight: "calc(100vh - 72px)",
          display: "flex", alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(#232327 1px, transparent 1px), linear-gradient(90deg, #232327 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.25,
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 760 }}>

            <span className="eyebrow anim-fade-in anim-delay-1">
              // SISTEMAS DE BOMBEO · SAN JUAN DEL RÍO, QRO.
            </span>

            {/* Logo */}
            <div className="anim-fade-up anim-delay-1" style={{ marginBottom: 32 }}>
              <img
                src="/logo.jpg"
                alt="Motores Jordan"
                style={{ height: 90, width: "auto", objectFit: "contain" }}
              />
            </div>

            <h1 className="anim-fade-up anim-delay-2" style={{
              fontFamily: "'Saira Condensed',sans-serif",
              fontWeight: 800, fontSize: "clamp(44px,7vw,72px)",
              lineHeight: 0.92, textTransform: "uppercase",
              color: "#EDEDED", margin: 0, marginBottom: 8,
            }}>
              MOTO-BOMBAS<br />Y REDUCTORES
            </h1>

            <h2 className="anim-fade-up anim-delay-3" style={{
              fontFamily: "'Saira Condensed',sans-serif",
              fontWeight: 800, fontSize: "clamp(44px,7vw,72px)",
              lineHeight: 0.92, textTransform: "uppercase",
              color: "#D81F26", margin: 0, marginBottom: 28,
            }}>
              JORDAN S.A. DE C.V.
            </h2>

            <p className="anim-fade-up anim-delay-3" style={{
              fontFamily: "'Archivo',sans-serif", fontSize: 17, fontWeight: 400,
              lineHeight: 1.55, color: "#9A9A9E", maxWidth: 540, marginBottom: 36,
            }}>
              Especialistas en sistemas de bombeo, transmisión de potencia y motores eléctricos.
              Más de 15 años sirviendo a la industria en Querétaro y México.
            </p>

            {/* CTAs */}
            <div className="anim-fade-up anim-delay-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
              <button
                onClick={() => openWhatsApp()}
                style={{
                  background: "#D81F26", color: "#fff", border: "none", cursor: "pointer",
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
                  letterSpacing: 1, padding: "15px 30px", textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "background .15s, transform .15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f02530"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#D81F26"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <FaWhatsapp size={18} /> COTIZAR POR WHATSAPP →
              </button>
              <button
                onClick={() => scrollTo("catalogo")}
                style={{
                  background: "transparent", color: "#EDEDED",
                  border: "1px solid #3A3A3F", cursor: "pointer",
                  fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
                  letterSpacing: 1, padding: "15px 30px", textTransform: "uppercase",
                  transition: "border-color .15s, color .15s, transform .15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D81F26"; e.currentTarget.style.color = "#D81F26"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3A3A3F"; e.currentTarget.style.color = "#EDEDED"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                VER CATÁLOGO →
              </button>
            </div>

            {/* Trust row */}
            <div className="anim-fade-up anim-delay-5" style={{ display: "flex", flexWrap: "wrap", gap: 0, borderTop: "1px solid #232327" }}>
              {STATS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 120px",
                    padding: "20px 24px",
                    borderRight: i < STATS.length - 1 ? "1px solid #232327" : "none",
                  }}
                >
                  <div style={{
                    fontFamily: "'Saira Condensed',sans-serif",
                    fontWeight: 800, fontSize: 34, color: "#EDEDED",
                    lineHeight: 1,
                  }}>
                    {s.number}
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 10, fontWeight: 400, textTransform: "uppercase",
                    color: "#9A9A9E", whiteSpace: "pre-line",
                    marginTop: 4, lineHeight: 1.4,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero right side image (desktop) */}
        <div
          className="hidden xl:block anim-fade-in anim-delay-3"
          style={{
            position: "absolute", right: 56, top: "50%", transform: "translateY(-50%)",
            width: "36%", maxWidth: 480, pointerEvents: "none",
          }}
        >
          {heroImage && (
            <img
              src={heroImage}
              alt=""
              style={{ width: "100%", height: "auto", objectFit: "contain", opacity: 0.55, display: "block" }}
            />
          )}
        </div>
      </section>

      {/* ── Sections ──────────────────────────────────── */}
      <main id="main-content">
      <MisionVision />
      <div ref={servicesRef}><Servicios /></div>
      <ClientesIndustriales />
      <ImageCarousel
        title="Motores Eléctricos"
        eyebrow="// CATÁLOGO"
        folder="motores"
        subtitle="Motores eléctricos de alta eficiencia para todo tipo de aplicación industrial."
      />
      <ImageCarousel
        title="Bombas"
        eyebrow="// CATÁLOGO"
        folder="bombas"
        subtitle="Amplio catálogo de bombas para industria, riego, contra incendio y uso doméstico."
      />
      <ImageCarousel
        title="Refacciones Originales y Universales"
        eyebrow="// CATÁLOGO"
        folder="refacciones"
        subtitle="Refacciones genuinas y universales para el mantenimiento de tu equipo."
      />
      <BannersSection onLoad={() => {}} />
      <div ref={catalogoRef}><CatalogoDestacado onLoad={(v) => markVisible("catalogo", v)} /></div>
      <div ref={promocionesRef}><PromocionesSection onLoad={(v) => markVisible("promociones", v)} /></div>
      <div ref={galeriaRef}><GaleriaSection onLoad={(v) => markVisible("galeria", v)} /></div>
      <div ref={articulosRef}><ArticulosSection onLoad={(v) => markVisible("articulos", v)} /></div>
      <SectoresSection />
      <div ref={aboutRef}><Nosotros /></div>
      <Testimonios />
      <ReviewForm />
      <div ref={contactRef}><Contacto /></div>
      </main>
      <Footer />
    </div>
  );
}
