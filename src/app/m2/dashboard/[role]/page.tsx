"use client";

import { AdminPage } from "@/src/components/pages/Admin";
import { ParentPage } from "@/src/components/pages/Parents";
import { TeacherPage } from "@/src/components/pages/Teachers";
import { Roles } from "@/src/types";
import { useRouter } from "next/navigation";

export default function Role({ params }: { params: { role: string } }) {
  console.log(params.role);

  const router = useRouter();

  function renderRoleComponent(role: Roles) {
    switch (role) {
      case "administration":
        return <AdminPage />;

      case "teachers":
        return <TeacherPage />;

      case "parents":
        return <ParentPage />;

      default:
        return router.replace("/m2");
    }
  }

  return <div>AllowedUserRole page</div>;
}
