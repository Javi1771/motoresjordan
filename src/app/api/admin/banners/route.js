import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const banners = await prisma.banner.findMany({ orderBy: { orden: "asc" } });
  return NextResponse.json(banners);
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.imagen?.trim()) {
      return NextResponse.json({ error: "La imagen es requerida." }, { status: 400 });
    }
    const banner = await prisma.banner.create({
      data: {
        titulo: data.titulo?.trim() || null,
        imagen: data.imagen.trim(),
        enlace: data.enlace?.trim() || null,
        orden: parseInt(data.orden ?? 0),
        activo: data.activo !== false,
      },
    });
    return NextResponse.json(banner, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear banner." }, { status: 500 });
  }
}
