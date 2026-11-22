import { NextResponse } from "next/server";

interface ContactRdvPayload {
  kind?: "RDV" | "MESSAGE";
  fullName?: string;
  organization?: string;
  phone?: string;
  email?: string;
  subject?: string;
  date?: string;
  timeSlot?: string;
  channel?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactRdvPayload;
    const fullName = (body.fullName || "").trim();
    const phone = (body.phone || "").trim();
    const email = (body.email || "").trim();
    const kind = body.kind === "MESSAGE" ? "MESSAGE" : "RDV";

    if (!fullName || !phone) {
      return NextResponse.json(
        { ok: false, error: "Veuillez indiquer votre nom complet et votre numéro de téléphone." },
        { status: 400 }
      );
    }

    const ref = `${kind === "RDV" ? "RDV" : "MSG"}-${Date.now().toString().slice(-6)}`;
    const toEmail = process.env.PROSPECTION_ALERT_EMAIL || "ahmedtall08@gmail.com";
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Sen-E-Carte Contact <onboarding@resend.dev>";

    const safe = (v?: string) =>
      (v || "Non précisé")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br/>");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#f8fafc;">
        <div style="background:#071a30;color:#ffffff;padding:20px 24px;border-radius:16px 16px 0 0;">
          <h2 style="margin:0;font-size:18px;">
            ${kind === "RDV" ? "Nouvelle prise de rendez-vous" : "Nouveau message client"} · ${ref}
          </h2>
          <p style="margin:6px 0 0;font-size:12px;color:#7dd3fc;">Plateforme officielle Sen-E-Carte (www.senecarte.com)</p>
        </div>
        <div style="background:#ffffff;padding:22px;border-radius:0 0 16px 16px;border:1px solid #e2e8f0;font-size:14px;color:#1e293b;line-height:1.6;">
          <p><strong>Nom complet :</strong> ${safe(fullName)}</p>
          <p><strong>Structure / entreprise :</strong> ${safe(body.organization)}</p>
          <p><strong>Téléphone / WhatsApp :</strong> ${safe(phone)}</p>
          <p><strong>Email :</strong> ${safe(email)}</p>
          <p><strong>Sujet :</strong> ${safe(body.subject)}</p>
          ${
            kind === "RDV"
              ? `<p><strong>Date souhaitée :</strong> ${safe(body.date)} à <strong>${safe(body.timeSlot)}</strong> (heure de Dakar)</p>
                 <p><strong>Canal :</strong> ${safe(body.channel)}</p>`
              : ""
          }
          <p><strong>Message :</strong><br/>${safe(body.message)}</p>
        </div>
      </div>
    `;

    let emailSent = false;
    if (resendKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            subject: `[Sen-E-Carte ${ref}] ${
              kind === "RDV" ? `Rendez-vous le ${body.date || ""} (${body.timeSlot || ""})` : "Nouveau message"
            } — ${fullName}`,
            html,
          }),
        });
        emailSent = res.ok;
      } catch {}
    }

    return NextResponse.json({
      ok: true,
      ref,
      emailSent,
      note:
        kind === "RDV"
          ? `Rendez-vous enregistré (${ref}) et transmis à l'équipe Sen-E-Carte.`
          : `Message envoyé (${ref}) à l'équipe Sen-E-Carte.`,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erreur lors de l'envoi. Contactez-nous sur WhatsApp au +221 77 602 67 83." },
      { status: 500 }
    );
  }
}
