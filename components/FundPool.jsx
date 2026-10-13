import './FundPool.css';

// Care fund pooling, drawn: four family members drop monthly contributions
// into five purpose-based funds. Markup holds the final fill levels, so the
// graphic is complete without JS; HomeMotion animates it from empty.
const MEMBERS = [
  { x: 110, i: 'M', label: 'Abroad' },
  { x: 220, i: 'A', label: 'Ate' },
  { x: 330, i: 'K', label: 'Kuya' },
  { x: 440, i: 'L', label: 'Lola' },
];
const FUNDS = [
  { name: 'Urgent', level: 0.62 },
  { name: 'Quality of life', level: 0.5 },
  { name: 'Legacy & rites', level: 0.36 },
  { name: 'Repatriation', level: 0.3 },
  { name: 'Mutual aid', level: 0.56 },
];
const JAR = { w: 76, top: 180, h: 128, gap: 22, left: 25 };
const jarX = (k) => JAR.left + k * (JAR.w + JAR.gap);
const COINS = 15; // three rounds of five drops

export default function FundPool({ active = null }) {
  return (
    <figure className="pool" data-active={active === null ? undefined : active} aria-label="Family members pooling monthly contributions into five purpose-based care funds.">
      <svg viewBox="0 0 540 350" aria-hidden="true">
        <defs>
          <linearGradient id="poolFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c13fae" />
            <stop offset="100%" stopColor="#8f5bd6" />
          </linearGradient>
          {FUNDS.map((f, k) => (
            <clipPath id={`jar${k}`} key={f.name}>
              <rect x={jarX(k)} y={JAR.top} width={JAR.w} height={JAR.h} rx="16" />
            </clipPath>
          ))}
        </defs>

        {MEMBERS.map((m) => (
          <g key={m.label} className="pool__member">
            <circle cx={m.x} cy="46" r="22" />
            <text x={m.x} y="52" textAnchor="middle" className="pool__ini">{m.i}</text>
            <text x={m.x} y="90" textAnchor="middle" className="pool__who">{m.label}</text>
          </g>
        ))}

        {FUNDS.map((f, k) => {
          const fillH = Math.round(JAR.h * f.level);
          return (
            <g key={f.name} className={`pool__jarset${active === k ? ' is-active' : ''}`}>
              <rect className="pool__jar" x={jarX(k)} y={JAR.top} width={JAR.w} height={JAR.h} rx="16" />
              <rect
                className="pool__fill"
                data-level={f.level}
                clipPath={`url(#jar${k})`}
                x={jarX(k)}
                y={JAR.top + JAR.h - fillH}
                width={JAR.w}
                height={fillH}
              />
              <text x={jarX(k) + JAR.w / 2} y={JAR.top + JAR.h + 26} textAnchor="middle" className="pool__name">{f.name}</text>
            </g>
          );
        })}

        {Array.from({ length: COINS }, (_, c) => (
          <circle key={c} className="pool__coin" r="7" cx="0" cy="0" opacity="0" />
        ))}
      </svg>
    </figure>
  );
}

// Geometry for the motion component.
export const POOL_GEOMETRY = {
  members: MEMBERS.map((m) => m.x),
  memberY: 46,
  jars: FUNDS.map((_, k) => jarX(k) + JAR.w / 2),
  jarTop: JAR.top,
  jarBottom: JAR.top + JAR.h,
  jarH: JAR.h,
};
