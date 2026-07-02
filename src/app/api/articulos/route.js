import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const articulos = await prisma.articulo.findMany({
      where: { publicado: true },
      orderBy: { creadoEn: "desc" },
      take: 6,
    });
    return NextResponse.json(articulos);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
