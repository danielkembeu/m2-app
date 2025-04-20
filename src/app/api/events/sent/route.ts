import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ⚠️ remplacer par l'ID dynamique du user (auth plus tard)
const CREATOR_ID = "user-id-exemple";

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      where: { creatorId: CREATOR_ID },
      include: {
        receiver: { select: { fullname: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ notifications });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
