import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const classes = await prisma.classe.findMany({
      include: {
        eleves: {
          select: {
            id: true,
            fullname: true,
          },
        },
      },
    });

    return NextResponse.json({ classes });
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur chargement classes" },
      { status: 500 }
    );
  }
}
