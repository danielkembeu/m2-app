// src/components/pages/Parents.tsx
"use client";

export function ParentPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-purple-600">Espace Parent</h1>

      {/* Liste des enfants */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Mes enfants</h2>
        {/* Composant : StudentList */}
      </section>

      {/* Historique des notifications */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        {/* Composant : NotificationList */}
      </section>

      {/* Faire une requête */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          Contacter l'administration
        </h2>
        {/* Composant : RequestForm */}
      </section>
    </div>
  );
}
