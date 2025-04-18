"use client";

import { useState } from "react";
import { Button } from "@/src/components/Button";
import { Divider } from "@/src/components/Divider";
import { Input } from "@/src/components/Input";
import { useRouter } from "next/navigation";
import { Roles } from "@/src/types";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "@/src/components/Messages";

const roles = ["admin", "parent", "enseignant"];

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Roles | null>(null);

  const router = useRouter();

  const { register, loading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    // Empeche la page de se recharger apres que le formulaire ait ete envoyé.
    e.preventDefault();

    if (!role) return alert("Sélectionne un rôle");

    register({
      fullname: fullName,
      email,
      password,
      role,
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="flex flex-col max-w-[480px] w-full space-y-4 shadow-lg rounded-lg p-6">
        {error && <MessageCard type="error" content={error} />}

        <h2 className="font-bold text-2xl text-gray-600">Inscription</h2>

        <Input
          label="Nom complet"
          value={fullName}
          setValue={setFullName}
          htmlId="register-fullname"
          placeholder="John Doe"
        />

        <Input
          label="Email"
          value={email}
          setValue={setEmail}
          htmlId="register-email"
          type="email"
          placeholder="johndoe@example.do"
        />

        <Input
          label="Téléphone"
          value={phone}
          setValue={setPhone}
          htmlId="register-phone"
          type="email"
          placeholder="+237 6xxxxxxxx"
        />

        <Input
          label="Mot de passe"
          value={password}
          setValue={setPassword}
          htmlId="register-password"
          type="password"
          placeholder="*********"
        />

        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700">Je suis :</span>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <Button
                key={r}
                variant={role === r ? "default" : "outlined"}
                onClick={() => setRole(r as Roles)}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <Divider />

        <Button
          loading={loading}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Créer un compte
        </Button>

        <Button variant="link" onClick={() => router.push("/m2/connexion")}>
          <span className="font-normal text-gray-600">Déjà inscrit ?</span> Se
          connecter
        </Button>
      </form>
    </div>
  );
}
