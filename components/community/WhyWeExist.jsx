'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { wds } from './media';
import './CommunityLanding.css';

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// The twelve countries (plan doc order) with ISO numeric ids for the map
// and approximate centroids for the pulse markers.
const COUNTRIES = [
  { name: 'Philippines', id: 608, coords: [121.8, 12.9], lx: 12, ly: 4, anchor: 'start' },
  { name: 'Nigeria', id: 566, coords: [8.7, 9.1], lx: 9, ly: -8, anchor: 'start' },
  { name: 'Pakistan', id: 586, coords: [69.3, 30.4], lx: -9, ly: -7, anchor: 'end' },
  { name: 'India', id: 356, coords: [78.9, 22.0], lx: 4, ly: 21, anchor: 'middle' },
  { name: 'Zimbabwe', id: 716, coords: [29.9, -19.0], lx: 11, ly: 4, anchor: 'start' },
  { name: 'Bangladesh', id: 50, coords: [90.4, 23.7], lx: 11, ly: 9, anchor: 'start' },
  { name: 'Nepal', id: 524, coords: [84.1, 28.4], lx: 0, ly: -11, anchor: 'middle' },
  { name: 'Ghana', id: 288, coords: [-1.0, 7.9], lx: -9, ly: 9, anchor: 'end' },
  { name: 'Kenya', id: 404, coords: [37.9, 0.0], lx: 11, ly: 9, anchor: 'start' },
  { name: 'Jamaica', id: 388, coords: [-77.3, 18.1], lx: -10, ly: 4, anchor: 'end' },
  { name: 'Ethiopia', id: 231, coords: [40.5, 9.1], lx: 11, ly: -4, anchor: 'start' },
  { name: 'South Africa', id: 710, coords: [24.7, -29.0], lx: -10, ly: 13, anchor: 'end' },
];
const HIGHLIGHT_IDS = new Set(COUNTRIES.map((c) => c.id));

