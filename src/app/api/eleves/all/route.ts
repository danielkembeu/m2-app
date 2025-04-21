import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const eleves = await prisma.eleve.findMany({
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

export async function POST(req: NextRequest) {
  try {
    const { fullname, parentId, classeId } = await req.json();

    if (!fullname || !parentId || !classeId) {
      return NextResponse.json({
        error: "fullname, parentId and classeId are required",
        status: 400,
      });
    }

    const eleve = await prisma.eleve.create({
      data: {
        fullname,
        parentId,
        classeId,
      },
    });

    return NextResponse.json({ eleve });
  } catch (err) {
    return NextResponse.json({
      error: "Erreur de création de l'élève",
      status: 500,
    });
  }
}
