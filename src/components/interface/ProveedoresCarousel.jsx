// ProveedoresCarousel.jsx
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProveedoresCarousel = ({ providers }) => {
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Función para desplazar el carrusel
  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.6;
    const newPosition =
      direction === "left"
        ? Math.max(scrollPosition - scrollAmount, 0)
        : Math.min(scrollPosition + scrollAmount, maxScroll);

    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);

    // Actualizar slide actual
    const newSlide = Math.round(
      newPosition / (container.scrollWidth / providers.length)
    );
    setCurrentSlide(newSlide);
  };

  // Auto-scroll para el carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      const container = carouselRef.current;
      if (!container) return;

      const newPosition = scrollPosition + 200;
      if (newPosition >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        setScrollPosition(0);
        setCurrentSlide(0);
      } else {
        container.scrollTo({ left: newPosition, behavior: "smooth" });
        setScrollPosition(newPosition);
        setCurrentSlide(
          Math.round(newPosition / (container.scrollWidth / providers.length))
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollPosition, maxScroll, isAutoPlaying, providers.length]);

  // Calcular el scroll máximo al montar y redimensionar
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      const updateMaxScroll = () => {
        setMaxScroll(container.scrollWidth - container.offsetWidth);
      };

      updateMaxScroll();
      window.addEventListener("resize", updateMaxScroll);

      return () => window.removeEventListener("resize", updateMaxScroll);
    }
  }, []);

  return (
    <div
      className="relative py-16"
      onMouseEnter={() => {
        setIsAutoPlaying(false);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsAutoPlaying(true);
        setIsHovered(false);
      }}
    >
      {/* Fondo sutil con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/20 to-transparent z-0"></div>

      {/* Botón izquierdo */}
      <button
        onClick={() => scroll("left")}
        disabled={scrollPosition === 0}
        className={`absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2
    bg-gradient-to-br from-white/70 to-white/30 text-red-700 shadow-lg
    hover:from-white hover:to-white hover:shadow-red-400/70
    backdrop-blur-lg rounded-full p-3 z-20
    transition-all duration-300 ease-in-out
    ${
      scrollPosition === 0 ? "opacity-40 cursor-not-allowed" : "hover:scale-110"
    }
    ${isHovered || true ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        <ChevronLeft className="w-7 h-7 text-red-700" />
      </button>

      {/* Botón derecho */}
      <button
        onClick={() => scroll("right")}
        disabled={scrollPosition >= maxScroll}
        className={`absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2
    bg-gradient-to-br from-white/70 to-white/30 text-red-700 shadow-lg
    hover:from-white hover:to-white hover:shadow-red-400/70
    backdrop-blur-lg rounded-full p-3 z-20
    transition-all duration-300 ease-in-out
    ${
      scrollPosition >= maxScroll
        ? "opacity-40 cursor-not-allowed"
        : "hover:scale-110"
    }
    ${isHovered || true ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        <ChevronRight className="w-7 h-7 text-red-700" />
      </button>

      {/* Contenedor del carrusel con efecto de color corregido */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth space-x-8 px-16 pb-6 hide-scrollbar"
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {providers.map((file, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 h-64 bg-white p-6 rounded-2xl flex items-center justify-center transform transition-all duration-300 group"
            style={{
              boxShadow: "0 5px 25px -5px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
              willChange: "transform",
            }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              style={{ transform: "translateZ(0)" }}
            >
              {/* Imagen con efecto de color al hacer hover - CORRECCIÓN */}
              <img
                src={`/${file}`}
                alt={file}
                className="w-full h-full object-contain transition-all duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                style={{
                  willChange: "filter, transform",
                }}
              />

              {/* Efecto de brillo */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                style={{ willChange: "opacity" }}
              ></div>

              {/* Borde sutil al hacer hover */}
              <div
                className="absolute inset-0 rounded-xl border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.8)",
                  willChange: "opacity",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de posición mejorados */}
      <div className="flex justify-center mt-8 space-x-1.5">
        {Array.from({ length: providers.length }).map((_, i) => (
          <button
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
              i === currentSlide
                ? "bg-gradient-to-r from-red-500 to-red-600 w-8 shadow shadow-red-500/50"
                : "bg-white/40 w-3 hover:bg-white/70"
            }`}
            onClick={() => {
              const container = carouselRef.current;
              if (container) {
                const scrollPos =
                  (container.scrollWidth / providers.length) * i;
                container.scrollTo({ left: scrollPos, behavior: "smooth" });
                setScrollPosition(scrollPos);
                setCurrentSlide(i);
              }
            }}
            aria-label={`Ir al slide ${i + 1}`}
          ></button>
        ))}
      </div>

      {/* Contador de slides */}
      <div className="text-center mt-4 text-sm text-white/80 transition-all duration-500">
        <span className="font-medium text-white">{currentSlide + 1}</span>
        <span className="mx-1">/</span>
        <span>{providers.length}</span>
      </div>
    </div>
  );
};

export default ProveedoresCarousel;
