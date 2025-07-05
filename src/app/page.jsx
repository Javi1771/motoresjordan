"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  MessageCircle,
  Droplet,
  Zap,
  CheckCircle,
  Award,
  Settings,
  Leaf,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Particles from "../components/Particles";
import Servicios from "../components/Servicios";
import Contacto from "../components/Contacto";
import Nosotros from "../components/Nosotros";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showSideCards, setShowSideCards] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        setShowSideCards(newScrollY < heroHeight - 100);
      }

      // Determinar sección activa
      const sections = [
        { id: "hero", ref: heroRef },
        { id: "services", ref: servicesRef },
        { id: "about", ref: aboutRef },
        { id: "contact", ref: contactRef },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { number: "15+", label: "Años de experiencia" },
    { number: "500+", label: "Proyectos completados" },
    { number: "100%", label: "Satisfacción garantizada" },
    { number: "24/7", label: "Soporte técnico" },
  ];

  const features = [
    {
      icon: <Droplet className="text-[#BE171F]" size={28} />,
      title: "Bombeo eficiente",
      description: "Sistemas optimizados para máximo rendimiento",
    },
    {
      icon: <Zap className="text-[#BE171F]" size={28} />,
      title: "Ahorro energético",
      description: "Reducción de consumo hasta en un 35%",
    },
    {
      icon: <CheckCircle className="text-[#BE171F]" size={28} />,
      title: "Calidad certificada",
      description: "Normas internacionales de fabricación",
    },
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola, me interesa solicitar una cotización para equipos de bombeo. ¿Podrían ayudarme?"
    );
    window.open(`https://wa.me/524423919520?text=${message}`, "_blank");
  };

  const handleEmailContact = () => {
    window.open(
      "mailto:contacto@motoresjordanmx.com?subject=Solicitud de Cotización&body=Hola, me interesa solicitar una cotización para equipos de bombeo. Por favor contáctenme.",
      "_blank"
    );
  };

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Fondo de partículas */}
      <Particles />

      {/* Luz ambiental */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#BE171F] rounded-full blur-[150px] opacity-10 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#F43F48] rounded-full blur-[100px] opacity-10 animate-pulse" />
      </div>

      {/* Botón WhatsApp */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-transform hover:scale-110 animate-pulse"
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Navegación */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-xl py-2"
            : "bg-transparent py-3 sm:py-4"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-base">
                  MJ
                </span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                Motores Jordan
              </span>
            </div>

            {/* Links escritorio */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { label: "Servicios", ref: servicesRef, id: "services" },
                { label: "Nosotros", ref: aboutRef, id: "about" },
                { label: "Contacto", ref: contactRef, id: "contact" },
              ].map(({ label, ref, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(ref)}
                  className={`text-sm lg:text-base hover:text-[#BE171F] transition-colors ${
                    activeSection === id ? "text-[#BE171F] font-bold" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-4 py-1.5 sm:px-6 sm:py-2 rounded-full hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Cotizar
              </button>
            </div>

            {/* Toggle móvil */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md py-4 fixed top-16 inset-x-0">
            <div className="max-w-screen-xl mx-auto px-6 space-y-2">
              {[
                { label: "Servicios", ref: servicesRef },
                { label: "Nosotros", ref: aboutRef },
                { label: "Contacto", ref: contactRef },
              ].map(({ label, ref }) => (
                <button
                  key={label}
                  onClick={() => {
                    scrollToSection(ref);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full py-3 text-left hover:text-[#BE171F] border-b border-[#2e2e2e] transition-colors"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={handleWhatsApp}
                className="w-full mt-4 bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-6 py-3 rounded-full hover:shadow-lg transition-all text-center"
              >
                <FaWhatsapp className="inline-block mr-2" />
                Solicitar Cotización
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-[80vh] md:min-h-screen pt-20 pb-12 md:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a0a0e] opacity-90" />

        {/* Tarjetas laterales (desktop) */}
        {showSideCards && (
          <>
            <div className="hidden lg:block absolute left-[3%] top-1/2 transform -translate-y-1/2 w-[26vw] min-w-[280px] max-w-[380px] z-10 transition-transform hover:translate-x-4">
              <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-6 shadow-2xl border border-[#2e2e2e] relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#BE171F] rounded-full opacity-10 blur-3xl transition-opacity"></div>
                <img
                  src="/triangulo.png"
                  alt="Ahorro de agua y energía"
                  className="w-40 lg:w-48 h-40 lg:h-48 object-contain mx-auto mb-4"
                />
                <h3 className="text-lg lg:text-xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                  Potenciamos el ahorro de agua y energía
                </h3>
                <p className="text-xs lg:text-sm text-[#8E8F91] text-center">
                  Tecnología avanzada que optimiza recursos y maximiza
                  eficiencia
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute right-[3%] top-1/2 transform -translate-y-1/2 w-[26vw] min-w-[280px] max-w-[380px] z-10 transition-transform hover:-translate-x-4">
              <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-6 shadow-2xl border border-[#2e2e2e] relative overflow-hidden group">
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#BE171F] rounded-full opacity-10 blur-3xl transition-opacity"></div>
                <img
                  src="/Engranajes.png"
                  alt="Excelencia en procesos"
                  className="w-40 lg:w-48 h-40 lg:h-48 object-contain mx-auto mb-4"
                />
                <h3 className="text-lg lg:text-xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                  Excelencia en procesos
                </h3>
                <p className="text-xs lg:text-sm text-[#8E8F91] text-center">
                  Sistemas robustos y soluciones confiables
                </p>
              </div>
            </div>
          </>
        )}

        {/* Contenido central */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full">
          {/* Logo Card con logo +40 % */}
          <div
            className="mx-auto mb-6 sm:mb-10 max-w-2xl
             bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]
             rounded-2xl p-5 shadow-xl border border-[#2e2e2e]
             transition-all hover:shadow-2xl hover:scale-105"
          >
            <img
              src="/logo.jpg"
              alt="Logo Jordan"
              className="
      mx-auto mb-4
      w-[29.4rem]     /* ~21rem ×1.4 */
      sm:w-[33.6rem]  /* ~24rem ×1.4 */
      md:w-[36.4rem]  /* ~26rem ×1.4 */
      h-auto object-contain
    "
            />
          </div>

          <h1 className="text-[clamp(1.75rem,6vw,3rem)] font-bold mb-4">
            Moto-Bombas y Reductores
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
              Jordan S.A. de C.V.
            </span>
          </h1>
          <p className="text-[clamp(.875rem,2.5vw,1.125rem)] text-[#8E8F91] mb-8">
            Soluciones profesionales en sistemas de bombeo y transmisión de
            potencia con{" "}
            <span className="text-[#BE171F] font-semibold">
              tecnología de vanguardia
            </span>
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleWhatsApp}
              className="
                flex items-center justify-center gap-2 flex-1 
                bg-gradient-to-r from-[#BE171F] to-[#F43F48]
                py-3 rounded-full font-semibold
                border-2 border-transparent
                transform hover:scale-105
                hover:border-[#FF073A]
                hover:shadow-[0_0_8px_#FF073A]
                transition duration-300
              "
            >
              <FaWhatsapp className="w-[1.6em] h-[1.6em]" />
              Contáctanos por WhatsApp
            </button>
            <button
              onClick={handleEmailContact}
              className="
                flex items-center justify-center gap-2 flex-1 
                bg-gray-800 text-white
                py-3 rounded-full font-semibold
                border-2 border-transparent
                transform hover:scale-105
                hover:border-[#FF073A]
                hover:shadow-[0_0_8px_#FF073A]
                transition duration-300
              "
            >
              <MdEmail className="w-[1.6em] h-[1.6em]" />
              Cotizar por Correo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {stats.map((s, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-[#2e2e2e] hover:border-[#BE171F] transition-all"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48] mb-1">
                  {s.number}
                </div>
                <div className="text-sm text-[#8E8F91]">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-[#2e2e2e] hover:border-[#BE171F] transition-all"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-gray-900">{f.icon}</div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">
                  {f.title}
                </h3>
                <p className="text-sm text-[#8E8F91] text-center">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards – apiladas verticalmente */}
        <div className="lg:hidden relative z-10 w-full max-w-2xl mx-auto mt-10 px-4 flex flex-col gap-6 pb-12">
          {[
            {
              img: "/triangulo.png",
              title: "Potenciamos el ahorro de agua y energía",
              text: "Tecnología avanzada que optimiza recursos y maximiza eficiencia",
            },
            {
              img: "/Engranajes.png",
              title: "Excelencia en procesos",
              text: "Sistemas robustos y soluciones confiables",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="w-full bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-5 shadow-xl border border-[#2e2e2e] transition-all"
            >
              <img
                src={c.img}
                alt=""
                className="mx-auto mb-4 w-32 h-auto object-contain"
              />
              <h3 className="text-lg font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                {c.title}
              </h3>
              <p className="text-sm text-[#8E8F91] text-center">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secciones auxiliares */}
      <div ref={servicesRef}>
        <Servicios />
      </div>
      <div ref={aboutRef}>
        <Nosotros />
      </div>
      <div ref={contactRef}>
        <Contacto />
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-[#4E4F50] py-8 sm:py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center text-[#8E8F91]">
          <h4 className="text-xl font-bold mb-2">
            Moto-Bombas y Reductores Jordan
          </h4>
          <p className="mb-4">
            Potenciando el bombeo, control y potencia de tus proyectos desde
            1999.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <button onClick={() => scrollToSection(servicesRef)}>
              Servicios
            </button>
            <button onClick={() => scrollToSection(aboutRef)}>Nosotros</button>
            <button onClick={() => scrollToSection(contactRef)}>
              Contacto
            </button>
            <button onClick={handleWhatsApp}>Cotizar</button>
          </div>
          <p className="text-xs text-[#6B6C6F]">
            &copy; 2025 Moto-Bombas y Reductores Jordan S.A. de C.V. Todos los
            derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
