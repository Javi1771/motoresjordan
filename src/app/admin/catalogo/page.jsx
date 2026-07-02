"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { fmtPrice } from "@/lib/fmt";
import AdminModal from "@/components/admin/AdminModal";
import { Input, Textarea, Toggle, SaveButton, Field, inputClass } from "@/components/admin/AdminField";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = {
  nombre: "",
  descripcion: "",
  precio: "",
  categoriaId: "",
  imagen: "",
  activo: true,
  destacado: false,
  orden: "",
};

export default function CatalogoPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, item: null });
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      fetch("/api/admin/productos").then((r) => r.json()),
      fetch("/api/admin/categorias").then((r) => r.json()),
    ]);
    setProductos(Array.isArray(p) ? p : []);
    setCategorias(Array.isArray(c) ? c : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openCreate() {
    setForm(EMPTY);
    setError("");
    setModal({ open: true, item: null });
  }

  function openEdit(item) {
    setForm({
      nombre: item.nombre,
      descripcion: item.descripcion ?? "",
      precio: item.precio ?? "",
      categoriaId: item.categoriaId ?? "",
      imagen: item.imagen ?? "",
      activo: item.activo,
      destacado: item.destacado,
      orden: item.orden ?? "",
      _nuevaCat: undefined,
    });
    setError("");
    setModal({ open: true, item });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let categoriaId = form.categoriaId;

      if (form._nuevaCat !== undefined) {
        const nombre = form._nuevaCat.trim();
        if (!nombre) { setError("Escribe el nombre de la nueva categoría."); return; }
        const cr = await fetch("/api/admin/categorias", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre }),
        });
        const cd = await cr.json();
        if (!cr.ok) { setError(cd.error ?? "Error al crear categoría."); return; }
        categoriaId = cd.id;
      }

      const { _nuevaCat, ...rest } = form;
      const url = modal.item ? `/api/admin/productos/${modal.item.id}` : "/api/admin/productos";
      const method = modal.item ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, categoriaId }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al guardar."); return; }
      setModal({ open: false, item: null });
      fetchData();
    } catch { setError("Error de conexión."); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
    setDeleteId(null);
    fetchData();
  }

  async function toggleActivo(item) {
    await fetch(`/api/admin/productos/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, activo: !item.activo, categoriaId: item.categoriaId ?? undefined }),
    });
    fetchData();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--fg)", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
            Catálogo de Productos
          </h1>
          <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
            {productos.length} productos registrados
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
          <Plus size={14} /> NUEVO PRODUCTO
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
                {["Nombre", "Categoría", "Precio", "Estado", "Acciones"].map((h) => (
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
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "48px 16px", color: "var(--faint)" }}>
                    No hay productos. Crea el primero.
                  </td>
                </tr>
              ) : (
                productos.map((p) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: "1px solid var(--line)", transition: "background .1s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg3)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "12px 16px", color: "var(--fg)" }}>
                      <div>{p.nombre}</div>
                      {p.destacado && (
                        <span style={{
                          fontSize: 10, color: "#f59e0b",
                          background: "rgba(245,158,11,.1)", padding: "2px 6px",
                          display: "inline-block", marginTop: 2,
                        }}>
                          Destacado
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                      {p.categoria?.nombre ?? "—"}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                      {p.precio != null ? fmtPrice(p.precio) : "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button
                        onClick={() => toggleActivo(p)}
                        aria-label={p.activo ? "Desactivar producto" : "Activar producto"}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                      >
                        {p.activo ? (
                          <ToggleRight size={22} color="#22c55e" />
                        ) : (
                          <ToggleLeft size={22} color="var(--faint)" />
                        )}
                      </button>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          onClick={() => openEdit(p)}
                          aria-label={`Editar ${p.nombre}`}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--muted)", display: "flex", borderRadius: 2, transition: "color .15s, background .15s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--fg)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          aria-label={`Eliminar ${p.nombre}`}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--muted)", display: "flex", borderRadius: 2, transition: "color .15s, background .15s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(216,31,38,.08)"; e.currentTarget.style.color = "#D81F26"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      <AdminModal
        open={modal.open}
        onClose={() => setModal({ open: false, item: null })}
        title={modal.item ? "Editar producto" : "Nuevo producto"}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {error && (
            <div style={{ padding: "11px 14px", background: "rgba(216,31,38,.08)", border: "1px solid rgba(216,31,38,.25)", color: "#D81F26", fontFamily: "'Archivo',sans-serif", fontSize: 13 }}>
              {error}
            </div>
          )}
          <Input label="Nombre" required value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder="Motor eléctrico 3HP" />
          <Textarea label="Descripción" rows={3} value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripción del producto..." />
          <div className="admin-2col">
            <Input label="Precio (MXN)" type="number" min="0" step="0.01"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              placeholder="1500.00" />
            <Field label="Categoría">
              <select
                className={inputClass}
                value={form._nuevaCat ? "__nueva__" : form.categoriaId}
                onChange={(e) => {
                  if (e.target.value === "__nueva__") {
                    setForm({ ...form, categoriaId: "", _nuevaCat: "" });
                  } else {
                    setForm({ ...form, categoriaId: e.target.value, _nuevaCat: undefined });
                  }
                }}
              >
                <option value="">Sin categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
                <option value="__nueva__">+ Escribir otra...</option>
              </select>
              {form._nuevaCat !== undefined && (
                <input
                  className={inputClass}
                  style={{ marginTop: 8 }}
                  placeholder="Nombre de la nueva categoría"
                  value={form._nuevaCat}
                  onChange={(e) => setForm({ ...form, _nuevaCat: e.target.value })}
                  autoFocus
                />
              )}
            </Field>
          </div>
          <ImageUpload label="Imagen del producto" value={form.imagen}
            onChange={(url) => setForm({ ...form, imagen: url })} />
          <Input label="Orden de aparición" type="number" min="0" placeholder="ej. 1"
            value={form.orden}
            onChange={(e) => setForm({ ...form, orden: e.target.value === "" ? "" : parseInt(e.target.value) })} />
          {form.orden !== "" && productos.some((p) => p.orden === Number(form.orden) && p.id !== modal.item?.id) && (
            <div style={{ marginTop: -8, padding: "6px 10px", background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.3)", color: "#f59e0b", fontFamily: "'Archivo',sans-serif", fontSize: 12 }}>
              Esa posición ya está ocupada por otro producto.
            </div>
          )}
          <Toggle label="Producto activo" checked={form.activo}
            onChange={(v) => setForm({ ...form, activo: v })} />
          <Toggle label="Producto destacado (aparece en inicio)" checked={form.destacado}
            onChange={(v) => setForm({ ...form, destacado: v })} />
          <SaveButton loading={saving} />
        </form>
      </AdminModal>

      {/* Delete Confirm */}
      <AdminModal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar eliminación">
        <p style={{ fontFamily: "'Archivo',sans-serif", fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
          ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setDeleteId(null)}
            style={{
              flex: 1, padding: "10px 16px", border: "1px solid var(--line)",
              background: "none", color: "var(--muted)", fontFamily: "'Archivo',sans-serif",
              fontSize: 13, cursor: "pointer", transition: "background .15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg3)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "none"}
          >
            Cancelar
          </button>
          <button
            onClick={() => handleDelete(deleteId)}
            style={{
              flex: 1, padding: "10px 16px", background: "#D81F26",
              color: "#fff", border: "none", cursor: "pointer",
              fontFamily: "'Archivo',sans-serif", fontSize: 13, fontWeight: 600,
              transition: "opacity .15s",
            }}
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
