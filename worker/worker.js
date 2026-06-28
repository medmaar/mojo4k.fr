/**
 * MOJO4K.FR — Essai Gratuit Worker v2
 * Langue : Français · Panel: France
 */

const API_BASE    = "https://activationpanel.ru/api/api.php";
const API_KEY     = "35cf68cc83a3a82e1a0ac5361c7b6105";
const HOST        = "http://terry.thecontentnest.com";
const RESEND_KEY  = "re_iMB7quMK_BF9oLcSaPhcj67sFpxSgEF76";
const FROM_EMAIL  = "Mojo 4K <bonjour@mojo4k.fr>";
const ADMIN_EMAIL = "bonjour@mojo4k.fr";
const SITE_URL    = "https://mojo4k.fr";
const PACK_NAME   = "France";
const WA_NUMBER   = "17828026280";
const ACCENT      = "#1D1D1F";

function jsonRes(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

async function apiGet(params) {
  const qs = new URLSearchParams({ ...params, api_key: API_KEY });
  const res = await fetch(`${API_BASE}?${qs}`);
  return { status: res.status, text: await res.text() };
}

async function sendEmail(to, subject, html) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) throw new Error(`Resend (${res.status}): ${await res.text()}`);
}

function emailWrap(content) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f2f2f2;font-family:Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f2f2;padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
           style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
      <tr><td style="background-color:${ACCENT};padding:32px 40px;text-align:center;">
        <h1 style="margin:0;font-family:Arial,sans-serif;font-size:26px;font-weight:bold;color:#ffffff;">Mojo 4K</h1>
        <p style="margin:6px 0 0;font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.70);">IPTV Premium · France</p>
      </td></tr>
      <tr><td style="padding:36px 40px;">${content}</td></tr>
      <tr><td style="background-color:#f8f8f8;border-top:1px solid #eeeeee;padding:18px 40px;text-align:center;">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#aaaaaa;">
          © 2026 Mojo 4K · <a href="${SITE_URL}" style="color:${ACCENT};text-decoration:none;">mojo4k.fr</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function credBox(username, password, m3uUrl) {
  const server = (() => { try { return new URL(m3uUrl).origin; } catch { return HOST; } })();
  return `
  <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;color:#333333;">Xtream Codes</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#f8f8f8;border:1px solid #e0e0e0;border-radius:6px;margin-bottom:18px;">
    <tr><td style="padding:18px 22px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="padding:0 0 11px;border-bottom:1px solid #e8e8e8;">
          <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:11px;color:#888888;text-transform:uppercase;">Serveur</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#333333;font-weight:bold;">${server}</p>
        </td></tr>
        <tr><td style="padding:11px 0;border-bottom:1px solid #e8e8e8;">
          <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:11px;color:#888888;text-transform:uppercase;">Nom d'utilisateur</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#333333;font-weight:bold;">${username}</p>
        </td></tr>
        <tr><td style="padding:11px 0 0;">
          <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:11px;color:#888888;text-transform:uppercase;">Mot de passe</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#333333;font-weight:bold;">${password}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
  <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;color:#333333;">Lien M3U</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#f8f8f8;border:1px solid #e0e0e0;border-radius:6px;margin-bottom:28px;">
    <tr><td style="padding:14px 20px;">
      <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:${ACCENT};word-break:break-all;">${m3uUrl}</p>
    </td></tr>
  </table>`;
}

function ctaButton(text, url) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
    <tr><td style="background-color:${ACCENT};border-radius:8px;padding:14px 32px;text-align:center;">
      <a href="${url}" style="font-family:Arial,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">${text}</a>
    </td></tr>
  </table>`;
}

function replyYesBox() {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#f8f8f8;border-left:4px solid ${ACCENT};border-radius:6px;margin-bottom:22px;">
    <tr><td style="padding:20px 24px;">
      <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1D1D1F;font-weight:bold;">
        📩 Le moyen le plus rapide ?
      </p>
      <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#555555;">
        Répondez simplement <strong>« OUI »</strong> à cet email — on réactive votre accès en quelques minutes, sans formulaire, sans complications.
      </p>
    </td></tr>
  </table>`;
}

