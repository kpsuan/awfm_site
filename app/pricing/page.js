import { REGISTER_URL, SPONSOR_URL, HELP_URL, APP_URL } from '@/config/site';
import './pricing.css';

export const metadata = {
  title: 'Pricing',
  description:
    'Start free. €30 once opens the guided care plan for your whole team; €10 a month adds the advocacy workbook in Full mode. One fee per family, never per person.',
};

// Prices and inclusions mirror the app: sponsorship/models.py fee constants
// and the BillingPanel feature table. Do not add tiers, trials or annual
// pricing here unless the app offers them.
const PLANS = [
  {
    name: 'Free',
    price: '€0',
    unit: 'for everyone',
    body: 'Begin the journey — the first nine questions and your team’s shared space.',
    cta: 'Get Started Free',
    primary: true,
  },
  {
    name: 'Care Plan',
    price: '€30',
    unit: 'one-time · whole team',
    body: 'The guided journey, questions 10–30 — opened for every member at once, then one reflection a day.',
    cta: 'Start free, unlock later',
  },
  {
    name: 'Full Subscription',
    price: '€10',
    unit: '/ month · whole team',
    body: 'The advocacy workbook in Full mode, with artifacts shared across your team. Cancel anytime — everything you wrote stays.',
    cta: 'Start free, upgrade later',
  },
];

const ROWS = [
  ['Life story & values questions (1–9)', true, true, true],
  ['Care team space — posts, recordings, channels', true, true, true],
  ['Guided care plan (questions 10–30)', false, true, false],
  ['Daily Habit — one reflection a day', false, true, false],
  ['Team insights on care decisions', false, true, false],
  ['Advocacy workbook — Full mode', false, false, true],
  ['Share workbook artifacts with your team', false, false, true],
];

