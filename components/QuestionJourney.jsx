'use client';

import { useEffect, useRef, useState } from 'react';
import './QuestionJourney.css';

// One question, as the app runs it: three multiple-choice checkpoints
// (single-select, then up to two, then up to two), followed by a recorded
// explanation and team affirmation. Copy and options are Q8's seeded content.
// The steps on the left set which screen the mock shows (IntersectionObserver;
// nothing is scroll-scrubbed).
const STEPS = [
  {
    n: 1,
    label: 'Checkpoint 1',
    title: 'Your position',
    ask: 'How do you really feel about death and dying?',
    body: 'Every question starts with where you stand today. Choose the one option that fits — each opens up to explain why it matters, what the research shows, and what it means for your decisions.',
  },
  {
    n: 2,
    label: 'Checkpoint 2',
    title: 'Your challenges',
    ask: 'What concerns, issues, and challenges might you be facing?',
    body: 'The same follow-up comes with every question, so the hard parts get named. Choose up to two.',
  },
  {
    n: 3,
    label: 'Checkpoint 3',
    title: 'Your mind-changer',
    ask: 'What would make you change your mind?',
    body: 'The question that keeps the conversation honest. Choose what could shift your thinking.',
  },
  {
    n: 4,
    label: 'Then',
    title: 'What your choices reveal',
    ask: null,
    body: 'Your three answers are matched to a pattern grounded in published research — naming what is really going on, so you can reflect on it.',
  },
  {
    n: 5,
    label: 'Then, together',
    title: 'Explain it, and affirm each other',
    ask: null,
    body: 'Record the reasoning behind your choices by video, audio, or text. Your care team sees your answers — and affirms them.',
  },
];

// Q8, Pattern 9 — the seeded pattern for exactly the picks shown above.
const PPR = {
  picks: [
    'I would rather not think about my own death',
    'My culture makes it hard to talk honestly about death',
    'An honest conversation with someone I trust',
  ],
  // Pattern 9 text, split into its research and closing sentences.
  research: 'Fan and colleagues studied 161 adults in Singapore and found that even those who completed advance care planning still showed significant death avoidance because cultural taboos persisted beneath preparation.',
  close: 'Your combination names the double seal: internal avoidance and cultural prohibition reinforce each other until someone breaks both at once.',
};

// Real footage for the video-recording demo (licensed hero clip, cropped).
const REC_CLIP = 'https://res.cloudinary.com/de3kbbv2o/video/upload/so_1,eo_9/c_scale,w_480/q_auto/v1791964556/friendly-woman-waving-and-talking-during-a-video-c-2026-10-03-13-40-08-utc_e9iygh';

const REASON = 'Papa always said we don’t talk about these things. I think that’s exactly why we should — together, before we have to.';
const MODES = ['Video', 'Audio', 'Text'];

