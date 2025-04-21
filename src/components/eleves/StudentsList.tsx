"use client";

import { useEffect, useState } from "react";
import { NoData } from "../NoData";
import { useAuth } from "@/src/hooks/useAuth";

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
  const { getUser } = useAuth();
  const user = getUser();

  useEffect(() => {
    const fetchMyStudents = async () => {
      try {
        const response = await fetch("/api/eleves/mine", {
          method: "POST",
          body: JSON.stringify({ parentId: user.id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erreur de récupération des élèves");
        }
        const data = await response.json();
        setEleves(data.eleves || []);
      } catch (error) {
        console.error("Erreur:", error);
        setEleves([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudents();
    // Cleanup function to reset state if needed
    return () => {
      setEleves([]);
    };
  }, []);

  if (loading) return <p>Chargement des élèves...</p>;

  if (eleves.length === 0) {
    return <NoData message="Aucun enfant trouvé pour ce compte." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Classe</th>
            <th className="px-4 py-2">Niveau</th>
          </tr>
        </thead>
        <tbody>
          {eleves.map((el) => (
            <tr key={el.id} className="border-t">
              <td className="px-4 py-2 font-medium text-purple-700">{el.id}</td>
              <td className="px-4 py-2 font-medium text-purple-700">
                {el.name}
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
