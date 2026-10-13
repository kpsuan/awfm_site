'use client';

import { useState } from 'react';
import STAGE_DATA from './workbookStages.json';
import './StagePath.css';

// The seven-stage advocacy journey as a winding path. HomeMotion draws the
// path on scroll; clicking a stage opens the app's stage card beside its
// three workbook exercises. Stage and exercise content is exported from the
// app's config/advocacy.js (workbookStages.json), so it stays verbatim.
const PTS = STAGE_DATA.map((_, i) => ({ x: 70 + i * 143, y: i % 2 ? 150 : 72 }));
const D = PTS.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const a = PTS[i - 1];
  return `${d} C ${a.x + 70} ${a.y}, ${p.x - 70} ${p.y}, ${p.x} ${p.y}`;
}, '');

const ICONS = {
  'hand-heart': (
    <>
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 15 6 6" />
      <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
    </>
  ),
  compass: (<><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  'message-circle': <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  'clipboard-check': (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" />
    </>
  ),
  megaphone: (<><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>),
  sprout: (
    <>
      <path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </>
  ),
};

const LEVEL = { EASY: 'Easy', MODERATE: 'Moderate', DIFFICULT: 'Difficult' };

function StageCard({ stage }) {
  return (
    <div className="ws-card">
      <div className="ws-card__head">
        <strong>Stage {stage.number} · {stage.name}</strong>
        <span aria-hidden="true">✕</span>
      </div>
      <div className="ws-card__tile">
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[stage.icon]}</svg>
        </span>
      </div>
      <span className="ws-card__of">Stage {stage.number} of 7</span>
      <h4 className="ws-card__name">{stage.name}</h4>
      <p className="ws-card__tag">“{stage.tagline}”</p>
      <span className="ws-card__gain">What your family gains</span>
      <p className="ws-card__desc">{stage.gain}</p>
      <div className="ws-card__chips">
        <span>{stage.exercises.length} exercises</span><span>0/{stage.exercises.length} completed</span>
      </div>
      <span className="ws-card__cta">Start this stage</span>
      <span className="ws-card__later">Maybe later</span>
    </div>
  );
}

export default function StagePath() {
  const [active, setActive] = useState(null);
  const stage = active === null ? null : STAGE_DATA[active];
  const toggle = (i) => setActive(active === i ? null : i);

  return (
    <figure className="spath" aria-label="The seven stages of a care team's advocacy journey.">
      <svg viewBox="0 0 1000 230">
        <path className="spath__track" d={D} />
        <path className="spath__line" d={D} />
        {PTS.map((p, i) => (
          <g
            key={STAGE_DATA[i].key}
            className={`spath__stage is-lit${active === i ? ' is-selected' : ''}`}
            data-stage={i}
            role="button"
            tabIndex={0}
            aria-pressed={active === i}
            aria-label={`Stage ${i + 1}: ${STAGE_DATA[i].name}`}
            onClick={() => toggle(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); } }}
          >
            <circle className="spath__ring" cx={p.x} cy={p.y} r="33" />
            <circle cx={p.x} cy={p.y} r="25" />
            <text x={p.x} y={p.y + 7} textAnchor="middle" className="spath__n">{i + 1}</text>
            <text x={p.x} y={i % 2 ? p.y + 52 : p.y - 38} textAnchor="middle" className="spath__label">{STAGE_DATA[i].name}</text>
          </g>
        ))}
      </svg>
      <ol className="spath__list">
        {STAGE_DATA.map((s, i) => (
          <li key={s.key}>
            <button type="button" aria-pressed={active === i} className={active === i ? 'is-selected' : ''} onClick={() => toggle(i)}>
              <b>{i + 1}</b>{s.name}
            </button>
          </li>
        ))}
      </ol>
      <figcaption className="spath__tip">Tap a stage to open it</figcaption>

      <div className={`ws-panel${stage ? ' is-open' : ''}`} aria-hidden={!stage}>
        {stage && (
          <div className="ws" key={stage.key}>
            <StageCard stage={stage} />
            <div className="ws-ex">
              <span className="ws-ex__title">Workbook exercises</span>
              {stage.exercises.map((e) => (
                <article className="ws-ex__item" key={e.id}>
                  <div className="ws-ex__top">
                    <span className="ws-ex__id">{e.id}</span>
                    <strong>{e.title}</strong>
                  </div>
                  <p>{e.blurb}</p>
                  <div className="ws-ex__meta">
                    <span className={`ws-lvl ws-lvl--${e.complexity.toLowerCase()}`}>{LEVEL[e.complexity] || e.complexity}</span>
                    <span>{e.duration}</span>
                    {e.collaborative && <span className="ws-together">With your team</span>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
