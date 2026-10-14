'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FilmHero from './FilmHero';
import { HERO_VIDEOS, WordChip, wds } from './media';
import { videosAllowed } from '../consent';
import { COMMUNITY_URL } from '@/config/site';
import './CommunityLanding.css';

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
const VIDEO_ID = 'SmXsymSSHoI';

// The free community on Mighty Networks (awholefamilymatter.com): a guided
// decision-learning space. Copy follows the community's own welcome page.

const EACH_QUESTION = [
  ['Five guided lessons', 'Seven to ten minutes each, one question at a time.'],
  ['Reflection prompts', 'Pause and notice what the question brings up for you.'],
  ['Polls and discussions', 'See how other families are thinking it through.'],
  ['Day-by-day micro-feed', 'Small posts that keep the question with you all week.'],
  ['Checkpoint moments', 'Mark where you stand, and watch your thinking change.'],
];

const LESSONS = [
  ['What this question is really about', 'Understand the deeper meaning behind the question.'],
  ['What the research shows', 'Ground your thinking in real-world evidence.'],
  ['The mechanisms that shape decisions', 'Explore identity, fear, systems, and hidden influences.'],
  ['Why this question is hard', 'Recognise the emotional, relational, and psychological barriers.'],
  ['What this clarifies, and what it doesn’t', 'Walk away with grounded, realistic clarity.'],
];

const CHECKPOINTS = [
  ['Your position', 'What do you believe right now?'],
  ['Your challenges', 'What feels difficult, unclear, or unresolved?'],
  ['Your mind-changers', 'What has influenced or shifted your thinking?'],
];

const IS = [
  'A space for clarity and preparation',
  'A structured way to think through complex decisions',
  'A bridge between research and real-life experience',
];
const IS_NOT = [
  'A substitute for medical or legal advice',
  'A place to find “one correct answer”',
  'A passive learning experience',
];

const HERO_PROMPTS = [
  { chip: 'Why', text: 'Why do our families suffer at end of life in silence?' },
  { chip: 'Where', text: 'Where does the suffering concentrate — and why there?' },
  { chip: 'How', text: 'How does the system keep regenerating?' },
];

const ART = {
  a: 'https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_900/v1791965548/Dreamy_Forest_Motion_Portrait_zqhppd.png',
  b: 'https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_900/v1791965161/Dreamlike_Decay__Rusted_Wheelchair_in_a_Sunlit_Ruin_n7gf71.png',
  c: 'https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_900/v1791965288/Spectral_Hydra_in_the_Medical_Mist_edpy7o.png',
};

// Global Problems: the community's three courses (copy from the community).
const COURSES = [
  {
    q: 'Why', title: 'The Conspiracy of Silence', tag: '#BreakTheSilence', post: '/blog/the-conspiracy-of-silence/', meta: '12 lessons · 1 quiz', art: ART.a,
    body: 'Why diaspora families suffer at end of life — why a terminal diagnosis vanishes between the family, the physician, and a system with no room for the conversation.',
    breaks: 'Breaks the silence about death',
  },
  {
    q: 'Where', title: 'The Worst Places to Die', tag: '#DeathDebtIsStructural', post: '/blog/the-worst-places-to-die/', meta: '8 lessons', art: ART.b,
    body: 'Where the suffering concentrates, and why in twelve countries: ten structural factors, three feedback loops, and the true cost of dying.',
    breaks: 'Breaks the silence about money',
  },
  {
    q: 'How', title: 'The Six-Headed Hydra', tag: '#FightTheHydra', post: '/blog/the-six-headed-hydra/', meta: '11 lessons', art: ART.c,
    body: 'How the same pattern replicates across six colonial language pipelines — English, French, Belgian, Dutch, Portuguese and Spanish — and how it regenerates.',
    breaks: 'Names the system you live inside',
  },
];

const PRACTICES = [
  ['Proactive Family Involvement', 'Bringing everyone into the caring before a crisis, instead of scrambling after one.'],
  ['Shared Decision-Making', 'Making the big choices together, so no one carries them alone and no one is left out.'],
  ['Advance Care Planning', 'Talking through what your family wants ahead of time, so love can guide the hard moments instead of panic.'],
];

