"use server";

import { Resend } from "resend";
import { EmailTemplate } from "@/src/components/email-template";
import { log } from "console";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function sendEmail(name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["dianelaureghomsi@gmail.com"],
      subject: "Notification pour les parents",
      react: "<p>Bonjour Diane ! Voici un email de test...</p>"
      // react: EmailTemplate({ firstName: name }),
    });

    if (error) {
      log("Error sending email:", error);
      return { error, status: 500 };
    }

    log("Email sent successfully:", data);
    return data;
  } catch (error) {
    log("Error in sendEmail function (Catch):", error);
    return { error, status: 500 };
  }
}