const I = (d) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
const MODEL = [
  { icon: I(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" /></>), title: 'One fee per family', body: 'Every price covers your whole care team — every seated member, never per person.' },
  { icon: I(<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />), title: 'The Leader never pays', body: 'The person coordinating is never the one paying. A teammate — or a sponsor — covers the fee.' },
  { icon: I(<><path d="M7 7h10M7 12h10M7 17h6" /><rect x="3" y="3" width="18" height="18" rx="2" /></>), title: 'Two unlocks, not a ladder', body: 'The Care Plan is a one-time content unlock; the Subscription an ongoing workbook service. Many families choose both.' },
  { icon: I(<><circle cx="12" cy="12" r="9" /><path d="M15 9.5a3 3 0 0 0-3-1.5c-2 0-3 1-3 2.2 0 3 6 1.5 6 4.6 0 1.2-1.2 2.2-3 2.2a3.4 3.4 0 0 1-3-1.6M12 6v2M12 16v2" /></>), title: 'No fees on your Care Fund', body: 'We never hold or move your family’s money, and charge nothing on any contribution or release.' },
  { icon: I(<><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l3 2" /></>), title: 'Free stays free', body: 'Questions 1–9, your team’s shared space, and the workbook’s Quick mode are yours forever.' },
  { icon: I(<><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /><circle cx="12" cy="12" r="9" /></>), title: 'One flat price worldwide', body: 'Charged in euros, the same everywhere — no localized pricing, and no bulk discounts.' },
];

const COMPARE = [
  ['Who carries it', 'One family member fills in the paperwork — and pays for everything alone.', 'One fee covers every member, and the Leader never pays.'],
  ['Who takes part', 'A single form, signed once and filed away.', 'The whole care team answers, together, across countries.'],
  ['When money is needed', 'Reactive remittances when an emergency hits.', 'A shared Care Fund, pooled ahead of time — with no transaction fees.'],
  ['Learning to advocate', 'Left to whoever happens to be in the room.', 'A seven-stage workbook that teaches the team to speak up.'],
  ['If it’s out of reach', 'The family goes without.', 'A sponsor can cover the fee — and sees nothing private.'],
];

const Tick = ({ on }) => (on
  ? <span className="pr-tick" aria-label="Included">{I(<path d="m5 12 5 5 9-10" />)}</span>
  : <span className="pr-dash" aria-label="Not included">—</span>);

export default function Pricing() {
  return (
    <>
      <section className="pr-hero">
        <div className="pr-wrap pr-hero__top">
          <div>
            <span className="pr-k">Pricing</span>
            <h1>One fee per family,<br />never per person</h1>
          </div>
          <p>
            Start free. When your family is ready, one payment opens the care plan for your
            whole team — and the person leading it never pays.
          </p>
        </div>
        <div className="pr-wrap pr-plans">
          {PLANS.map((p) => (
            <div className="pr-plan" key={p.name}>
              <span className="pr-plan__name">{p.name}</span>
              <div className="pr-plan__price"><b>{p.price}</b><span>{p.unit}</span></div>
              <p>{p.body}</p>
              <a className={`pr-btn${p.primary ? ' pr-btn--solid' : ''}`} href={REGISTER_URL}>{p.cta}</a>
            </div>
          ))}
        </div>
        <p className="pr-wrap pr-note">Prices in euros · Questions 1–9 are always free · Paid unlocks apply to your whole care team</p>
      </section>

      <section className="pr-sec">
        <div className="pr-wrap">
          <span className="pr-k">What’s included</span>
          <h2>Pick what your family needs</h2>
          <div className="pr-table" role="table" aria-label="What each plan includes">
            <div className="pr-row pr-row--head" role="row">
              <span role="columnheader" />
              <span role="columnheader">Free</span>
              <span role="columnheader">+ Care Plan</span>
              <span role="columnheader">+ Subscription</span>
            </div>
            {ROWS.map(([label, ...cells]) => (
              <div className="pr-row" role="row" key={label}>
                <span role="rowheader">{label}</span>
                {cells.map((on, i) => <span role="cell" key={i}><Tick on={on} /></span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-sec pr-sec--alt">
        <div className="pr-wrap">
          <span className="pr-k">Our model</span>
          <h2>Built so cost never splits a family</h2>
          <p className="pr-lead">No add-ons, no per-person seats, nothing hidden behind a higher tier.</p>
          <div className="pr-grid">
            {MODEL.map((m) => (
              <article key={m.title}>
                <span className="pr-tile" aria-hidden="true">{m.icon}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-sec">
        <div className="pr-wrap">
          <span className="pr-k">Why it’s different</span>
          <h2>A Whole Family Matter vs. planning alone</h2>
          <div className="pr-cmp" role="table" aria-label="Comparison">
            <div className="pr-cmp__row pr-cmp__row--head" role="row">
              <span role="columnheader" />
              <span role="columnheader">Planning alone</span>
              <span role="columnheader">A Whole Family Matter</span>
            </div>
            {COMPARE.map(([k, a, b]) => (
              <div className="pr-cmp__row" role="row" key={k}>
                <span role="rowheader">{k}</span>
                <span role="cell">{a}</span>
                <span role="cell">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-sec pr-sec--alt">
        <div className="pr-wrap pr-sponsor">
          <div>
            <span className="pr-k">Sponsorship</span>
            <h2>Can’t cover the fee? A sponsor can.</h2>
            <p className="pr-lead">
              €30 opens a family’s whole care plan, once. Sponsors never see who the family
              is, what they wrote, or how they decide. Organizations can sponsor many families
              with one charge and one receipt — no bulk discounts, ever: every euro is a family.
            </p>
          </div>
          <div className="pr-sponsor__ctas">
            <a className="pr-btn pr-btn--solid" href={SPONSOR_URL}>Sponsor a family — €30</a>
            <a className="pr-btn" href={`${SPONSOR_URL}/organizations`}>Sponsor as an organization</a>
          </div>
        </div>
      </section>

      <section className="pr-sec">
        <div className="pr-wrap pr-fine">
          <h3>The fine print</h3>
          <ul>
            <li>Paid access applies once your care team has finished forming.</li>
            <li>Digital services start right away; at checkout you’re asked to waive the 14-day EU withdrawal right for that reason.</li>
            <li>The Subscription is per care team — paying for one circle doesn’t upgrade your others.</li>
            <li>Questions? Visit the <a href={HELP_URL}>Help Center</a> or read our <a href={`${APP_URL}/terms`}>Terms of Service</a>.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
