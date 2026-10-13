'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import './CommunityLanding.css';

gsap.registerPlugin(ScrollTrigger);

const logo = '/logo.png';
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Public marketing page for the free community (Mighty Networks).
// Copy source: "MN Landing Page" plan doc, Version 2 masthead.
// Architecture follows Empathy's landing: centered hero with product panel,
// marquee trust strip, scroll-pinned platform story (sticky visual + steps),
// oversized film frame, world-map problem section, quote, dark CTA, footer.

const VIDEO_ID = 'SmXsymSSHoI';

// Hero background montage (Empathy-style human footage).
// HOW TO FILL: download the five licensed Envato clips, upload them to
// Cloudinary (Media Library > Upload, e.g. into awfm/hero/), then paste
// each clip's URL below with the transformation segment shown:
//   https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/awfm/hero/<name>.mp4
// With this list empty, the hero falls back to the gradient product panel.
const HERO_VIDEOS = [
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1791178169/healthcare-provider-holding-elderly-patient-s-hand-2026-10-02-19-15-58-utc_rzhb0i.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1791179341/smiling-woman-assisted-by-caregiver-in-a-living-ro-2026-10-03-05-37-16-utc_hmz827.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1791184558/affectionate-couple-embracing-in-urban-canal-setti-2026-10-02-19-21-48-utc_oggy0e.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1791183998/healthcare-worker-with-senior-in-green-urban-park-2026-10-02-14-07-52-utc_ubgjuy.mp4',
];
const HERO_CLIP_SECONDS = 7;

const heroPoster = (url) =>
  url.replace('/video/upload/', '/video/upload/so_0/').replace(/\.(mp4|webm|mov)(\?.*)?$/, '.jpg');

function HeroMontage({ clips }) {
  const [idx, setIdx] = React.useState(0);
  const reduced = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    if (reduced || clips.length < 2) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % clips.length), HERO_CLIP_SECONDS * 1000);
    return () => clearInterval(t);
  }, [clips.length, reduced]);

  if (reduced) {
    return <img className="cl-hero__film is-on" src={heroPoster(clips[0])} alt="" />;
  }
  // Two mounted layers: the active clip and the next one warming up.
  const nxt = (idx + 1) % clips.length;
  return (
    <>
      {[idx, nxt].map((ci, layer) => (
        <video
          key={clips[ci] + (layer === 0 ? '-a' : '-b')}
          className={`cl-hero__film${layer === 0 ? ' is-on' : ''}`}
          src={clips[ci]}
          poster={heroPoster(clips[ci])}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        />
      ))}
    </>
  );
}
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

const STORY = [
  {
    key: 'plan',
    label: 'Care Planning',
    eyebrow: 'Plan',
    title: 'Discuss, decide, and document — together',
    body: 'Your immediate family, your family back home, and your local or chosen family answer the questions that matter in one shared space. An ongoing conversation, not a one-time form.',
    points: ['36 guided questions across 8 sections', 'Every member answers in their own words', 'Video, audio, and text responses'],
    card: {
      head: 'Wulandari Family — planning together…',
      rows: [
        ['S', 'Sofia answered Q12 — What matters most', 'Video · 2:14'],
        ['R', 'Ramon added his answer', 'Text'],
        ['M', 'Mila confirmed the care plan', 'Checkpoint ✓'],
      ],
    },
  },
  {
    key: 'fund',
    label: 'Care Fund',
    eyebrow: 'Fund',
    title: 'Fund each other’s care, transparently',
    body: 'Pool end-of-life care funds with shared visibility and family-agreed release — because generations are financially interdependent, and no one should carry the cost alone.',
    points: ['Shared pools with goals', 'Family-agreed approval and release', 'Every movement visible to the team'],
    card: {
      head: 'Care fund — €2,450 of €3,800',
      rows: [
        ['L', 'Auntie Liezel contributed', '€150'],
        ['✓', 'Release approved by approvers', '3 of 3'],
        ['€', 'Custodian released for medicines', '€600'],
      ],
    },
  },
  {
    key: 'advocate',
    label: 'Patient Advocacy',
    eyebrow: 'Advocate',
    title: 'Learn to speak for each other',
    body: 'A guided workbook that teaches care teams to advocate — so dignified end-of-life experiences get delivered, most especially in the world’s worst places to die.',
    points: ['Stage-by-stage advocacy workbook', 'Built on published end-of-life research', 'Made for collectivist families'],
    card: {
      head: 'Advocacy workbook — Stage 2',
      rows: [
        ['1', 'Hopes & fears exercise', 'Complete ✓'],
        ['2', 'Care team briefed the attending doctor', 'In session'],
        ['3', 'Treatment decisions conversation', 'Up next'],
      ],
    },
  },
];

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Lightweight product-card mocks — swap for real app screenshots when ready.
const CardTeam = () => (
  <div className="cl-card" aria-hidden="true">
    <div className="cl-card__title">Wulandari Family — Circle 1</div>
    {['S', 'R', 'M'].map((ini, i) => (
      <div className="cl-card__row" key={ini}>
        <span className={`cl-card__avatar cl-card__avatar--${i}`}>{ini}</span>
        <span className="cl-card__lines"><i style={{ width: '62%' }} /><i style={{ width: '38%' }} /></span>
        <span className="cl-card__check">✓</span>
      </div>
    ))}
  </div>
);

