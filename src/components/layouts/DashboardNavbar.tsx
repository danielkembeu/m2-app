"use client";

import { useParams } from "next/navigation";

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  parent: "Parent",
  enseignant: "Enseignant",
};

export function DashboardNavbar() {
  const { role } = useParams();

  // Simule un utilisateur connecté (plus tard, tu iras chercher le user dans un contexte ou session)
  const user = {
    name: "Daniel Kembeu",
    role: roleLabels[role as string] || "Utilisateur",
  };

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">
        Bonjour, <span className="text-purple-600">{user.name}</span>
      </h1>

      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-500">{user.role}</span>
        <div
          className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold cursor-pointer"
          title="Profil"
        >
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
      </div>
    </header>
  );
}