function welcomeEmail(name, username, password, m3uUrl) {
  const prenom = name && name !== "Non renseigné" ? name.split(" ")[0] : "";
  const greeting = prenom ? `Bonjour ${prenom},` : "Bonjour,";
  return emailWrap(`
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:15px;color:#333333;">${greeting}</p>
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Votre essai gratuit est prêt !
    </p>
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Nous avons débloqué tous les pays et toutes les langues afin que vous puissiez tester pleinement notre service.
    </p>
    <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:13px;line-height:1.65;color:#777777;font-style:italic;">
      Note : Ne vous inquiétez pas si la liste vous semble trop longue — par la suite, vous pourrez nous demander de masquer les régions ou catégories dont vous n'avez pas besoin !
    </p>
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;color:#555555;">Voici vos identifiants de connexion :</p>
    ${credBox(username, password, m3uUrl)}
    <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Besoin d'aide pour l'installation ? Contactez-nous en répondant à cet email ou via WhatsApp au
      <a href="https://wa.me/${WA_NUMBER}" style="color:${ACCENT};text-decoration:none;font-weight:bold;">+1 782-802-6280</a>
    </p>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#555555;">Cordialement,<br><strong>L'équipe Mojo 4K</strong></p>
  `);
}

function reminderEmail(name, username, password, m3uUrl) {
  const prenom = name && name !== "Non renseigné" ? name.split(" ")[0] : "";
  const greeting = prenom ? `Bonjour ${prenom},` : "Bonjour,";
  return emailWrap(`
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:15px;color:#333333;">${greeting}</p>
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Votre essai gratuit <strong>expire dans 4 heures</strong> ⏳ et honnêtement ? On n'a pas envie de vous voir partir.
    </p>
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Vous avez goûté à ce qu'est vraiment le streaming. 4K cristalline, sport en direct dès le coup d'envoi, et une bibliothèque si vaste que vous manquerez de week-ends avant de manquer de contenu à regarder.
    </p>
    <p style="margin:0 0 22px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      <strong>Ne laissez pas ça s'arrêter ici.</strong>
    </p>
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Gardez le même accès. Gardez la même qualité. Rendez-le simplement permanent.
    </p>
    ${replyYesBox()}
    <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Vous préférez comparer nos offres avant de vous décider ?
    </p>
    ${ctaButton("Voir nos offres →", SITE_URL + "/tarifs.html")}
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;color:#555555;">Vos identifiants actifs :</p>
    ${credBox(username, password, m3uUrl)}
    <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Des questions ? Répondez à cet email ou contactez-nous sur WhatsApp au
      <a href="https://wa.me/${WA_NUMBER}" style="color:${ACCENT};text-decoration:none;font-weight:bold;">+1 782-802-6280</a> — on est toujours là.
    </p>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#555555;">Cordialement,<br><strong>L'équipe Mojo 4K</strong></p>
  `);
}

function followupEmail(name) {
  const prenom = name && name !== "Non renseigné" ? name.split(" ")[0] : "";
  const greeting = prenom ? `Bonjour ${prenom},` : "Bonjour,";
  return emailWrap(`
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:15px;color:#333333;">${greeting}</p>
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Votre essai gratuit est terminé — mais voilà : <strong>tout ce que vous venez de découvrir vous attend toujours.</strong>
    </p>
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Le sport en direct. Les films jusque tard dans la nuit. La 4K cristalline qui a fait passer votre ancien service de streaming pour un mauvais souvenir.
    </p>
    <p style="margin:0 0 22px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Tout ça, à un clic de distance.
    </p>
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Voici comment reprendre — même qualité, zéro interruption :
    </p>
    ${replyYesBox()}
    <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Vous préférez choisir vous-même votre offre ?
    </p>
    ${ctaButton("Choisir mon abonnement →", SITE_URL + "/tarifs.html")}
    <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:#555555;">
      Une question ? Répondez à cet email ou écrivez-nous sur WhatsApp au
      <a href="https://wa.me/${WA_NUMBER}" style="color:${ACCENT};text-decoration:none;font-weight:bold;">+1 782-802-6280</a> — on serait ravis de vous garder parmi nous.
    </p>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#555555;">Cordialement,<br><strong>L'équipe Mojo 4K</strong></p>
  `);
}

