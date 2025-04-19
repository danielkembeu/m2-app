// src/components/pages/Teachers.tsx
"use client";

export function TeacherPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-purple-600">Espace Enseignant</h1>

      {/* Notification aux parents */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Envoyer une notification</h2>
        {/* Composant : NotificationForm */}
      </section>

      {/* Liste des classes/élèves */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Mes élèves</h2>
        {/* Composant : ClassView / StudentTable */}
      </section>

      {/* Historique des envois */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          Historique des notifications
        </h2>
        {/* Composant : SentNotifications */}
      </section>
    </div>
  );
}
