import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { log } from "console";

export async function POST(req: Request) {
  const { title, message, subject, creatorId } = await req.json();

  // Vérification des champs requis
  if (!title || !message || !subject || !creatorId) {
    return NextResponse.json(
      { error: "Champs requis manquants" },
      { status: 400 }
    );
  }

  try {
    // Création de la notification
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        subject,
        creator: {
          connect: { id: creatorId }, // Connectez un utilisateur existant
        },
      },
      include: {
        creator: true, // Inclure le créateur de la notification
      },
    });

    return NextResponse.json({ success: true, notification }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de la notification :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const events = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    });

    log("events", events);
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
