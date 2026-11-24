let stasiunSelesai = new Set();
let stasiunAktif = 1;
let indeksVariasi = 0;

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

function generateKasusAI() {
  const temaLokal = document.getElementById("pilih-kearifan").value;
  const outputDiv = document.getElementById("ai-output");
  outputDiv.innerHTML = "⏳ <em>AI sedang menyusun komparasi studi kasus & latihan analisis...</em>";

  indeksVariasi++;

  const bankKasus = {
    "Membatik & Filosofi Motif Lokal": [
      `<strong>🤖 Hasil Generasi AI #${indeksVariasi} — Tema: Membatik & Filosofi Motif Lokal</strong><br><br>
      <strong>1. Perbedaan Tujuan & Struktur (KI/KD vs CP/ATP):</strong><br>
      • <em>Kurikulum 2013 (RPP):</em> Kompetensi dikunci ketat per semester; KD Seni Budaya hanya berfokus pada teknik menggambar ragam hias, sementara KD IPS membahas sejarah lokal secara terpisah.<br>
      • <em>Kurikulum Merdeka (Modul Ajar & P5):</em> Menggunakan Capaian Pembelajaran (CP) per Fase yang fleksibel dan dipadukan dengan alokasi 20–30% jam pelajaran khusus P5 tema <em>Kearifan Lokal</em>.<br><br>
      <strong>2. Perbedaan Aktivitas Siswa & Asesmen:</strong><br>
      • <em>K13:</em> Penilaian berorientasi pada ketuntasan angka tunggal (KKM, misal 75) terhadap hasil lukisan motif.<br>
      • <em>Merdeka:</em> Diawali asesmen diagnostik kesiapan belajar, pembelajaran berdiferensiasi (motif sederhana hingga kompleks), dan penilaian rubrik deskriptif (KKTP) pada gelar karya.<br><br>
      <strong>3. Pertanyaan Studi Kasus Mahasiswa:</strong><br>
      <em>"Di sebuah kelas Fase D, 40% siswa belum mengenal filosofi motif batik daerahnya sendiri, sementara 60% sudah mahir menggambar pola dasar. Bagaimana Anda merancang diferensiasi proses dalam Modul Ajar Kurikulum Merdeka agar kedua kelompok tetap mencapai TP?"</em>`,

      `<strong>🤖 Hasil Generasi AI #${indeksVariasi} — Variasi Kasus: Eksplorasi Pewarna Alam Batik</strong><br><br>
      <strong>1. Perbedaan Struktur Perangkat Ajar:</strong><br>
      • <em>RPP K13:</em> Memuat 13 komponen administratif dengan pendekatan saintifik 5M yang seragam untuk seluruh siswa.<br>
      • <em>Modul Ajar Kurikulum Merdeka:</em> Lebih ringkas dan esensial (Tujuan Pembelajaran, Langkah Pembelajaran, Asesmen) serta mengintegrasikan Dimensi Profil Pelajar Pancasila (Kreatif & Berkebinekaan Global).<br><br>
      <strong>2. Pertanyaan Analisis Kritis:</strong><br>
      <em>"Jika sekolah memiliki keterbatasan alat canting dan malam, bagaimana guru mengadaptasi proyek P5 kearifan lokal membatik menggunakan teknik ecoprint/jumputan tanpa menghilangkan esensi filosofi lokalnya?"</em>`
    ],
    "Sistem Irigasi Subak / Pertanian Tradisional": [
      `<strong>🤖 Hasil Generasi AI #${indeksVariasi} — Tema: Sistem Irigasi Subak & Ekologi Lokal</strong><br><br>
      <strong>1. Perbedaan Tujuan & Struktur (KI/KD vs CP/ATP):</strong><br>
      • <em>Kurikulum 2013 (RPP):</em> Materi siklus air (IPA) dan interaksi sosial-ekonomi (IPS) diajarkan terpisah dengan target penuntasan KD per tahun.<br>
      • <em>Kurikulum Merdeka (Modul Ajar & P5):</em> Dilebur menjadi mata pelajaran <strong>IPAS</strong> pada Fase B/C sehingga siswa memahami keterkaitan sains dan kearifan lokal pembagian air secara holistik.<br><br>
      <strong>2. Perbedaan Aktivitas Siswa & Asesmen:</strong><br>
      • <em>K13:</em> Dominan tes tertulis pilihan ganda di akhir bab untuk mengejar KKM.<br>
      • <em>Merdeka:</em> Asesmen formatif berkelanjutan melalui observasi lapangan, wawancara petani lokal, dan presentasi purwarupa sistem irigasi sederhana.<br><br>
      <strong>3. Pertanyaan Studi Kasus Mahasiswa:</strong><br>
      <em>"Bandingkan bagaimana instrumen evaluasi RPP K13 dan Modul Ajar Kurikulum Merdeka mengukur nilai gotong royong siswa saat melakukan observasi ke lahan pertanian!"</em>`
    ],
    "Permainan Tradisional & Gotong Royong": [
      `<strong>🤖 Hasil Generasi AI #${indeksVariasi} — Tema: Permainan Tradisional & Gotong Royong</strong><br><br>
      <strong>1. Perbedaan Tujuan & Struktur (KI/KD vs CP/ATP):</strong><br>
      • <em>Kurikulum 2013 (RPP):</em> Nilai gotong royong hanya tertulis sebagai KI-2 (Sikap Sosial) di dalam mata pelajaran PJOK atau PPKn.<br>
      • <em>Kurikulum Merdeka (Modul Ajar & P5):</em> Diwujudkan sebagai proyek kokurikuler P5 lintas disiplin dengan rubrik perkembangan dimensi <em>Bergotong Royong</em> (Mulai Berkembang hingga Sangat Berkembang).<br><br>
      <strong>2. Perbedaan Aktivitas Siswa & Asesmen:</strong><br>
      • <em>K13:</em> Penilaian berfokus pada ketangkasan fisik individu sesuai standar KKM.<br>
      • <em>Merdeka:</em> Menekankan modifikasi aturan permainan agar inklusif bagi seluruh siswa dan refleksi kolaborasi tim.<br><br>
      <strong>3. Pertanyaan Studi Kasus Mahasiswa:</strong><br>
      <em>"Bagaimana cara membedakan laporan hasil belajar intrakurikuler (PJOK) dengan Rapor Proyek P5 ketika siswa mempraktikkan permainan tradisional Gobak Sodor?"</em>`
    ]
  };

  setTimeout(() => {
    const daftar = bankKasus[temaLokal] || bankKasus["Membatik & Filosofi Motif Lokal"];
    const hasil = daftar[(indeksVariasi - 1) % daftar.length];
    outputDiv.innerHTML = hasil;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const narasi = new SpeechSynthesisUtterance("Simulasi studi kasus berbasis kearifan lokal berhasil dibuat. Silakan analisis perbedaannya.");
      narasi.lang = 'id-ID';
      window.speechSynthesis.speak(narasi);
    }
  }, 700);
}
