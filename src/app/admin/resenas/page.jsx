"use client";
import { useEffect, useState, useCallback } from "react";
import { Trash2, Star, Lightbulb, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { fmtDate } from "@/lib/fmt";

const tdS = {
  fontFamily: "'Archivo',sans-serif", fontSize: 13,
  color: "var(--muted)", padding: "12px 14px",
  borderBottom: "1px solid var(--line)", verticalAlign: "top",
};
const thS = {
  ...tdS, fontFamily: "'Space Mono',monospace", fontSize: 10,
  fontWeight: 700, color: "#D81F26", letterSpacing: 1,
  textTransform: "uppercase",
};

function EstadoBadge({ revisada, publicada }) {
  if (publicada) {
    return (
      <span style={{
        fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 1,
        padding: "3px 8px",
        background: "rgba(34,197,94,.1)", color: "#22c55e",
        border: "1px solid rgba(34,197,94,.3)",
      }}>
        PUBLICADA
      </span>
    );
  }
  if (revisada) {
    return (
      <span style={{
        fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 1,
        padding: "3px 8px",
        background: "rgba(234,179,8,.1)", color: "#ca8a04",
        border: "1px solid rgba(234,179,8,.3)",
      }}>
        REVISADA · NO PUBLICADA
      </span>
    );
  }
  return (
    <span style={{
      fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 1,
      padding: "3px 8px",
      background: "rgba(216,31,38,.1)", color: "#D81F26",
      border: "1px solid rgba(216,31,38,.3)",
    }}>
      PENDIENTE
    </span>
  );
}

export default function ResenasPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("todas");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/resenas");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function marcarRevisada(item) {
    await fetch(`/api/admin/resenas/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revisada: true }),
    });
    fetchData();
  }

  async function publicar(item) {
    await fetch(`/api/admin/resenas/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicada: true }),
    });
    fetchData();
  }

  async function despublicar(item) {
    await fetch(`/api/admin/resenas/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicada: false }),
    });
    fetchData();
  }

  async function remove(id) {
    if (!confirm("¿Eliminar esta reseña?")) return;
    await fetch(`/api/admin/resenas/${id}`, { method: "DELETE" });
    fetchData();
  }

  const TABS = [
    { key: "todas",      label: "TODAS",             filter: () => true },
    { key: "pendientes", label: "PENDIENTES",         filter: (i) => !i.revisada && !i.publicada },
    { key: "revisadas",  label: "REVISADAS",          filter: (i) => i.revisada && !i.publicada },
    { key: "publicadas", label: "PUBLICADAS",         filter: (i) => i.publicada },
    { key: "resenas",    label: "RESEÑAS",            filter: (i) => i.tipo === "resena" },
    { key: "propuestas", label: "PROPUESTAS",         filter: (i) => i.tipo === "propuesta" },
  ];

  const filtered = items.filter(TABS.find((t) => t.key === tab)?.filter ?? (() => true));
  const counts = Object.fromEntries(TABS.map((t) => [t.key, items.filter(t.filter).length]));

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28, borderBottom: "1px solid var(--line)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#D81F26", letterSpacing: 2, marginBottom: 6 }}>
          // GESTIÓN
        </div>
        <h1 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 28, textTransform: "uppercase", color: "var(--fg)", margin: 0 }}>
          RESEÑAS Y PROPUESTAS
        </h1>
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--faint)", marginTop: 6 }}>
          Pendiente = sin revisar · Revisada = vista pero no publicada · Publicada = visible en el sitio
        </p>
      </div>

      {/* Tab filters */}
      <div style={{ display: "flex", gap: 1, marginBottom: 24, flexWrap: "wrap" }}>
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "10px 14px",
              background: tab === key ? "#D81F26" : "var(--bg2)",
              border: `1px solid ${tab === key ? "#D81F26" : "var(--line)"}`,
              cursor: "pointer", transition: "all .15s",
            }}
          >
            <div style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: tab === key ? "#fff" : "var(--fg)" }}>
              {counts[key]}
            </div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: tab === key ? "rgba(255,255,255,.8)" : "var(--faint)", letterSpacing: 1 }}>
              {label}
            </div>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: "center", color: "var(--faint)", padding: 48, fontFamily: "'Space Mono',monospace", fontSize: 11 }}>CARGANDO...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", color: "var(--faint)", padding: 48, fontFamily: "'Space Mono',monospace", fontSize: 11, border: "1px solid var(--line)" }}>
          SIN REGISTROS EN ESTA CATEGORÍA
        </div>
      ) : (
        <div style={{ background: "var(--bg2)", border: "1px solid var(--line)", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...thS, textAlign: "left" }}>TIPO</th>
                <th style={{ ...thS, textAlign: "left" }}>AUTOR</th>
                <th style={{ ...thS, textAlign: "left" }}>MENSAJE</th>
                <th style={{ ...thS, textAlign: "left" }}>FECHA</th>
                <th style={{ ...thS, textAlign: "center" }}>ESTADO</th>
                <th style={{ ...thS, textAlign: "center" }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td style={tdS}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {item.tipo === "resena" ? (
                        <Star size={13} color="#D81F26" />
                      ) : (
                        <Lightbulb size={13} color="#9A9A9E" />
                      )}
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase" }}>
                        {item.tipo === "resena" ? "RESEÑA" : "PROPUESTA"}
                      </span>
                    </div>
                    {item.tipo === "resena" && (
                      <div style={{ marginTop: 4, display: "flex", gap: 2 }}>
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i} style={{ color: "#D81F26", fontSize: 11 }}>★</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td style={tdS}>
                    <div style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--fg)", textTransform: "uppercase" }}>
                      {item.nombre}
                    </div>
                    {item.email && (
                      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)", marginTop: 2 }}>
                        {item.email}
                      </div>
                    )}
                  </td>
                  <td style={{ ...tdS, maxWidth: 320 }}>
                    <p style={{ margin: 0, lineHeight: 1.5, color: "#9A9A9E" }}>{item.mensaje}</p>
                  </td>
                  <td style={{ ...tdS, whiteSpace: "nowrap" }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: 1 }}>
                      {fmtDate(item.creadoEn)}
                    </span>
                  </td>
                  <td style={{ ...tdS, textAlign: "center" }}>
                    <EstadoBadge revisada={item.revisada} publicada={item.publicada} />
                  </td>
                  <td style={{ ...tdS, textAlign: "center" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>

                      {/* Pendiente → Marcar revisada */}
                      {!item.revisada && !item.publicada && (
                        <button
                          onClick={() => marcarRevisada(item)}
                          title="Marcar como revisada (sin publicar)"
                          style={{
                            background: "rgba(234,179,8,.1)", border: "1px solid rgba(234,179,8,.3)",
                            cursor: "pointer", padding: "5px 8px", display: "flex", gap: 4, alignItems: "center",
                            fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#ca8a04",
                          }}
                        >
                          <Eye size={13} /> REVISAR
                        </button>
                      )}

                      {/* No publicada → Publicar */}
                      {!item.publicada && (
                        <button
                          onClick={() => publicar(item)}
                          title="Publicar en el sitio"
                          style={{
                            background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.3)",
                            cursor: "pointer", padding: "5px 8px", display: "flex", gap: 4, alignItems: "center",
                            fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#22c55e",
                          }}
                        >
                          <CheckCircle size={13} /> PUBLICAR
                        </button>
                      )}

                      {/* Publicada → Despublicar */}
                      {item.publicada && (
                        <button
                          onClick={() => despublicar(item)}
                          title="Quitar del sitio"
                          style={{
                            background: "rgba(234,179,8,.1)", border: "1px solid rgba(234,179,8,.3)",
                            cursor: "pointer", padding: "5px 8px", display: "flex", gap: 4, alignItems: "center",
                            fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#ca8a04",
                          }}
                        >
                          <XCircle size={13} /> QUITAR
                        </button>
                      )}

                      {/* Eliminar siempre */}
                      <button
                        onClick={() => remove(item.id)}
                        title="Eliminar permanentemente"
                        style={{
                          background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)",
                          cursor: "pointer", padding: "5px 8px", display: "flex",
                        }}
                      >
                        <Trash2 size={13} color="#ef4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
