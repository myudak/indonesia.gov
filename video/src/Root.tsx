import './styles.css';
import { loadFont as loadSerif } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PlusJakartaSans';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { Composition } from 'remotion';
import { EXPO_IN_OUT, FPS } from './lib/motion';
import { BAR_SEC, Soundtrack } from './Soundtrack';
import { Board } from './scenes/Board';
import { Devices } from './scenes/Devices';
import { HeroShot } from './scenes/HeroShot';
import { Intro } from './scenes/Intro';
import { Manifesto } from './scenes/Manifesto';
import { Orbit } from './scenes/Orbit';
import { Outro } from './scenes/Outro';

loadSerif('normal', { weights: ['400'], subsets: ['latin'] });
loadSerif('italic', { weights: ['400'], subsets: ['latin'] });
loadSans('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] });

/** End-card credits */
const AUTHOR = 'myudak';
const CREDIT = 'Konsep desain portofolio · 2026';

const T = 16; // transition length in frames
const timing = linearTiming({ durationInFrames: T, easing: EXPO_IN_OUT });
const DURATION = 1800; // 30s

// Every cut lands on the music: the first cut on the track's first hit, the rest on
// half-bar beats counted from it (bar hits on the Manifesto→Orbit and Devices→Outro cuts).
const FIRST_CUT = 174; // frame where the first hit lands (2.9s)
const HALF_BAR = (BAR_SEC / 2) * FPS;
const CUTS = [0, 5, 8, 11, 15, 18].map((halfBars) => FIRST_CUT + Math.round(halfBars * HALF_BAR));

// TransitionSeries lengths so each transition is centred on its cut; they add up to DURATION + 6T.
const bounds = [0, ...CUTS, DURATION];
const SCENE_LENGTHS = bounds.slice(1).map((end, i) => end - bounds[i] + (i > 0 ? T / 2 : 0) + (i < CUTS.length ? T / 2 : 0));
const [intro, hero, manifesto, orbit, board, devices, outro] = SCENE_LENGTHS;
const SCENES = { intro, hero, manifesto, orbit, board, devices, outro };

const Reel: React.FC = () => (
  <>
  <Soundtrack firstHitFrame={FIRST_CUT} outroHitFrame={CUTS[5]} total={DURATION} />
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={SCENES.intro}>
      <Intro />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={SCENES.hero}>
      <HeroShot />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={SCENES.manifesto}>
      <Manifesto />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={SCENES.orbit}>
      <Orbit />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe({ direction: 'from-right' })} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={SCENES.board}>
      <Board />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={SCENES.devices}>
      <Devices />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence durationInFrames={SCENES.outro}>
      <Outro author={AUTHOR} credit={CREDIT} />
    </TransitionSeries.Sequence>
  </TransitionSeries>
  </>
);

export const RemotionRoot: React.FC = () => (
  <Composition id="Reel" component={Reel} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
);
