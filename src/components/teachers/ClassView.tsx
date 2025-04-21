"use client";

import { useEffect, useState } from "react";
import { NoData } from "../NoData";

type Classe = {
  id: string;
  name: string;
  niveau: string;
  eleves: {
    id: string;
    name: string;
    birthDate: string;
  }[];
};

export function ClassView() {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/classes/all") // à créer
      .then((res) => res.json())
      .then((data) => setClasses(data.classes || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des classes...</p>;

  return (
    <div className="space-y-6">
      {classes.length === 0 ? (
        <NoData message="Aucune classe disponible pour le moment." />
      ) : (
        classes.map((classe) => (
          <div key={classe.id}>
            <h3 className="text-lg font-semibold text-purple-700">
              {classe.name} ({classe.niveau})
            </h3>
            <table className="min-w-full text-sm border border-gray-200 mt-2">
              <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Nom</th>
                  <th className="px-4 py-2">Date de naissance</th>
                </tr>
              </thead>
              <tbody>
                {classe.eleves.map((el) => (
                  <tr key={el.id} className="border-t">
                    <td className="px-4 py-2">{el.name}</td>
                    <td className="px-4 py-2">
                      {new Date(el.birthDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
