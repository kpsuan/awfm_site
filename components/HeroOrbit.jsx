import './HeroOrbit.css';

// The three circles of care, drawn around the person being cared for:
// immediate family (inner), local or chosen family (middle), family back
// home (outer, farthest away). Each member is joined to the centre by a
// thread. Pure SVG + CSS, so it prerenders and needs no JS.
const C = 300;
const RINGS = [
  { key: 'near', r: 96, label: 'Immediate family', dur: 70, members: [0, 135, 250] },
  { key: 'chosen', r: 172, label: 'Local or chosen family', dur: 110, members: [40, 160, 290] },
  { key: 'home', r: 252, label: 'Family back home', dur: 160, members: [15, 105, 200, 315] },
];

export default function HeroOrbit() {
  return (
    <figure className="orbit" aria-label="Three circles of care around the person being cared for: immediate family, local or chosen family, and family back home.">
      <svg viewBox="0 0 600 600" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="orbitCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="55%" stopColor="#f3c8ea" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b432a3" stopOpacity="0" />
          </radialGradient>
        </defs>

        {RINGS.map((ring, ri) => (
          <circle
            key={ring.key}
            className={`orbit__ring orbit__ring--${ring.key}`}
            cx={C}
            cy={C}
            r={ring.r}
            style={{ '--len': 2 * Math.PI * ring.r, '--d': `${ri * 0.35}s` }}
          />
        ))}

        {RINGS.map((ring, ri) => ring.members.map((deg, mi) => (
          <g
            key={`${ring.key}-${deg}`}
            className={`orbit__arm orbit__arm--${ring.key}`}
            style={{
              '--dur': `${ring.dur}s`,
              '--deg': `${deg}deg`,
              '--d': `${1.1 + ri * 0.3 + mi * 0.08}s`,
            }}
          >
            <line className="orbit__thread" x1={C} y1={C} x2={C + ring.r} y2={C} />
            <circle className="orbit__member" cx={C + ring.r} cy={C} r={ring.key === 'home' ? 7 : 6} />
          </g>
        )))}

        <circle className="orbit__halo" cx={C} cy={C} r="54" fill="url(#orbitCore)" />
        <circle className="orbit__core" cx={C} cy={C} r="13" />
      </svg>

      <figcaption className="orbit__legend">
        {RINGS.map((ring) => (
          <span key={ring.key} className={`orbit__key orbit__key--${ring.key}`}>{ring.label}</span>
        ))}
      </figcaption>
    </figure>
  );
}
