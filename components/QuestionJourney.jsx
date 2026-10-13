'use client';

import { useEffect, useRef, useState } from 'react';
import './QuestionJourney.css';

// One question, three checkpoints. The steps on the left set which
// checkpoint the app mock on the right shows; switching is driven by which
// step is being read (IntersectionObserver), so nothing is scroll-scrubbed.
const STEPS = [
  {
    n: 1,
    title: 'Your position',
    ask: 'Where do you stand right now?',
    body: 'Each family member chooses from guided options, then explains why — by video, audio, or text.',
  },
  {
    n: 2,
    title: 'Your challenges',
    ask: 'What concerns, issues, or challenges might you be facing?',
    body: 'The same follow-up comes after every answer, so the hard parts get said out loud — together.',
  },
  {
    n: 3,
    title: 'The turning point',
    ask: 'What would make you change your mind?',
    body: 'The question that keeps the conversation honest. The care team reviews and affirms what was shared.',
  },
];

const OPTIONS = ['I’d rather not talk about it yet', 'I’m ready to talk about it', 'It depends on who asks me'];

function Mock({ active }) {
  return (
    <div className="qj-mock" aria-hidden="true">
      <div className="qj-mock__top">
        <span className="qj-mock__chip">Q4</span>
        <span className="qj-mock__sect">Section 1 · Life story work</span>
      </div>
      <p className="qj-mock__q">How do you really feel about death and dying?</p>
      <div className="qj-mock__steps">
        {STEPS.map((s) => (
          <span key={s.n} className={s.n <= active ? 'is-done' : ''}>{s.title}</span>
        ))}
      </div>

      <div className="qj-mock__stage">
        {/* Checkpoint 1: choose + explain */}
        <div className={`qj-pane${active === 1 ? ' is-on' : ''}`}>
          {OPTIONS.map((o, i) => (
            <div key={o} className={`qj-opt${i === 1 ? ' is-picked' : ''}`}>
              <i />{o}
            </div>
          ))}
          <div className="qj-modes">
            <span className="is-on">Video</span><span>Audio</span><span>Text</span>
          </div>
        </div>

        {/* Checkpoint 2: family replies */}
        <div className={`qj-pane${active === 2 ? ' is-on' : ''}`}>
          <div className="qj-reply">
            <b className="qj-ava qj-ava--a">A</b>
            <div><strong>Ate</strong><p>Papa won’t want to hear it from me. He listens to Tito.</p></div>
          </div>
          <div className="qj-reply">
            <b className="qj-ava qj-ava--k">K</b>
            <div><strong>Kuya</strong><p className="qj-audio"><i />Voice note · 1:12</p></div>
          </div>
          <div className="qj-reply">
            <b className="qj-ava qj-ava--m">M</b>
            <div><strong>Mila</strong><p className="qj-video">Video · 0:48</p></div>
          </div>
        </div>

        {/* Checkpoint 3: turning point + affirmation */}
        <div className={`qj-pane${active === 3 ? ' is-on' : ''}`}>
          <div className="qj-reply">
            <b className="qj-ava qj-ava--t">T</b>
            <div><strong>Tito</strong><p>If the doctor explained it to all of us at once, I’d feel differently.</p></div>
          </div>
          <div className="qj-affirm">
            <div className="qj-affirm__avas">
              <b className="qj-ava qj-ava--a">A</b><b className="qj-ava qj-ava--k">K</b><b className="qj-ava qj-ava--m">M</b><b className="qj-ava qj-ava--t">T</b>
            </div>
            <span><strong>3 of 4</strong> affirmed this answer</span>
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
            <span className="qj-step__n">Checkpoint {s.n}</span>
            <h3>{s.title}</h3>
            <p className="qj-step__ask">“{s.ask}”</p>
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
