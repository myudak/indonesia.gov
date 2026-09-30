export type Example = {
  question: string;
  tag: string;
  title: string;
  steps: string[];
  source: string;
  /** Two gradient stops shown behind the photo while it loads */
  tint: [string, string];
  /** Accent used on the step numbers */
  accent: string;
  /** File name in src/assets/scenes (without .png) */
  image: string;
  alt: string;
};

export const examples: Example[] = [
  {
    question: 'Gimana cara perpanjang SIM online?',
    tag: 'SIM',
    title: 'Perpanjang SIM lewat aplikasi resmi',
    steps: ['Siapkan KTP dan SIM lama', 'Tes kesehatan & psikologi online', 'Bayar PNBP, lalu ambil atau kirim SIM'],
    source: 'korlantas.polri.go.id',
    tint: ['#f6d9c4', '#e98b6d'],
    accent: '#c8102e',
    image: 'sim',
    alt: 'Pemuda duduk di atas skuter di jalan perumahan yang rindang, tersenyum melihat ponselnya',
  },
  {
    question: 'Apa syarat bikin paspor untuk anak?',
    tag: 'Paspor',
    title: 'Paspor anak di bawah 17 tahun',
    steps: ['Akta lahir & KK', 'KTP dan paspor kedua orang tua', 'Ambil antrean di M-Paspor'],
    source: 'imigrasi.go.id',
    tint: ['#d9e4f2', '#7f9fcf'],
    accent: '#23408e',
    image: 'paspor',
    alt: 'Ibu berhijab memeluk anak perempuannya yang memegang paspor di terminal bandara',
  },
  {
    question: 'Cara cek status BPJS Kesehatan aku?',
    tag: 'BPJS',
    title: 'Cek status kepesertaan JKN',
    steps: ['Buka layanan JKN', 'Masukkan NIK atau nomor kartu', 'Lihat status & faskes terdaftar'],
    source: 'bpjs-kesehatan.go.id',
    tint: ['#d8efe3', '#69b894'],
    accent: '#0c7a4d',
    image: 'bpjs',
    alt: 'Nenek berbaju batik tersenyum saat cucunya menunjukkan sesuatu di ponsel',
  },
  {
    question: 'Aku baru menikah. Gimana urus KK baru?',
    tag: 'Dukcapil',
    title: 'Membuat Kartu Keluarga baru',
    steps: ['Buku nikah / akta perkawinan', 'KK lama kedua pihak', 'Ajukan di Disdukcapil atau online'],
    source: 'dukcapil.kemendagri.go.id',
    tint: ['#f3e3ef', '#c98ab6'],
    accent: '#8a2c6d',
    image: 'dukcapil',
    alt: 'Pasangan pengantin baru duduk di antara kardus pindahan sambil melihat map dokumen',
  },
  {
    question: 'Bagaimana cara daftar NIB untuk usaha kecil?',
    tag: 'Usaha',
    title: 'Nomor Induk Berusaha (NIB)',
    steps: ['Buat akun OSS dengan NIK', 'Pilih KBLI sesuai usahamu', 'NIB terbit, gratis untuk UMK'],
    source: 'oss.go.id',
    tint: ['#f5ecd0', '#dcb553'],
    accent: '#8a6400',
    image: 'usaha',
    alt: 'Perempuan muda berdiri bangga di balik meja kedai kopinya',
  },
  {
    question: 'Kapan batas lapor SPT tahunan pribadi?',
    tag: 'Pajak',
    title: 'Lapor SPT Tahunan orang pribadi',
    steps: ['Batas akhir 31 Maret', 'Siapkan bukti potong dari kantor', 'Lapor lewat layanan pajak online'],
    source: 'pajak.go.id',
    tint: ['#e3e3f5', '#8d8ad6'],
    accent: '#3d3a9e',
    image: 'pajak',
    alt: 'Pria berkemeja batik bersandar lega di depan laptop pada sore hari',
  },
  {
    question: 'Bantu aku cari lowongan CPNS yang cocok',
    tag: 'Kerja',
    title: 'Formasi CPNS sesuai jurusanmu',
    steps: ['Buat akun SSCASN', 'Filter formasi berdasarkan pendidikan', 'Unggah berkas sebelum tenggat'],
    source: 'sscasn.bkn.go.id',
    tint: ['#dcecef', '#6fb3c1'],
    accent: '#0d6070',
    image: 'kerja',
    alt: 'Lulusan muda berhijab melihat laptop dengan penuh harap di ruang kerja yang terang',
  },
  {
    question: 'Cara bayar pajak motor online?',
    tag: 'Samsat',
    title: 'Bayar PKB tahunan tanpa antre',
    steps: ['Masukkan nomor polisi', 'Cek tagihan PKB & SWDKLLJ', 'Bayar, e-TBPKP langsung terbit'],
    source: 'samsat daerah (.go.id)',
    tint: ['#f4dcdc', '#d9777a'],
    accent: '#9b1c24',
    image: 'samsat',
    alt: 'Ayah dan anak remajanya berdiri di samping mobil, sang ayah tersenyum melihat ponsel',
  },
];

export const orbitSites = [
  'dukcapil', 'imigrasi', 'bpjs-kesehatan', 'bpjs-ketenagakerjaan', 'pajak', 'oss', 'korlantas', 'kemenkes',
  'kemdikbud', 'sscasn', 'bkn', 'samsat', 'lapor', 'kemnaker', 'kemenag', 'bps', 'atrbpn', 'ojk', 'bmkg',
  'kemensos', 'pln', 'kemenlu', 'jdih', 'lpse', 'kemendag', 'kemenkeu', 'kemenpar', 'bpom', 'kpu', 'bnpb',
];
