import { Html5Audio, interpolate, Sequence, staticFile } from 'remotion';
import { FPS } from './lib/motion';

// Music: public/music.mp3 (≈94 BPM, one big hit per bar ≈ 2.535s).
// Main section starts inside the quiet intro pad so the first hit (4.54s in the track)
// lands on the Intro → Hero cut. The outro jumps to the track's final hit (83.64s)
// so the video ends on the song's natural decay instead of a fade-out.
export const FIRST_HIT_SEC = 4.54;
export const BAR_SEC = 2.535;
const FINAL_HIT_SEC = 83.64;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const Soundtrack: React.FC<{ firstHitFrame: number; outroHitFrame: number; total: number }> = ({
  firstHitFrame,
  outroHitFrame,
  total,
}) => {
  const src = staticFile('music.mp3');
  const mainTrim = Math.round(FIRST_HIT_SEC * FPS) - firstHitFrame;
  const lead = 6; // frames of the tail clip before its hit, used for the crossfade
  const tailFrom = outroHitFrame - lead;

  return (
    <>
      <Sequence durationInFrames={outroHitFrame + 2} name="Music — main">
        <Html5Audio
          src={src}
          trimBefore={mainTrim}
          volume={(f) => interpolate(f, [0, 20, outroHitFrame - lead, outroHitFrame + 2], [0, 0.9, 0.9, 0], clamp)}
        />
      </Sequence>
      <Sequence from={tailFrom} durationInFrames={total - tailFrom} name="Music — ending">
        <Html5Audio
          src={src}
          trimBefore={Math.round(FINAL_HIT_SEC * FPS) - lead}
          volume={(f) => interpolate(f, [0, lead, total - tailFrom - 12, total - tailFrom], [0, 0.9, 0.9, 0], clamp)}
        />
      </Sequence>
    </>
  );
};
