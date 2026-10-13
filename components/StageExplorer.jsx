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
        <span className="se-rail__track" aria-hidden="true">
          <i style={{ width: `${(active / (STAGES.length - 1)) * 100}%` }} />
        </span>
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`se-stop${i < active ? ' is-done' : ''}${i === active ? ' is-active' : ''}`}
            style={{ '--sc': s.color }}
            onClick={() => pick(i)}
          >
            <b>{s.number}</b>
            <span>{s.name}</span>
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
