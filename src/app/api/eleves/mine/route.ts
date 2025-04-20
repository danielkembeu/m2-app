// app/api/eleves/mine/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ⚠️ À sécuriser avec un vrai système d'auth
const PARENT_ID = "user-id-exemple-parent-temporaire";

export async function GET() {
  try {
    const eleves = await prisma.eleve.findMany({
      where: { parentId: PARENT_ID },
      include: {
        classe: true,
      },
    });

    return NextResponse.json({ eleves });
  } catch (err) {
    return NextResponse.json({
      error: "Erreur de récupération des élèves",
      status: 500,
    });
  }
}
