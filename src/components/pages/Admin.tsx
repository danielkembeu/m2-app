// src/components/pages/Admin.tsx
"use client";

export function AdminPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-purple-600">
        Dashboard Administrateur
      </h1>

      {/* Gestion des comptes utilisateurs */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Comptes utilisateurs</h2>
        <p>
          Créer, modifier ou supprimer les comptes de parents et d’enseignants.
        </p>
        {/* Ici : composant UserManagement */}
      </section>

      {/* Gestion des événements */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Événements scolaires</h2>
        <p>Planifier des réunions, examens, journées pédagogiques...</p>
        {/* Ici : composant EventManager */}
      </section>

      {/* Statistiques */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Rapports & Statistiques</h2>
        <p>Visualiser l’impact des notifications, nombre d’absences, etc.</p>
        {/* Ici : composant StatsView */}
      </section>
    </div>
  );
}
