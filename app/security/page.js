import SecurityHero from '@/components/security/SecurityHero';
import Compliance from '@/components/security/Compliance';
import { APP_URL, HELP_URL, LEGAL_ENTITY, REGISTER_URL } from '@/config/site';
import './security.css';

export const metadata = {
  title: 'Security & Privacy',
  description:
    'How A Whole Family Matter protects your family’s most sensitive conversations: EU hosting, encryption, private recordings, consent-first analytics and your GDPR rights.',
};

// Every claim on this page must stay true of the live platform. Check the
// GDPR audit notes before changing copy.
const I = (d) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
const ICON = {
  lock: I(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>),
  globe: I(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>),
  shield: I(<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />),
  eye: I(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>),
  log: I(<><path d="M8 3h11v18H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" /><path d="M9 8h6M9 12h6M9 16h4" /></>),
  link: I(<><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" /><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" /></>),
  coin: I(<><circle cx="12" cy="12" r="9" /><path d="M15 9.5a3 3 0 0 0-3-1.5c-2 0-3 1-3 2.2 0 3 6 1.5 6 4.6 0 1.2-1.2 2.2-3 2.2a3.4 3.4 0 0 1-3-1.6M12 6v2M12 16v2" /></>),
  wall: I(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v6M15 10v5M9 15v5" /></>),
  user: I(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  check: I(<path d="m5 12 5 5 9-10" />),
  vote: I(<><path d="M4 12h16v8H4z" /><path d="m8 8 3 3 5-6" /></>),
};

const COMPLIANCE = [
  { icon: ICON.shield, title: 'Built to GDPR', detail: 'We build to the EU General Data Protection Regulation: a lawful basis for every kind of data we process, a register of every service provider that touches it, and your rights honoured — access, export, correction, and deletion.' },
  { icon: ICON.globe, title: 'EU data residency', detail: 'Our application, database and background services run in the European Union (Amsterdam), and backups are stored in the EU.' },
  { icon: ICON.eye, title: 'Consent-first analytics', detail: 'Optional tracking — such as session replay used to diagnose errors — only runs if you agree to it in our cookie settings.' },
  { icon: ICON.user, title: 'Your rights, built in', detail: 'Export your data in a portable format, correct what is wrong, withdraw consent, or ask us to delete your account and personal data.' },
];

const DEFAULTS = [
  { icon: ICON.lock, title: 'Encrypted in transit and at rest', body: 'Every connection uses HTTPS. Backups are encrypted before they leave our servers, and sensitive financial details are encrypted in the database.' },
  { icon: ICON.link, title: 'Private recordings', body: 'Video and audio answers play through signed, expiring links — only people with access to your care team can open them.' },
  { icon: ICON.log, title: 'Access is logged', body: 'Sensitive access is recorded — including every time a Care Fund account number is revealed — so it can always be reviewed.' },
  { icon: ICON.coin, title: 'We never hold your money', body: 'The Care Fund is a social ledger. It tracks what your family pools and releases; the money itself stays in your family’s own accounts.' },
  { icon: ICON.wall, title: 'Sponsors see nothing', body: 'When someone sponsors a family, they learn a family was helped — never who they are, what they wrote, or how they decide.' },
  { icon: ICON.shield, title: 'Protected administration', body: 'Administrative access is restricted to named staff and protected with multi-factor authentication.' },
];

const CONTROL = [
  { icon: ICON.eye, title: 'You choose who sees each recording', body: 'Every explanation you record is set to Only Me, My Teams, or Everyone — and you can change it.' },
  { icon: ICON.vote, title: 'The family decides together', body: 'Money leaves a Care Fund only after the family’s agreed approvals — no one approves their own request.' },
  { icon: ICON.log, title: 'Every movement on the record', body: 'Contributions, approvals and releases land on an append-only audit trail the whole team can see.' },
];

export default function Security() {
  return (
    <>
      <SecurityHero>
        <span className="sh__kicker">{ICON.shield} Security</span>
        <h1>Your family’s hardest conversations, kept safe.</h1>
        <p>
          Care planning means sharing health wishes, money, and private reasoning. We treat it
          as the most sensitive data there is — hosted in the EU and built to GDPR from the start.
        </p>
        <div className="sh__ctas">
          <a className="btn btn--light" href={`${APP_URL}/legal`}>Privacy &amp; Legal Center</a>
          <a className="btn btn--line" href={`mailto:${LEGAL_ENTITY.email}`}>Contact us</a>
        </div>
      </SecurityHero>

      {/* ── Built in, not bolted on ── */}
      <section className="sx">
        <div className="sx__wrap sx__split">
          <div className="sx__head">
            <span className="sx__k">Privacy by design</span>
            <h2>Security is how we build, not something we add</h2>
            <p>
              Families trust us with conversations they have never had out loud. So the same
              protections apply to every family on every plan — free or paid — and they are
              part of how each feature is built, not a setting you have to find.
            </p>
            <a className="sx__btn" href={`${APP_URL}/privacy`}>Read our privacy policy</a>
          </div>
          <Compliance items={COMPLIANCE} />
        </div>
      </section>

      {/* ── Secure defaults ── */}
      <section className="sx sx--alt">
        <div className="sx__wrap">
          <div className="sx__head sx__head--wide">
            <span className="sx__k">Security controls</span>
            <h2>Secure defaults,<br />for every family</h2>
            <p>The same protections for everyone — never a paid add-on.</p>
          </div>
          <div className="sx__grid">
            {DEFAULTS.map((d) => (
              <article key={d.title}>
                <span className="sx__tile" aria-hidden="true">{d.icon}</span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── People stay in control ── */}
      <section className="sx">
        <div className="sx__wrap sx__split sx__split--even">
          <div className="sx__head">
            <span className="sx__k">Family control</span>
            <h2>The plan belongs<br />to your family</h2>
            <p>The app keeps the record. The family makes the decisions.</p>
            <ul className="sx__ctl">
              {CONTROL.map((c) => (
                <li key={c.title}>
                  <span className="sx__tile sx__tile--sm" aria-hidden="true">{c.icon}</span>
                  <div><strong>{c.title}</strong><p>{c.body}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="sx__panel" aria-hidden="true">
            <div className="sx__card">
              <span className="sx__card-ico">{ICON.eye}</span>
              <div>
                <strong>Who can see this?</strong>
                <div className="sx__seg"><span>Only Me</span><span className="is-on">My Teams</span><span>Everyone</span></div>
              </div>
            </div>
            <div className="sx__card sx__card--stack">
              <div className="sx__card-row">
                <span className="sx__card-ico">{ICON.coin}</span>
                <div><strong>Withdrawal for in-home care · €600</strong><span>Waiting on 1 approval — you’ll be notified when it’s decided</span></div>
              </div>
              <div className="sx__card-foot">
                <span className="sx__pill">1 of 2 approvals</span>
                <span className="sx__act"><i>Deny</i><b>Approve</b></span>
              </div>
            </div>
            <div className="sx__card">
              <span className="sx__card-ico">{ICON.check}</span>
              <div><strong>Contribution confirmed</strong><span>Added to the audit trail · visible to the whole team</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who's responsible + contact ── */}
      <section className="sx sx--alt">
        <div className="sx__wrap sx__split">
          <div className="sx__head">
            <span className="sx__k">Data controller</span>
            <h2>Who’s responsible</h2>
            <p>
              {LEGAL_ENTITY.name}, {LEGAL_ENTITY.address}. KVK {LEGAL_ENTITY.kvk}.
            </p>
          </div>
          <div className="sx__contact">
            <h3>Questions about security?</h3>
            <p>
              Ask us anything about how we handle your family’s data. Found a security issue?
              Please report it — we take every report seriously.
            </p>
            <div className="sx__contact-ctas">
              <a className="btn" href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>
              <a className="btn btn--ghost" href={HELP_URL}>Visit the Help Center</a>
            </div>
            <p className="sx__contact-note">
              Looking for answers on accounts, the Care Fund or sponsorship? Browse the{' '}
              <a href={`${HELP_URL}#faq`}>frequently asked questions</a>, or{' '}
              <a href={REGISTER_URL}>get started free</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
