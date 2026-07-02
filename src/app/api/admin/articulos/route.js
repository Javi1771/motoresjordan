import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

function toSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const articulos = await prisma.articulo.findMany({ orderBy: { creadoEn: "desc" } });
  return NextResponse.json(articulos);
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.titulo?.trim() || !data.contenido?.trim()) {
      return NextResponse.json({ error: "Título y contenido requeridos." }, { status: 400 });
    }
    const slug = data.slug?.trim() || toSlug(data.titulo);
    const articulo = await prisma.articulo.create({
      data: {
        titulo: data.titulo.trim(),
        slug,
        contenido: data.contenido.trim(),
        imagen: data.imagen?.trim() || null,
        publicado: data.publicado === true,
      },
    });
    return NextResponse.json(articulo, { status: 201 });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Slug ya existe." }, { status: 409 });
    }
    return NextResponse.json({ error: "Error al crear artículo." }, { status: 500 });
  }
}
