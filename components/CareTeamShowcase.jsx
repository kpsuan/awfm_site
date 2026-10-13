'use client';

import { useEffect, useRef, useState } from 'react';
import { FACES } from './faces';
import './CareTeamShowcase.css';

// A live mock of the app's Care Team page. Six of its most distinctive
// features switch the feed card; it auto-advances until the visitor picks
// one (and not at all under reduced motion). Labels follow the app's
// CareTeamPage components.
const PEOPLE = [
  { n: 'Ate', img: FACES['near-0'] },
  { n: 'Lola', img: FACES['near-1'] },
  { n: 'Mila', img: FACES['chosen-0'] },
  { n: 'Tita', img: FACES['chosen-1'] },
  { n: 'Lolo', img: FACES['home-0'] },
];
const Ava = ({ p, size = 32 }) => (
  <img className="ct-ava" src={p.img} alt="" width={size} height={size} style={{ width: size, height: size }} />
);

function Completion() {
  return (
    <div className="ct-post">
      <div className="ct-post__head">
        <Ava p={PEOPLE[0]} />
        <p><strong>Ate</strong> <span className="ct-badge ct-badge--pink">Completion</span> completed <b>Q8: How do you really feel about death and dying?</b></p>
      </div>
      <div className="ct-tarot">
        {['I would rather not think about my own death', 'My culture makes it hard to talk honestly about death', 'An honest conversation with someone I trust'].map((t, i) => (
          <div className="ct-tarot__card" key={t} style={{ '--i': i }}>
            <span>Layer {i + 1}</span><p>{t}</p>
          </div>
        ))}
      </div>
      <div className="ct-post__foot">
        <span className="ct-react">❤️🔥🙏 Lola, Mila and 2 others</span>
        <span className="ct-affirm">3 affirmations · <b>Affirm</b></span>
      </div>
    </div>
  );
}

function Pulse() {
  const feels = [['Lola', 'Grateful'], ['Mila', 'Thoughtful'], ['Tita', 'This is heavy'], ['Lolo', 'Doing okay']];
  return (
    <div className="ct-post">
      <div className="ct-pulse__banner"><strong>Weekly Team Pulse</strong><span>Oct 6 – Oct 12</span></div>
      <span className="ct-label">This week’s conversation</span>
      <p className="ct-q">Who are the most important people in your life?</p>
      <span className="ct-label">4 checked in</span>
      <div className="ct-feels">
        {feels.map(([n, f], i) => (
          <span key={n} style={{ '--i': i }}><Ava p={PEOPLE[i + 1]} size={24} />{f}</span>
        ))}
      </div>
      <div className="ct-post__foot"><span className="ct-muted">Waiting on: Ate</span><span className="ct-btn">Check in now</span></div>
    </div>
  );
}

function Insights() {
  return (
    <div className="ct-post">
      <div className="ct-toggle"><span className="is-on">Where We Differ</span><span>Where We Agree</span></div>
      <div className="ct-diff">
        <div className="ct-diff__card"><b>Q8</b><p>How do you really feel about death and dying?</p><span className="ct-chip ct-chip--strong">3 differ</span></div>
        <div className="ct-diff__card"><b>Q21</b><p>When your time comes, where would you feel most at peace?</p><span className="ct-chip">2 differ</span></div>
      </div>
      <div className="ct-flash">
        <strong>Your team sees this differently</strong>
        <span className="ct-chip ct-chip--strong">Strong divergence</span>
        <span className="ct-btn">Discuss in #q8</span>
      </div>
    </div>
  );
}

function Celebration() {
  return (
    <div className="ct-post ct-celebrate">
      <div className="ct-confetti" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
      <span className="ct-celebrate__emoji">🎉</span>
      <strong>Welcome to the Team!</strong>
      <div className="ct-ring"><Ava p={PEOPLE[2]} size={64} /></div>
      <p>Mila joined the care team.</p>
    </div>
  );
}

