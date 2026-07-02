"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { fmtDate } from "@/lib/fmt";
import AdminModal from "@/components/admin/AdminModal";
import { Input, Textarea, Toggle, SaveButton } from "@/components/admin/AdminField";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = {
  titulo: "",
  descripcion: "",
  descuento: "",
  imagen: "",
  fechaInicio: "",
  fechaFin: "",
  activa: true,
};

function toInputDate(val) {
  if (!val) return "";
  return new Date(val).toISOString().split("T")[0];
}

export default function PromocionesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, item: null });
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/promociones");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openCreate() {
    setForm(EMPTY); setError("");
    setModal({ open: true, item: null });
  }

  function openEdit(item) {
    setForm({
      titulo: item.titulo,
      descripcion: item.descripcion ?? "",
      descuento: item.descuento ?? "",
      imagen: item.imagen ?? "",
      fechaInicio: toInputDate(item.fechaInicio),
      fechaFin: toInputDate(item.fechaFin),
      activa: item.activa,
    });
    setError(""); setModal({ open: true, item });
  }

  async function handleSubmit(e) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = modal.item ? `/api/admin/promociones/${modal.item.id}` : "/api/admin/promociones";
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
    await fetch(`/api/admin/promociones/${id}`, { method: "DELETE" });
    setDeleteId(null); fetchData();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--fg)", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
            Promociones
          </h1>
          <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
            {items.length} promociones registradas
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
          <Plus size={14} /> NUEVA PROMOCIÓN
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "64px 0", fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--faint)" }}>
          Cargando...
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {items.length === 0 ? (
            <div style={{
              gridColumn: "1/-1", textAlign: "center", padding: "64px 16px",
              color: "var(--faint)", background: "var(--bg2)", border: "1px solid var(--line)",
              fontFamily: "'Archivo',sans-serif", fontSize: 13,
            }}>
              No hay promociones. Crea la primera.
            </div>
          ) : items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "var(--bg2)", border: "1px solid var(--line)",
                padding: 16, opacity: item.activa ? 1 : 0.6,
              }}
            >
              {item.imagen && (
                <img src={item.imagen} alt={item.titulo}
                  style={{ width: "100%", height: 140, objectFit: "cover", marginBottom: 12 }} />
              )}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                <h3 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "var(--fg)", margin: 0, flex: 1 }}>
                  {item.titulo}
                </h3>
                {item.descuento && (
                  <span style={{
                    background: "rgba(216,31,38,.12)", color: "#D81F26",
                    fontSize: 11, padding: "2px 6px", fontWeight: 700, flexShrink: 0,
                  }}>
                    -{item.descuento}%
                  </span>
                )}
              </div>
              {item.descripcion && (
                <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 12, color: "var(--muted)", marginBottom: 12, lineHeight: 1.5 }}>
                  {item.descripcion}
                </p>
              )}
              {(item.fechaInicio || item.fechaFin) && (
                <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 11, color: "var(--faint)", marginBottom: 12 }}>
                  {item.fechaInicio && `Desde: ${fmtDate(item.fechaInicio)}`}
                  {item.fechaFin && ` — Hasta: ${fmtDate(item.fechaFin)}`}
                </p>
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontSize: 10, padding: "3px 8px",
                  background: item.activa ? "rgba(34,197,94,.1)" : "var(--bg3)",
                  color: item.activa ? "#22c55e" : "var(--muted)",
                  fontFamily: "'Space Mono',monospace", letterSpacing: 1,
                }}>
                  {item.activa ? "ACTIVA" : "INACTIVA"}
                </span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => openEdit(item)}
                    aria-label={`Editar ${item.titulo}`}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--muted)", display: "flex", borderRadius: 2, transition: "color .15s, background .15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--fg)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    aria-label={`Eliminar ${item.titulo}`}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--muted)", display: "flex", borderRadius: 2, transition: "color .15s, background .15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(216,31,38,.08)"; e.currentTarget.style.color = "#D81F26"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modal.open} onClose={() => setModal({ open: false, item: null })}
        title={modal.item ? "Editar promoción" : "Nueva promoción"}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {error && (
            <div style={{ padding: "11px 14px", background: "rgba(216,31,38,.08)", border: "1px solid rgba(216,31,38,.25)", color: "#D81F26", fontFamily: "'Archivo',sans-serif", fontSize: 13 }}>
              {error}
            </div>
          )}
          <Input label="Título" required value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <Textarea label="Descripción" value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          <Input label="Descuento (%)" type="number" min="0" max="100" value={form.descuento}
            onChange={(e) => setForm({ ...form, descuento: e.target.value })} placeholder="20" />
          <ImageUpload label="Imagen de la promoción" value={form.imagen}
            onChange={(url) => setForm({ ...form, imagen: url })} />
          <div className="admin-2col">
            <Input label="Fecha inicio" type="date" value={form.fechaInicio}
              onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })} />
            <Input label="Fecha fin" type="date" value={form.fechaFin}
              onChange={(e) => setForm({ ...form, fechaFin: e.target.value })} />
          </div>
          <Toggle label="Promoción activa" checked={form.activa}
            onChange={(v) => setForm({ ...form, activa: v })} />
          <SaveButton loading={saving} />
        </form>
      </AdminModal>

      <AdminModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar eliminación">
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
          ¿Eliminar esta promoción? Esta acción no se puede deshacer.
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
