"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ icon: iconMode = false }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current);

    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(t);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  function pick(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("mj-theme", t);
  }

  // Icon-only variant: single button that toggles between sun and moon
  if (iconMode) {
    const isDark = theme === "dark";
    return (
      <button
        onClick={() => pick(isDark ? "light" : "dark")}
        title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#D2D2D2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 6,
          borderRadius: 4,
          transition: "color .2s, transform .3s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "rotate(20deg)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#D2D2D2"; e.currentTarget.style.transform = "rotate(0deg)"; }}
      >
        {isDark ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
      </button>
    );
  }

  // Default pill variant (used in admin sidebar / mobile bar)
  return (
    <div style={{
      display: "inline-flex",
      background: "var(--bg3)",
      border: "1px solid var(--line)",
      borderRadius: 3,
      padding: 2,
      gap: 2,
      flexShrink: 0,
    }}>
      {[
        { emoji: "☀", label: "Claro", val: "light" },
        { emoji: "☾", label: "Oscuro", val: "dark" },
      ].map(({ emoji, label, val }) => (
        <button
          key={val}
          onClick={() => pick(val)}
          title={label}
          style={{
            padding: "5px 10px",
            borderRadius: 2,
            border: "none",
            cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            background: theme === val ? "#D81F26" : "transparent",
            color: theme === val ? "#fff" : "var(--faint)",
            transition: "all .15s",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 11 }}>{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
