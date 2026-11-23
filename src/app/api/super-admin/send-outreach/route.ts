import { NextResponse } from "next/server";
import { DIRECTOR_EMAIL, isDirectorEmail } from "@/lib/contactExtractor";

interface OutreachPayload {
  recipientEmail?: string;
  recipientName?: string;
  companyName?: string;
  subject?: string;
  messageBody?: string;
  approvedByDirector?: boolean;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OutreachPayload;

    if (!body.approvedByDirector) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Validation obligatoire du directeur Ahmed Tall requise avant tout envoi.",
        },
        { status: 403 }
      );
    }

    const toEmail = (body.recipientEmail || "").trim();
    const subject = (body.subject || "").trim();
    const messageBody = (body.messageBody || "").trim();

    if (!toEmail || !toEmail.includes("@")) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Veuillez renseigner l'adresse email réelle de la structure ou du prospect destinataire.",
        },
        { status: 400 }
      );
    }

    if (isDirectorEmail(toEmail)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "ahmedtall08@gmail.com est l'email du DG Ahmed Tall (expéditeur / réponse). Veuillez saisir l'email réel du prospect ou de la structure destinataire.",
        },
        { status: 400 }
      );
    }

    if (!subject || !messageBody) {
      return NextResponse.json(
        { ok: false, error: "Objet et contenu du message obligatoires." },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Ahmed Tall — Sen-E-Carte <onboarding@resend.dev>";

    const safeHtmlBody = messageBody
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#f8fafc;">
        <div style="background:#071a30;color:#ffffff;padding:20px 24px;border-radius:16px 16px 0 0;">
          <div style="font-size:18px;font-weight:800;">Sen-E-Carte</div>
          <div style="font-size:12px;color:#7dd3fc;margin-top:4px;">Cartes intelligentes QR-NFC, logiciels métiers SaaS &amp; IA · Dakar, Sénégal</div>
        </div>
        <div style="background:#ffffff;padding:24px;border-radius:0 0 16px 16px;border:1px solid #e2e8f0;color:#1e293b;font-size:14px;line-height:1.65;">
          ${safeHtmlBody}
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0 16px;"/>
          <div style="font-size:12px;color:#475569;">
            <strong>Ahmed Tall</strong> — Directeur Général &amp; Fondateur, Sen-E-Carte<br/>
            Email direct : <a href="mailto:${DIRECTOR_EMAIL}" style="color:#0284c7;">${DIRECTOR_EMAIL}</a> · Téléphone / WhatsApp : +221 77 602 67 83<br/>
            Site web : <a href="https://www.senecarte.com" style="color:#0284c7;">www.senecarte.com</a>
          </div>
        </div>
      </div>
    `;

    if (!resendKey) {
      return NextResponse.json({
        ok: true,
        sent: false,
        simulated: true,
        recipient: toEmail,
        replyTo: DIRECTOR_EMAIL,
        note: `Validé par Ahmed Tall pour ${toEmail} (réponse vers ${DIRECTOR_EMAIL}). Ajoutez RESEND_API_KEY pour l'envoi réel.`,
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        reply_to: DIRECTOR_EMAIL,
        to: [toEmail],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text();
      return NextResponse.json(
        {
          ok: false,
          error: `Erreur Resend (${res.status}) : ${errTxt.slice(0, 240)}`,
        },
        { status: 502 }
      );
    }

    const resJson = await res.json().catch(() => ({}));
    return NextResponse.json({
      ok: true,
      sent: true,
      emailId: resJson.id || null,
      recipient: toEmail,
      replyTo: DIRECTOR_EMAIL,
      note: `Offre envoyée à ${toEmail} (avec réponse directe vers ${DIRECTOR_EMAIL}) après accord d'Ahmed Tall.`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "Erreur interne lors de l'envoi de la note.",
      },
      { status: 500 }
    );
  }
}
