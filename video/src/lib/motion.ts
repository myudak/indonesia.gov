import type { CSSProperties } from 'react';
import { Easing, interpolate, spring } from 'remotion';

export const FPS = 60;

/** Same curve as the site's GSAP default (expo.out) */
export const EXPO = Easing.bezier(0.16, 1, 0.3, 1);
export const EXPO_IN_OUT = Easing.bezier(0.87, 0, 0.13, 1);
export const SMOOTH = Easing.bezier(0.45, 0, 0.2, 1);

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** 0→1 progress between `start` and `start + dur` frames */
export const prog = (frame: number, start: number, dur: number, easing = EXPO) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing });

/** Keyframed value: frames[] → values[], eased between each pair */
export const keys = (frame: number, frames: number[], values: number[], easing = SMOOTH) =>
  interpolate(frame, frames, values, { ...clamp, easing });

export const lerp = (p: number, a: number, b: number) => a + (b - a) * p;

/** Fade + rise + sharpen, the site's signature entrance */
export const rise = (
  frame: number,
  start: number,
  { dur = 45, dist = 40, blur = 12 }: { dur?: number; dist?: number; blur?: number } = {},
): CSSProperties => {
  const p = prog(frame, start, dur);
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * dist}px)`,
    filter: blur ? `blur(${(1 - p) * blur}px)` : undefined,
  };
};

/** Springy 0→1 (overshoots slightly) for chips, pins, cards */
export const pop = (frame: number, start: number, config: { damping?: number; stiffness?: number; mass?: number } = {}) =>
  spring({ frame: frame - start, fps: FPS, config: { damping: 13, stiffness: 170, mass: 0.8, ...config } });

/** Typewriter: characters revealed so far */
export const typeText = (text: string, frame: number, start: number, charsPerSecond = 32) =>
  text.slice(0, Math.max(0, Math.floor(((frame - start) * charsPerSecond) / FPS)));
