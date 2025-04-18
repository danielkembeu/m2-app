import { Navbar } from "@/src/components/layouts/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "M2 App",
  description: "Application de soutenance de Diane",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <section>{children}</section>
    </main>
  );
}
