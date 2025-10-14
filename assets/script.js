
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
  // Nonaktifkan form selama proses submit
  if (formEl) {
    // Nonaktifkan semua input dan button
    const inputs = formEl.querySelectorAll('input, select, textarea, button');
    inputs.forEach(input => input.disabled = true);
    
    // Tambahkan loading indicator
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Mengirim...';
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
      // Reset form jika submit berhasil
      if (formEl) {
        formEl.reset();
      }
      window.location.href = "thanks.html";
    } else {
      alert("Gagal mengirim data. Coba lagi nanti.");
      // Aktifkan kembali form jika terjadi error
      if (formEl) {
        const inputs = formEl.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => input.disabled = false);
        
        // Kembalikan teks button submit
        const submitBtn = formEl.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Kirim Pendaftaran';
      }
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan jaringan. Coba lagi.");
    
    // Aktifkan kembali form jika terjadi error
    if (formEl) {
      const inputs = formEl.querySelectorAll('input, select, textarea, button');
      inputs.forEach(input => input.disabled = false);
      
      // Kembalikan teks button submit
      const submitBtn = formEl.querySelector('button[type="submit"]');
      submitBtn.innerHTML = 'Kirim Pendaftaran';
    }
  }
}

/**
 * Helpers
 */
function telSanitize(v) {
  return (v || "").replace(/[^\d+]/g, "");
}