function adminEmail(name, email, country, device, whatsapp, notes, username, password, m3uUrl) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;font-size:14px;color:#333;padding:20px;">
  <h2 style="color:${ACCENT};margin-top:0;">Nouvel essai gratuit — Mojo 4K</h2>
  <table cellpadding="6" cellspacing="0" border="0">
    <tr><td style="color:#888;width:120px;">Nom</td><td><strong>${name}</strong></td></tr>
    <tr><td style="color:#888;">Email</td><td>${email}</td></tr>
    <tr><td style="color:#888;">Pays</td><td>${country||"—"}</td></tr>
    <tr><td style="color:#888;">Appareil</td><td>${device||"—"}</td></tr>
    <tr><td style="color:#888;">WhatsApp</td><td>${whatsapp||"—"}</td></tr>
    <tr><td style="color:#888;">Notes</td><td>${notes||"—"}</td></tr>
    <tr><td colspan="2"><hr style="border:none;border-top:1px solid #eee;margin:8px 0;"></td></tr>
    <tr><td style="color:#888;">Username</td><td><strong>${username}</strong></td></tr>
    <tr><td style="color:#888;">Password</td><td><strong>${password}</strong></td></tr>
    <tr><td style="color:#888;">M3U</td><td style="word-break:break-all;font-size:12px;">${m3uUrl}</td></tr>
  </table>
