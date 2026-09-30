# Indonesia.gov — konsep desain

Konsep UI portofolio: satu pintu untuk semua layanan pemerintah Indonesia, terinspirasi dari America.gov.
Bukan situs resmi dan tidak berafiliasi dengan Pemerintah Republik Indonesia.

## Stack

- Astro 7 (static)
- Tailwind CSS 4
- GSAP 3 (ScrollTrigger, SplitText, DrawSVG)
- Lenis (smooth scroll)
- Plus Jakarta Sans + Instrument Serif (Fontsource)

## Jalankan

```bash
npm install
npm run dev
```

## Struktur

- `src/components/Hero.astro` — judul, prompt yang mengetik sendiri, carousel contoh layanan
- `src/components/Manifesto.astro` — teks besar yang terungkap per kata saat scroll
- `src/components/Orbit.astro` — bola kanvas berisi ratusan "situs pemerintah"
- `src/components/Features.astro` — privasi, sumber resmi, tanpa aplikasi
- `src/components/Roadmap.astro` — kartu pratinjau fitur 2027 dengan parallax
- `src/components/ChatDock.astro` — bar tanya yang menempel + panel chat demo (jawaban contoh)
- `src/data/content.ts` — semua contoh pertanyaan & jawaban
