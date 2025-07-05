"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, MessageCircle, Droplet, Zap, CheckCircle, Award, Settings, Leaf } from "lucide-react";
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
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#BE171F] rounded-full blur-[150px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#F43F48] rounded-full blur-[100px] opacity-10 animate-pulse"></div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse group"
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Navigation - Mejora de espaciado responsive */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-[#0a0a0a] bg-opacity-95 backdrop-blur-md shadow-xl py-2"
            : "bg-transparent py-3 sm:py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-base">MJ</span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                Motores Jordan
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <button
                onClick={() => scrollToSection(servicesRef)}
                className={`text-sm lg:text-base hover:text-[#BE171F] transition-colors ${
                  activeSection === "services" ? "text-[#BE171F] font-bold" : ""
                }`}
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className={`text-sm lg:text-base hover:text-[#BE171F] transition-colors ${
                  activeSection === "about" ? "text-[#BE171F] font-bold" : ""
                }`}
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className={`text-sm lg:text-base hover:text-[#BE171F] transition-colors ${
                  activeSection === "contact" ? "text-[#BE171F] font-bold" : ""
                }`}
              >
                Contacto
              </button>
              <button
                onClick={handleWhatsApp}
                className="bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-4 py-1.5 sm:px-6 sm:py-2 rounded-full hover:shadow-lg transition-all group text-sm sm:text-base"
              >
                <span className="group-hover:scale-105 transition-transform">
                  Cotizar
                </span>
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Mejorado para pantallas pequeñas */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] bg-opacity-95 backdrop-blur-md py-4 fixed top-16 left-0 right-0">
            <div className="container mx-auto px-6 space-y-3">
              <button
                onClick={() => {
                  scrollToSection(servicesRef);
                  setIsMenuOpen(false);
                }}
                className="block w-full py-3 text-left hover:text-[#BE171F] transition-colors border-b border-[#2e2e2e] text-base"
              >
                Servicios
              </button>
              <button
                onClick={() => {
                  scrollToSection(aboutRef);
                  setIsMenuOpen(false);
                }}
                className="block w-full py-3 text-left hover:text-[#BE171F] transition-colors border-b border-[#2e2e2e] text-base"
              >
                Nosotros
              </button>
              <button
                onClick={() => {
                  scrollToSection(contactRef);
                  setIsMenuOpen(false);
                }}
                className="block w-full py-3 text-left hover:text-[#BE171F] transition-colors border-b border-[#2e2e2e] text-base"
              >
                Contacto
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-full mt-4 bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-6 py-3 rounded-full hover:shadow-lg transition-all group text-center text-base"
              >
                <span className="group-hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  <FaWhatsapp /> Solicitar Cotización
                </span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Side Cards - Optimizado para responsive */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 md:py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#2a0a0e] opacity-90"></div>

        {/* Left Card - Water/Energy Saving */}
        {showSideCards && (
          <div className="hidden lg:block absolute left-[3%] xl:left-[5%] top-1/2 transform -translate-y-1/2 w-[26vw] min-w-[280px] max-w-[380px] z-10 transition-all duration-700 hover:translate-x-4">
            <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-6 lg:p-7 shadow-2xl border border-[#2e2e2e] relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#BE171F] rounded-full opacity-10 blur-3xl group-hover:opacity-15 transition-opacity"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 lg:mb-5 transform group-hover:scale-105 transition-transform">
                  <div className="p-2">
                    <img
                      src="/triangulo.png"
                      alt="Ahorro de agua y energía"
                      className="w-40 lg:w-48 h-40 lg:h-48 object-contain mx-auto"
                    />
                  </div>
                </div>

                <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                  Potenciamos el ahorro de agua y energía
                </h3>

                <p className="text-xs lg:text-sm text-[#8E8F91] mb-4 lg:mb-5 text-center">
                  Tecnología avanzada que optimiza recursos y maximiza
                  eficiencia
                </p>

                <div className="w-full space-y-3 lg:space-y-4 mt-4 lg:mt-6">
                  <div className="flex items-center bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] p-3 rounded-lg border border-[#2e2e2e] group-hover:border-[#BE171F] transition-all hover:shadow-lg">
                    <div className="bg-gradient-to-br from-[#BE171F] to-[#8a0f15] rounded-full p-2 mr-3 flex-shrink-0">
                      <Droplet className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Reducción de consumo
                      </h4>
                      <p className="text-xs text-[#8E8F91]">
                        Hasta 40% menos de agua utilizada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] p-3 rounded-lg border border-[#2e2e2e] group-hover:border-[#BE171F] transition-all hover:shadow-lg">
                    <div className="bg-gradient-to-br from-[#BE171F] to-[#8a0f15] rounded-full p-2 mr-3 flex-shrink-0">
                      <Zap className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Eficiencia energética
                      </h4>
                      <p className="text-xs text-[#8E8F91]">
                        Sistemas que reducen costos eléctricos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] p-3 rounded-lg border border-[#2e2e2e] group-hover:border-[#BE171F] transition-all hover:shadow-lg">
                    <div className="bg-gradient-to-br from-[#BE171F] to-[#8a0f15] rounded-full p-2 mr-3 flex-shrink-0">
                      <Leaf className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Sostenibilidad
                      </h4>
                      <p className="text-xs text-[#8E8F91]">
                        Soluciones eco-amigables
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Card - Efficient Process */}
        {showSideCards && (
          <div className="hidden lg:block absolute right-[3%] xl:right-[5%] top-1/2 transform -translate-y-1/2 w-[26vw] min-w-[280px] max-w-[380px] z-10 transition-all duration-700 hover:-translate-x-4">
            <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-6 lg:p-7 shadow-2xl border border-[#2e2e2e] relative overflow-hidden group">
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#BE171F] rounded-full opacity-10 blur-3xl group-hover:opacity-15 transition-opacity"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 lg:mb-5 transform group-hover:scale-105 transition-transform">
                  <div className="p-2">
                    <img
                      src="/Engranajes.png"
                      alt="Procesos eficientes"
                      className="w-40 lg:w-48 h-40 lg:h-48 object-contain mx-auto"
                    />
                  </div>
                </div>

                <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                  Excelencia en procesos
                </h3>

                <p className="text-xs lg:text-sm text-[#8E8F91] mb-4 lg:mb-5 text-center">
                  Sistemas robustos y soluciones confiables
                </p>

                <div className="w-full space-y-3 lg:space-y-4 mt-4 lg:mt-6">
                  <div className="flex items-center bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] p-3 rounded-lg border border-[#2e2e2e] group-hover:border-[#BE171F] transition-all hover:shadow-lg">
                    <div className="bg-gradient-to-br from-[#BE171F] to-[#8a0f15] rounded-full p-2 mr-3 flex-shrink-0">
                      <Award className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Calidad garantizada
                      </h4>
                      <p className="text-xs text-[#8E8F91]">
                        Materiales de primera calidad
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] p-3 rounded-lg border border-[#2e2e2e] group-hover:border-[#BE171F] transition-all hover:shadow-lg">
                    <div className="bg-gradient-to-br from-[#BE171F] to-[#8a0f15] rounded-full p-2 mr-3 flex-shrink-0">
                      <Settings className="text-white" size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Tecnología avanzada
                      </h4>
                      <p className="text-xs text-[#8E8F91]">
                        Sistemas de última generación
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] p-3 rounded-lg border border-[#2e2e2e] group-hover:border-[#BE171F] transition-all hover:shadow-lg">
                    <div className="bg-gradient-to-br from-[#BE171F] to-[#8a0f15] rounded-full p-2 mr-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Soporte experto
                      </h4>
                      <p className="text-xs text-[#8E8F91]">
                        Equipo técnico especializado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Mejoras responsive */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
          {/* Logo de la empresa - Optimizado para móviles */}
          <div className="mb-4 sm:mb-8 transform transition-all duration-700 hover:scale-105">
            <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-3 sm:p-6 mx-auto mb-3 sm:mb-5 shadow-2xl group hover:shadow-[0_0_50px_8px_rgba(190,23,31,0.5)] transition-all border border-[#2e2e2e]">
              <img
                src="/logo.jpg"
                alt="Logo Jordan"
                className="h-16 sm:h-24 md:h-28 object-contain mx-auto group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5 text-white leading-tight">
            <span className="block mb-1 sm:mb-2">Moto-Bombas y Reductores</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
              Jordan S.A de C.V.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#8E8F91] mb-5 sm:mb-7 max-w-3xl mx-auto">
            Soluciones profesionales en sistemas de bombeo y transmisión de
            potencia con
            <span className="text-[#BE171F] font-semibold">
              {" "}
              tecnología de vanguardia
            </span>
          </p>

          {/* Botones de acción - Mejora de tamaño en móviles */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-10">
            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto bg-gradient-to-r from-[#BE171F] to-[#F43F48] px-4 py-2.5 sm:px-8 sm:py-3 rounded-full text-white font-semibold hover:shadow-2xl transition-all duration-300 group hover:shadow-[0_0_30px_5px_rgba(190,23,31,0.5)] text-sm sm:text-base"
            >
              <span className="flex items-center justify-center group-hover:scale-105 transition-transform">
                Contáctanos por WhatsApp
                <FaWhatsapp className="ml-2 sm:ml-3" size={18} />
              </span>
            </button>
            <button
              onClick={handleEmailContact}
              className="w-full sm:w-auto bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] px-4 py-2.5 sm:px-8 sm:py-3 rounded-full text-white font-semibold hover:shadow-2xl transition-all duration-300 group hover:shadow-[0_0_30px_5px_rgba(190,23,31,0.5)] text-sm sm:text-base"
            >
              <span className="flex items-center justify-center group-hover:scale-105 transition-transform">
                Cotizar por Correo
                <MdEmail className="ml-2 sm:ml-3" size={18} />
              </span>
            </button>
          </div>

          {/* Stats - Mejora de tamaño en móviles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] p-2 sm:p-3 rounded-xl border border-[#2e2e2e] hover:border-[#BE171F] transition-all hover:shadow-lg group"
              >
                <div className="text-lg sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48] mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-[#8E8F91]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features - Optimizado para móviles */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] p-3 sm:p-4 rounded-xl border border-[#2e2e2e] hover:border-[#BE171F] transition-all group hover:shadow-lg"
              >
                <div className="mb-2 sm:mb-3 flex justify-center">
                  <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-2 sm:p-3 rounded-full border border-[#2e2e2e] group-hover:border-[#BE171F]">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-[#BE171F] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8F91]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards - Below main content on small screens */}
        {showSideCards && (
          <div className="lg:hidden w-full max-w-2xl mx-auto mt-8 sm:mt-10 px-4">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {/* Mobile Water/Energy Saving Card */}
              <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-xl p-4 sm:p-5 shadow-xl border border-[#2e2e2e] relative overflow-hidden group">
                <div className="mb-4 sm:mb-5 flex justify-center">
                  <div className="p-2">
                    <img
                      src="/triangulo.png"
                      alt="Ahorro de agua y energía"
                      className="w-28 sm:w-36 h-28 sm:h-36 object-contain mx-auto"
                    />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                  Potenciamos el ahorro de agua y energía
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8F91] text-center">
                  Tecnología avanzada que optimiza recursos y maximiza
                  eficiencia
                </p>
              </div>

              {/* Mobile Efficient Process Card */}
              <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] rounded-xl p-4 sm:p-5 shadow-xl border border-[#2e2e2e] relative overflow-hidden group">
                <div className="mb-4 sm:mb-5 flex justify-center">
                  <div className="p-2">
                    <img
                      src="/Engranajes.png"
                      alt="Procesos eficientes"
                      className="w-28 sm:w-36 h-28 sm:h-36 object-contain mx-auto"
                    />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#BE171F] to-[#F43F48]">
                  Excelencia en procesos
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8F91] text-center">
                  Sistemas robustos y soluciones confiables
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sección de Servicios */}
      <div ref={servicesRef}>
        <Servicios />
      </div>

      {/* Sección Nosotros */}
      <div ref={aboutRef}>
        <Nosotros />
      </div>

      {/* Sección Contacto */}
      <div ref={contactRef}>
        <Contacto />
      </div>

      {/* Footer - Optimizado para móviles */}
      <footer className="bg-[#000000] border-t border-[#4E4F50] py-8 sm:py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#BE171F] to-[#F43F48] rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <span className="text-lg sm:text-xl font-bold text-white">J</span>
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Moto-Bombas y Reductores Jordan S.A de C.V.
              </span>
            </div>
            <p className="text-[#8E8F91] mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm">
              Potenciando el bombeo, control y potencia de tus proyectos desde
              1999 con soluciones innovadoras y confiables
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-[#8E8F91] mb-6 sm:mb-8 text-xs sm:text-sm">
              <button
                onClick={() => scrollToSection(servicesRef)}
                className="hover:text-[#BE171F] transition-colors px-2 py-1"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="hover:text-[#BE171F] transition-colors px-2 py-1"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="hover:text-[#BE171F] transition-colors px-2 py-1"
              >
                Contacto
              </button>
              <button
                onClick={handleWhatsApp}
                className="hover:text-[#BE171F] transition-colors px-2 py-1"
              >
                Cotizar
              </button>
            </div>
            <div className="mt-6 pt-4 sm:pt-6 border-t border-[#4E4F50] text-[#6B6C6F] text-xs">
              <p>
                &copy; 2025 Moto-Bombas y Reductores Jordan S.A de C.V. Todos
                los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}