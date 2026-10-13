'use client';

import { useEffect, useRef, useState } from 'react';
import STAGES from './workbookStages.json';
import './StageExplorer.css';

// The seven-stage advocacy journey: a colour-coded stage rail over one
// always-visible stage panel (photo, promise, and its three exercises).
// Auto-advances while in view until the visitor picks a stage. Content is
// the app's config/advocacy.js, exported to workbookStages.json.
const LEVEL = { EASY: 'Easy', MODERATE: 'Moderate', DIFFICULT: 'Difficult' };
const DWELL = 6000;

// Winding path geometry (viewBox 1000 x 230): stops alternate high / low.
const PTS = STAGES.map((_, i) => ({ x: 70 + i * 143, y: i % 2 ? 150 : 72 }));
const D = PTS.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const a = PTS[i - 1];
  return `${d} C ${a.x + 70} ${a.y}, ${p.x - 70} ${p.y}, ${p.x} ${p.y}`;
}, '');

export default function StageExplorer() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const root = useRef(null);

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let t;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(t);
      if (e.isIntersecting) t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), DWELL);
    }, { threshold: 0.4 });
    io.observe(root.current);
    return () => { io.disconnect(); clearInterval(t); };
  }, [auto]);

  const st = STAGES[active];
  const pick = (i) => { setAuto(false); setActive(i); };

  return (
    <div className="se" ref={root} style={{ '--c': st.color }}>
      <div className="se-rail" role="tablist" aria-label="The seven stages">
        <svg viewBox="0 0 1000 230" className="se-path" aria-hidden="true">
          <defs>
            <linearGradient id="seFill" x1="0" x2="1">
              {STAGES.map((x, i) => <stop key={x.key} offset={i / (STAGES.length - 1)} stopColor={x.color} />)}
            </linearGradient>
          </defs>
          <path d={D} className="se-path__track" />
          <path d={D} className="se-path__fill" pathLength="100" style={{ strokeDashoffset: 100 - (active / (STAGES.length - 1)) * 100 }} />
        </svg>
        {STAGES.map((x, i) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`se-stop${i < active ? ' is-done' : ''}${i === active ? ' is-active' : ''}${i % 2 ? ' is-low' : ''}`}
            style={{ '--sc': x.color, left: `${(PTS[i].x / 1000) * 100}%`, top: `${(PTS[i].y / 230) * 100}%` }}
            onClick={() => pick(i)}
          >
            <b>{x.number}</b>
            <span>{x.name}</span>
          </button>
        ))}
      </div>

      <div className="se-panel" key={st.key} role="tabpanel">
        <div className="se-photo" style={{ backgroundImage: `url(${st.image})` }}>
          <div className="se-photo__copy">
            <span className="se-of">Stage {st.number} of 7</span>
            <h3>{st.name}</h3>
            <p>“{st.tagline}”</p>
          </div>
          {auto && <i className="se-timer" style={{ animationDuration: `${DWELL}ms` }} />}
        </div>
        <div className="se-body">
          <span className="se-k">What your family gains</span>
          <p className="se-gain">{st.gain}</p>
          <ol className="se-ex">
            {st.exercises.map((e, i) => (
              <li key={e.id} style={{ '--i': i }}>
                <span className="se-ex__id">{e.id}</span>
                <div>
                  <strong>{e.title}</strong>
                  <p>{e.blurb}</p>
                  <span className="se-ex__meta">
                    <em className={`se-lvl se-lvl--${e.complexity.toLowerCase()}`}>{LEVEL[e.complexity]}</em>
                    {e.duration}
                    {e.collaborative && <em className="se-team">With your team</em>}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