const CardFund = () => (
  <div className="cl-card" aria-hidden="true">
    <div className="cl-card__title">Care fund</div>
    <div className="cl-card__amount">€2,450</div>
    <div className="cl-card__bar"><i style={{ width: '64%' }} /></div>
    <div className="cl-card__foot">64% of €3,800 goal</div>
  </div>
);

const CardPlan = () => (
  <div className="cl-card" aria-hidden="true">
    <div className="cl-card__title">Advance care plan</div>
    <div className="cl-card__pill">Q4 · Checkpoint 3/3 ✓</div>
    <div className="cl-card__pill cl-card__pill--soft">Q5 · In progress</div>
  </div>
);

// Section 1 question cards for the plan panel's shuffling deck.
const PLAN_QUESTIONS = [
  { q: 'Q2', text: 'What do you want your loved ones and caregivers to know about you?', meter: '1/3 checkpoints', mw: '33%', btn: 'Continue' },
  { q: 'Q3', text: 'What memories make you proud? What gives you strength during difficult times?', meter: '0/3 checkpoints', mw: '4%', btn: 'Start' },
  { q: 'Q4', text: 'What has made you who you are today?', meter: '0/3 checkpoints', mw: '4%', btn: 'Start' },
];

// The stack advances by itself: the front card shuffles to the back and
// the next question slides forward (paused under reduced motion).
function QuestionDeck() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const t = setInterval(() => setActive((a) => (a + 1) % PLAN_QUESTIONS.length), 3800);
    return () => clearInterval(t);
  }, []);
  const POS = ['is-front', 'is-mid', 'is-back'];
  return (
    <div className="cl-qstack">
      {PLAN_QUESTIONS.map((card, i) => (
        <div className={`cl-wcard cl-wcard--q ${POS[(i - active + 3) % 3]}`} key={card.q}>
          <div className="cl-wcard__sect">
            <strong>Section 1: Life Story Work</strong>
            <span>1/3 completed</span>
          </div>
          <span className="cl-wcard__chip">{card.q}</span>
          <p className="cl-wcard__question">{card.text}</p>
          <div className="cl-wcard__meter" style={{ '--mw': card.mw }}>
            <i />
            <em>{card.meter}</em>
          </div>
          <span className="cl-wcard__btn">{card.btn}</span>
        </div>
      ))}
    </div>
  );
}

// Real screenshot of the advocacy workbook's stage path.
const PATH_SHOT = 'https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_1000/v1791187810/Screenshot_2026-10-05_160900_wjhd24.png';

// Loops: path -> press on Stage 1 -> the stage modal -> back to the path.
function AdvocacyDemo() {
  const [screen, setScreen] = useState('path'); // 'path' | 'pressed' | 'modal'
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const timers = [];
    const loop = () => {
      setScreen('path');
      timers.push(setTimeout(() => setScreen('pressed'), 3000));
      timers.push(setTimeout(() => setScreen('modal'), 3450));
      timers.push(setTimeout(loop, 8200));
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div className={`cl-advdemo${screen === 'pressed' ? ' is-pressed' : ''}${screen === 'modal' ? ' is-modal' : ''}`}>
      <div className="cl-wcard cl-wcard--path">
        <div className="cl-wcard__sect">
          <strong>Advocacy Workbook</strong>
          <span>Stage 1 of 7</span>
        </div>
        <div className="cl-path-shot">
          <img src={PATH_SHOT} alt="" loading="lazy" />
          <span className="cl-path-shot__tap" />
        </div>
      </div>
      <div className="cl-wcard cl-stagem">
        <div className="cl-stagem__head">
          <strong>Stage 1 · Permission</strong>
          <span className="cl-stagem__x">✕</span>
        </div>
        <div className="cl-stagem__tile">
          <span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b432a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.5-1.4 3-3.2 3-5.2A4.8 4.8 0 0 0 17.2 4c-1.6 0-3 .8-4.2 2.2C11.8 4.8 10.4 4 8.8 4A4.8 4.8 0 0 0 4 8.8c0 2 1.5 3.8 3 5.2l5 4.8 5-4.8z" /></svg>
          </span>
        </div>
        <em className="cl-stagem__of">Stage 1 of 7</em>
        <h5 className="cl-stagem__name">Permission</h5>
        <p className="cl-stagem__quote">"You're here. That's enough for now."</p>
        <em className="cl-stagem__gain">What your family gains</em>
        <p className="cl-stagem__desc">Emotional permission to face reality alongside hope.</p>
        <div className="cl-stagem__dots"><i className="is-a" /><i /></div>
        <div className="cl-stagem__chips"><span>3 exercises</span><span>0/3 completed</span></div>
        <span className="cl-wcard__btn">Start this stage →</span>
        <span className="cl-stagem__later">Maybe later</span>
      </div>
    </div>
  );
}

