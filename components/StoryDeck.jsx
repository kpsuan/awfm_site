'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StoryDeck.css';

gsap.registerPlugin(ScrollTrigger);
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// The product walkthrough: three full-viewport panels (plan, fund, advocate)
// that stack over each other on scroll, each holding a live mock of the app.

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

export default function StoryDeck() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Lassie deck: panels stack via CSS sticky; GSAP scrubs the side copy
        // brightening in, the card rows appearing one by one, and the previous
        // panel shrinking behind the incoming one. Trigger positions are
        // computed from the deck (never sticky) plus each panel's slot offset:
        // measuring the sticky panels themselves goes wrong the moment a
        // refresh happens while one is stuck at the viewport top.
        if (window.matchMedia('(min-width: 861px)').matches) {
          const deck = root.current.querySelector('.cl-deck');
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

      });
    }, root);
    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
        <section id="platform" className="cl-lassie" ref={root}>
          <div className="cl-lassie__head">
            <img className="cl-lassie__mark" src="/logo.png" alt="" />
            <span className="eyebrow">Help is on the way — Interdependent Care Planning</span>
            <h2 className="h2 cl-lassie__title">
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
                        <img src="/logo.png" alt="" />
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
  );
}
