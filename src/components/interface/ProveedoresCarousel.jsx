"use client";
import { useRef, useState } from "react";

export default function ProveedoresCarousel({ providers }) {
  const [paused, setPaused] = useState(false);

  if (!providers?.length) return null;

  // Duplicate list for seamless loop
  const list = [...providers, ...providers, ...providers];

  return (
    <div
      style={{ overflow: "hidden", position: "relative", cursor: "grab" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade masks */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(to right, var(--bg), transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(to left, var(--bg), transparent)",
        pointerEvents: "none",
      }} />

      <div
        style={{
          display: "flex",
          gap: 24,
          animation: `marquee 30s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {list.map((file, i) => (
          <div
            key={i}
            style={{
              width: 140, height: 90, background: "var(--bg2)",
              border: "1px solid var(--cardline)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "16px 20px", flexShrink: 0,
              transition: "border-color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#D81F26")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--cardline)")}
          >
            <img
              src={`/${file}`}
              alt={file.replace(/\.[^.]+$/, "").replace(/_/g, " ")}
              style={{
                maxWidth: "100%", maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 8px)); }
        }
      `}</style>
    </div>
  );
}
