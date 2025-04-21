// app/api/eleves/mine/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ⚠️ À sécuriser avec un vrai système d'auth

export async function GET(
  req: NextRequest,
  { params }: { params: { parentId: string } }
) {
  try {
    const { parentId } = params;
    console.log(parentId);

    if (!parentId) {
      return NextResponse.json({
        error: "parentId is required",
        status: 400,
      });
    }

    const eleves = await prisma.eleve.findMany({
      where: { parentId },
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
