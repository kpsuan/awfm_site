import { REGISTER_URL, LEGAL_ENTITY } from '@/config/site';
import './team.css';

export const metadata = {
  alternates: { canonical: '/team/' },
  title: 'Team',
  description: 'Meet the Filipino innovators building A Whole Family Matter — interdependent care planning for medical migrants and their collectivist families.',
};

// Names, titles and universities from the startup team slide. Photos: drop
// files in /public/team/ and set `photo`; initials render until then.
const TEAM = [
  {
    name: 'Norman Yuson Cuaño',
    role: 'Interdependent Care Planning Creator',
    school: 'University of the Philippines – Los Baños',
    bio: 'Created Interdependent Care Planning and leads A Whole Family Matter’s mission to break the silence around death and dying for medical migrants and their collectivist families.',
  },
  {
    name: 'Kismet Fran Suan',
    role: 'ICP Platform Innovation Leader',
    school: 'University of the Philippines – Visayas',
    bio: 'Leads product research, design and full-stack development — turning care planning that was traditionally done on paper into a healthcare app built for whole families.',
  },
  {
    name: 'William Staclara',
    role: 'ICP Research & Community Leader',
    school: 'University of the Philippines – Los Baños',
    bio: 'Leads the research behind Interdependent Care Planning and the community where medical migrants and their families learn and support each other.',
  },
];

// Drawn from the platform's own principles and copy.
const VALUES = [
  ['Break the silence, together', 'We make the hardest conversations sayable — especially when a family disagrees. #BreakTheSilence'],
  ['The success of one is the success of all', 'Bayanihan: communal unity, cooperation and mutual aid. We build for the “we”, not the “I”.'],
  ['Lived experience first', 'Everything we make is grounded in the real lives of medical migrants and their collectivist families.'],
  ['The family’s, always', 'The plan belongs to the family, held in common — and we never hold a single euro of their money.'],
];

const initials = (n) => { const w = n.split(' '); return (w[0][0] + w[w.length - 1][0]).toUpperCase(); };

export default function Team() {
  return (
    <>
      <section className="tm-hero">
        <div className="tm-hero__copy">
          <span className="tm-k">About A Whole Family Matter</span>
          <h1>We’re building the care plan our families never had</h1>
          <p>Interdependent care planning for medical migrants and their collectivist families — so no one dies in pain, in debt, and in silence.</p>
          <a className="tm-btn" href={REGISTER_URL}>Get Started Free</a>
        </div>
        <div
          className="tm-hero__img"
          role="img"
          aria-label="A family carrying a house together at sunrise — bayanihan."
          style={{ backgroundImage: 'url(https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_1600/v1791266530/Chairs_Beneath_a_Golden_Sky_m9bdhc.png)' }}
        />
      </section>

      <section className="tm-sec">
        <div className="tm-wrap tm-split">
          <div>
            <span className="tm-k">Our story</span>
            <h2>Built from lived experience</h2>
          </div>
          <div className="tm-prose">
            <p>
              We’re a small Filipino startup for social impact, based in The Hague. As Filipinos
              with 377 years of lived experience with colonization, we build from what we call
              <i> bayanihan</i> — a spirit of communal unity, cooperation, and mutual aid.
            </p>
            <p>
              The world’s biggest exporters of healthcare workers are also among the world’s worst
              places to die. Medical migrants deliver a good death every working day abroad — then
              call home to families with none of what they have. A Whole Family Matter is the tool
              we wished those families had.
            </p>
            <a className="tm-link" href="/about/">Read our story</a>
          </div>
        </div>
      </section>

      <section className="tm-sec tm-sec--alt">
        <div className="tm-wrap">
          <span className="tm-k">Mission and values</span>
          <div className="tm-split">
            <h2>What we stand for</h2>
            <p className="tm-lead">
              A family that plans their future together funds their future care together. Our
              mission is to help every family plan, fund and advocate for dignified end-of-life
              care — interdependently, with each other.
            </p>
          </div>
          <div className="tm-values">
            {VALUES.map(([t, d], i) => (
              <article key={t}>
                <span className="tm-v">V / {i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tm-sec">
        <div className="tm-wrap">
          <span className="tm-k">The team</span>
          <div className="tm-split tm-split--head">
            <h2>Meet the team building<br />A Whole Family Matter</h2>
            <p className="tm-lead">
              Three Filipino innovators from the University of the Philippines who have lived the problem themselves. We build
              carefully, with the families we serve. Say hello any time.
            </p>
          </div>
          <div className="tm-people">
            {TEAM.map((m) => (
              <article key={m.name}>
                {m.photo
                  ? <img className="tm-ava" src={m.photo} alt={m.name} />
                  : <span className="tm-ava tm-ava--init" aria-hidden="true">{initials(m.name)}</span>}
                <h3>{m.name}</h3>
                <span className="tm-role">{m.role}</span>
                <span className="tm-school">{m.school}</span>
              </article>
            ))}
            <article>
              <span className="tm-ava tm-ava--plus" aria-hidden="true">+</span>
              <h3>You?</h3>
              <span className="tm-role">Opportunities</span>
              <p>We grow carefully. If helping families break the silence sounds like work you’d want to do, get in touch.</p>
              <a className="tm-mail" href={`mailto:${LEGAL_ENTITY.email.replace('privacy@', 'info@')}`}>{LEGAL_ENTITY.email.replace('privacy@', 'info@')}</a>
            </article>
          </div>
        </div>
      </section>

      <section className="tm-cta">
        <div className="tm-wrap tm-cta__in">
          <h2>Start your family’s care plan.</h2>
          <a className="tm-btn tm-btn--light" href={REGISTER_URL}>Get Started Free</a>
        </div>
      </section>
    </>
  );
}
