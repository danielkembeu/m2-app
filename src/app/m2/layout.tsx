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
      <section>{children}</section>
    </main>
  );
}
