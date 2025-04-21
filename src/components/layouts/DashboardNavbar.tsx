"use client";

import { useParams } from "next/navigation";
import { Button } from "../Button";
import { useAuth } from "@/src/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  parent: "Parent",
  enseignant: "Enseignant",
};

export function DashboardNavbar() {
  // const { role } = useParams();
  const { getUser, logout } = useAuth();
  const user = getUser();

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">
        {user ? (
          <div>
            Bonjour, <span className="text-purple-600">{user.fullname}</span>
          </div>
        ) : (
          <Skeleton />
        )}
      </h1>

      <div className="flex items-center space-x-3">
        <div
          className="size-10 p-4 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold cursor-pointer"
          title="Profil"
        >
          {user ? (
            <span>
              {user.fullname
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          ) : (
            <Skeleton />
          )}
        </div>

        <Button onClick={logout}>Déconnexion</Button>
      </div>
    </header>
  );
}
