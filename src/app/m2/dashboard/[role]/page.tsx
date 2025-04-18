"use client";

import { AdminPage } from "@/src/components/pages/Admin";
import { ParentPage } from "@/src/components/pages/Parents";
import { TeacherPage } from "@/src/components/pages/Teachers";
import { Roles } from "@/src/types";
import { useParams } from "next/navigation";

export default function Role() {
  const { role } = useParams();

  function renderRoleComponent(role: Roles) {
    switch (role) {
      case "admin":
        return <AdminPage />;

      case "enseignant":
        return <TeacherPage />;

      case "parent":
        return <ParentPage />;

      default:
        return <div>Invalid role</div>;
    }
  }

  // const role = params.role as Roles;

  return <div>{renderRoleComponent(role as Roles)}</div>;
}
