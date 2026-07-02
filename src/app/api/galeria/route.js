import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const galeria = await prisma.galeria.findMany({
    orderBy: [{ orden: "asc" }, { creadoEn: "desc" }],
    take: 12,
  });
  return NextResponse.json(galeria);
}
