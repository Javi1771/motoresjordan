"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function ImageCarousel({ title, folder, eyebrow, subtitle }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    fetch(`/api/images/${folder}`)
      .then((r) => r.json())
      .then((d) => setImages(d.images || []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, [folder]);

  const checkEnd = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 32);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", checkEnd, { passive: true });
    return () => track.removeEventListener("scroll", checkEnd);
  }, [checkEnd, images]);

  function scroll(dir) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector("[data-card]")?.offsetWidth ?? 280;
    track.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  }

  function openWhatsApp() {
    const msg = `Hola, busco un equipo específico de ${title}. ¿Podrían ayudarme?`;
    window.open(`https://wa.me/524273762379?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <section className="section-pad" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          marginBottom: 36,
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 style={{
              fontFamily: "'Saira Condensed',sans-serif",
              fontWeight: 800, fontSize: "clamp(28px,3.5vw,40px)",
              textTransform: "uppercase", color: "var(--fg)",
              margin: 0, lineHeight: 1.05,
            }}>
              {title}
            </h2>
            {subtitle && (
              <p style={{
                fontFamily: "'Archivo',sans-serif", fontSize: 15,
                color: "var(--muted)", marginTop: 10, maxWidth: 480,
              }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Arrow controls */}
          <div style={{ display: "flex", gap: 8 }}>
            {[ChevronLeft, ChevronRight].map((Icon, i) => (
              <button
                key={i}
                onClick={() => scroll(i === 0 ? -1 : 1)}
                aria-label={i === 0 ? "Anterior" : "Siguiente"}
                style={{
                  width: 40, height: 40,
                  background: "var(--bg2)", border: "1px solid var(--line)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "var(--fg)",
                  transition: "border-color .15s, color .15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#D81F26";
                  e.currentTarget.style.color = "#D81F26";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.color = "var(--fg)";
                }}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ height: 220, border: "1px solid var(--line)" }} className="img-placeholder" />
        ) : images.length === 0 ? null : (
          <div style={{ position: "relative" }}>
            {/* Left fade */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 48, zIndex: 2,
              background: "linear-gradient(to right, var(--bg), transparent)",
              pointerEvents: "none",
            }} />
            {/* Right fade — fades out when at end to reveal CTA */}
            <div style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: 48, zIndex: 2,
              background: "linear-gradient(to left, var(--bg), transparent)",
              pointerEvents: "none",
              opacity: atEnd ? 0 : 1,
              transition: "opacity .4s",
            }} />

            <div
              ref={trackRef}
              className="img-carousel-track"
              style={{
                display: "flex", gap: 16,
                overflowX: "auto", scrollSnapType: "x mandatory",
              }}
            >
              {/* Image cards */}
              {images.map((file, i) => (
                <div
                  key={i}
                  data-card
                  style={{
                    flexShrink: 0,
                    width: "clamp(200px, 25vw, 280px)",
                    height: 220,
                    background: "var(--bg2)",
                    border: "1px solid var(--cardline)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 16, scrollSnapAlign: "start",
                    transition: "border-color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D81F26")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--cardline)")}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image
                      src={`/${folder}/${file}`}
                      alt={`${title} ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}

              {/* CTA card — always the last item */}
              <div
                data-card
                style={{
                  flexShrink: 0,
                  width: "clamp(240px, 28vw, 320px)",
                  height: 220,
                  background: "var(--bg2)",
                  border: "1px solid #D81F26",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  padding: "24px 28px", scrollSnapAlign: "start",
                  textAlign: "center", gap: 14,
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Subtle red glow */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 50% 120%, rgba(216,31,38,.18) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                <div style={{
                  width: 44, height: 44, background: "rgba(216,31,38,.15)",
                  border: "1px solid rgba(216,31,38,.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, position: "relative",
                }}>
                  <MessageCircle size={20} color="#D81F26" />
                </div>

                <div style={{ position: "relative" }}>
                  <div style={{
                    fontFamily: "'Saira Condensed',sans-serif",
                    fontWeight: 800, fontSize: 18, textTransform: "uppercase",
                    color: "var(--fg)", lineHeight: 1.1, marginBottom: 6,
                  }}>
                    ¿Buscas uno en específico?
                  </div>
                  <div style={{
                    fontFamily: "'Archivo',sans-serif", fontSize: 12,
                    color: "var(--muted)", lineHeight: 1.5,
                  }}>
                    Cuéntanos qué necesitas y te ayudamos a encontrarlo.
                  </div>
                </div>

                <button
                  onClick={openWhatsApp}
                  style={{
                    background: "#25D366", color: "#fff", border: "none",
                    cursor: "pointer", padding: "10px 18px",
                    fontFamily: "'Saira Condensed',sans-serif",
                    fontWeight: 700, fontSize: 13, letterSpacing: 1,
                    textTransform: "uppercase",
                    display: "flex", alignItems: "center", gap: 7,
                    transition: "background .15s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1da851")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#25D366")}
                >
                  <FaWhatsapp size={15} /> PREGÚNTANOS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .img-carousel-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .img-carousel-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
