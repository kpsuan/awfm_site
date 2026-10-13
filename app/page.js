import { REGISTER_URL } from '@/config/site';
import Reveal from '@/components/Reveal';
import './home.css';

export const metadata = {
  title: { absolute: 'A Whole Family Matter — Interdependent care planning' },
};

const CHECKPOINTS = [
  {
    n: '1',
    title: 'The question',
    body: 'Start with any of 30 questions that lead to love.',
    quotes: ['How do you really feel about death and dying?', 'When might you consider Voluntarily Stopping Eating & Drinking (VSED)?'],
  },
  {
    n: '2',
    title: 'The challenges',
    body: 'The same question follows every answer, all the way through.',
    quotes: ['What concerns, issues, or challenges might you be facing?'],
  },
  {
    n: '3',
    title: 'The turning point',
    body: 'And the one that keeps the conversation honest.',
    quotes: ['What would make you change your mind?'],
  },
];

const FUNDS = [
  { name: 'Urgent', desc: 'For the emergency no one saw coming.' },
  { name: 'Quality of life', desc: 'Comfort, care, and dignity in the time that remains.' },
  { name: 'Legacy and rites', desc: 'Honouring a life the way the family believes it should be.' },
  { name: 'Repatriation', desc: 'Bringing a loved one home.' },
  { name: 'Mutual aid', desc: 'Support for whoever in the circle needs it next.' },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="wrap">
          <span className="eyebrow">A healthcare app for end-of-life care</span>
          <h1>Care planning is a conversation, not a form.</h1>
          <p>
            Interdependent Care Planning brings your immediate family, your family back
            home, and your local or chosen family into one place to plan, fund, and
            advocate for dignified end-of-life care — together.
          </p>
          <div className="home-hero__ctas">
            <a className="btn" href={REGISTER_URL}>Get Started Free</a>
            <a className="btn btn--ghost" href="#plan">How it works</a>
          </div>
        </div>
      </section>

      {/* ── Plan: the checkpoint conversation ── */}
      <section id="plan" className="section">
        <div className="wrap">
          <Reveal className="home-intro">
            <span className="eyebrow">Care team planning</span>
            <h2 className="h2">It starts with a question.</h2>
            <p className="lead">
              Based on the Uniform Health-Care Decisions Act (UHCDA) 2023 and collaboration
              with subject matter experts, we crafted 30 questions that lead to love — so a
              whole family can deliver dignified end-of-life experiences together. Every
              question moves through three checkpoints.
            </p>
          </Reveal>
          <ol className="checkpoints">
            {CHECKPOINTS.map((c, i) => (
              <Reveal as="li" className="checkpoint" key={c.n} delay={i * 120}>
                <span className="checkpoint__n">Checkpoint {c.n}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                {c.quotes.map((q) => <blockquote key={q}>“{q}”</blockquote>)}
              </Reveal>
            ))}
          </ol>
          <Reveal className="home-note">
            <p>
              At every checkpoint, family members choose from options supported by medical
              and legal, relational and social education on systemic end-of-life suffering —
              generated with AI and grounded in the lived experiences of medical migrants and
              their collectivist families. Each person can explain their reasoning by
              <b> video, audio, or text</b>, for collective discussion and team affirmation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Fund: purpose-based care funds ── */}
      <section id="fund" className="section section--cream">
        <div className="wrap home-split">
          <Reveal>
            <span className="eyebrow">Care fund pooling</span>
            <h2 className="h2">What families already do, made dependable.</h2>
            <p className="lead">
              Pooling money is something our cultures already know — <i>paluwagan</i> in the
              Philippines, <i>esusu</i> in Nigeria. Instead of reactionary cash remittances
              during a family emergency, care teams proactively pool monthly for each other’s
              end-of-life care, with shared visibility and family-agreed release.
            </p>
          </Reveal>
          <ul className="funds">
            {FUNDS.map((f, i) => (
              <Reveal as="li" className="fund" key={f.name} delay={i * 90}>
                <strong>{f.name}</strong>
                <span>{f.desc}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Advocate: the 7-stage workbook ── */}
      <section id="advocate" className="section">
        <div className="wrap">
          <Reveal className="home-intro">
            <span className="eyebrow">Patient advocacy learning</span>
            <h2 className="h2">Learn to speak for each other.</h2>
            <p className="lead">
              We formalised palliative care workbooks into seven stages of a care team’s
              journey, based on the 7 keys framework we learnt directly from the authors of
              <i> Hope for the Best, Plan for the Rest</i> — Dr. Sammy Winemaker and Dr. Hsien
              Seow. Our Collective Work App is the world’s first digital integration of
              workbook exercises from specialised palliative care experts, across diverse
              terminal illnesses.
            </p>
          </Reveal>
          <Reveal className="stages" aria-label="The seven stages">
            {['Permission', 'Clarity', 'Connection', 'Voice', 'Readiness', 'Advocacy', 'Resilience'].map((st, i) => (
              <span className="stage" key={st}><b>{i + 1}</b>{st}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Sponsor ── */}
      <section className="section section--cream">
        <div className="wrap home-sponsor">
          <Reveal>
            <span className="eyebrow">Sponsor a care team</span>
            <h2 className="h2">Stand behind a family you’ll never meet.</h2>
            <p className="lead">
              Sponsors can support a care team’s journey, helping families who would
              otherwise face end-of-life costs alone get the planning, funding, and
              learning they need.
            </p>
          </Reveal>
          <Reveal className="home-cta" delay={120}>
            <a className="btn" href={REGISTER_URL}>Get Started Free</a>
            <a className="btn btn--ghost" href="/community/">Join the community</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
