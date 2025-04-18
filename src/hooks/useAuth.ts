"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Roles } from "@/src/types";

type AuthPayload = {
  fullname: string;
  email: string;
  password: string;
  phone?: string;
  role?: Roles;
};

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: AuthPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Erreur inconnue");

      router.push(`/dashboard/${result.user.role}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Erreur inconnue");

      router.push(`/dashboard/${result.user.role}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    loading,
    error,
  };
}
