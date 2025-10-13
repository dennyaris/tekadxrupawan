
# Dua Halaman Form (Cerdas Cermat & Mewarnai)

Paket ini berisi dua halaman HTML statis untuk pendaftaran lomba **Cerdas Cermat** dan **Mewarnai**, sudah siap kirim data ke Google Sheets lewat **Google Apps Script**.

## Struktur
- `cerdas-cermat.html`
- `mewarnai.html`
- `thanks.html`
- `assets/style.css`
- `assets/script.js`  ← ganti `ENDPOINT` di sini
- `apps_script.gs`    ← tempel ke Google Apps Script Anda

---

## Cara Pakai (Google Sheets + Apps Script)
1. **Buat Google Spreadsheet** baru, catat `SPREADSHEET_ID` (ada di URL).
2. Buat **dua sheet/tab**:
   - `CerdasCermat` dengan header (baris 1) persis:  
     `timestamp | asal_sekolah | kota_kab | nama_tim | anggota_1 | anggota_2 | anggota_3 | anggota_4 | anggota_5 | nama_pic_guru | kontak_pic_guru | kontak_perwakilan | submitted_at`
   - `Mewarnai` dengan header:  
     `timestamp | nama_lengkap | asal_sekolah | kelas | alamat_tinggal | nama_pic_guru | kontak_pic_guru | nama_ortu | kontak_ortu | submitted_at`
3. Buka **script.google.com** → New project → tempel isi `apps_script.gs`.
4. Ganti `SPREADSHEET_ID` dengan ID Anda.
5. **Deploy** → *New deployment* → pilih **Web app** → *Execute as:* Me → *Who has access:* *Anyone with the link* → **Deploy**.
6. Salin **Web App URL**, lalu buka `assets/script.js` dan ganti `ENDPOINT` dengan URL tersebut.

> Catatan CORS: kami menggunakan `application/x-www-form-urlencoded` untuk menghindari preflight, sehingga cukup publik dan aman untuk digunakan.

---

## Hosting & Shortlink (bit.ly)
Anda bisa meng-host file statis ini di mana saja (mis. GitHub Pages, Netlify, Vercel, atau server Anda):
- **GitHub Pages ringkas**:
  1. Buat repo baru, upload semua file/folder ini.
  2. Settings → Pages → Deploy from branch → pilih `main` & root (`/`).  
  3. URL akan muncul, contoh: `https://username.github.io/nama-repo/cerdas-cermat.html`.

- **Buat shortlink di Bitly**:
  1. Masuk ke akun Bitly → **Create**.
  2. Paste URL halaman (mis. `cerdas-cermat.html`) → **Create**.
  3. Ubah *custom back-half* agar mudah diingat, mis. `bit.ly/daftar-cerdas-cermat` dan `bit.ly/daftar-mewarnai`.

---

## Kustomisasi Cepat
- Warna/tema: ubah variabel di `assets/style.css` pada selector `:root`.
- Validasi nomor telp: pola saat ini menerima angka/spasi/`+` minimal 8 karakter (`pattern="[0-9+ ]{8,}"`).

Selamat menggunakan! 🎉
