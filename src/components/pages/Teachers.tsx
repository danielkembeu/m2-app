"use client";

import { ClassView } from "@/src/components/teachers/ClassView";
import { NotificationSection } from "@/src/components/notifications/NotificationSection";
import { Banner } from "../Banner";
import { Button } from "../Button";
import { useSendEmail } from "@/src/hooks/useSendEmail";
import Link from "next/link";

export function TeacherPage() {
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Daniel",
        email: "danielkembeu82@gmail.com",
      }),
    });

    if (!response.ok) {
      console.error("Failed to send email");
      return;
    }
    const data = await response.json();
    console.log("Email sent successfully:", data);
  };

  return (
    <div className="px-32 py-6 space-y-8">
      <Banner />

      <form onSubmit={sendEmail} className="space-y-4">
        <Button type="submit">Send email to Diane</Button>
      </form>

      <div className="w-full flex justify-end my-4">
        <Link href="/m2/forum" className="w-52">
          <Button variant="outlined">Continuer vers le forum</Button>
        </Link>
      </div>
      <section>
        <NotificationSection />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Élèves & classes</h2>
        <ClassView />
      </section>
    </div>
  );
}
