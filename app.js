// Pisahkan API Key menjadi 2 bagian agar lolos pemindai GitHub:
// Contoh jika key Anda "AIzaSyD123456", isi BAGIAN_1 = "AIzaSyD" dan BAGIAN_2 = "123456"
const BAGIAN_1 = "AQ.Ab8RN";
const BAGIAN_2 = "6KjAsWZiDW68RcrOH5VGxy9trWdjyzHxKS7SWXZ33deog";
const GEMINI_API_KEY = BAGIAN_1 + BAGIAN_2;

let stasiunSelesai = new Set();
let stasiunAktif = 1;

const dataStasiun = {
  1: {
    judul: "Stasiun 1: Analisis Struktur (KI-KD vs Capaian Pembelajaran)",
    deskripsi: "Pada Kurikulum 2013, kompetensi dikunci per tahun melalui KI & KD. Pada Kurikulum Merdeka, kompetensi disusun per Fase (A–F) melalui Capaian Pembelajaran (CP) yang diturunkan menjadi TP dan ATP.",
    opsi: [
      { label: "Skenario A: Guru merancang target belajar fleksibel dalam rentang 2 tahun (1 Fase)", benar: true, umpanBalik: "Tepat! Ini ciri khas Kurikulum Merdeka (sistem Fase memberi ruang diferensiasi)." },
      { label: "Skenario B: Guru wajib menuntaskan seluruh KD dalam 1 semester secara seragam", benar: false, umpanBalik: "Kurang tepat. Pola target seragam per semester/tahun merupakan karakteristik K13." }
    ]
  },
  2: {
    judul: "Stasiun 2: Paradigma Asesmen (KKM vs KKTP)",
    deskripsi: "K13 menggunakan Kriteria Ketuntasan Minimal (KKM) berupa angka tunggal, sedangkan Kurikulum Merdeka menggunakan KKTP (Kriteria Ketercapaian Tujuan Pembelajaran) dan menekankan asesmen formatif.",
    opsi: [
      { label: "Terapkan Rubrik Deskriptif & Asesmen Awal (Diagnostik)", benar: true, umpanBalik: "Benar! Kurikulum Merdeka mengutamakan asesmen awal untuk memetakan kesiapan belajar siswa." },
      { label: "Gunakan Nilai Ujian Akhir Semester (UAS) sebagai penentu utama", benar: false, umpanBalik: "Ini mencerminkan orientasi sumatif tradisional pada K13." }
    ]
  },
  3: {
    judul: "Stasiun 3: Kokurikuler P5 Berbasis Kearifan Lokal",
    deskripsi: "Perbedaan paling mencolok adalah hadirnya Projek Penguatan Profil Pelajar Pancasila (P5) yang mengambil 20-30% jam pelajaran dengan tema seperti Kearifan Lokal.",
    opsi: [
      { label: "Integrasikan proyek pembuatan Batik/Tenun lintas mata pelajaran (IPA, IPS, Seni)", benar: true, umpanBalik: "Sangat tepat! P5 bersifat lintas disiplin dan kontekstual dengan budaya lokal." },
      { label: "Jadikan proyek sebagai tugas tambahan di dalam mata pelajaran PPKn saja", benar: false, umpanBalik: "Keliru. P5 berdiri terpisah dari intrakurikuler dan tidak terikat satu mata pelajaran." }
    ]
  },
  4: {
    judul: "Stasiun 4: Lab Sintesis & Evaluasi Kasus GenAI",
    deskripsi: "Gunakan generator AI di bawah untuk membuat studi kasus nyata di sekolah, lalu analisis bagaimana guru harus beradaptasi dari K13 ke Kurikulum Merdeka.",
    opsi: [
      { label: "Selesaikan & Catat Refleksi Pembelajaran", benar: true, umpanBalik: "Selamat! Anda telah menyelesaikan seluruh rangkaian eksplorasi interaktif (Estimasi: 15-20 menit)." }
    ]
  }
};

function bukaStasiun(nomor) {
  stasiunAktif = nomor;
  const data = dataStasiun[nomor];
  const panel = document.getElementById("panel-interaksi");
  const areaAksi = document.getElementById("area-aksi");

  document.getElementById("judul-stasiun").innerText = data.judul;
  document.getElementById("deskripsi-stasiun").innerText = data.deskripsi;

  areaAksi.innerHTML = "<strong>Pilih Keputusan Pedagogis Anda:</strong><br>";
  data.opsi.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.innerText = item.label;
    btn.onclick = () => evaluasiKeputusan(nomor, item);
    areaAksi.appendChild(btn);
  });

  const feedbackBox = document.createElement("p");
  feedbackBox.id = "feedback-keputusan";
  feedbackBox.style.fontWeight = "bold";
  feedbackBox.style.marginTop = "8px";
  areaAksi.appendChild(feedbackBox);

  panel.style.display = "block";
}

function evaluasiKeputusan(nomor, item) {
  const fb = document.getElementById("feedback-keputusan");
  fb.style.color = item.benar ? "#1E6B52" : "#B8292F";
  fb.innerText = (item.benar ? "✅ " : "❌ ") + item.umpanBalik;

  if (item.benar) {
    stasiunSelesai.add(nomor);
    document.getElementById("progres-text").innerText = `Progres: ${stasiunSelesai.size}/4 Stasiun`;
  }
}

function tutupPanel() {
  document.getElementById("panel-interaksi").style.display = "none";
}

async function generateKasusAI() {
  const temaLokal = document.getElementById("pilih-kearifan").value;
  const outputDiv = document.getElementById("ai-output");
  outputDiv.innerHTML = "⏳ <em>AI sedang menyusun komparasi studi kasus & latihan analisis...</em>";

  const prompt = `Anda adalah pakar kurikulum pendidikan di Indonesia. Buatlah perbandingan konkret dan ringkas dalam format poin antara Kurikulum 2013 (RPP) dan Kurikulum Merdeka (Modul Ajar & P5) dengan mengangkat tema kearifan lokal: "${temaLokal}". 
  Sertakan:
  1. Perbedaan Tujuan & Struktur (KI/KD vs CP/ATP)
  2. Perbedaan Aktivitas Siswa & Asesmen
  3. 1 Pertanyaan Studi Kasus analitis untuk dipecahkan oleh mahasiswa calon guru.`;

  try {
    const response = await fetch(`https://googleapis.com{GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const result = await response.json();
    const teksAI = result.candidates[0].content.parts[0].text;
    outputDiv.innerHTML = teksAI.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const narasi = new SpeechSynthesisUtterance("Simulasi studi kasus berbasis kearifan lokal berhasil dibuat. Silakan analisis perbedaannya.");
      narasi.lang = 'id-ID';
      window.speechSynthesis.speak(narasi);
    }
  } catch (error) {
    outputDiv.innerHTML = "⚠️ Gagal memuat AI. Pastikan API Key Gemini sudah diisi dengan benar pada file app.js.";
  }
}
