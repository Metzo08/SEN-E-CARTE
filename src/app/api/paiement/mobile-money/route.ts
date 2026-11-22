import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface OrderPayload {
  fullName: string;
  organization: string;
  phone: string;
  email?: string;
  city: string;
  cardCategory: string;
  planId: "basique" | "avance" | "premium";
  quantity: number;
  paymentMethod: "wave" | "orange_money" | "free_money";
}

const PLAN_PRICES: Record<string, { label: string; unitPrice: number }> = {
  basique: { label: "Basique · QR code dynamique", unitPrice: 5000 },
  avance: { label: "Avancé · puce NFC sans contact", unitPrice: 10000 },
  premium: { label: "Premium · hybride QR dynamique + NFC", unitPrice: 15000 },
};

const METHOD_LABELS: Record<string, string> = {
  wave: "Wave Sénégal",
  orange_money: "Orange Money Sénégal",
  free_money: "Free Money / Yas",
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<OrderPayload>;
    if (!body.fullName || !body.phone || !body.planId || !body.paymentMethod) {
      return NextResponse.json(
        { ok: false, error: "Veuillez renseigner votre nom, téléphone, formule et mode de paiement." },
        { status: 400 }
      );
    }

    const plan = PLAN_PRICES[body.planId] || PLAN_PRICES.premium;
    const qty = Math.max(1, Math.min(5000, Number(body.quantity) || 1));
    const discountRate = qty >= 50 ? 0.2 : qty >= 20 ? 0.1 : 0;
    const subtotal = plan.unitPrice * qty;
    const discountAmount = Math.round(subtotal * discountRate);
    const totalAmount = subtotal - discountAmount;

    const orderRef = `SEC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const methodLabel = METHOD_LABELS[body.paymentMethod] || "Wave Sénégal";

    // Envoi alerte email automatique à Ahmed Tall via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.PROSPECTION_ALERT_EMAIL || "ahmedtall08@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Sen-E-Carte Commandes <onboarding@resend.dev>";

    let emailNotified = false;
    if (resendKey) {
      try {
        const html = `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:20px;background:#f8fafc;">
            <div style="background:#071a30;color:#fff;padding:20px;border-radius:14px 14px 0 0;">
              <h2 style="margin:0;font-size:18px;">Nouvelle Commande Mobile Money · ${orderRef}</h2>
              <p style="margin:6px 0 0;color:#34d399;font-size:13px;">${methodLabel} · ${totalAmount.toLocaleString("fr-FR")} FCFA</p>
            </div>
            <div style="background:#fff;padding:20px;border-radius:0 0 14px 14px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">
              <p><strong>Client :</strong> ${body.fullName} (${body.organization || "Particulier"})</p>
              <p><strong>Téléphone / WhatsApp :</strong> ${body.phone}</p>
              <p><strong>Email :</strong> ${body.email || "Non renseigné"}</p>
              <p><strong>Ville :</strong> ${body.city || "Dakar"}</p>
              <p><strong>Catégorie :</strong> ${body.cardCategory || "Carte Santé / Pro"}</p>
              <p><strong>Formule :</strong> ${plan.label} × ${qty} unité(s)</p>
              <p><strong>Total à encaisser :</strong> <span style="color:#059669;font-weight:bold;">${totalAmount.toLocaleString("fr-FR")} FCFA</span></p>
              <a href="https://wa.me/${body.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Bonjour ${body.fullName}, nous avons bien reçu votre commande Sen-E-Carte ${orderRef} (${totalAmount.toLocaleString("fr-FR")} FCFA via ${methodLabel}).`
              )}" style="display:inline-block;margin-top:12px;background:#10b981;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none;font-weight:bold;">Contacter le client sur WhatsApp</a>
            </div>
          </div>
        `;
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            subject: `[Commande Sen-E-Carte] ${orderRef} · ${totalAmount.toLocaleString("fr-FR")} FCFA (${methodLabel})`,
            html,
          }),
        });
        emailNotified = emailRes.ok;
      } catch {
        emailNotified = false;
      }
    }

    return NextResponse.json({
      ok: true,
      orderRef,
      status: "EN_ATTENTE_CONFIRMATION_MOBILE_MONEY",
      paymentMethod: body.paymentMethod,
      methodLabel,
      merchantNumber: "+221 77 602 67 83",
      merchantName: "Sen-E-Carte (Ahmed TALL)",
      planLabel: plan.label,
      quantity: qty,
      subtotal,
      discountRate: Math.round(discountRate * 100),
      discountAmount,
      totalAmount,
      emailNotified,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Erreur lors de la création de la commande." }, { status: 500 });
  }
}
