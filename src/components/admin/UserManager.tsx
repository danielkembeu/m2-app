"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/Button";
import { Input } from "../Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Plus } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PARENT");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("/api/users/all")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []));
  }, [refresh]);

  const handleCreate = async () => {
    if (!name || !email || !password || !role) return;

    setLoading(true);
    const res = await fetch("/api/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setRole("PARENT");
      setRefresh(!refresh);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Dialog>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Comptes utilisateurs</h2>
          <DialogTrigger asChild>
            <div className="w-40">
              <Button variant="outlined" onClick={() => {}}>
                <Plus className="mr-4 size-5" />
                Créer
              </Button>
            </div>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[512px]">
          <DialogHeader>
            <DialogTitle>Ajouter un utilisateur</DialogTitle>
            <DialogDescription>
              Créez un nouvel utilisateur dans la plateforme.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-2">
            <Input
              label="Nom complet"
              placeholder="Nom"
              value={name}
              setValue={(e) => setName(e.target.value)}
            />

            <Input
              label="Adresse mail"
              placeholder="Email"
              value={email}
              setValue={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Mot de passe"
              placeholder="Créez un mot de passe pour l'utilisateur"
              value={password}
              setValue={(e) => setPassword(e.target.value)}
            />

            <select
              className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="PARENT">Parent</option>
              <option value="ENSEIGNANT">Enseignant</option>
            </select>
          </form>

          <DialogFooter className="mt-20">
            <Button type="button" onClick={handleCreate}>
              {loading ? "Ajout..." : "Créer le compte"}
            </Button>
          </DialogFooter>
        </DialogContent>

        {/* Liste des utilisateurs */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200 mt-4">
            <thead className="bg-purple-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Rôle</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2 font-medium">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>
    </div>
  );
}
