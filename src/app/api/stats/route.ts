import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalParents, totalEleves, totalNotifications] = await Promise.all([
      prisma.user.count({ where: { role: "PARENT" } }),
      prisma.eleve.count(),
      prisma.notification.count(),
    ]);

    return NextResponse.json({ totalParents, totalEleves, totalNotifications });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
