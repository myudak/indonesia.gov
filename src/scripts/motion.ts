import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
gsap.defaults({ ease: 'expo.out', duration: 1 });

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

export function smoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis() {
  return lenis;
}

/** Make [data-reveal] elements visible when motion is reduced or an animation is skipped. */
export function showAll(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-reveal], [data-rise], [data-rise-lines]').forEach((el) => {
    el.style.visibility = 'visible';
  });
}

/**
 * Generic scroll entrances used across sections:
 *  - [data-rise]        fades/rises/sharpens in when it enters the viewport
 *  - [data-rise-lines]  headline whose lines slide up from behind a mask
 */
export function initScrollReveals() {
  if (prefersReducedMotion()) {
    showAll();
    return;
  }

  document.querySelectorAll<HTMLElement>('[data-rise-lines]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.lines,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 1.3,
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        ),
    });
    gsap.set(el, { autoAlpha: 1 });
  });

  ScrollTrigger.batch('[data-rise]', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { y: 36, autoAlpha: 0, filter: 'blur(10px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.08, clearProps: 'filter' },
      ),
  });
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };
