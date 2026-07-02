"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminModal from "@/components/admin/AdminModal";
import { Input, Textarea, SaveButton } from "@/components/admin/AdminField";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = { imagen: "", descripcion: "", orden: "" };

export default function GaleriaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, item: null });
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/galeria");
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
    setForm({ imagen: item.imagen, descripcion: item.descripcion ?? "", orden: item.orden });
    setError(""); setModal({ open: true, item });
  }

  async function handleSubmit(e) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = modal.item ? `/api/admin/galeria/${modal.item.id}` : "/api/admin/galeria";
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
    await fetch(`/api/admin/galeria/${id}`, { method: "DELETE" });
    setDeleteId(null); fetchData();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--fg)", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
            Galería
          </h1>
          <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
            {items.length} imágenes en galería
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
          <Plus size={14} /> NUEVA IMAGEN
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "64px 0", fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--faint)" }}>
          Cargando...
        </div>
      ) : (
        <div>
          {items.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "64px 16px",
              color: "var(--faint)", background: "var(--bg2)", border: "1px solid var(--line)",
              fontFamily: "'Archivo',sans-serif", fontSize: 13,
            }}>
              No hay imágenes en la galería.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{ background: "var(--bg2)", border: "1px solid var(--line)", overflow: "hidden", position: "relative" }}
                  onMouseEnter={(e) => e.currentTarget.querySelector(".gallery-actions").style.opacity = "1"}
                  onMouseLeave={(e) => e.currentTarget.querySelector(".gallery-actions").style.opacity = "0"}
                >
                  <div style={{ aspectRatio: "1", background: "var(--bg)" }}>
                    <img src={item.imagen} alt={item.descripcion ?? "Imagen de galería"}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  {item.descripcion && (
                    <p style={{ padding: "6px 8px", fontSize: 11, color: "var(--muted)", fontFamily: "'Archivo',sans-serif", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.descripcion}
                    </p>
                  )}
                  <div
                    className="gallery-actions"
                    style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 4, opacity: 0, transition: "opacity .2s" }}
                  >
                    <button
                      onClick={() => openEdit(item)}
                      aria-label="Editar imagen"
                      style={{ background: "rgba(0,0,0,.7)", border: "none", cursor: "pointer", padding: 6, color: "#fff", display: "flex", borderRadius: 2, transition: "background .15s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,.9)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,.7)"}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      aria-label="Eliminar imagen"
                      style={{ background: "rgba(216,31,38,.7)", border: "none", cursor: "pointer", padding: 6, color: "#fff", display: "flex", borderRadius: 2, transition: "background .15s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#D81F26"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(216,31,38,.7)"}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <AdminModal open={modal.open} onClose={() => setModal({ open: false, item: null })}
        title={modal.item ? "Editar imagen" : "Nueva imagen"}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {error && (
            <div style={{ padding: "11px 14px", background: "rgba(216,31,38,.08)", border: "1px solid rgba(216,31,38,.25)", color: "#D81F26", fontFamily: "'Archivo',sans-serif", fontSize: 13 }}>
              {error}
            </div>
          )}
          <ImageUpload label="Imagen" value={form.imagen}
            onChange={(url) => setForm({ ...form, imagen: url })} />
          <Textarea label="Descripción" rows={2} value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripción de la imagen (opcional)" />
          <Input label="Orden" type="number" min="0" placeholder="ej. 1" value={form.orden}
            onChange={(e) => setForm({ ...form, orden: e.target.value === "" ? "" : parseInt(e.target.value) })} />
          {form.orden !== "" && items.some((f) => f.orden === Number(form.orden) && f.id !== modal.item?.id) && (
            <div style={{ marginTop: -8, padding: "6px 10px", background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.3)", color: "#f59e0b", fontFamily: "'Archivo',sans-serif", fontSize: 12 }}>
              Esa posición ya está ocupada por otra foto.
            </div>
          )}
          <SaveButton loading={saving} />
        </form>
      </AdminModal>

      <AdminModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar eliminación">
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
          ¿Eliminar esta imagen de la galería? Esta acción no se puede deshacer.
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
