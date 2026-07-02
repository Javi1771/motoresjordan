"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form,     setForm]     = useState({ email: "", password: "", remember: false });
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focused,  setFocused]  = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email)    { setError("El correo es obligatorio."); return; }
    if (!form.password) { setError("La contraseña es obligatoria."); return; }
    setError("");
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Credenciales incorrectas.");
      } else {
        if (form.remember) {
          try { localStorage.setItem("mj-remember-email", form.email); } catch {}
        }
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function inputStyle(field) {
    return {
      width: "100%", padding: "12px 14px",
      background: "var(--bg)",
      border: focused === field
        ? "1px solid #D81F26"
        : error && !form[field]
          ? "1px solid rgba(216,31,38,.5)"
          : "1px solid var(--line)",
      color: "var(--fg)",
      fontFamily: "'Archivo',sans-serif", fontSize: 14,
      outline: "none", boxSizing: "border-box",
      transition: "border-color .15s",
      boxShadow: focused === field ? "0 0 0 3px rgba(216,31,38,.1)" : "none",
    };
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
        backgroundSize: "60px 60px", opacity: 0.25,
      }} />

      {/* Top stripe */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 5,
        background: "repeating-linear-gradient(135deg, #D81F26 0 16px, var(--bg) 16px 32px)",
        zIndex: 10,
      }} />

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, background: "#D81F26",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            marginBottom: 18,
          }}>
            <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 32, color: "#fff" }}>J</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 24, color: "var(--fg)", letterSpacing: 2 }}>MOTORES</span>
            <span style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 24, color: "#D81F26", letterSpacing: 2 }}>JORDAN</span>
          </div>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--faint)", letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>
            PANEL ADMINISTRATIVO
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--line)", padding: "36px 32px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 22, color: "var(--fg)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>
              Iniciar sesión
            </h1>
            <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--faint)", margin: 0 }}>
              Acceso restringido al personal autorizado.
            </p>
          </div>

          {error && (
            <div style={{
              marginBottom: 20, padding: "11px 14px",
              background: "rgba(216,31,38,.08)", border: "1px solid rgba(216,31,38,.25)",
              fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "#D81F26",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>!</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{
                fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
                color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1,
                display: "block", marginBottom: 7,
              }}>
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                style={inputStyle("email")}
                placeholder="admin@ejemplo.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label style={{
                fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
                color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1,
                display: "block", marginBottom: 7,
              }}>
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  style={{ ...inputStyle("password"), paddingRight: 44 }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--faint)", padding: 4, display: "flex",
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label style={{
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--muted)",
              letterSpacing: 1, textTransform: "uppercase", userSelect: "none",
            }}>
              <div
                onClick={() => setForm({ ...form, remember: !form.remember })}
                style={{
                  width: 16, height: 16, border: "1px solid", flexShrink: 0,
                  borderColor: form.remember ? "#D81F26" : "var(--line)",
                  background: form.remember ? "#D81F26" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all .15s",
                }}
              >
                {form.remember && <span style={{ color: "#fff", fontSize: 11, lineHeight: 1 }}>✓</span>}
              </div>
              Recordar sesión
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#8a1318" : "#D81F26",
                color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16,
                letterSpacing: 1, textTransform: "uppercase", padding: "14px",
                transition: "background .15s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 4,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#b01920"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#D81F26"; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 14, height: 14,
                    border: "2px solid rgba(255,255,255,.3)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    display: "inline-block", animation: "spin 0.7s linear infinite",
                  }} />
                  INICIANDO SESIÓN...
                </>
              ) : "INICIAR SESIÓN →"}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: "center", fontFamily: "'Space Mono',monospace",
          fontSize: 9, color: "var(--faint)", letterSpacing: 1,
          textTransform: "uppercase", marginTop: 24,
        }}>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> MOTORES JORDAN · ACCESO RESTRINGIDO
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
