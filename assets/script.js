
/**
 * Change this to your deployed Google Apps Script Web App URL
 * Example: https://script.google.com/macros/s/AKfycbyourid/exec
 */
const ENDPOINT = "https://script.google.com/macros/s/AKfycbyj6F5Ophqt4IUQun_6qPJ7k2EGH3qftDyg6rl1sYTpBsZtgOw1OJoqNhdUUxwGI9VCoA/exec";

/**
 * Encode a JS object to x-www-form-urlencoded so we avoid CORS preflight.
 */
function toFormUrlEncoded(obj) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    params.append(k, typeof v === "string" ? v : JSON.stringify(v));
  }
  return params.toString();
}

/**
 * Generic submit handler for both forms.
 * Pass an object of fields + {eventType: "cerdas_cermat"|"mewarnai"}.
 */
async function submitToSheet(payload, formEl) {
  // Periksa apakah ENDPOINT masih menggunakan URL default atau belum diubah
  if (!ENDPOINT || ENDPOINT.includes("AKfycbyj6F5Ophqt4IUQun_6qPJ7k2EGH3qftDyg6rl1sYTpBsZtgOw1OJoqNhdUUxwGI9VCoA")) {
    alert("Silakan ganti ENDPOINT di assets/script.js dengan URL Web App Google Apps Script Anda.");
    return;
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: toFormUrlEncoded({ payload: JSON.stringify(payload) }),
      // No custom headers -> stays a simple request (no CORS preflight)
    });
    // We don't rely on body parsing to keep it simple cross-origin
    if (res.ok) {
      window.location.href = "thanks.html";
    } else {
      alert("Gagal mengirim data. Coba lagi nanti.");
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan jaringan. Coba lagi.");
  }
}

/**
 * Helpers
 */
function telSanitize(v) {
  return (v || "").replace(/[^\d+]/g, "");
}