</body></html>`;
}

async function handleFetch(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }});
  }

  if (request.method === "GET") {
    const u = new URL(request.url);
    if (u.searchParams.has("debug")) {
      const bq = await apiGet({ action: "bouquet" });
      const trials = await env.TRIALS.list();
      return jsonRes({ bouquet: bq.text.slice(0,400), kv_keys: trials.keys.length });
    }
    return new Response("Mojo 4K FR Trial Worker — OK", { status: 200 });
  }

  if (request.method !== "POST") return jsonRes({ success: false, error: "POST only" }, 405);

  let body;
  try { body = await request.json(); }
  catch { return jsonRes({ success: false, error: "JSON invalide" }, 400); }

  const { name, email, country, device, whatsapp, notes } = body;
  if (!email) return jsonRes({ success: false, error: "Email requis" }, 400);

  let step = "bouquet";
  try {
    const bqRes = await apiGet({ action: "bouquet" });
    let packId = "all";
    if (bqRes.text.trim().startsWith("[") || bqRes.text.trim().startsWith("{")) {
      const arr = JSON.parse(bqRes.text);
      const list = Array.isArray(arr) ? arr : Object.values(arr);
      const pkg = list.find(b => (b.name || "").trim().toLowerCase() === PACK_NAME.toLowerCase());
      if (pkg) packId = pkg.id;
    }

    step = "create_demo";
    const crRes = await apiGet({
      action: "new", type: "m3u", sub: "99", pack: packId,
      note: `Trial / mojo4k.fr / ${email} | ${whatsapp || ""}`,
    });
    if (!crRes.text.trim().startsWith("[") && !crRes.text.trim().startsWith("{")) {
      throw new Error(`Panel non-JSON: ${crRes.text.slice(0, 200)}`);
    }
    const crData = JSON.parse(crRes.text);
    const item = Array.isArray(crData) ? crData[0] : crData;
    if (!item || String(item.status) !== "true") {
      throw new Error(`Panel: ${item?.message || JSON.stringify(item)}`);
    }

    step = "extract";
    const rawUrl = item.url || "";
    let username = "", password = "";
    try { const u = new URL(rawUrl); username = u.searchParams.get("username") || ""; password = u.searchParams.get("password") || ""; } catch {}
    const m3uUrl = `${HOST}/get.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&type=m3u_plus&output=ts`;

    step = "email_client";
    await sendEmail(email, "Votre accès Mojo 4K — Essai gratuit 24H activé ✓", welcomeEmail(name, username, password, m3uUrl));

    step = "email_admin";
    await sendEmail(ADMIN_EMAIL, `Automation / mojo4k.fr / trial / ${name || "—"} / ${email}`, adminEmail(name, email, country, device, whatsapp, notes, username, password, m3uUrl));

    step = "kv_store";
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    await env.TRIALS.put(
      `trial:${email}`,
      JSON.stringify({ name, email, whatsapp, site: 'mojo4k.fr', username, password, m3uUrl, expiry, reminder_sent: false, followup_sent: false, created_at: Date.now() }),
      { expirationTtl: 30 * 24 * 60 * 60 }
    );
    // Update __keys__ index (read op, not list op — keeps KV list quota safe)
    try {
      const _existingKeys = JSON.parse(await env.TRIALS.get('__keys__') || '[]');
      if (!_existingKeys.includes(email)) {
        _existingKeys.push(email);
        await env.TRIALS.put('__keys__', JSON.stringify(_existingKeys), { expirationTtl: 90 * 24 * 60 * 60 });
      }
    } catch(_) {}
    // Notify central KV reader (single-key design, no list ops)
    const _kvBody = JSON.stringify({ name, email, whatsapp, site: 'mojo4k.fr', phone: whatsapp, created_at: Date.now() });
    const _kvPost = () => fetch('https://iptv-kv-reader.medmaar.workers.dev/add',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: _kvBody });
    try { await _kvPost(); }
    catch(_) { try { await new Promise(r => setTimeout(r, 1500)); await _kvPost(); } catch(__) {} }

    return jsonRes({ success: true });

  } catch (err) {
    console.error(`[step=${step}]`, err.message);
    return jsonRes({ success: false, error: `[${step}] ${err.message}` }, 500);
  }
}

async function handleScheduled(env) {
  const now = Date.now();
  const FOUR_HOURS = 4 * 60 * 60 * 1000;
  const _keysRaw = await env.TRIALS.get('__keys__') || '[]';
  const _keyEmails = JSON.parse(_keysRaw);
  const keys = _keyEmails.map(e => ({ name: `trial:${e}` }));
  console.log(`[cron] ${keys.length} essais vérifiés`);

  for (const { name: key } of keys) {
    let trial;
    try { const raw = await env.TRIALS.get(key); if (!raw) continue; trial = JSON.parse(raw); } catch { continue; }
    const { name, email, username, password, m3uUrl, expiry, reminder_sent, followup_sent } = trial;

    if (!reminder_sent && now >= expiry - FOUR_HOURS && now < expiry) {
      try {
        await sendEmail(email, "⏳ Votre essai Mojo 4K expire dans 4 heures", reminderEmail(name, username, password, m3uUrl));
        trial.reminder_sent = true;
        await env.TRIALS.put(key, JSON.stringify(trial), { expirationTtl: 30 * 24 * 60 * 60 });
        console.log(`[cron] Rappel → ${email}`);
      } catch (e) { console.error(`[cron] Échec rappel:`, e.message); }
    }

    if (!followup_sent && now >= expiry) {
      try {
        await sendEmail(email, "Votre essai Mojo 4K est terminé — Revenez quand vous voulez 🎬", followupEmail(name));
        trial.followup_sent = true;
        await env.TRIALS.put(key, JSON.stringify(trial), { expirationTtl: 30 * 24 * 60 * 60 });
        console.log(`[cron] Suivi → ${email}`);
      } catch (e) { console.error(`[cron] Échec suivi:`, e.message); }
    }
  }
}

export default {
  async fetch(request, env) { return handleFetch(request, env); },
  async scheduled(event, env, ctx) { ctx.waitUntil(handleScheduled(env)); },
};

