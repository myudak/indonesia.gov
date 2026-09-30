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

## Video showcase (Remotion)

A 30-second 1920×1080 60fps reel lives in `video/`, built with Remotion. It reuses `src/data/content.ts` and the photos in `src/assets` directly.

```bash
cd video
npm install
npm run studio   # preview & scrub in Remotion Studio
npm run render   # → video/out/indonesia-gov-reel.mp4
```

Scenes are in `video/src/scenes/` (Intro, HeroShot, Manifesto, Orbit, Board, Devices, Outro), and the end-card credit line is `CREDIT` in `video/src/Root.tsx`.
