import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const now = new Date();
  const promociones = await prisma.promocion.findMany({
    where: {
      activa: true,
      OR: [
        { fechaFin: null },
        { fechaFin: { gte: now } },
      ],
    },
    orderBy: { creadoEn: "desc" },
    take: 6,
  });
  return NextResponse.json(promociones);
}
