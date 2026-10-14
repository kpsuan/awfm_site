'use client';

import { useEffect, useRef, useState } from 'react';
import STAGES from './workbookStages.json';
import './StageExplorer.css';

// The seven-stage advocacy journey: a colour-coded stage rail over one stage
// panel — a graphic (the seven keys on a ring that turns the active stage to
// the top) and that stage's promise and three exercises. Everything is
// rendered once and cross-faded, so moving between stages never remounts.
// Auto-advances while in view until the visitor picks a stage. Content is
// the app's config/advocacy.js, exported to workbookStages.json.
const LEVEL = { EASY: 'Easy', MODERATE: 'Moderate', DIFFICULT: 'Difficult' };
const DWELL = 6000;
const N = STAGES.length;

// Winding path geometry (viewBox 1000 x 230): stops alternate high / low.
const PTS = STAGES.map((_, i) => ({ x: 70 + i * 143, y: i % 2 ? 150 : 72 }));
const D = PTS.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const a = PTS[i - 1];
  return `${d} C ${a.x + 70} ${a.y}, ${p.x - 70} ${p.y}, ${p.x} ${p.y}`;
}, '');

// One line icon per key (24px grid, stroke-drawn).
const ICONS = {
  permission: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  clarity: <><circle cx="12" cy="12" r="8" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  connection: <><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></>,
  voice: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></>,
  readiness: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M8.5 13l2.5 2.5 4.5-5" /></>,
  advocacy: <path d="M4 10v4h3l7 4V6L7 10zM17.5 9a4 4 0 0 1 0 6M7 14l1 5h2.5l-1-4.5" />,
  resilience: <path d="M12 21v-8M12 13c0-4 3-7 7-7 0 4-3 7-7 7zM12 15c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z" />,
};
const iconFor = (st) => ICONS[st.key] || ICONS[Object.keys(ICONS)[st.number - 1]];

export default function StageExplorer() {
  // turn is unbounded, so the ring keeps turning forward (or takes the short way back).
  const [{ active, turn }, setPos] = useState({ active: 0, turn: 0 });
  const [auto, setAuto] = useState(true);
  const root = useRef(null);
  const stage = useRef(null);
  const [bodyH, setBodyH] = useState();

  const go = (to) => setPos((p) => {
    let d = (((to - p.active) % N) + N) % N;
    if (d > N / 2) d -= N;
    return { active: to, turn: p.turn + d };
  });

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let t;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(t);
      if (e.isIntersecting) t = setInterval(() => setPos((p) => ({ active: (p.active + 1) % N, turn: p.turn + 1 })), DWELL);
    }, { threshold: 0.4 });
    io.observe(root.current);
    return () => { io.disconnect(); clearInterval(t); };
  }, [auto]);

  // Panes share one grid cell; size the stack to the visible one.
  useEffect(() => {
    const pane = stage.current?.querySelector('.se-pane.is-on');
    if (!pane) return undefined;
    const measure = () => setBodyH(pane.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(pane);
    return () => ro.disconnect();
  }, [active]);

  const pick = (i) => { setAuto(false); go(i); };
  const st = STAGES[active];

  return (
    <div className="se" ref={root} style={{ '--c': st.color, '--rot': `${(-turn * 360) / N}deg` }}>
      <div className="se-rail" role="tablist" aria-label="The seven stages">
        <svg viewBox="0 0 1000 230" className="se-path" aria-hidden="true">
          <defs>
            <linearGradient id="seFill" x1="0" x2="1">
              {STAGES.map((x, i) => <stop key={x.key} offset={i / (N - 1)} stopColor={x.color} />)}
            </linearGradient>
          </defs>
          <path d={D} className="se-path__track" />
          <path d={D} className="se-path__fill" pathLength="100" style={{ strokeDashoffset: 100 - (active / (N - 1)) * 100 }} />
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

      <div className="se-panel" role="tabpanel" aria-label={`Stage ${st.number}: ${st.name}`}>
        {/* Graphic: the seven keys on a turning ring */}
        <div className="se-art" aria-hidden="true">
          <div className="se-ring">
            <svg viewBox="0 0 400 400" className="se-ring__lines">
              <circle cx="200" cy="200" r="150" className="se-ring__orbit" />
              <circle cx="200" cy="200" r="104" className="se-ring__inner" />
            </svg>
            <div className="se-ring__spin">
              {STAGES.map((x, i) => {
                const a = ((i * 360) / N - 90) * (Math.PI / 180);
                return (
                  <span
                    key={x.key}
                    className={`se-node${i < active ? ' is-done' : ''}${i === active ? ' is-on' : ''}`}
                    style={{ '--sc': x.color, left: `${50 + 37.5 * Math.cos(a)}%`, top: `${50 + 37.5 * Math.sin(a)}%` }}
                  >
                    {x.number}
                  </span>
                );
              })}
            </div>
            <div className="se-core">
              {STAGES.map((x, i) => (
                <svg key={x.key} viewBox="0 0 24 24" className={`se-icon${i === active ? ' is-on' : ''}`}>{iconFor(x)}</svg>
              ))}
            </div>
          </div>
          <div className="se-art__copy">
            {STAGES.map((x, i) => (
              <div key={x.key} className={`se-art__t${i === active ? ' is-on' : ''}`}>
                <span className="se-of">Stage {x.number} of 7</span>
                <h3>{x.name}</h3>
                <p>“{x.tagline}”</p>
              </div>
            ))}
          </div>
          {auto && <i className="se-timer" key={active} style={{ animationDuration: `${DWELL}ms` }} />}
        </div>

        <div className="se-body" ref={stage} style={bodyH ? { height: bodyH } : undefined}>
          {STAGES.map((x, i) => (
            <div key={x.key} className={`se-pane${i === active ? ' is-on' : ''}`} style={{ '--c': x.color }}>
              <span className="se-k">What your family gains</span>
              <p className="se-gain">{x.gain}</p>
              <ol className="se-ex">
                {x.exercises.map((e, j) => (
                  <li key={e.id} style={{ '--i': j }}>
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
          ))}
        </div>
      </div>
    </div>
  );
}