// Intro statement helpers (Sora-style): words that brighten on scroll,
// with small inline video chips embedded mid-sentence.
const wds = (t) => t.split(' ').map((w, i) => (
  <span className="cl-wds__w" key={`${w}-${i}`}>{w}{' '}</span>
));
const chipClip = (u) => u.replace('q_auto:best,w_1920', 'q_auto,w_480');

function WordChip({ clip }) {
  return (
    <span className="cl-wds__chip" aria-hidden="true">
      <video src={chipClip(clip)} poster={heroPoster(chipClip(clip))} muted loop autoPlay playsInline />
    </span>
  );
}

// Rotating questionnaire prompts typed into the hero's glass box.
const HERO_PROMPTS = [
  'Who will speak for you?',
  'What matters most to you?',
  'How do you really feel about death and dying?',
];

function TypedPrompt() {
  const [text, setText] = useState('');
  const [qi, setQi] = useState(0);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(HERO_PROMPTS[0]);
      return undefined;
    }
    let phrase = 0;
    let pos = 0;
    let deleting = false;
    let t;
    const tick = () => {
      const full = HERO_PROMPTS[phrase];
      pos += deleting ? -1 : 1;
      setText(full.slice(0, pos));
      let delay = deleting ? 24 : 52;
      if (!deleting && pos === full.length) { deleting = true; delay = 2200; }
      if (deleting && pos === 0) {
        deleting = false;
        phrase = (phrase + 1) % HERO_PROMPTS.length;
        setQi(phrase);
        delay = 500;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <span className="cl-ask__q">{`Q${qi + 1}`}</span>
      <span className="cl-ask__text">{text}<i className="cl-ask__caret" /></span>
    </>
  );
}

