import './StagePath.css';

// The seven-stage advocacy journey as a winding path. HomeMotion draws the
// path on scroll and lights each stage as the line reaches it.
const STAGES = ['Permission', 'Clarity', 'Connection', 'Voice', 'Readiness', 'Advocacy', 'Resilience'];
const PTS = STAGES.map((_, i) => ({ x: 70 + i * 143, y: i % 2 ? 150 : 72 }));
const D = PTS.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const a = PTS[i - 1];
  return `${d} C ${a.x + 70} ${a.y}, ${p.x - 70} ${p.y}, ${p.x} ${p.y}`;
}, '');

export default function StagePath() {
  return (
    <figure className="spath" aria-label="The seven stages of a care team's advocacy journey.">
      <svg viewBox="0 0 1000 230" aria-hidden="true">
        <path className="spath__track" d={D} />
        <path className="spath__line" d={D} />
        {PTS.map((p, i) => (
          <g key={STAGES[i]} className="spath__stage is-lit" data-stage={i}>
            <circle cx={p.x} cy={p.y} r="25" />
            <text x={p.x} y={p.y + 7} textAnchor="middle" className="spath__n">{i + 1}</text>
            <text x={p.x} y={i % 2 ? p.y + 52 : p.y - 38} textAnchor="middle" className="spath__label">{STAGES[i]}</text>
          </g>
        ))}
      </svg>
      <ol className="spath__list">
        {STAGES.map((s, i) => <li key={s}><b>{i + 1}</b>{s}</li>)}
      </ol>
    </figure>
  );
}
