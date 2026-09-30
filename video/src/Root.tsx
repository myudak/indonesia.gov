import './styles.css';
import { loadFont as loadSerif } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PlusJakartaSans';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { Composition } from 'remotion';
import { EXPO_IN_OUT, FPS } from './lib/motion';
import { Board } from './scenes/Board';
import { Devices } from './scenes/Devices';
import { HeroShot } from './scenes/HeroShot';
import { Intro } from './scenes/Intro';
import { Manifesto } from './scenes/Manifesto';
import { Orbit } from './scenes/Orbit';
import { Outro } from './scenes/Outro';

loadSerif('normal', { weights: ['400'], subsets: ['latin'] });
loadSans('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] });

/** Edit this line to put your name on the end card */
const CREDIT = 'Konsep desain portofolio · 2026';

const T = 16; // transition length in frames
const timing = linearTiming({ durationInFrames: T, easing: EXPO_IN_OUT });

// Scene lengths (frames at 60fps). Total = sum - 6 transitions × T = 1800 (30s).
const SCENES = { intro: 190, hero: 386, manifesto: 250, orbit: 250, board: 320, devices: 250, outro: 250 };
const DURATION = Object.values(SCENES).reduce((a, b) => a + b, 0) - 6 * T;

const Reel: React.FC = () => (
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
      <Outro credit={CREDIT} />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

export const RemotionRoot: React.FC = () => (
  <Composition id="Reel" component={Reel} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
);
