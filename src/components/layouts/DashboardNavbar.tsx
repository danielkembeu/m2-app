"use client";

import { Button } from "../Button";
import { useAuth } from "@/src/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";
import React from "react";

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  parent: "Parent",
  enseignant: "Enseignant",
};

export const DashboardNavbar = React.memo(() => {
  // const { role } = useParams();
  const { user, logout } = useAuth();

  return (
    <header className="w-full h-16 px-60 flex items-center justify-between border-b bg-purple-50 shadow-sm">
      {user && (
        <>
          <h1 className="text-lg font-semibold text-gray-700">
            <div className="text-black/80">
              Salut, <span className="text-purple-600">{user.fullname}</span>
            </div>
          </h1>
          <span className="text-purple-600 px-6 py-2 rounded-full bg-purple-200 font-medium mr-3 text-sm">
            {roleLabels[user.role.toLowerCase()]}
          </span>

          <div className="flex items-center space-x-3">
            <div
              className="size-10 p-4 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 font-bold cursor-pointer"
              title="Profil"
            >
              <span>
                {user.fullname
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>

            <div className="ml-4">
              <Button variant="white" onClick={logout}>
                <span className="px-4 text-sm">Déconnexion</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
});
