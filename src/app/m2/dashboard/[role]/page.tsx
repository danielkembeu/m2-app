"use client";

import { AdminPage } from "@/src/components/pages/Admin";
import { ParentPage } from "@/src/components/pages/Parents";
import { TeacherPage } from "@/src/components/pages/Teachers";
import { Roles } from "@/src/types";
import { useRouter } from "next/navigation";

type RoleProps = {
  params: {
    role: string;
  };
};

export default function Role({ params }: RoleProps) {
  console.log(params.role);

  // const router = useRouter();

  function renderRoleComponent(role: Roles) {
    switch (role) {
      case "administration":
        return <AdminPage />;

      case "teachers":
        return <TeacherPage />;

      case "parents":
        return <ParentPage />;

      default:
        return <div>Invalid role</div>;
    }
  }

  const role = params.role as Roles;

  return <div>{renderRoleComponent(role)}</div>;
}
