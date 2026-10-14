'use client';

import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { POOL_GEOMETRY as G } from './FundPool';

gsap.registerPlugin(ScrollTrigger);
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const formatLike = (sample, v) => {
  const decimals = sample.includes('.') ? sample.split('.')[1].length : 0;
  const n = decimals ? v.toFixed(decimals) : String(Math.round(v));
  return sample.includes(',') ? Number(n).toLocaleString('en-US') : n;
};

// All home-page motion in one place. Every graphic is complete in the static
// HTML; this only animates it into that state, and only when motion is OK.
export default function HomeMotion() {
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Problem figures count up as their row arrives
      document.querySelectorAll('.pd__n').forEach((el) => {
        if (!el.dataset.figure) el.dataset.figure = el.textContent;
        const orig = el.dataset.figure;
        const state = { p: 0 };
        const render = () => {
          el.textContent = orig.replace(/[\d.,]*\d/g, (m) => formatLike(m, parseFloat(m.replace(/,/g, '')) * state.p));
        };
        render();
        gsap.to(state, {
          p: 1, duration: 1.6, ease: 'power2.out', onUpdate: render,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Care fund pool: three rounds of monthly contributions fill the funds
      const pool = document.querySelector('.pool');
      if (pool) {
        const fills = [...pool.querySelectorAll('.pool__fill')];
        const coins = [...pool.querySelectorAll('.pool__coin')];
        gsap.set(fills, { attr: { y: G.jarBottom, height: 0 } });
        const tl = gsap.timeline({ paused: true });
        for (let r = 0; r < 3; r += 1) {
          for (let k = 0; k < fills.length; k += 1) {
            const coin = coins[r * fills.length + k];
            const from = G.members[(k + r) % G.members.length];
            const level = Number(fills[k].dataset.level) * ((r + 1) / 3);
            const at = r * 1.5 + k * 0.18;
            tl.set(coin, { attr: { cx: from, cy: G.memberY + 30 }, opacity: 1 }, at)
              .to(coin, { attr: { cx: G.jars[k], cy: G.jarTop + 8 }, duration: 0.7, ease: 'power2.in' }, at)
              .to(coin, { opacity: 0, duration: 0.15 }, at + 0.7)
              .to(fills[k], {
                attr: { y: G.jarBottom - G.jarH * level, height: G.jarH * level },
                duration: 0.5, ease: 'power2.out',
              }, at + 0.7);
          }
        }
        ScrollTrigger.create({ trigger: pool, start: 'top 75%', once: true, onEnter: () => tl.play() });
      }

      return () => {
                document.querySelectorAll('.pd__n').forEach((el) => { if (el.dataset.figure) el.textContent = el.dataset.figure; });
      };
    });
    return () => mm.revert();
  }, []);

  return null;
}
