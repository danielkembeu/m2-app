"use client";

import { ClassView } from "@/src/components/teachers/ClassView";
import { NotificationSection } from "@/src/components/notifications/NotificationSection";
import { Banner } from "../Banner";
import { Button } from "../Button";
import { useSendEmail } from "@/src/hooks/useSendEmail";
import { sendEmail } from "@/src/app/actions/send-email";

export function TeacherPage() {
  // const { sendEmail } = useSendEmail();

  const send = (name: string) => {
    sendEmail(name);
  };
  return (
    <div className="px-32 py-6 space-y-8">
      <Banner />

      <form
        action={() => {
          send("Diane Laure");
        }}
        className="space-y-4"
      >
        <Button type="submit">Send email to Diane</Button>
      </form>

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
