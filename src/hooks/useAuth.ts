"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "../generated/prisma";

type AuthPayload = {
  fullname: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
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
      console.log(result);

      if (!res.ok) throw new Error(result.error || "Erreur inconnue");

      router.push(`/m2/connexion`);
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
      const user = result.user;

      const userRole = user.role.toLowerCase();
      console.log(userRole);

      if (!res.ok) throw new Error(result.error || "Erreur inconnue");

      localStorage.setItem("auth_user", JSON.stringify(result.user));
      router.push(`/m2/dashboard/${userRole}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      localStorage.removeItem("auth_user");
      router.push(`/m2/connexion`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUser = () => {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const isAuthenticated = () => {
    const user = getUser();
    return user !== null;
  };

  const isParent = () => {
    const user = getUser();
    return user && user.role === Role.PARENT;
  };

  const isTeacher = () => {
    const user = getUser();
    return user && user.role === Role.ENSEIGNANT;
  };

  return {
    register,
    login,
    logout,
    getUser,
    isAuthenticated,
    isParent,
    isTeacher,
    loading,
    error,
  };
}
