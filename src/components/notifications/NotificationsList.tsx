"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  creator: {
    name: string;
    role: string;
  };
};

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications/mine")
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des notifications...</p>;

  if (notifications.length === 0) {
    return <p className="text-gray-500">Aucune notification reçue.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Titre</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Contenu</th>
            <th className="px-4 py-2">Envoyé par</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notif) => (
            <tr key={notif.id} className="border-t">
              <td className="px-4 py-2 font-medium">{notif.title}</td>
              <td className="px-4 py-2">{notif.type}</td>
              <td className="px-4 py-2">{notif.message}</td>
              <td className="px-4 py-2">
                {notif.creator.name} ({notif.creator.role})
              </td>
              <td className="px-4 py-2">
                {new Date(notif.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
