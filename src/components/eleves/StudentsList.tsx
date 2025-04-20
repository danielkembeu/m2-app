"use client";

import { useEffect, useState } from "react";

type Student = {
  id: string;
  name: string;
  birthDate: string;
  classe: {
    name: string;
    niveau: string;
  };
};

export function StudentList() {
  const [eleves, setEleves] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/eleves/mine")
      .then((res) => res.json())
      .then((data) => setEleves(data.eleves || []))
      .catch(() => setEleves([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des élèves...</p>;

  if (eleves.length === 0) {
    return <p className="text-gray-500">Aucun enfant trouvé pour ce compte.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Date de naissance</th>
            <th className="px-4 py-2">Classe</th>
            <th className="px-4 py-2">Niveau</th>
          </tr>
        </thead>
        <tbody>
          {eleves.map((el) => (
            <tr key={el.id} className="border-t">
              <td className="px-4 py-2 font-medium text-purple-700">
                {el.name}
              </td>
              <td className="px-4 py-2">
                {new Date(el.birthDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{el.classe.name}</td>
              <td className="px-4 py-2">{el.classe.niveau}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
