import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const destacados = searchParams.get("destacados") === "true";
  const categoriaId = searchParams.get("categoriaId");

  const where = { activo: true };
  if (destacados) where.destacado = true;
  if (categoriaId) where.categoriaId = categoriaId;

  const productos = await prisma.producto.findMany({
    where,
    include: { categoria: true },
    orderBy: [{ orden: "asc" }, { creadoEn: "desc" }],
    take: destacados ? 8 : undefined,
  });
  return NextResponse.json(productos);
}
