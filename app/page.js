import { REGISTER_URL, LOGIN_URL, SPONSOR_URL } from '@/config/site';
import Reveal from '@/components/Reveal';
import StoryDeck from '@/components/StoryDeck';
import HeroOrbit from '@/components/HeroOrbit';
import FilmHero from '@/components/community/FilmHero';
import FundExplorer from '@/components/FundExplorer';
import StageExplorer from '@/components/StageExplorer';
import HomeMotion from '@/components/HomeMotion';
import QuestionJourney from '@/components/QuestionJourney';
import SponsorJourney from '@/components/SponsorJourney';
import CareTeamShowcase from '@/components/CareTeamShowcase';
import { FACES } from '@/components/faces';
import './home.css';

export const metadata = {
  alternates: { canonical: '/' },
  title: { absolute: 'A Whole Family Matter — Interdependent care planning' },
};


// No one dies in pain, in debt, and in silence: each failure maps to the
// pillar that answers it.
const PDS = [
  {
    word: 'silence',
    n: '77–98%',
    fact: 'of our terminal patients don’t know they’re dying — because the family, not the patient, decides.',
    answer: 'Care team planning',
    href: '#plan',
  },
  {
    word: 'debt',
    n: '85M',
    fact: 'people across these twelve countries are pushed into poverty by individual healthcare spending.',
    answer: 'Care fund pooling',
    href: '#fund',
  },
  {
    word: 'pain',
    n: '20.1M',
    fact: 'are projected to die every year with unaddressed severe pain by 2060 — two and a half times today.',
    answer: 'Patient advocacy',
    href: '#advocate',
  },
];

const DIFFERENT = [
  {
    title: 'Built for the “we”, not the “I”',
    body: 'Most planning tools assume one patient deciding alone. Ours is built for collectivist families, where the whole family decides together.',
  },
  {
    title: 'The world’s first digital palliative workbook',
    body: 'The first digital integration of workbook exercises from specialised palliative care experts, based on the 7 keys framework of Dr. Sammy Winemaker and Dr. Hsien Seow.',
  },
  {
    title: 'Grounded in law and lived experience',
    body: 'Thirty questions built on the Uniform Health-Care Decisions Act 2023 with subject matter experts, and on the lived experience of medical migrants.',
  },
  {
    title: 'Plans that come with the money',
    body: 'Planning and funding live in one place, so a family’s wishes come with the shared resources to honour them.',
  },
];

