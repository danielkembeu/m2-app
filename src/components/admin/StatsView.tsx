"use client";

import { useEffect, useState } from "react";

export function StatsView() {
  const [stats, setStats] = useState({
    totalParents: 1,
    totalNotifications: 1,
    totalEleves: 1,
  });

  useEffect(() => {
    fetch("/api/stats") // à créer
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm">
        <h3 className="text-lg font-semibold">Parents inscrits</h3>
        <p className="text-2xl font-bold text-purple-700">
          {stats.totalParents ?? 0}
        </p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm">
        <h3 className="text-lg font-semibold">Élèves enregistrés</h3>
        <p className="text-2xl font-bold text-purple-700">
          {stats.totalEleves ?? 0}
        </p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-center shadow-sm">
        <h3 className="text-lg font-semibold">Notifications envoyées</h3>
        <p className="text-2xl font-bold text-purple-700">
          {stats.totalNotifications ?? 0}
        </p>
      </div>
    </div>
  );
}
