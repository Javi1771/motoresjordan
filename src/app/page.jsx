"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Users,
  Droplet,
  Zap,
  CheckCircle,
  Award,
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

      //* Determinar sección activa
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
    scrollToSection(contactRef);
  };

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden box-border w-screen">
      {/* Fondo de partículas */}
      <Particles />

      {/* Luz ambiental */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#BE171F] rounded-full blur-[150px] opacity-10 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#F43F48] rounded-full blur-[100px] opacity-10 animate-pulse" />
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
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-base">
                  MJ
                </span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent from-[#BE171F] to-[#F43F48] bg-gradient-to-r">
                Motores Jordan
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {[
                { label: "Servicios", ref: servicesRef, id: "services" },
                { label: "Nosotros", ref: aboutRef, id: "about" },
                { label: "Contacto", ref: contactRef, id: "contact" },
              ].map(({ label, ref, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(ref)}
                  className={`text-sm xl:text-base hover:text-[#BE171F] transition-colors ${
                    activeSection === id ? "text-[#BE171F] font-bold" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-4 py-1.5 sm:px-5 sm:py-2 rounded-full hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Cotizar
              </button>
            </div>
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-md py-4 fixed top-16 inset-x-0">
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
      <div className="h-16 sm:h-20 lg:h-24"></div>

      {/* Hero - fondo completo bajo el nav */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-[80vh] lg:min-h-screen pt-28 pb-12 lg:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a0a0e] opacity-90" />

        {/* Tarjetas laterales */}
        {showSideCards && (
          <>
            <div className="hidden xl:block absolute inset-y-0 left-0 flex items-center w-1/4 max-w-[20rem] px-2 sm:px-4 min-w-0 z-10">
              <div className="group bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01] border-2 border-[#2e2e2e] shadow-2xl relative overflow-hidden hover:border-[#FF073A] hover:shadow-[0_0_8px_#FF073A] flex-shrink-0">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#BE171F] rounded-full opacity-10 blur-3xl" />
                <img
                  src="/triangulo.png"
                  alt="Ahorro de agua y energía"
                  className="w-32 2xl:w-36 h-32 2xl:h-36 object-contain mx-auto mb-3"
                />
                <h3 className="text-base 2xl:text-lg font-bold mb-2 text-center bg-clip-text text-transparent from-[#BE171F] to-[#F43F48] bg-gradient-to-r">
                  Potenciamos el ahorro de agua y energía
                </h3>
                <p className="text-xs 2xl:text-sm text-[#8E8F91] text-center mb-3">
                  Tecnología avanzada que optimiza recursos y maximiza
                  eficiencia
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-2.5 border-2 border-[#2e2e2e] rounded-lg group-hover:border-[#FF073A] transition-colors">
                    <div className="w-7 h-7 bg-[#FF073A] rounded-full flex items-center justify-center">
                      <Droplet className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        Reducción de consumo
                      </p>
                      <p className="text-xs text-[#8E8F91]">
                        Hasta 40% menos de agua utilizada
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 border-2 border-[#2e2e2e] rounded-lg group-hover:border-[#FF073A] transition-colors">
                    <div className="w-7 h-7 bg-[#FF073A] rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        Eficiencia energética
                      </p>
                      <p className="text-xs text-[#8E8F91]">
                        Sistemas que reducen costos eléctricos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 border-2 border-[#2e2e2e] rounded-lg group-hover:border-[#FF073A] transition-colors">
                    <div className="w-7 h-7 bg-[#FF073A] rounded-full flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        Sostenibilidad
                      </p>
                      <p className="text-xs text-[#8E8F91]">
                        Soluciones eco-amigables
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden xl:block absolute inset-y-0 right-0 flex items-center w-1/4 max-w-[20rem] px-2 sm:px-4 min-w-0 z-10">
              <div className="group bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01] border-2 border-[#2e2e2e] shadow-2xl relative overflow-hidden hover:border-[#FF073A] hover:shadow-[0_0_8px_#FF073A] flex-shrink-0">
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#BE171F] rounded-full opacity-10 blur-3xl" />
                <img
                  src="/Engranajes.png"
                  alt="Excelencia en procesos"
                  className="w-32 2xl:w-36 h-32 2xl:h-36 object-contain mx-auto mb-3"
                />
                <h3 className="text-base 2xl:text-lg font-bold mb-2 text-center bg-clip-text text-transparent from-[#BE171F] to-[#F43F48] bg-gradient-to-r">
                  Excelencia en procesos
                </h3>
                <p className="text-xs 2xl:text-sm text-[#8E8F91] text-center mb-3">
                  Sistemas robustos y soluciones confiables
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-2.5 border-2 border-[#2e2e2e] rounded-lg group-hover:border-[#FF073A] transition-colors">
                    <div className="w-7 h-7 bg-[#FF073A] rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        Calidad garantizada
                      </p>
                      <p className="text-xs text-[#8E8F91]">
                        Materiales de primera calidad
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 border-2 border-[#2e2e2e] rounded-lg group-hover:border-[#FF073A] transition-colors">
                    <div className="w-7 h-7 bg-[#FF073A] rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        Tecnología avanzada
                      </p>
                      <p className="text-xs text-[#8E8F91]">
                        Sistemas de última generación
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 border-2 border-[#2e2e2e] rounded-lg group-hover:border-[#FF073A] transition-colors">
                    <div className="w-7 h-7 bg-[#FF073A] rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        Soporte experto
                      </p>
                      <p className="text-xs text-[#8E8F91]">
                        Equipo técnico especializado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Contenido central */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto w-full min-w-0">
          <div className="mx-auto mb-5 sm:mb-7 max-w-md w-full bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-4 shadow-xl border border-[#2e2e2e] transition-all hover:scale-[1.02]">
            <img
              src="/logo.jpg"
              alt="Logo Jordan"
              className="w-full h-auto object-contain max-h-32 sm:max-h-40 lg:max-h-48"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Moto-Bombas y Reductores
            <br />
            <span className="bg-clip-text text-transparent from-[#BE171F] to-[#F43F48] bg-gradient-to-r">
              Jordan S.A. de C.V.
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#8E8F91] mb-5 sm:mb-6 max-w-2xl mx-auto">
            Soluciones profesionales en sistemas de bombeo y transmisión de
            potencia con{" "}
            <span className="text-[#BE171F] font-semibold">
              tecnología de vanguardia
            </span>
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 max-w-2xl mx-auto">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-[#BE171F] to-[#F43F48] py-3 px-6 rounded-full font-semibold text-sm lg:text-base border-2 border-transparent transform hover:scale-[1.03] hover:border-[#FF073A] hover:shadow-[0_0_8px_#FF073A] transition duration-300 min-h-[48px]"
            >
              <FaWhatsapp className="w-5 h-5" />
              Contáctanos por WhatsApp
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="flex items-center justify-center gap-2 flex-1 bg-gray-800 text-white py-3 px-6 rounded-full font-semibold text-sm lg:text-base border-2 border-transparent transform hover:scale-[1.03] hover:border-[#FF073A] hover:shadow-[0_0_8px_#FF073A] transition duration-300 min-h-[48px]"
            >
              <MdEmail className="w-5 h-5" />
              Cotizar por Correo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-screen-xl mx-auto w-full">
            {stats.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col items-center p-3 sm:p-4 lg:p-5 bg-gradient-to-b from-[#0f0f0f]/60 to-[#1a1a1a]/60 backdrop-blur-lg border-2 border-[#2e2e2e]/70 shadow-xl transition-all duration-300 hover:border-[#FF073A] hover:shadow-[0_0_8px_#FF073A] min-h-[80px] sm:min-h-[90px] min-w-0"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-1 sm:mb-2 bg-clip-text text-transparent from-[#BE171F] to-[#F43F48] bg-gradient-to-r">
                  {s.number}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-[#8E8F91] text-center">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-screen-xl mx-auto w-full">
            {features.map((f, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center p-4 sm:p-5 lg:p-6 bg-gradient-to-b from-[#0f0f0f]/60 to-[#1a1a1a]/60 backdrop-blur-lg border-2 border-[#2e2e2e]/70 shadow-xl transition-all duration-300 hover:border-[#FF073A] hover:shadow-[0_0_8px_#FF073A] min-h-[140px] sm:min-h-[160px] min-w-0"
              >
                <div className="w-12 h-12 mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-[#FF073A]/80 transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                  {React.cloneElement(f.icon, {
                    className: "w-6 h-6 text-white",
                  })}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-[#8E8F91] leading-relaxed">
                  {f.description}
                </p>
                <span className="mt-3 sm:mt-4 w-12 h-1 rounded-full bg-gradient-to-r from-[#BE171F] to-[#F43F48] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Cards */}
      <div className="xl:hidden relative z-10 w-full max-w-2xl mx-auto mt-6 px-4 flex flex-col gap-4 pb-10">
        {[
          {
            img: "/triangulo.png",
            title: "Potenciamos el ahorro de agua y energía",
            text: "Tecnología avanzada que optimiza recursos y maximiza eficiencia",
            features: [
              {
                Icon: Droplet,
                title: "Reducción de consumo",
                text: "Hasta 40% menos de agua utilizada",
              },
              {
                Icon: Zap,
                title: "Eficiencia energética",
                text: "Sistemas que reducen costos eléctricos",
              },
              {
                Icon: Leaf,
                title: "Sostenibilidad",
                text: "Soluciones eco-amigables",
              },
            ],
          },
          {
            img: "/Engranajes.png",
            title: "Excelencia en procesos",
            text: "Sistemas robustos y soluciones fiables",
            features: [
              {
                Icon: Award,
                title: "Calidad garantizada",
                text: "Materiales de primera calidad",
              },
              {
                Icon: Zap,
                title: "Tecnología avanzada",
                text: "Sistemas de última generación",
              },
              {
                Icon: Users,
                title: "Soporte experto",
                text: "Equipo técnico especializado",
              },
            ],
          },
        ].map((c, i) => (
          <div
            key={i}
            className="group w-full bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-4 sm:p-5 shadow-xl border-2 border-[#2e2e2e] transition-all duration-300 hover:border-[#FF073A] hover:shadow-[0_0_8px_#FF073A]"
          >
            <img
              src={c.img}
              alt=""
              className="mx-auto mb-3 w-28 sm:w-32 h-auto object-contain"
            />
            <h3 className="text-base sm:text-lg font-bold mb-2 text-center bg-clip-text text-transparent from-[#BE171F] to-[#F43F48] bg-gradient-to-r">
              {c.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8F91] text-center mb-4">
              {c.text}
            </p>
            <div className="space-y-2">
              {c.features.map((f, j) => (
                <div
                  key={j}
                  className="flex items-start gap-3 p-2.5 sm:p-3 border-2 border-[#2e2e2e] rounded-lg group-hover:border-[#FF073A] transition-colors"
                >
                  <div className="w-7 h-7 bg-[#FF073A] rounded-full flex items-center justify-center">
                    <f.Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {f.title}
                    </p>
                    <p className="text-xs text-[#8E8F91]">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Secciones auxiliares */}
      <div ref={servicesRef} className="max-w-screen-xl mx-auto px-4">
        <Servicios />
      </div>
      <div ref={aboutRef} className="max-w-screen-xl mx-auto px-4">
        <Nosotros />
      </div>
      <div ref={contactRef} className="max-w-screen-xl mx-auto px-4">
        <Contacto />
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-[#4E4F50] py-6 sm:py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center text-[#8E8F91]">
          <h4 className="text-lg sm:text-xl font-bold mb-1.5">
            Moto-Bombas y Reductores Jordan
          </h4>
          <p className="mb-3 text-sm">
            Potenciando el bombeo, control y potencia de tus proyectos desde
            1999.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-4 text-xs sm:text-sm">
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