export default function Home() {
  return (
    <>
      <FilmHero
        kicker="A healthcare app for end-of-life care"
        title="Every day, 20,000 of our people die in pain, in debt, and in silence."
        longTitle
        sub="A Whole Family Matter brings your three circles of care into one app, so they can plan, fund, and advocate for a dignified death — together."
        prompts={[
          { chip: 'Q8', text: 'How do you really feel about death and dying?' },
          { chip: 'Q5', text: 'Who are the most important people in your life?' },
          { chip: 'Q21', text: 'When your time comes, where would you feel most at peace?' },
        ]}
        primary={{ label: 'Get Started Free', href: REGISTER_URL }}
        secondary={{ label: 'See why it matters', href: '#problem' }}
      />

      <HomeMotion />

      {/* ── The problem: pain, debt, silence, each answered by a pillar ── */}
      <section id="problem" className="section home-problem">
        <div className="wrap">
          <div className="home-intro">
            <h2 className="h2">The families who care for the world get the worst care at the end.</h2>
            <p className="lead">
              Twelve countries — the Philippines, Nigeria, India and more — are the world’s
              biggest exporters of healthcare workers. Their families back home pay the
              highest cost for end-of-life care and get the worst quality of death.
            </p>
          </div>
          <div className="pds">
            {PDS.map((x, i) => (
              <Reveal as="article" className="pd" key={x.word} delay={i * 120}>
                <span className="pd__word">in {x.word}</span>
                <strong className="pd__n">{x.n}</strong>
                <p className="pd__fact">{x.fact}</p>
                <a className="pd__answer" href={x.href}>
                  <span>Answered by</span>{x.answer}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The three circles of care ── */}
      <section className="home-circles">
        <div className="wrap home-circles__grid">
          <div className="home-circles__copy">
            <h2 className="h2">Three circles of care, one support system.</h2>
            <p>
              Your immediate family, your local or chosen family, and your family back home
              usually plan in separate conversations, if they plan at all. A Whole Family Matter
              brings all three into the same place, around the person who matters most.
            </p>
          </div>
          <HeroOrbit />
        </div>
      </section>

      <StoryDeck />

      {/* ── Plan: the checkpoint conversation ── */}
      <section id="plan" className="section">
        <div className="wrap">
          <div className="home-intro">
            <span className="eyebrow">Care team planning</span>
            <h2 className="h2">It starts with a question.</h2>
            <p className="lead">
              Based on the Uniform Health-Care Decisions Act (UHCDA) 2023 and collaboration
              with subject matter experts, we crafted 30 questions that lead to love — so a
              whole family can deliver dignified end-of-life experiences together. Every
              question moves through three checkpoints.
            </p>
          </div>
          <QuestionJourney />
          <p className="home-footnote">
            Every option comes with medical and legal, relational and social education on
            end-of-life care — generated with AI and grounded in the lived experiences of
            medical migrants and their collectivist families.
          </p>
        </div>
      </section>

      {/* ── The care team page ── */}
      <section id="team" className="section section--band">
        <div className="wrap">
          <div className="home-intro">
            <span className="eyebrow">Your care team page</span>
            <h2 className="h2">Everything your family shares, in one place.</h2>
            <p className="lead">
              Every care team gets its own private space — a feed of answers, check-ins and
              celebrations, and the tools that keep a family close through the hardest season.
            </p>
          </div>
          <CareTeamShowcase />
        </div>
      </section>

      {/* ── Fund: purpose-based care funds ── */}
      <section id="fund" className="section section--cream">
        <FundExplorer
          intro={(
              <div>
                <span className="eyebrow">Care fund pooling</span>
                <h2 className="h2">What families already do, made dependable.</h2>
                <p className="lead">
                  Pooling money is something our cultures already know — <i>paluwagan</i> in the
                  Philippines, <i>esusu</i> in Nigeria. Instead of reactionary cash remittances
                  during a family emergency, care teams proactively pool monthly for each other’s
                  end-of-life care, with shared visibility and family-agreed release.
                </p>
              </div>
          )}
        />
      </section>

      {/* ── Advocate: the 7-stage workbook ── */}
      <section id="advocate" className="section">
        <div className="wrap">
          <div className="home-intro">
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
          </div>
          <StageExplorer />
        </div>
      </section>

      {/* ── What makes us different ── */}
      <section className="section">
        <div className="wrap">
          <div className="home-intro">
            <h2 className="h2">Nothing else is built for families like ours.</h2>
          </div>
          <div className="diff">
            <article className="diff__item diff__item--wide">
              <div className="diff__art diff__art--we" aria-hidden="true">
                <span className="diff__one"><i /></span>
                <span className="diff__vs">→</span>
                <span className="diff__many">
                  {Object.values(FACES).map((src) => <img key={src} src={src} alt="" />)}
                </span>
              </div>
              <h3>{DIFFERENT[0].title}</h3>
              <p>{DIFFERENT[0].body}</p>
            </article>
            <article className="diff__item">
              <div className="diff__art diff__art--book" aria-hidden="true">
                <div className="wb">
                  <div className="wb__page">
                    <span className="wb__k">Stage 1 · Permission</span>
                    <b className="wb__t">Hopes and Fears</b>
                    {['Name what you hope for', 'Name what you fear', 'Walk both roads at once'].map((t, i) => (
                      <span className="wb__row" key={t} style={{ '--i': i }}><i />{t}</span>
                    ))}
                  </div>
                  <div className="wb__tabs">
                    {['#b432a3', '#a83eb1', '#9b4abf', '#8e56cd', '#8262db', '#756ee9', '#697af7'].map((c, i) => (
                      <i key={c} style={{ background: c }} className={i === 0 ? 'is-on' : ''}>{i + 1}</i>
                    ))}
                  </div>
                </div>
              </div>
              <h3>{DIFFERENT[1].title}</h3>
              <p>{DIFFERENT[1].body}</p>
            </article>
            <article className="diff__item">
              <div className="diff__art diff__art--law" aria-hidden="true">
                <span className="diff__seal"><b>UHCDA</b><em>2023</em></span>
                <span className="diff__qs">{Array.from({ length: 30 }, (_, i) => <i key={i} />)}</span>
              </div>
              <h3>{DIFFERENT[2].title}</h3>
              <p>{DIFFERENT[2].body}</p>
            </article>
            <article className="diff__item diff__item--wide">
              <div className="diff__art diff__art--money" aria-hidden="true">
                <span className="diff__plan"><b>Q21</b>Where would you feel most at peace?</span>
                <span className="diff__link" />
                <span className="diff__fund">{[62, 50, 36, 30, 56].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</span>
              </div>
              <h3>{DIFFERENT[3].title}</h3>
              <p>{DIFFERENT[3].body}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Sponsor a care team ── */}
      <section className="section section--cream">
        <div className="wrap home-split home-sponsor">
          <div className="home-sponsor__copy">
            <span className="eyebrow">Sponsor a care team</span>
            <h2 className="h2">€30 opens a family’s whole care plan.</h2>
            <p className="lead">
              Paid once, for the whole team. Your gift covers their platform fee — it never
              becomes cash, and nothing about the family flows back to you.
            </p>
            <div className="home-cta">
              <a className="btn" href={SPONSOR_URL}>Sponsor a family — €30</a>
              <a className="btn btn--ghost" href={`${SPONSOR_URL}/organizations`}>Sponsoring as an organization?</a>
            </div>
          </div>
          <SponsorJourney />
        </div>
      </section>

      {/* ── Final: go to the app and sign up ── */}
      <section className="home-signup">
        <div className="wrap home-signup__grid">
          <div>
            <h2 className="h2">Start your family’s care plan today.</h2>
            <p>
              It’s free to begin. Create your account, bring your three circles of care
              together, and answer your first question as a family.
            </p>
            <div className="home-cta">
              <a className="btn btn--light" href={REGISTER_URL}>Create your free account</a>
              <a className="btn btn--line" href={LOGIN_URL}>Sign in</a>
            </div>
          </div>
          <ol className="home-signup__steps">
            <li><b>1</b><div><strong>Create your account</strong><span>Sign up with your email — it takes a minute.</span></div></li>
            <li><b>2</b><div><strong>Start your care team</strong><span>Invite your immediate family, your family back home, and your chosen family.</span></div></li>
            <li><b>3</b><div><strong>Answer your first question</strong><span>“Is A Whole Family Matter for you?” — together.</span></div></li>
          </ol>
        </div>
      </section>
    </>
  );
}