function DailyHabit() {
  const st = ['42% along', 'Completed their reflections', 'Taking their time', '18% along', 'Invited'];
  return (
    <div className="ct-post">
      <strong className="ct-h">A question a day</strong>
      <p className="ct-muted">Day 12 of 36 · 33% of your care plan reflected on</p>
      <div className="ct-bar"><i style={{ width: '33%' }} /></div>
      <span className="ct-label">Walking this together</span>
      <div className="ct-walk">
        {PEOPLE.map((p, i) => <span key={p.n}><Ava p={p} size={26} /><b>{p.n}</b>{st[i]}</span>)}
      </div>
    </div>
  );
}

function Wrapped() {
  const stats = [['48', 'messages'], ['12', 'recordings'], ['31', 'affirmations'], ['5', 'active']];
  return (
    <div className="ct-post ct-wrapped">
      <div className="ct-story">{[0, 1, 2, 3].map((i) => <i key={i} className={i === 0 ? 'is-run' : ''} />)}</div>
      <span className="ct-wrapped__k">THE BREAKDOWN</span>
      <strong>Your Team Wrapped</strong>
      <div className="ct-wrapped__grid">
        {stats.map(([n, l], i) => <div key={l} style={{ '--i': i }}><b>{n}</b><span>{l}</span></div>)}
      </div>
    </div>
  );
}

const FEATURES = [
  { title: 'Answers become cards', body: 'Every completed question posts to the team feed — flip through each person’s choices and affirm them.', C: Completion },
  { title: 'Weekly Team Pulse', body: 'One shared conversation a week, and a check-in on how everyone is really doing.', C: Pulse },
  { title: 'Where we differ', body: 'See where the family agrees and where it doesn’t — then talk it through in that question’s channel.', C: Insights },
  { title: 'Celebrations', body: 'New members, new leaders, milestones — the team marks them together.', C: Celebration },
  { title: 'A question a day', body: 'The Daily Habit walks the whole family through the care plan, one reflection at a time.', C: DailyHabit },
  { title: 'Team Wrapped', body: 'A story-style digest of what your team shared — sent daily or weekly.', C: Wrapped },
];

export default function CareTeamShowcase() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const root = useRef(null);

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => setActive((a) => (a + 1) % FEATURES.length), 5200);
    }, { threshold: 0.35 });
    io.observe(root.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [auto]);

  const Card = FEATURES[active].C;
  return (
    <div className="ct" ref={root}>
      <div className="ct-list" role="tablist" aria-label="Care team features">
        {FEATURES.map((f, i) => (
          <button
            key={f.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`ct-item${active === i ? ' is-active' : ''}${active === i && auto ? ' is-timed' : ''}`}
            onClick={() => { setAuto(false); setActive(i); }}
          >
            <strong>{f.title}</strong>
            <span>{f.body}</span>
            <i className="ct-item__timer" />
          </button>
        ))}
      </div>

      <div className="ct-app" aria-hidden="true">
        <div className="ct-app__banner" />
        <div className="ct-app__head">
          <span className="ct-app__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></svg></span>
          <div>
            <span className="ct-app__level">Immediate Family</span>
            <strong>The Santos Family</strong>
            <span className="ct-app__meta">Private group · 5 members · <b>Full plan</b></span>
          </div>
          <div className="ct-app__stack">{PEOPLE.map((p) => <Ava key={p.n} p={p} size={30} />)}</div>
        </div>
        <div className="ct-app__tabs">
          {['Posts', 'Daily Habit', 'Members', 'Insights', 'Digests', 'Channels'].map((t) => {
            const on = (t === 'Posts' && active <= 1) || (t === 'Insights' && active === 2) || (t === 'Posts' && active === 3)
              || (t === 'Daily Habit' && active === 4) || (t === 'Digests' && active === 5);
            return <span key={t} className={on ? 'is-on' : ''}>{t}</span>;
          })}
        </div>
        <div className="ct-app__feed">
          <div className="ct-swap" key={active}><Card /></div>
        </div>
      </div>
    </div>
  );
}
