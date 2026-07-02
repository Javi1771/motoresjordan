"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, Megaphone, ImageIcon,
  Images, FileText, Settings, LogOut, Menu, X,
  ChevronRight, ExternalLink, Star,
} from "lucide-react";
import ThemeToggle from "../ThemeToggle";

const NAV_GROUPS = [
  {
    label: "CONTENIDO",
    items: [
      { href: "/admin",            label: "DASHBOARD",     icon: LayoutDashboard, exact: true },
      { href: "/admin/catalogo",   label: "CATÁLOGO",      icon: Package },
      { href: "/admin/promociones",label: "PROMOCIONES",   icon: Megaphone },
      { href: "/admin/banners",    label: "BANNERS",       icon: ImageIcon },
      { href: "/admin/galeria",    label: "GALERÍA",       icon: Images },
      { href: "/admin/articulos",  label: "ARTÍCULOS",     icon: FileText },
    ],
  },
  {
    label: "GESTIÓN",
    items: [
      { href: "/admin/resenas",      label: "RESEÑAS",       icon: Star },
      { href: "/admin/configuracion",label: "CONFIGURACIÓN", icon: Settings },
    ],
  },
];

export default function AdminShell({ user, children }) {
  const pathname      = usePathname();
  const router        = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    try { await fetch("/api/admin/logout", { method: "POST" }); } catch {}
    window.location.href = "/admin/login";
  }

  if (pathname === "/admin/login") return <>{children}</>;

  function isActive(item) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "AD";

  const NavContent = ({ onLinkClick }) => (
    <div style={{ flex: 1, padding: "8px 10px", overflowY: "auto" }}>
      {NAV_GROUPS.map((group) => (
        <div key={group.label} style={{ marginBottom: 8 }}>
          <div style={{
            fontFamily: "'Space Mono',monospace", fontSize: 9,
            color: "var(--faint)", letterSpacing: 2,
            padding: "10px 12px 6px", textTransform: "uppercase",
          }}>
            // {group.label}
          </div>
          {group.items.map((item) => {
            const Icon   = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", marginBottom: 1,
                  borderLeft: active ? "2px solid #D81F26" : "2px solid transparent",
                  background: active ? "rgba(216,31,38,.08)" : "transparent",
                  color: active ? "var(--fg)" : "var(--faint)",
                  fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
                  letterSpacing: 1, textDecoration: "none",
                  transition: "all .15s", borderRadius: "0 3px 3px 0",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "var(--bg3)";
                    e.currentTarget.style.color = "var(--fg)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--faint)";
                  }
                }}
              >
                <Icon size={14} color={active ? "#D81F26" : undefined} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {active && <ChevronRight size={11} color="#D81F26" />}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );

  const SidebarContent = ({ onLinkClick }) => (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "var(--bg2)", borderRight: "1px solid var(--line)",
    }}>
      {/* Header */}
      <div style={{
        padding: "0 16px", height: 66,
        borderBottom: "1px solid var(--line)",
        display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
      }}>
        <div style={{ width: 28, height: 28, background: "#D81F26", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>J</span>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 14, color: "var(--fg)", letterSpacing: 1, lineHeight: 1.2 }}>
            MOTORES JORDAN
          </div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "var(--faint)", letterSpacing: 1, marginTop: 2 }}>
            PANEL ADMIN
          </div>
        </div>
      </div>
      <div style={{ height: 3, flexShrink: 0, background: "repeating-linear-gradient(135deg, #D81F26 0 12px, var(--bg2) 12px 24px)" }} />

      <NavContent onLinkClick={onLinkClick} />

      {/* Footer */}
      <div style={{ padding: "8px 10px", borderTop: "1px solid var(--line)", flexShrink: 0 }}>
        {/* Theme toggle */}
        <div style={{ padding: "8px 12px", marginBottom: 6 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "var(--faint)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            TEMA
          </div>
          <ThemeToggle />
        </div>

        {/* User badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", marginBottom: 4,
          background: "var(--bg3)", border: "1px solid var(--line)",
          borderRadius: 3,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "var(--line)", border: "1px solid var(--line)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 12, color: "#D81F26",
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--fg)", letterSpacing: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email ?? "admin"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "var(--faint)", letterSpacing: 1 }}>ACTIVO</span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", marginBottom: 2,
            fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--faint)",
            textDecoration: "none", letterSpacing: 1, transition: "color .15s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--faint)"}
        >
          <ExternalLink size={12} /> VER SITIO →
        </Link>
        <button
          onClick={logout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8,
            padding: "8px 12px", background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26",
            letterSpacing: 1, textAlign: "left", transition: "opacity .15s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          <LogOut size={12} /> CERRAR SESIÓN
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex" }}>

      {/* Desktop sidebar — display controlled by .admin-sidebar CSS class */}
      <aside className="admin-sidebar" style={{
        width: 232, flexShrink: 0,
        position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 30,
      }}>
        <SidebarContent onLinkClick={undefined} />
      </aside>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)" }}
            onClick={() => setMenuOpen(false)}
          />
          <aside style={{ position: "relative", width: 260, zIndex: 10, flexDirection: "column", display: "flex" }}>
            <SidebarContent onLinkClick={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="admin-main" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", marginLeft: 232 }}>

        {/* Mobile top bar — display controlled by .admin-mobile-bar CSS class */}
        <header className="admin-mobile-bar" style={{
          height: 54, background: "var(--bg2)", borderBottom: "1px solid var(--line)",
          alignItems: "center", padding: "0 16px", gap: 12,
          position: "sticky", top: 0, zIndex: 20,
        }}>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--faint)", padding: 4 }}
          >
            <Menu size={20} />
          </button>
          <div style={{ width: 24, height: 24, background: "#D81F26", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: "#fff" }}>J</span>
          </div>
          <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--fg)", letterSpacing: 1, flex: 1 }}>
            ADMIN
          </span>
          <ThemeToggle />
          <button
            onClick={logout}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#D81F26", padding: 4 }}
            aria-label="Cerrar sesión"
          >
            <LogOut size={17} />
          </button>
        </header>

        <main className="admin-content-pad" role="main" style={{ flex: 1, maxWidth: 1200 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
