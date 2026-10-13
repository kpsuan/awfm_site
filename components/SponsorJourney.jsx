import './SponsorJourney.css';

// "How your €30 travels", from the app's Sponsor a Care Team landing: a
// family card that unlocks, then retires behind the privacy wall.
// HomeMotion plays the journey once; the markup is the finished state.
const STEPS = [
  ['Choose how you give', 'Pick a family who shared their story.'],
  ['Secure checkout', 'Your gift covers their fee — it never becomes cash.'],
  ['Their plan unlocks', 'The whole family’s journey opens at once.'],
  ['The wall holds', 'You’ll know a family was helped — never who they are.'],
];

export default function SponsorJourney() {
  return (
    <figure className="sj" aria-label="How a €30 sponsorship travels, in four steps.">
      <div className="sj-card" aria-hidden="true">
        <div className="sj-id">
          <div className="sj-card__top">
            <span className="sj-card__ava" />
            <div>
              <strong>A family in Yogyakarta</strong>
              <span>Indonesia · care team of 5</span>
            </div>
          </div>
          <div className="sj-wall">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Nothing about the family flows to you
            </span>
          </div>
        </div>
        <div className="sj-card__state">
          <span className="sj-pill sj-pill--need">Needs: their €30 plan unlock</span>
          <span className="sj-pill sj-pill--done">Plan unlocked</span>
        </div>
        <span className="sj-coin">€30</span>
      </div>
      <ol className="sj-steps">
        {STEPS.map(([t, d], i) => (
          <li className="sj-step is-on" key={t} data-i={i}>
            <b>{i + 1}</b>
            <div><strong>{t}</strong><span>{d}</span></div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
