// app/api/eleves/mine/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { parentId: string } }
) {
  try {
    const { parentId } = await params;
    console.log(parentId);

    if (!parentId) {
      return NextResponse.json({
        error: "parentId is required",
        status: 400,
      });
    }

    const eleves = await prisma.eleve.findMany({
      where: { parentId },
    });

    return NextResponse.json({ eleves }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: "Erreur de récupération des élèves",
      status: 500,
    });
  }
}
