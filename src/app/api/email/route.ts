import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const emailContent = {
    from: `kembeudaniel2@gmail.com`,
    to: email,
    subject: "Test Email",
    html: `
    <p>Hello ${name},</p>
    <p>${message}</p>
    <p>Best regards,</p>`,
    headers: {
      "X-Entity-Ref-ID": "new-mail",
    },
  };

  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your SMTP server
    auth: {
      user: "kembeudaniel2@gmail.com", // Your SMTP username
      pass: "qomv byit enwv gzkp", // Your SMTP password
    },
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail(emailContent);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
