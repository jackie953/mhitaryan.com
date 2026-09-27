import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getContactEmail } from "@/resources";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const organization = typeof body.organization === "string" ? body.organization.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const locale = body.locale === "sv" ? "sv" : "en";

  // Honeypot: a hidden field real visitors never fill in. Bots that fill
  // every field trip it; pretend success so they don't learn to skip it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ message: "Name, email and message are required" }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || organization.length > 200 || message.length > 5000) {
    return NextResponse.json({ message: "One or more fields are too long" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
  }

  const contactEmail = getContactEmail(locale);
  const resend = new Resend(apiKey);

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] as string),
    );

  try {
    const { error } = await resend.emails.send({
      from: `Mhitaryan website <${contactEmail}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New enquiry from ${name}${organization ? ` (${organization})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        organization ? `Organization: ${organization}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : "",
        `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ message: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}