export default function CommunityLanding() {
  const [playVideo, setPlayVideo] = useState(false);

  // GSAP scroll choreography. Everything lives in one context (reverted on
  // unmount) and only runs when the visitor allows motion - under
  // prefers-reduced-motion the page is simply fully visible.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Fade-up reveals
        gsap.set('[data-reveal]', { opacity: 0, y: 26 });
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 85%',
          once: true,
          onEnter: (els) => gsap.to(els, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          }),
        });

        // Feature rows: copy slides in from its side, visual settles in
        gsap.utils.toArray('.cl-feature').forEach((row) => {
          const flip = row.classList.contains('cl-feature--flip');
          const copy = row.querySelector('.cl-feature__copy');
          const visual = row.querySelector('.cl-feature__visual');
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: 'top 75%', once: true },
          });
          tl.fromTo(copy, { opacity: 0, x: flip ? 48 : -48 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' })
            .fromTo(visual, { opacity: 0, scale: 0.94, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.15);
        });

        // Hero (Lassie-style): the full-bleed film shrinks into a rounded
        // inset card as the visitor scrolls away from the top.
        const heroEl = document.querySelector('.cl-hero--film');
        if (heroEl) {
          gsap.to(heroEl, {
            scale: 0.955,
            borderRadius: 40,
            transformOrigin: '50% 0%',
            ease: 'none',
            scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom 55%', scrub: 0.4 },
          });
        }

        // Lassie deck: panels stack via CSS sticky; GSAP scrubs the side copy
        // brightening in, the card rows appearing one by one, and the previous
        // panel shrinking behind the incoming one. Trigger positions are
        // computed from the deck (never sticky) plus each panel's slot offset:
        // measuring the sticky panels themselves goes wrong the moment a
        // refresh happens while one is stuck at the viewport top.
        if (window.matchMedia('(min-width: 861px)').matches) {
          const deck = document.querySelector('.cl-deck');
          const panels = gsap.utils.toArray('.cl-panel');
          const slotTop = (i) => () => {
            const deckTop = deck.getBoundingClientRect().top + window.scrollY;
            return deckTop + i * window.innerHeight;
          };
          panels.forEach((panel, i) => {
            const slot = slotTop(i);
            const vh = () => window.innerHeight;
            const copy = panel.querySelector('.cl-panel__copy');
            let rowSel = '.cl-wcard > *';
            if (panel.querySelector('.cl-qstack')) rowSel = '.cl-qstack .cl-wcard:first-child > *';
            if (panel.querySelector('.cl-advdemo')) rowSel = '.cl-advdemo .cl-wcard--path > *';
            const rows = panel.querySelectorAll(rowSel);
            gsap.fromTo(copy, { opacity: 0.18 }, {
              opacity: 1,
              ease: 'none',
              scrollTrigger: { start: () => slot() - vh() * 0.75, end: () => slot() - vh() * 0.2, scrub: true },
            });
            gsap.fromTo(rows, { autoAlpha: 0, y: 18 }, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.3,
              ease: 'power1.out',
              scrollTrigger: { start: () => slot() - vh() * 0.7, end: () => slot() - vh() * 0.05, scrub: true },
            });
            if (i > 0) {
              const prevMedia = panels[i - 1].querySelector('.cl-panel__media');
              const prevCopy = panels[i - 1].querySelector('.cl-panel__copy');
              gsap.to(prevMedia, {
                scale: 0.93,
                ease: 'none',
                scrollTrigger: { start: () => slot() - vh(), end: () => slot(), scrub: true },
              });
              gsap.to(prevCopy, {
                opacity: 0.08,
                ease: 'none',
                scrollTrigger: { start: () => slot() - vh() * 0.9, end: () => slot() - vh() * 0.4, scrub: true },
              });
            }
          });
        }

        // Intro statement: words brighten in sequence as you scroll; the
        // rail's vertical line fills alongside. (Dim state set here, not in
        // CSS, so reduced-motion visitors see full-opacity text.)
        const introWords = gsap.utils.toArray('.cl-wds .cl-wds__w');
        if (introWords.length) {
          gsap.set(introWords, { opacity: 0.24 });
          gsap.to(introWords, {
            opacity: 1,
            stagger: 0.06,
            ease: 'none',
            scrollTrigger: { trigger: '.cl-wds', start: 'top 80%', end: 'bottom 45%', scrub: true },
          });
          gsap.fromTo('.cl-intro__line i', { scaleY: 0 }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.cl-intro__grid', start: 'top 75%', end: 'bottom 55%', scrub: true },
          });
        }

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
    });
    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <div className="cl">
      {/* ── Hero ── */}
      <section className={`cl-hero${HERO_VIDEOS.length ? ' cl-hero--film' : ''}`}>
        {HERO_VIDEOS.length > 0 && (
          <div className="cl-hero__media" aria-hidden="true">
            <HeroMontage clips={HERO_VIDEOS} />
            <div className="cl-hero__scrim" />
          </div>
        )}
        <div className={HERO_VIDEOS.length ? 'cl-hero__inner' : 'cl-wrap cl-hero__inner'}>
          <span className="cl-eyebrow" data-reveal>Free Community</span>
          <h1 className="cl-h1" data-reveal style={{ '--rd': '80ms' }}>
            a whole<br />family matter.
          </h1>
          <p className="cl-sub" data-reveal style={{ '--rd': '160ms' }}>
            Interdependent care planning for medical migrants and their
            collectivist families across the globe.
          </p>
          {HERO_VIDEOS.length > 0 && (
          <div className="cl-ask" data-reveal style={{ '--rd': '220ms' }} aria-hidden="true">
            <TypedPrompt />
          </div>
          )}
          <div className="cl-hero__ctas" data-reveal style={{ '--rd': '300ms' }}>
            <a className="cl-cta cl-cta--pill" href="https://awholefamilymatter.com/register">
              Explore Free Community
            </a>
            <a className="cl-cta cl-cta--ghost" href="#platform">Learn more</a>
          </div>
          {HERO_VIDEOS.length === 0 && (
          <div className="cl-hero__panel" aria-hidden="true">
            <div className="cl-hero__float" style={{ '--fd': '0s' }}><CardTeam /></div>
            <div className="cl-hero__float" style={{ '--fd': '1.2s' }}><CardFund /></div>
            <div className="cl-hero__float" style={{ '--fd': '2.4s' }}><CardPlan /></div>
          </div>
          )}
        </div>
      </section>

      {/* ── Trust strip: moving marquee (fallback hero only) ── */}
      {HERO_VIDEOS.length === 0 && (
      <section className="cl-strip" aria-label="The twelve countries">
        <p className="cl-strip__label">Built with families from the world's biggest exporters of healthcare workers</p>
        <div className="cl-marquee">
          <div className="cl-marquee__track">
            {/* Four copies: the track must always cover viewport + one copy,
                or wide screens see a blank gap at the end of each loop. */}
            {[0, 1, 2, 3].map((dup) => (
              <div className="cl-marquee__group" key={dup} aria-hidden={dup !== 0}>
                {COUNTRIES.map((c) => <span key={c.name}>{c.name}</span>)}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── Intro (Sora layout): left rail + word-reveal statement + film ── */}
      <section className="cl-intro">
        <div className="cl-wrap">
          <div className="cl-intro__grid">
            <div className="cl-intro__rail">
              <span className="cl-eyebrow" data-reveal>What we do</span>
              <span className="cl-intro__line" aria-hidden="true"><i /></span>
              <p className="cl-intro__note" data-reveal>
                Designed with AI for the world's worst places to die. We break the
                silence around death and dying — especially when we disagree.
              </p>
              <a className="cl-cta cl-intro__btn" href="https://awholefamilymatter.com/register">
                Explore Free Community
              </a>
            </div>
            <p className="cl-wds">
              {wds('A family that plans their future together')}
              <WordChip clip={HERO_VIDEOS[0]} />
              {wds('funds their future care together')}
              <WordChip clip={HERO_VIDEOS[2]} />
              {wds('— so no one dies in pain, in debt, and in silence.')}
            </p>
          </div>
          <div className="cl-video" data-reveal>
            {playVideo ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title="This is A Whole Family Matter"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="cl-video__poster"
                onClick={() => setPlayVideo(true)}
                aria-label="Play: This is A Whole Family Matter"
              >
                <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="" loading="lazy" />
                <span className="cl-video__play">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

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
          <span className="cl-eyebrow">The Challenge — Across 12 countries</span>
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

      {/* ── Platform: Lassie-style stacked story deck ── */}
      <section id="platform" className="cl-lassie">
        <div className="cl-lassie__head">
          <img className="cl-lassie__mark" src={logo} alt="" data-reveal />
          <span className="cl-eyebrow" data-reveal style={{ '--rd': '60ms' }}>Help is on the way — Interdependent Care Planning</span>
          <h2 className="cl-h2 cl-lassie__title" data-reveal style={{ '--rd': '120ms' }}>
            One whole family<br />support system
          </h2>
        </div>
        <div className="cl-deck">
          {STORY.map((f, i) => (
            <div className={`cl-panel cl-panel--${i % 2 ? 'right' : 'left'}`} key={f.key}>
              <div className="cl-panel__copy">
                <h3>{f.label}</h3>
                <p>{f.body}</p>
              </div>
              <div className={`cl-panel__media cl-panel__media--${f.key}`} aria-hidden="true">
                {f.key === 'plan' ? (
                  /* Stacked mocks of the real questionnaire question cards
                     (back-to-front in DOM; the front card is last) */
                  <QuestionDeck />
                ) : f.key === 'advocate' ? (
                  <AdvocacyDemo />
                ) : (
                  <div className="cl-wcard">
                    <div className="cl-wcard__head">
                      <img src={logo} alt="" />
                      <span>{f.card.head}</span>
                    </div>
                    {f.card.rows.map(([ini, txt, status], ri) => (
                      <div className="cl-wcard__row" key={txt}>
                        <span className={`cl-wcard__ico cl-wcard__ico--${ri % 3}`}>{ini}</span>
                        <span className="cl-wcard__txt">{txt}</span>
                        <em>{status}</em>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The world's first: frosted card over the golden-sky landscape ── */}
      <section className="cl-voices">
        <div className="cl-voices__card" data-reveal>
          <span className="cl-voices__badge">The world's first</span>
          <h2 className="cl-voices__h">Based on lived experience — your lived experience.</h2>
          <p>
            We're using artificial intelligence to support collective decision-making
            with big research data on systemic end-of-life suffering in the Global
            South — where dying with unaddressed severe pain is estimated to spike
            250% by 2060.
          </p>
          <p>
            You help deliver world-class end-of-life care in countries that rank
            highest for quality of death and dying while your family back home gets
            the worst — so everyone in your care team relates, connects, and
            collectively breaks the silence to get to work on what matters most:
            your future together.
          </p>
          <a className="cl-cta cl-voices__btn" href="https://awholefamilymatter.com/register">
            Explore Free Community
          </a>
        </div>
      </section>

    </div>
  );
}