// Recording demo: cycles video → audio → text while its step is active.
function Recorder({ on }) {
  const [mode, setMode] = useState(0);
  const [secs, setSecs] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!on) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(REASON);
      return undefined;
    }
    const t = setInterval(() => setMode((m) => (m + 1) % MODES.length), 4200);
    return () => clearInterval(t);
  }, [on]);

  useEffect(() => {
    if (!on) return undefined;
    setSecs(0);
    setTyped('');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTyped(REASON); return undefined; }
    if (MODES[mode] === 'Text') {
      let i = 0;
      const t = setInterval(() => { i += 2; setTyped(REASON.slice(0, i)); if (i >= REASON.length) clearInterval(t); }, 45);
      return () => clearInterval(t);
    }
    const t = setInterval(() => setSecs((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [mode, on]);

  const clock = `0:${String(secs).padStart(2, '0')}`;
  return (
    <div className="qj-recorder">
      <div className="qj-tabs">
        {MODES.map((m, i) => <span key={m} className={i === mode ? 'is-on' : ''}>{m}</span>)}
      </div>
      <div className="qj-screen">
        {MODES[mode] === 'Video' && (
          <div className="qj-video">
            <video
              src={`${REC_CLIP}.mp4`}
              poster={`${REC_CLIP.replace('so_1,eo_9', 'so_8')}.jpg`}
              muted
              loop
              autoPlay
              playsInline
            />
            <span className="qj-rec"><i />REC {clock}</span>
          </div>
        )}
        {MODES[mode] === 'Audio' && (
          <div className="qj-audio">
            <div className="qj-wave">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * 0.11}s` }} />)}</div>
            <span className="qj-rec"><i />{clock}</span>
          </div>
        )}
        {MODES[mode] === 'Text' && (
          <div className="qj-text">
            <span className="qj-text__label">Reason for my Answers</span>
            <p>{typed}<b className="qj-caret" /></p>
          </div>
        )}
      </div>
      <span className="qj-who">Who can see this? <strong>My Teams</strong></span>
    </div>
  );
}

const CHECKPOINT_TITLES = ['Your position', 'Your challenges', 'Your mind-changer'];

const PANES = {
  1: {
    helper: 'Select the option that best represents what matters most to you.',
    options: [
      ['Death frightens me in ways I find hard to explain', false],
      ['I have found peace with the fact that I will die', false],
      ['I would rather not think about my own death', true],
      ['My faith gives me a way to understand death', false],
    ],
  },
  2: {
    prompt: 'What concerns, issues, and challenges might you be facing?',
    helper: 'Maximum selections reached',
    options: [
      ['My culture makes it hard to talk honestly about death', true],
      ['Caring for the dying has numbed my own feelings', false],
      ['I hide my fears about death to protect my family', true],
      ['My faith is not answering the questions I have now', false],
    ],
  },
  3: {
    prompt: 'What would make you change your mind?',
    helper: '1 selection remaining',
    options: [
      ['Witnessing a death that changed how I see dying', false],
      ['A spiritual experience that deepened my understanding', false],
      ['An honest conversation with someone I trust', true],
      ['Knowing that my care team is truly prepared', false],
    ],
  },
};

function Options({ pane, multi }) {
  return (
    <>
      {pane.prompt && <p className="qj-pane__prompt">{pane.prompt}</p>}
      <p className="qj-pane__helper">{pane.helper}</p>
      {pane.options.map(([o, picked]) => (
        <div key={o} className={`qj-opt${multi ? ' qj-opt--multi' : ''}${picked ? ' is-picked' : ''}`}>
          <i />{o}
        </div>
      ))}
    </>
  );
}

function Mock({ active }) {
  // Panes share one grid cell, so the stage would always be as tall as the
  // longest one. Size it to the visible pane instead (and follow its resizes).
  const stageRef = useRef(null);
  const [stageH, setStageH] = useState();
  useEffect(() => {
    const pane = stageRef.current?.querySelector('.qj-pane.is-on');
    if (!pane) return undefined;
    const measure = () => setStageH(pane.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(pane);
    return () => ro.disconnect();
  }, [active]);

  return (
    <div className="qj-mock" aria-hidden="true">
      <div className="qj-mock__top">
        <span className="qj-mock__chip">Q8</span>
        <span className="qj-mock__sect">What Matters Most</span>
      </div>
      <div className={`qj-mock__intro${active > 3 ? ' is-hidden' : ''}`}>
      <p className="qj-mock__q">How do you really feel about death and dying?</p>
      <div className="qj-mock__steps">
        {CHECKPOINT_TITLES.map((t, i) => (
          <span key={t} className={i + 1 <= active ? 'is-done' : ''}>{t}</span>
        ))}
      </div>
      </div>

      <div className="qj-mock__stage" ref={stageRef} style={stageH ? { height: stageH } : undefined}>
        <div className={`qj-pane${active === 1 ? ' is-on' : ''}`}><Options pane={PANES[1]} /></div>
        <div className={`qj-pane${active === 2 ? ' is-on' : ''}`}><Options pane={PANES[2]} multi /></div>
        <div className={`qj-pane${active === 3 ? ' is-on' : ''}`}><Options pane={PANES[3]} multi /></div>

        {/* Summary: the matched Personal Pattern Recognition */}
        <div className={`qj-pane qj-ppr-pane${active === 4 ? ' is-on' : ''}`}>
          <p className="qj-ppr__k">What Your Choices Reveal About You</p>
          <p className="qj-ppr__title">A compounded avoidance pattern</p>
          <ol className="qj-chain">
            {PPR.picks.map((pk, i) => (
              <li key={pk} style={{ '--i': i }}><b>{i + 1}</b><span>{pk}</span></li>
            ))}
          </ol>
          <div className="qj-research" style={{ '--i': 3 }}>
            <span className="qj-research__tag">Research</span>
            <p>{PPR.research}</p>
          </div>
          <p className="qj-ppr__close" style={{ '--i': 4 }}>{PPR.close}</p>
        </div>

        {/* Then: record an explanation + team affirmation */}
        <div className={`qj-pane${active === 5 ? ' is-on' : ''}`}>
          <p className="qj-pane__prompt">Record your Explanation</p>
          <Recorder on={active === 5} />
          <div className="qj-affirm">
            <span className="qj-affirm__title">Team affirmations</span>
            <div className="qj-affirm__row">
              <div className="qj-affirm__avas">
                <b className="qj-ava qj-ava--a">A</b>
                <b className="qj-ava qj-ava--k">K</b>
                <b className="qj-ava qj-ava--off">M</b>
                <b className="qj-ava qj-ava--off">T</b>
              </div>
              <span className="qj-affirm__btn">Affirm</span>
            </div>
            <span className="qj-affirm__note">Colored profiles have affirmed your answers.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuestionJourney() {
  const [active, setActive] = useState(1);
  const stepRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.step)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="qj">
      <ol className="qj-steps">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            ref={(el) => { stepRefs.current[i] = el; }}
            data-step={s.n}
            className={`qj-step${active === s.n ? ' is-active' : ''}`}
          >
            <span className="qj-step__n">{s.label}</span>
            <h3>{s.title}</h3>
            {s.ask && <p className="qj-step__ask">“{s.ask}”</p>}
            <p className="qj-step__body">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="qj-side">
        <Mock active={active} />
      </div>
    </div>
  );
}
