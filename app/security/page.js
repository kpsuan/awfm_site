import Reveal from '@/components/Reveal';
import { APP_URL, LEGAL_ENTITY } from '@/config/site';
import '../inner.css';

export const metadata = {
  title: 'Security & Privacy',
  description:
    'How A Whole Family Matter protects your family’s most sensitive conversations: EU hosting, encryption, private recordings, and your GDPR rights.',
};

// Keep every claim here in step with the live platform and the GDPR audit.
const PRACTICES = [
  {
    title: 'Hosted in the European Union',
    body: 'Our application, database, and background services run in the EU (Amsterdam), and our backups are stored in the EU.',
  },
  {
    title: 'Encrypted backups',
    body: 'Database backups are encrypted before they leave our servers.',
  },
  {
    title: 'Private recordings',
    body: 'Video and audio answers are served through signed, expiring links — only people with access to your care team can play them.',
  },
  {
    title: 'Protected administration',
    body: 'Administrative access is restricted and protected with multi-factor authentication.',
  },
  {
    title: 'Access logging',
    body: 'Sensitive access events are logged so we can review who accessed what, and when.',
  },
  {
    title: 'Consent first',
    body: 'Optional tracking, such as session replay for error diagnosis, only runs if you agree to it in our cookie settings.',
  },
];

const RIGHTS = [
  ['Access', 'Ask for a copy of the personal data we hold about you.'],
  ['Export', 'Take your data with you in a portable format.'],
  ['Correction', 'Fix anything that’s inaccurate.'],
  ['Deletion', 'Ask us to delete your account and personal data.'],
  ['Withdraw consent', 'Change your mind about optional processing at any time.'],
];

export default function Security() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Security &amp; privacy</span>
          <h1>Your family’s hardest conversations, kept safe.</h1>
          <p>
            Care planning means sharing health wishes, money, and private reasoning. We treat
            that as some of the most sensitive data there is — and we build to European data
            protection standards (GDPR).
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <Reveal><h2 className="h2">How we protect your data</h2></Reveal>
          <div className="practice-grid">
            {PRACTICES.map((p, i) => (
              <Reveal className="practice" key={p.title} delay={(i % 3) * 90}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose-grid">
          <Reveal>
            <span className="eyebrow">Your rights</span>
            <h2 className="h2">Your data stays yours.</h2>
          </Reveal>
          <Reveal className="rights" delay={100}>
            {RIGHTS.map(([t, d]) => (
              <div className="right" key={t}><strong>{t}</strong><span>{d}</span></div>
            ))}
            <p className="rights__note">
              To exercise any of these rights, email <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>.
              Read the full details in our <a href={`${APP_URL}/legal`}>Privacy &amp; Legal Center</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap prose-grid">
          <Reveal>
            <span className="eyebrow">Who’s responsible</span>
            <h2 className="h2">The data controller</h2>
          </Reveal>
          <Reveal className="prose" delay={100}>
            <p>
              {LEGAL_ENTITY.name}, {LEGAL_ENTITY.address}. KVK {LEGAL_ENTITY.kvk}.
            </p>
            <p>
              Found a security issue? Please report it to{' '}
              <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a> — we take every report seriously.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
