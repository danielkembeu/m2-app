// Inscription d'un utilisateur.

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { fullname, email, password, phone, role } = body;

  if (!fullname || !email || !password || !role) {
    return NextResponse.json({
      error: "Champs obligatoires manquants",
      status: 400,
    });
  }

  if (!["ADMIN", "PARENT", "ENSEIGNANT"].includes(role)) {
    return NextResponse.json({ error: "Rôle invalide", status: 400 });
  }

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return NextResponse.json({ error: "Email déjà utilisé", status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      fullname,
      email,
      password,
      role,
      phone: phone || null,
    },
  });

  // Je garde l'utilisateur connecté dans le localStorage
  localStorage.setItem(
    "auth_user",
    JSON.stringify({
      id: user.id,
      fullname: user.fullname,
      role: user.role,
    })
  );

  return NextResponse.json({
    success: true,
    user: { id: user.id, fullname: user.fullname, role: user.role },
  });
}
