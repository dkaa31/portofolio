export const profile = {
  name: "Aljudika Riziq Juhansyah",
  nickname: "Dika",
  role: "Siswa RPL · SMKN 1 Karawang",
  bio: "Siswa kelas 12 Rekayasa Perangkat Lunak di SMKN 1 Karawang. Tertarik di bidang pengembangan web dan aktif di dunia olahraga. Siap untuk terus belajar dan berkembang setelah lulus.",
  github: "https://github.com/dkaa31",
  email: "dikajuhansyah@example.com", 
  photo: "/foto.png",
  socials: {
    instagram: { url: "https://instagram.com/dkaa.rz", username: "@dkaa.rz" },
    tiktok: { url: "https://tiktok.com/@dkaa.rz", username: "@dkaa.rz" },
    whatsapp: { url: "https://wa.me/6283893607201", username: "+6283893607201" },
    linkedin: { url: "https://linkedin.com/in/aljudika", username: "aljudika" },
  }
};

export const skills = [
  { name: "HTML", level: 80 },
  { name: "CSS", level: 75 },
  { name: "JavaScript", level: 65 },
  { name: "PHP", level: 70 },
  { name: "MySQL", level: 70 },
  { name: "Bootstrap", level: 72 },
  { name: "Laravel", level: 65 },
  { name: "Tailwind CSS", level: 68 },
  { name: "Git & GitHub", level: 65 },
  { name: "Arduino", level: 50 },
  { name: "IoT", level: 50 },
];

export const projects = [
  {
    title: "iLabs",
    description: "Sistem Informasi Manajemen Laboratorium SMK berbasis web. Fitur lengkap: absensi QR Code, jadwal pelajaran, manajemen guru & siswa, pengajuan izin, display ruangan real-time, dan dashboard publik. Multi-role: Admin, Guru, dan Siswa.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Vite"],
    github: "https://github.com/dkaa31/Ilabs",
    demo: null,
    category: "Web Dev",
  },
  {
    title: "SmartPark",
    description: "Aplikasi manajemen parkir berbasis web dengan fitur pencatatan kendaraan masuk/keluar, kalkulasi biaya otomatis, QR Code tiket, cetak struk PDF format thermal, dan rekap laporan harian & bulanan. Multi-role: Admin, Petugas, dan Owner.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap", "Alpine.js"],
    github: "https://github.com/dkaa31/smartpark",
    demo: null,
    category: "Web Dev",
  },
  {
    title: "IOT Project",
    description: "Project berbasis Internet of Things (IoT) menggunakan Arduino. Eksplorasi integrasi perangkat keras dengan perangkat lunak untuk solusi otomasi dan monitoring.",
    tech: ["Arduino", "IoT", "C++"],
    github: "https://github.com/dkaa31/IOT",
    demo: null,
    category: "Web Dev",
  },
  {
    title: "Brand Guideline – SWARAJA",
    description: "Proyek tim yang berfokus pada identitas visual brand SWARAJA. Mencakup eksplorasi konsep, konsistensi brand, dan membangun karakter brand yang kuat melalui panduan visual yang matang.",
    tech: ["Branding", "Visual Identity", "Design Collaboration"],
    github: null,
    demo: "https://www.linkedin.com/posts/aljudika_brand-guideline-swaraja-ugcPost-7405270039425224704-wE6A",
    category: "Design",
  },
  {
    title: "Packaging Design – SWARAJA",
    description: "Desain packaging brand SWARAJA yang dikembangkan bersama tim. Menghadirkan tampilan modern, rapi, dan bernuansa hangat dengan sentuhan keluarga agar brand terasa lebih dekat dengan konsumen.",
    tech: ["Packaging Design", "Branding", "Visual Identity"],
    github: null,
    demo: "https://www.linkedin.com/posts/aljudika_packaging-swaraja-ugcPost-7405270973874118656-mBVk",
    category: "Design",
  },
];

export const experience = [
  {
    company: "PT Steel Pipe Industry of Indonesia Tbk – Karawang Factory",
    position: "Student Intern – IT Department",
    period: "Mar 2025 – Sep 2025",
    duration: "7 Bulan",
    location: "Karawang, Jawa Barat",
    description: "Terlibat langsung dalam mendukung operasional teknologi perusahaan di Departemen IT selama 7 bulan. Tanggung jawab meliputi troubleshooting dan perbaikan PC, printer, UPS, serta CCTV; perbaikan dan pengecekan jaringan LAN (termasuk crimping kabel); instalasi dan konfigurasi perangkat IT; pengelolaan inventaris serta input laporan mingguan IT; serta menyiapkan perangkat untuk kebutuhan meeting.",
    skills: ["IT Hardware Support", "Troubleshooting", "Jaringan LAN", "Konfigurasi Perangkat", "Problem Solving"],
    type: "Magang / PKL",
  },
];

export const certificates = [
  {
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "Jan 2025",
    expiry: "Jan 2028",
    credentialId: "GRX53G933Z0M",
    description: "Mempelajari dasar-dasar pengembangan Front-End Web, mencakup HTML, CSS, dan JavaScript untuk membangun tampilan web yang interaktif.",
    tags: ["HTML", "CSS", "JavaScript"],
    file: "/sertif/sertifikat_membuat_front_end.pdf",
    credentialUrl: "https://www.dicoding.com/certificates/GRX53G933Z0M",
  },
  {
    title: "Belajar Back-End Pemula dengan JavaScript",
    issuer: "Dicoding Indonesia",
    year: "Mar 2025",
    expiry: "Mar 2028",
    credentialId: "2VX3KL213XYQ",
    description: "Mempelajari pengembangan Back-End menggunakan JavaScript (Node.js), mencakup RESTful API Development dan Backend Development.",
    tags: ["JavaScript", "Node.js", "RESTful API"],
    file: "/sertif/sertifikat_back_end.pdf",
    credentialUrl: "https://www.dicoding.com/certificates/2VX3KL213XYQ",
  },
  {
    title: "Sertifikat PKL – IT Department",
    issuer: "PT Steel Pipe Industry of Indonesia Tbk – Karawang Factory",
    year: "Sep 2025",
    expiry: null,
    credentialId: null,
    description: "Sertifikat penyelesaian Praktik Kerja Lapangan selama 7 bulan di Departemen IT, mencakup IT Hardware Support, troubleshooting, jaringan LAN, dan operasional teknologi perusahaan.",
    tags: ["IT Hardware", "Troubleshooting", "Jaringan LAN"],
    file: "/sertif/sertif_pkl.pdf",
    credentialUrl: null,
  },
];