// The "why we exist" story: the trust statement, the twelve-country map,
// the numbers, and the protective silence.
export default function WhyWeExist() {
  const root = useRef(null);
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Fade-up reveals for this block's [data-reveal] elements
        const revealEls = root.current.querySelectorAll('[data-reveal]');
        gsap.set(revealEls, { opacity: 0, y: 26 });
        ScrollTrigger.batch(revealEls, {
          start: 'top 85%',
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }),
        });

        // Trust statement: same word-by-word brighten; the bold brand phrase
        // stays at full opacity as the anchor while the rest fills in.
        const trustWords = gsap.utils.toArray('.cl-trust__h .cl-wds__w');
        if (trustWords.length) {
          gsap.set(trustWords, { opacity: 0.22 });
          gsap.to(trustWords, {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: { trigger: '.cl-trust__h', start: 'top 80%', end: 'bottom 55%', scrub: true },
          });
        }

        // Stats split: rows rise in sequence as the section arrives (one-shot;
        // no scrubbed parallax here - it janked on large images).
        const statRows = gsap.utils.toArray('.cl-stat');
        if (statRows.length) {
          gsap.set(statRows, { autoAlpha: 0, y: 28 });
          ScrollTrigger.create({
            trigger: '.cl-stats',
            start: 'top 82%',
            once: true,
            onEnter: () => gsap.to(statRows, {
              autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.18,
            }),
          });
        }

        // Stat figures count up when their card arrives
        gsap.utils.toArray('.cl-stat__n').forEach((el) => {
          // Parse the target from a stashed copy of the original figure:
          // effect re-runs (StrictMode remounts) would otherwise read the
          // reverted "0M" text and count up to zero.
          if (!el.dataset.figure) el.dataset.figure = el.textContent;
          const m = el.dataset.figure.match(/^([\d.,]+)(.*)$/);
          if (!m) return;
          const target = parseFloat(m[1].replace(/,/g, ''));
          const decimals = m[1].includes('.') ? 1 : 0;
          const grouped = m[1].includes(',');
          const suffix = m[2];
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 1.6,
            ease: 'power1.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onUpdate: () => {
              const val = decimals ? state.v.toFixed(decimals) : Math.round(state.v);
              el.textContent = (grouped ? Number(val).toLocaleString('en-US') : val) + suffix;
            },
          });
        });
      });
    }, root);
    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <div className="cl cl--embed" ref={root}>
        {/* ── Intro part 2: the trust statement, oversized (Unify-style) ── */}
        <section className="cl-trust">
          <div className="cl-wrap">
            <h2 className="cl-trust__h">
              {wds('A Whole Family Matter is a story of')}
              <em>trust in the family</em>{' '}
              {wds('— three circles of care planning, funding, and learning to deliver dignified end-of-life experiences with and for each other.')}
            </h2>
          </div>
        </section>

        {/* ── The world's worst places to die: big map (Lassie-style) ── */}
        <section id="why" className="cl-world">
          <div className="cl-world__panel">
          <div className="cl-world__head cl-center" data-reveal>
            <span className="cl-eyebrow">Across 12 countries</span>
            <h2 className="cl-h2 cl-world__title">The world's worst<br />places to die</h2>
          </div>
          <div className="cl-world__map" data-reveal style={{ '--rd': '120ms' }} aria-hidden="true">
            <ComposableMap width={980} height={470} projection="geoEqualEarth" projectionConfig={{ scale: 178, center: [12, 8] }}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) => geographies
                  .filter((geo) => Number(geo.id) !== 10 /* Antarctica */)
                  .map((geo) => {
                    const hot = HIGHLIGHT_IDS.has(Number(geo.id));
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className={hot ? 'cl-geo cl-geo--hot' : 'cl-geo'}
                        tabIndex={-1}
                      />
                    );
                  })}
              </Geographies>
              {COUNTRIES.map((c, i) => (
                <Marker key={c.name} coordinates={c.coords}>
                  <circle className="cl-ping" r="5" style={{ animationDelay: `${(i % 6) * 0.4}s` }} />
                  <circle className="cl-dot" r="3.2" />
                  <text className="cl-maplabel" x={c.lx} y={c.ly} textAnchor={c.anchor}>{c.name}</text>
                </Marker>
              ))}
            </ComposableMap>
          </div>
          <div className="cl-wrap cl-world__below">
            <p className="cl-factcheck cl-center-text" data-reveal style={{ '--rd': '80ms' }}>
              Fact-checked against <b>1,041,387</b> medical migrants from 39 countries in 2020/21.
              These twelve are the world's biggest exporters of healthcare workers, in order of
              magnitude — and our families back home pay the highest cost for end-of-life care
              while getting the worst quality of death. All of them share collectivist family
              values, scoring below 50 on the Hofstede Individualism–Collectivism Index — the
              threshold that measures whether a society defaults to an “I” or a “We” perspective.
            </p>
          </div>
          </div>
        </section>

        {/* ── The numbers: minimal split, stacked figures + photo ── */}
        <section className="cl-statsband">
          <div className="cl-wrap cl-statsband__grid">
            <div className="cl-statsband__left">
              <h2 className="cl-statsband__head" data-reveal>
                The highest economic burden.<br />
                <span>The worst quality of death.</span>
              </h2>
              <div className="cl-stats">
                {[
                  ['85M', 'People across these 12 countries pushed into poverty by individual healthcare spending'],
                  ['7.9M', 'Experience serious health-related suffering every year — about 30% of the global burden'],
                  ['20,000+', 'Of our people die in pain, in debt, and in silence every day around the world'],
                  ['20.1M', 'Projected to die yearly with unaddressed severe pain by 2060 — two and a half times today'],
                ].map(([n, d]) => (
                  <div className="cl-stat" key={n}>
                    <span className="cl-stat__n">{n}</span>
                    <span className="cl-stat__d">{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="cl-statsband__photo" data-reveal style={{ '--rd': '120ms' }} aria-hidden="true">
              <img
                src="https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_1600,ar_1:1,c_fill,g_auto/v1791205716/Motion-Blurred_Cartographic_Portrait_ite4jd.png"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── The Protective Silence: dark split with image bleeding in ── */}
        <section className="cl-silence">
          <div className="cl-silence__copy">
            <span className="cl-eyebrow cl-silence__eyebrow" data-reveal>— The Protective Silence</span>
            <h2 data-reveal style={{ '--rd': '80ms' }}>
              Because the family — not the patient — decides in our collectivist
              cultures, <em>77 to 98 percent</em> of our terminal patients
              don't know they're dying.
            </h2>
            <p data-reveal style={{ '--rd': '160ms' }}>
              They are kept safe from the truth by families who love them and care
              for them. Advance care planning is always too early, until it's too
              late. We exist to break that silence together — especially when we disagree.
            </p>
            <p data-reveal style={{ '--rd': '220ms' }}>
              And if you're a medical migrant from Nigeria, India or the Philippines —
              a diaspora healthcare worker with collectivist family values — you are welcome.
            </p>
          </div>
          <div className="cl-silence__media" aria-hidden="true">
            <div className="cl-scard cl-scard--1" data-reveal>
              <span className="cl-scard__ava">N</span>
              <p>"Ate, has anyone asked Papa what he wants?"</p>
            </div>
            <div className="cl-scard cl-scard--2" data-reveal style={{ '--rd': '140ms' }}>
              <p>Q14 · Who will speak for you?</p>
              <em>3 of 6 family members answered</em>
            </div>
            <div className="cl-scard cl-scard--3" data-reveal style={{ '--rd': '260ms' }}>
              <i />
              <p>Silence broken — conversation started</p>
            </div>
          </div>
        </section>
    </div>
  );
}
