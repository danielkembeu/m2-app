"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Root() {
  return (
    <div className="p-24 space-y-4">
      <h2 className="text-4xl font-bold text-gray-700">
        Les liens dans l'application
      </h2>
      <p>
        Ce sont des liens que vous pouvez inserer dans l'url pour tester et voir
        les pages qui fonctionnent deja.
      </p>

      <ul className="ml-10 list-disc">
        <li>
          <Link href="/m2/">Accueil</Link>
        </li>
        <li>
          <Link href="/m2/connexion">Connexion</Link>
        </li>
        <li>
          <Link href="/m2/inscription">Inscription</Link>
        </li>
        <li>
          <Link href="/m2/dashboard/">
            Dashboard par role (parent, enseignant ou admin. Ex. /m2/dashboard/parent)
          </Link>
        </li>
      </ul>
    </div>
  );
}
