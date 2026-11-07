/* MOJO 4K: full-screen success screens after a free-trial request or a plan order.
   Call window.mojoCelebrate("trial" | "order", email). Edit the texts in CELEBRATE below.
   Preview without submitting: add ?celebrate=trial or ?celebrate=order to the page URL. */
(function () {
  "use strict";

  var CELEBRATE = {
    trial: {
      title: "Votre essai gratuit est en route&nbsp;!",
      lines: [
        "Nos techniciens ont lâché leur croissant 🥐 pour envoyer vos identifiants à <b data-c-email></b> à la vitesse d’un TGV.",
        "Ça arrive en général en moins de 2 minutes. Vérifiez votre <b>boîte de réception</b> ET vos <b>spams</b>&nbsp;: nos emails sont parfois timides et vont se cacher là-dedans.",
        "Votre seule mission pour les prochaines 24h&nbsp;: <span style=\"white-space:nowrap\">le pop-corn 🍿</span>",
      ],
      btn: "Compris, je file chercher le pop-corn",
      emoji: ["🍿", "📺", "🥐"],
    },
    order: {
      title: "Bravo, commande passée&nbsp;!",
      lines: [
        "Vous venez officiellement de retrouver votre mojo. 😎 Votre canapé est prévenu, il est très fier de vous. 🛋️",
        "Votre facture file vers <b data-c-email></b> en ce moment même. Vérifiez votre <b>boîte de réception</b> ET vos <b>spams</b> (les emails adorent jouer à cache-cache).",
        "Réglez la facture et vos chaînes démarrent plus vite qu’une contre-attaque des Bleus. ⚽",
      ],
      btn: "Génial, c’est parti&nbsp;!",
      emoji: ["🎉", "⚽", "📺"],
    },
  };

  var CSS =
    ".mojo-celebrating,.mojo-celebrating body{overflow:hidden!important}" +
    ".mojo-cel{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;padding:16px;overflow-y:auto;font-family:inherit;" +
    "background:radial-gradient(circle at 50% 35%,rgba(52,199,89,.28),transparent 60%),rgba(20,16,40,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);animation:mojo-cel-in .3s ease both}" +
    ".mojo-cel.is-out{animation:mojo-cel-out .25s ease forwards}" +
    ".mojo-cel-box{position:relative;box-sizing:border-box;width:min(560px,100%);text-align:center;padding:clamp(28px,6vw,48px) clamp(18px,5vw,40px);background:#fff;color:#1D1D1F;border-radius:28px;" +
    "box-shadow:0 0 0 1px rgba(52,199,89,.35),0 40px 120px -30px rgba(52,199,89,.6);animation:mojo-pop .55s .05s cubic-bezier(.2,.9,.3,1.3) both}" +
    ".mojo-cel-x{position:absolute;top:10px;right:10px;width:44px;height:44px;border:0;border-radius:50%;background:#F2F2F7;color:#6e6e73;font-size:28px;line-height:1;cursor:pointer;font-family:inherit}" +
    ".mojo-cel-x:hover,.mojo-cel-x:focus-visible{color:#1D1D1F;background:#E5E5EA}" +
    ".mojo-cel-mark{display:block;width:clamp(130px,38vw,180px);height:auto;margin:0 auto 22px;fill:none;stroke:#34C759;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 22px rgba(52,199,89,.45))}" +
    ".mojo-cel-mark circle{stroke-width:6;stroke-dasharray:340;stroke-dashoffset:340;fill:rgba(52,199,89,.1);animation:mojo-draw .7s .2s ease forwards}" +
    ".mojo-cel-mark path{stroke-width:9;stroke-dasharray:80;stroke-dashoffset:80;transform-origin:center;animation:mojo-draw .45s .8s ease forwards,mojo-bounce .5s 1.2s ease}" +
    ".mojo-cel h2{font-size:clamp(28px,6vw,40px);line-height:1.15;font-weight:800;letter-spacing:-.02em;margin:0 0 16px;color:#1f9d46}" +
    ".mojo-cel p{color:#3d3d3f;font-size:clamp(16px,2.2vw,18px);line-height:1.55;margin:0 auto 12px;max-width:460px}" +
    ".mojo-cel p b{color:#1D1D1F;font-weight:800;word-break:break-word}" +
    ".mojo-cel-go{display:block;width:100%;max-width:360px;margin:20px auto 0;padding:18px;border:0;border-radius:16px;background:#5032C4;color:#fff;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer;box-shadow:0 10px 26px -8px rgba(80,50,196,.6);transition:transform .2s}" +
    ".mojo-cel-go:hover,.mojo-cel-go:focus-visible{transform:translateY(-1px);background:#3f25a8}" +
    ".mojo-cel-bits{position:fixed;inset:0;pointer-events:none;overflow:hidden}" +
    ".mojo-cel-bits i{position:absolute;top:-40px;left:var(--x);width:10px;height:16px;border-radius:3px;font-style:normal;font-size:24px;line-height:1;background:#5032C4;animation:mojo-fall var(--t) var(--d) linear infinite}" +
    ".mojo-cel-bits i:nth-child(4n+1){background:#34C759}.mojo-cel-bits i:nth-child(4n+2){background:#FFB800}.mojo-cel-bits i:nth-child(4n+3){background:#FF5A8A}" +
    ".mojo-cel-bits i:nth-child(3n+1){width:auto;height:auto;background:none}" +
    "@keyframes mojo-cel-in{from{opacity:0}}@keyframes mojo-cel-out{to{opacity:0}}" +
    "@keyframes mojo-pop{from{opacity:0;transform:scale(.85) translateY(20px)}}" +
    "@keyframes mojo-draw{to{stroke-dashoffset:0}}@keyframes mojo-bounce{50%{transform:scale(1.15)}}" +
    "@keyframes mojo-fall{from{transform:translateY(0) rotate(var(--r))}to{transform:translateY(110vh) rotate(calc(var(--r) + 540deg))}}" +
    "@media (prefers-reduced-motion:reduce){.mojo-cel,.mojo-cel-box{animation:none}.mojo-cel-bits{display:none}.mojo-cel-mark circle,.mojo-cel-mark path{animation:none;stroke-dashoffset:0}}";

  function addCss() {
    if (document.getElementById("mojo-cel-css")) return;
    var s = document.createElement("style");
    s.id = "mojo-cel-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function celebrate(kind, email) {
    var c = CELEBRATE[kind];
    if (!c) return;
    addCss();
    var old = document.querySelector(".mojo-cel");
    if (old) old.remove();
    var back = document.activeElement;
    var el = document.createElement("div");
    el.className = "mojo-cel";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "mojo-cel-title");
    var bits = "";
    for (var i = 0; i < 28; i++) {
      bits += '<i style="--x:' + ((i * 37) % 100) + "%;--d:" + ((i % 7) * 0.35).toFixed(2) + "s;--t:" + (3.2 + (i % 5) * 0.5) + "s;--r:" + ((i * 53) % 360) + 'deg">' +
        (i % 3 ? "" : c.emoji[(i / 3) % c.emoji.length | 0]) + "</i>";
    }
    el.innerHTML =
      '<div class="mojo-cel-bits" aria-hidden="true">' + bits + "</div>" +
      '<div class="mojo-cel-box">' +
      '<button class="mojo-cel-x" type="button" aria-label="Fermer">×</button>' +
      '<svg class="mojo-cel-mark" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54"/><path d="M36 62 53 79 86 44"/></svg>' +
      '<h2 id="mojo-cel-title">' + c.title + "</h2>" +
      c.lines.map(function (l) { return "<p>" + l + "</p>"; }).join("") +
      '<button class="mojo-cel-go" type="button">' + c.btn + "</button>" +
      "</div>";
    var shown = email && email.indexOf("@") > 0 ? email : "votre adresse email";
    Array.prototype.forEach.call(el.querySelectorAll("[data-c-email]"), function (b) { b.textContent = shown; });
    var go = el.querySelector(".mojo-cel-go"), x = el.querySelector(".mojo-cel-x");
    function onKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") { e.preventDefault(); (document.activeElement === go ? x : go).focus(); }
    }
    function close() {
      document.removeEventListener("keydown", onKey);
      el.classList.add("is-out");
      document.documentElement.classList.remove("mojo-celebrating");
      setTimeout(function () { el.remove(); }, 250);
      if (back && back.focus) { try { back.focus({ preventScroll: true }); } catch (e) {} }
    }
    document.addEventListener("keydown", onKey);
    x.addEventListener("click", close);
    go.addEventListener("click", close);
    document.body.appendChild(el);
    document.documentElement.classList.add("mojo-celebrating");
    try { go.focus({ preventScroll: true }); } catch (e) {}
  }

  window.mojoCelebrate = celebrate;

  var q = new URLSearchParams(location.search).get("celebrate");
  if (q) {
    var run = function () { celebrate(q === "order" ? "order" : "trial", "vous@exemple.fr"); };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  }
})();
