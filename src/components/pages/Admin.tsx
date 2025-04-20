"use client";

import { UserManager } from "@/src/components/admin/UserManager";
import { EventManager } from "@/src/components/admin/EventManager";
import { StatsView } from "@/src/components/admin/StatsView";

export function AdminPage() {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-xl font-bold text-purple-600">
        Dashboard Administrateur
      </h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">Statistiques</h2>
        <StatsView />
      </section>

      <section>
        <UserManager />
      </section>

      <section>
        <EventManager />
      </section>
    </div>
  );
}
