import { Resend } from "resend";
import { EmailTemplate } from "@/src/components/email-template";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["dianelaureghomsi@gmail.com"],
      subject: "Notification pour les parents",
      react: EmailTemplate({ firstName: name }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
