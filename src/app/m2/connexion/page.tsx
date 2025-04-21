"use client";

import { Fragment, useState } from "react";
import { Button } from "@/src/components/Button";
import { Divider } from "@/src/components/Divider";
import { Input } from "@/src/components/Input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "@/src/components/Messages";
import { Navbar } from "@/src/components/layouts/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { login, loading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <Fragment>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col max-w-[480px] w-full max-h-[500px] space-y-4 shadow-lg rounded-lg py-6 px-9">
          <form className="flex flex-col w-full h-full space-y-4">
            {error && <MessageCard type="error" content={error} />}
            <h2 className="mb-10 font-bold text-2xl text-gray-600">
              Connexion
            </h2>

            <Input
              label="Email"
              value={email}
              setValue={(e) => setEmail(e.target.value)}
              border-2
              border-purple-400
              htmlId="login-email"
              type="email"
              placeholder="johndoe@example.xyz"
            />

            <Input
              label="Mot de passe"
              value={password}
              setValue={(e) => setPassword(e.target.value)}
              htmlId="login-password"
              type="password"
              placeholder="**************"
            />

            <Divider />

            <Button
              type="submit"
              onClick={(e) => {
                console.log(email, password);
                handleSubmit(e);
              }}
            >
              Se connecter
            </Button>
          </form>

          <Button
            loading={loading}
            type="submit"
            variant="link"
            onClick={() => router.push("/m2/inscription")}
          >
            <span className="font-normal text-gray-600 no-underline">
              Pas de compte ?
            </span>{" "}
            S'inscrire
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
