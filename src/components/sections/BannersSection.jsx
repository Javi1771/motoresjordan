"use client";
import { useEffect, useState } from "react";

export default function BannersSection({ onLoad }) {
  const [banners, setBanners] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/banners")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setBanners(list);
        setLoaded(true);
        onLoad?.(list.length > 0);
      })
      .catch(() => { setLoaded(true); onLoad?.(false); });
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 5000);
    return () => clearInterval(id);
  }, [banners.length]);

  if (!loaded || banners.length === 0) return null;

  const banner = banners[current];
  const Wrapper = banner.enlace ? "a" : "div";
  const wrapperProps = banner.enlace
    ? { href: banner.enlace, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <Wrapper
          {...wrapperProps}
          style={{
            display: "block", position: "relative", overflow: "hidden",
            textDecoration: "none",
            cursor: banner.enlace ? "pointer" : "default",
            aspectRatio: "16/5",
            background: "var(--bg3)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.imagen}
            alt={banner.titulo || "Banner promocional"}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />

          {banner.titulo && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(14,14,15,.85), transparent)",
              padding: "32px 40px 24px",
            }}>
              <span style={{
                fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800,
                fontSize: "clamp(20px,2.5vw,32px)", textTransform: "uppercase",
                color: "#EDEDED", textShadow: "0 2px 8px rgba(0,0,0,.5)",
              }}>
                {banner.titulo}
              </span>
              {banner.enlace && (
                <span style={{
                  display: "inline-block", marginLeft: 16,
                  fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
                  letterSpacing: 2, color: "#D81F26", textTransform: "uppercase",
                }}>
                  VER MÁS →
                </span>
              )}
            </div>
          )}
        </Wrapper>

        {/* Dot navigation when multiple banners */}
        {banners.length > 1 && (
          <div style={{
            display: "flex", justifyContent: "center", gap: 8,
            padding: "12px 0", background: "var(--bg2)",
          }}>
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Banner ${i + 1}`}
                style={{
                  width: i === current ? 24 : 8, height: 8,
                  background: i === current ? "#D81F26" : "var(--line)",
                  border: "none", cursor: "pointer",
                  transition: "width .3s, background .3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
