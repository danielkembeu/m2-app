import { Sidebar } from "@/src/components/layouts/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | M2",
  description: "",
};

type DashboardLayoutProps = React.PropsWithChildren;
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main>
      <Sidebar />
      <section>{children}</section>
    </main>
  );
}
