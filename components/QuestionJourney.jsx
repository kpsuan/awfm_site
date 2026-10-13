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
    label: 'Then, together',
    title: 'Explain it, and affirm each other',
    ask: null,
    body: 'Record the reasoning behind your choices by video, audio, or text. Your care team sees your answers — and affirms them.',
  },
];

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
  return (
    <div className="qj-mock" aria-hidden="true">
      <div className="qj-mock__top">
        <span className="qj-mock__chip">Q8</span>
        <span className="qj-mock__sect">What Matters Most</span>
      </div>
      <p className="qj-mock__q">How do you really feel about death and dying?</p>
      <div className="qj-mock__steps">
        {CHECKPOINT_TITLES.map((t, i) => (
          <span key={t} className={i + 1 <= active ? 'is-done' : ''}>{t}</span>
        ))}
      </div>

      <div className="qj-mock__stage">
        <div className={`qj-pane${active === 1 ? ' is-on' : ''}`}><Options pane={PANES[1]} /></div>
        <div className={`qj-pane${active === 2 ? ' is-on' : ''}`}><Options pane={PANES[2]} multi /></div>
        <div className={`qj-pane${active === 3 ? ' is-on' : ''}`}><Options pane={PANES[3]} multi /></div>

        {/* After the checkpoints: explanation + team affirmation */}
        <div className={`qj-pane${active === 4 ? ' is-on' : ''}`}>
          <p className="qj-pane__prompt">Record your explanation</p>
          <div className="qj-rec">
            <span>Record video</span><span>Record audio</span><span>Enter text</span>
          </div>
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
