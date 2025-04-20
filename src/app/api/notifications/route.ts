import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ⚠️ À remplacer plus tard avec une vraie auth
const CREATOR_ID = "user-id-exemple-enseignant-ou-admin";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, message, subject, receiverId } = body;

  if (!title || !message || !subject || !receiverId) {
    return NextResponse.json(
      { error: "Champs requis manquants" },
      { status: 400 }
    );
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        subject,
        creatorId: CREATOR_ID,
        receiverId,
      },
    });

    return NextResponse.json({ success: true, notification });
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
