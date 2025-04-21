"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RoleLayoutProps = React.PropsWithChildren;

export default function RoleLayout({ children }: RoleLayoutProps) {
  const { loading, getUser } = useAuth();
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/m2/connexion");
    }
  }, [loading, user, getUser]);

  return <section>{children}</section>;
}
