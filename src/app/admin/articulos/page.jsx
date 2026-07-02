"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminModal from "@/components/admin/AdminModal";
import { Input, Textarea, Toggle, SaveButton } from "@/components/admin/AdminField";
import { fmtDate } from "@/lib/fmt";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = { titulo: "", slug: "", contenido: "", imagen: "", publicado: false };

function makeSlug(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function ArticulosPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, item: null });
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/articulos");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openCreate() {
    setForm(EMPTY); setError(""); setModal({ open: true, item: null });
  }

  function openEdit(item) {
    setForm({ titulo: item.titulo, slug: item.slug, contenido: item.contenido, imagen: item.imagen ?? "", publicado: item.publicado });
    setError(""); setModal({ open: true, item });
  }

  function handleTituloChange(titulo) {
    setForm((f) => ({ ...f, titulo, slug: f.slug || (!modal.item ? makeSlug(titulo) : f.slug) }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = modal.item ? `/api/admin/articulos/${modal.item.id}` : "/api/admin/articulos";
      const res = await fetch(url, {
        method: modal.item ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error."); return; }
      setModal({ open: false, item: null }); fetchData();
    } catch { setError("Error de conexión."); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    await fetch(`/api/admin/articulos/${id}`, { method: "DELETE" });
    setDeleteId(null); fetchData();
  }

  async function togglePublicado(item) {
    await fetch(`/api/admin/articulos/${item.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, publicado: !item.publicado }),
    });
    fetchData();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--fg)", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
            Artículos
          </h1>
          <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
            {items.length} artículos registrados
          </p>
        </div>
        <button
          onClick={openCreate}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#D81F26", color: "#fff", border: "none", cursor: "pointer",
            fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: 700,
            letterSpacing: 1, textTransform: "uppercase", padding: "10px 16px",
            transition: "opacity .15s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          <Plus size={14} /> NUEVO ARTÍCULO
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "64px 0", fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--faint)" }}>
          Cargando...
        </div>
      ) : (
        <div style={{ background: "var(--bg2)", border: "1px solid var(--line)", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Archivo',sans-serif", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)" }}>
                {["Título", "Slug", "Estado", "Fecha", "Acciones"].map((h) => (
                  <th key={h} style={{
                    textAlign: "left", padding: "12px 16px",
                    fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
                    letterSpacing: 1, textTransform: "uppercase", color: "var(--faint)",
                    whiteSpace: "nowrap",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "48px 16px", color: "var(--faint)" }}>
                    No hay artículos.
                  </td>
                </tr>
              ) : items.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: "1px solid var(--line)", transition: "background .1s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg3)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "12px 16px", color: "var(--fg)" }}>{item.titulo}</td>
                  <td style={{ padding: "12px 16px", color: "var(--faint)", fontFamily: "'Space Mono',monospace", fontSize: 11 }}>
                    {item.slug}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => togglePublicado(item)}
                      aria-label={item.publicado ? `Despublicar ${item.titulo}` : `Publicar ${item.titulo}`}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      {item.publicado ? (
                        <span style={{ fontSize: 10, background: "rgba(34,197,94,.1)", color: "#22c55e", padding: "3px 8px", fontFamily: "'Space Mono',monospace", letterSpacing: 1 }}>
                          PUBLICADO
                        </span>
                      ) : (
                        <span style={{ fontSize: 10, background: "var(--bg3)", color: "var(--muted)", padding: "3px 8px", fontFamily: "'Space Mono',monospace", letterSpacing: 1 }}>
                          BORRADOR
                        </span>
                      )}
                    </button>
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)", fontSize: 12 }}>
                    {fmtDate(item.creadoEn)}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button
                        onClick={() => openEdit(item)}
                        aria-label={`Editar ${item.titulo}`}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--muted)", display: "flex", borderRadius: 2, transition: "color .15s, background .15s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--fg)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        aria-label={`Eliminar ${item.titulo}`}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--muted)", display: "flex", borderRadius: 2, transition: "color .15s, background .15s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(216,31,38,.08)"; e.currentTarget.style.color = "#D81F26"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdminModal open={modal.open} onClose={() => setModal({ open: false, item: null })}
        title={modal.item ? "Editar artículo" : "Nuevo artículo"}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {error && (
            <div style={{ padding: "11px 14px", background: "rgba(216,31,38,.08)", border: "1px solid rgba(216,31,38,.25)", color: "#D81F26", fontFamily: "'Archivo',sans-serif", fontSize: 13 }}>
              {error}
            </div>
          )}
          <Input label="Título" required value={form.titulo}
            onChange={(e) => handleTituloChange(e.target.value)} />
          <Input label="Slug" required value={form.slug}
            onChange={(e) => setForm({ ...form, slug: makeSlug(e.target.value) })}
            placeholder="mi-articulo" />
          <Textarea label="Contenido" required rows={6} value={form.contenido}
            onChange={(e) => setForm({ ...form, contenido: e.target.value })} />
          <ImageUpload label="Imagen del artículo" value={form.imagen}
            onChange={(url) => setForm({ ...form, imagen: url })} />
          <Toggle label="Publicado" checked={form.publicado}
            onChange={(v) => setForm({ ...form, publicado: v })} />
          <SaveButton loading={saving} />
        </form>
      </AdminModal>

      <AdminModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar eliminación">
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
          ¿Eliminar este artículo? Esta acción no se puede deshacer.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setDeleteId(null)}
            style={{ flex: 1, padding: "10px 16px", border: "1px solid var(--line)", background: "none", color: "var(--muted)", fontFamily: "'Archivo',sans-serif", fontSize: 13, cursor: "pointer", transition: "background .15s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg3)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "none"}
          >
            Cancelar
          </button>
          <button
            onClick={() => handleDelete(deleteId)}
            style={{ flex: 1, padding: "10px 16px", background: "#D81F26", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Archivo',sans-serif", fontSize: 13, fontWeight: 600, transition: "opacity .15s" }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            Eliminar
          </button>
        </div>
      </AdminModal>
    </div>
  );
}
