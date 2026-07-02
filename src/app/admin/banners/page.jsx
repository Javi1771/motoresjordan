"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, GripVertical } from "lucide-react";
import AdminModal from "@/components/admin/AdminModal";
import { Input, Toggle, SaveButton } from "@/components/admin/AdminField";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = { titulo: "", imagen: "", enlace: "", orden: "", activo: true };

export default function BannersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, item: null });
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/banners");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openCreate() {
    setForm(EMPTY);
    setError(""); setModal({ open: true, item: null });
  }

  function openEdit(item) {
    setForm({ titulo: item.titulo ?? "", imagen: item.imagen, enlace: item.enlace ?? "", orden: item.orden, activo: item.activo });
    setError(""); setModal({ open: true, item });
  }

  async function handleSubmit(e) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = modal.item ? `/api/admin/banners/${modal.item.id}` : "/api/admin/banners";
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
    await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    setDeleteId(null); fetchData();
  }

  async function toggleActivo(item) {
    await fetch(`/api/admin/banners/${item.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, activo: !item.activo }),
    });
    fetchData();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--fg)", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
            Banners
          </h1>
          <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
            {items.length} banners registrados
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
          <Plus size={14} /> NUEVO BANNER
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "64px 0", fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--faint)" }}>
          Cargando...
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "64px 16px",
              color: "var(--faint)", background: "var(--bg2)", border: "1px solid var(--line)",
              fontFamily: "'Archivo',sans-serif", fontSize: 13,
            }}>
              No hay banners. Crea el primero.
            </div>
          ) : items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "var(--bg2)", border: "1px solid var(--line)",
                padding: 16, display: "flex", alignItems: "center", gap: 16,
                opacity: item.activo ? 1 : 0.6,
              }}
            >
              <GripVertical size={18} color="var(--faint)" style={{ flexShrink: 0, cursor: "grab" }} />
              <div style={{ width: 80, height: 56, background: "var(--bg)", overflow: "hidden", flexShrink: 0 }}>
                {item.imagen ? (
                  <img src={item.imagen} alt={item.titulo ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--faint)", fontSize: 11 }}>
                    Sin img
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--fg)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.titulo || "Sin título"}
                </p>
                <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: "var(--faint)", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.imagen}
                </p>
                {item.enlace && (
                  <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: "var(--muted)", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    → {item.enlace}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--faint)" }}>
                  #{item.orden}
                </span>
                <button
                  onClick={() => toggleActivo(item)}
                  aria-label={item.activo ? "Desactivar banner" : "Activar banner"}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                >
                  {item.activo ? <ToggleRight size={22} color="#22c55e" /> : <ToggleLeft size={22} color="var(--faint)" />}
                </button>
                <button
                  onClick={() => openEdit(item)}
                  aria-label="Editar banner"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--muted)", display: "flex", borderRadius: 2, transition: "color .15s, background .15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--fg)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  aria-label="Eliminar banner"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--muted)", display: "flex", borderRadius: 2, transition: "color .15s, background .15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(216,31,38,.08)"; e.currentTarget.style.color = "#D81F26"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modal.open} onClose={() => setModal({ open: false, item: null })}
        title={modal.item ? "Editar banner" : "Nuevo banner"}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {error && (
            <div style={{ padding: "11px 14px", background: "rgba(216,31,38,.08)", border: "1px solid rgba(216,31,38,.25)", color: "#D81F26", fontFamily: "'Archivo',sans-serif", fontSize: 13 }}>
              {error}
            </div>
          )}
          <Input label="Título (opcional)" value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Promo verano 2025" />
          <ImageUpload label="Imagen del banner" value={form.imagen}
            onChange={(url) => setForm({ ...form, imagen: url })} />
          <Input label="Enlace (opcional)" value={form.enlace}
            onChange={(e) => setForm({ ...form, enlace: e.target.value })} placeholder="https://..." />
          <Input label="Orden" type="number" min="0" placeholder="ej. 1" value={form.orden}
            onChange={(e) => setForm({ ...form, orden: e.target.value === "" ? "" : parseInt(e.target.value) })} />
          {form.orden !== "" && items.some((b) => b.orden === Number(form.orden) && b.id !== modal.item?.id) && (
            <div style={{ marginTop: -8, padding: "6px 10px", background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.3)", color: "#f59e0b", fontFamily: "'Archivo',sans-serif", fontSize: 12 }}>
              Esa posición ya está ocupada por otro banner.
            </div>
          )}
          <Toggle label="Banner activo" checked={form.activo}
            onChange={(v) => setForm({ ...form, activo: v })} />
          <SaveButton loading={saving} />
        </form>
      </AdminModal>

      <AdminModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar eliminación">
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
          ¿Eliminar este banner? Esta acción no se puede deshacer.
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