const INNOVATIONS = [
  { title: 'Interdependent Care Planning', body: 'The guided way your family decides together what it wants, through the planning questions — three circles of care working as one whole family support system.', meta: '217 lessons · 35 quizzes' },
  { title: 'ICP Care Fund Pooling', body: 'Brings your family’s care money out of the shadows — with A Whole Family Matter never touching a single euro of it.' },
  { title: 'ICP Advocacy Learning', body: 'The workbook that gets your family ready to be heard in real hospital rooms.' },
  { title: 'ICP Care Team Journey', body: 'Learn the stages, form a care team and get it sponsored, and make care a daily habit — alongside four exemplar families.', meta: 'The Santos, Vrede, Adebayo and Wulandari families' },
];

const GROUPS = ['Care Team Planning', 'Care Fund Pooling', 'Advocacy Learning', 'Sponsor a Care Team'];

export default function CommunityLanding() {
  const root = useRef(null);
  const [playVideo, setPlayVideo] = useState(false);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const revealEls = root.current.querySelectorAll('[data-reveal]');
        gsap.set(revealEls, { opacity: 0, y: 26 });
        ScrollTrigger.batch(revealEls, {
          start: 'top 85%',
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }),
        });

        // Welcome statement: words brighten in sequence as you scroll; the
        // rail's line fills alongside. (Dim state set here, not in CSS, so
        // reduced-motion visitors read full-opacity text.)
        const introWords = gsap.utils.toArray('.cl-wds .cl-wds__w');
        if (introWords.length) {
          gsap.set(introWords, { opacity: 0.24 });
          gsap.to(introWords, {
            opacity: 1,
            stagger: 0.06,
            ease: 'none',
            scrollTrigger: { trigger: '.cl-wds', start: 'top 80%', end: 'bottom 45%', scrub: true },
          });
          gsap.fromTo('.cl-intro__line i', { scaleY: 0 }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.cl-intro__grid', start: 'top 75%', end: 'bottom 55%', scrub: true },
          });
        }
      });
    }, root);
    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <>
      <FilmHero
        kicker="Community Action Center"
        title={<>You are not alone.</>}
        sub="A Whole Family Matter is where you belong — a free community where medical migrants and their families learn the problems, the solutions, and how to care together."
        prompts={HERO_PROMPTS}
        primary={{ label: 'Join the community', href: COMMUNITY_URL }}
        secondary={{ label: 'See how it works', href: '#experience' }}
        inset
        image="https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_2000/v1791190625/Dreamy_Bayanihan_at_Sunrise_s80ewz.png"
      />

      <div className="cl cl--embed" ref={root}>
        {/* ── Welcome (Sora layout): rail + word-reveal statement + film ── */}
        <section className="cl-intro">
          <div className="cl-wrap">
            <div className="cl-intro__grid">
              <div className="cl-intro__rail">
                <span className="cl-eyebrow" data-reveal>Who it’s for</span>
                <span className="cl-intro__line" aria-hidden="true"><i /></span>
                <p className="cl-intro__note" data-reveal>
                  You’re a healthcare worker from the Philippines, Nigeria, India, Ghana, Jamaica —
                  or any of the twelve countries that send the world its carers.
                </p>
                <a className="cl-cta cl-intro__btn" href={COMMUNITY_URL}>Join the community</a>
              </div>
              <p className="cl-wds">
                {wds('You lead your immediate family, your family back home,')}
                <WordChip clip={HERO_VIDEOS[0]} />
                {wds('and your chosen family through care planning')}
                <WordChip clip={HERO_VIDEOS[2]} />
                {wds('— as one team.')}
              </p>
            </div>
            <div className="cl-video" data-reveal>
              {playVideo ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                  title="This is A Whole Family Matter"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="cl-video__poster"
                  onClick={() => {
                    // Embed only with consent; otherwise watch on YouTube.
                    if (videosAllowed()) setPlayVideo(true);
                    else window.open(`https://www.youtube.com/watch?v=${VIDEO_ID}`, '_blank', 'noopener');
                  }}
                  aria-label="Play: This is A Whole Family Matter"
                >
                  <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="" loading="lazy" />
                  <span className="cl-video__play">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Global Problems: three courses ── */}
        <section id="courses" className="cm-problems">
          <div className="cl-wrap">
            <div className="cm-head cm-head--light" data-reveal>
              <span className="cl-eyebrow">Global Problems</span>
              <h2 className="cl-h2">Three courses. One system.<br />You live on both sides of it.</h2>
              <p className="cm-lead">
                You work a shift in London or Paris, Rotterdam or Lisbon. You deliver a good death
                every working day. Then you call home — and your family is dying inside a system
                that does not have what you have.
              </p>
            </div>
            <div className="cm-courses">
              {COURSES.map((c) => (
                <a className="cm-course" href={c.post} key={c.title} data-reveal>
                  <span className="cm-course__art" style={{ backgroundImage: `url(${c.art})` }} aria-hidden="true" />
                  <span className="cm-course__q">{c.q}</span>
                  <div className="cm-course__body">
                    <span className="cm-course__meta">{c.meta}</span>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    <span className="cm-course__breaks">{c.breaks}</span>
                    <span className="cm-course__tag">{c.tag}</span>
                    <span className="cm-course__more">Read about it &rarr;</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leading Solutions ── */}
        <section id="solutions" className="cm-sec cm-sec--cream">
          <div className="cl-wrap cm-split">
            <div className="cm-head" data-reveal>
              <span className="cl-eyebrow">Leading Solutions</span>
              <h2 className="cl-h2">Good ways to care — with or without us.</h2>
              <p className="cm-lead">
                You need what’s in this section whether or not you ever use A Whole Family Matter.
                These are human ways of caring for family that work in any home, in any country —
                no app, no account, no euro spent.
              </p>
            </div>
            <ul className="cm-practices">
              {PRACTICES.map(([t, d]) => (
                <li key={t} data-reveal><strong>{t}</strong><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Our Innovations ── */}
        <section id="innovations" className="cm-sec">
          <div className="cl-wrap">
            <div className="cm-head" data-reveal>
              <span className="cl-eyebrow">Our Innovations</span>
              <h2 className="cl-h2">The part that’s actually ours.</h2>
              <p className="cm-lead">
                Guided courses and tools that turn those principles into something your family can
                do together — even scattered across the world. Every course in the community is free.
              </p>
            </div>
            <div className="cm-innov">
              {INNOVATIONS.map((x, i) => (
                <article key={x.title} data-reveal className={i === 0 ? 'is-lead' : ''}>
                  <h3>{x.title}</h3>
                  <p>{x.body}</p>
                  {x.meta && <span>{x.meta}</span>}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── What each question includes ── */}
        <section id="experience" className="cm-sec">
          <div className="cl-wrap">
            <div className="cm-head" data-reveal>
              <span className="cl-eyebrow">Inside every ICP question</span>
              <h2 className="cl-h2">Every question is a guided journey, from understanding to reflection to clarity.</h2>
            </div>
            <ul className="cm-includes">
              {EACH_QUESTION.map(([t, d]) => (
                <li key={t} data-reveal><strong>{t}</strong><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The five-lesson flow (a real sequence) ── */}
        <section className="cm-sec cm-sec--cream">
          <div className="cl-wrap cm-split">
            <div className="cm-head" data-reveal>
              <span className="cl-eyebrow">Your learning journey</span>
              <h2 className="cl-h2">Designed for depth, not speed.</h2>
              <p className="cm-lead">
                Every question follows the same five lessons. Take one at a time, pause
                before moving on, and join at least one discussion or poll along the way.
                Move at your own pace — the value comes from engagement, not completion.
              </p>
            </div>
            <ol className="cm-lessons">
              {LESSONS.map(([t, d], i) => (
                <li key={t} data-reveal>
                  <span className="cm-lessons__n">{i + 1}</span>
                  <div><strong>{t}</strong><span>{d}</span></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── The decision map ── */}
        <section className="cm-sec">
          <div className="cl-wrap">
            <div className="cm-head" data-reveal>
              <span className="cl-eyebrow">Your decision map</span>
              <h2 className="cl-h2">Checkpoints aren’t tests. They’re pauses that show how your thinking evolves.</h2>
            </div>
            <ol className="cm-checks">
              {CHECKPOINTS.map(([t, q], i) => (
                <li key={t} data-reveal>
                  <span className="cm-checks__n">Checkpoint {i + 1}</span>
                  <strong>{t}</strong>
                  <p>“{q}”</p>
                </li>
              ))}
            </ol>
            <p className="cm-profile" data-reveal>
              Over time, your checkpoints form your <b>Personal Decision Profile</b> — a
              record of where you stand and what moved you.
            </p>
          </div>
        </section>

        {/* ── Community Support Groups ── */}
        <section id="groups" className="cm-sec cm-groups">
          <div className="cl-wrap cm-split">
            <div className="cm-head" data-reveal>
              <span className="cl-eyebrow">Community Support Groups</span>
              <h2 className="cl-h2">The success of one is the success of all.</h2>
              <p className="cm-lead">
                You can have the best tools in the world and still feel alone with them at 2 a.m.,
                a continent away. This isn’t a Western-style support group — it’s closer to what our
                cultures already know: the barangay, the extended family, the neighbours who simply
                show up when it matters.
              </p>
            </div>
            <div className="cm-groups__list" data-reveal>
              <div className="cm-group cm-group--lead">
                <strong>ICP Care Team Leaders</strong>
                <span>The people a few steps ahead, who guide other families and hold each other up — helping redistribute the load of a world carried mostly by women.</span>
              </div>
              {GROUPS.map((g) => <div className="cm-group" key={g}><strong>{g}</strong></div>)}
              <div className="cm-group cm-group--soon">
                <div className="cm-fac">
                  <div className="cm-fac__top"><strong>ICP Facilitator Network</strong><em>Coming soon</em></div>
                  <span>Guides from your own diaspora who share your values and lived experience.</span>
                  <ul>
                    <li><b>For families</b> — care planning, fund pooling and advocacy learning become social justice work.</li>
                    <li><b>For facilitators</b> — a practical opportunity to help their people.</li>
                    <li><b>For everyone’s future</b> — death education becomes death modeling: living the example.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Is / is not ── */}
        <section className="cm-sec cm-sec--cream">
          <div className="cl-wrap">
            <div className="cm-head" data-reveal>
              <span className="cl-eyebrow">Know what to expect</span>
              <h2 className="cl-h2">A reflection space, not a debate space.</h2>
              <p className="cm-lead">
                Some lessons may feel heavy, personal, and uncomfortable — that’s part of the
                process, not a flaw in it. Be respectful of different perspectives, thoughtful
                in your responses, and supportive, not judgmental. You can always pause and
                come back when you’re ready.
              </p>
            </div>
            <div className="cm-isnot" data-reveal>
              <div>
                <h3>A Whole Family Matter is</h3>
                <ul>{IS.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="cm-isnot__not">
                <h3>It is not</h3>
                <ul>{IS_NOT.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing: frosted card over the golden-sky landscape ── */}
        <section className="cl-voices">
          <div className="cl-voices__card" data-reveal>
            <span className="cl-voices__badge">Join the conversation that matters most</span>
            <h2 className="cl-voices__h">This space isn’t about solving everything at once.</h2>
            <p>
              It’s about becoming more aware, more prepared, and more aligned with what
              matters most. A step-by-step decision journey, a private and supportive
              community, and resources on demand — on the web and on your phone.
            </p>
            <a className="cl-cta cl-voices__btn" href={COMMUNITY_URL}>Join the community</a>
          </div>
        </section>
      </div>
    </>
  );
}
