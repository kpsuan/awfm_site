'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FilmHero from './FilmHero';
import { HERO_VIDEOS, WordChip, wds } from './media';
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

const HERO_PROMPTS = CHECKPOINTS.map(([, q], i) => ({ chip: `Checkpoint ${i + 1}`, text: q }));

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
        kicker="A guided community for families"
        title={<>You don’t have to<br />figure it out alone.</>}
        sub="A free, guided space for the hardest questions a family can face — serious illness, end-of-life care, and what truly matters."
        prompts={HERO_PROMPTS}
        primary={{ label: 'Join the community', href: COMMUNITY_URL }}
        secondary={{ label: 'See how it works', href: '#experience' }}
        inset
      />

      <div className="cl cl--embed" ref={root}>
        {/* ── Welcome (Sora layout): rail + word-reveal statement + film ── */}
        <section className="cl-intro">
          <div className="cl-wrap">
            <div className="cl-intro__grid">
              <div className="cl-intro__rail">
                <span className="cl-eyebrow" data-reveal>Welcome to the space</span>
                <span className="cl-intro__line" aria-hidden="true"><i /></span>
                <p className="cl-intro__note" data-reveal>
                  This isn’t a typical course, and it’s not meant to be. If you’re carrying
                  a heavy responsibility for your family’s future, start here.
                </p>
                <a className="cl-cta cl-intro__btn" href={COMMUNITY_URL}>Join the community</a>
              </div>
              <p className="cl-wds">
                {wds('A guided decision-learning space to clarify your values,')}
                <WordChip clip={HERO_VIDEOS[0]} />
                {wds('understand your reactions,')}
                <WordChip clip={HERO_VIDEOS[2]} />
                {wds('and prepare for the real-life decisions ahead.')}
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
                  onClick={() => setPlayVideo(true)}
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

        {/* ── What each question includes ── */}
        <section id="experience" className="cm-sec">
          <div className="cl-wrap">
            <div className="cm-head" data-reveal>
              <span className="cl-eyebrow">What you’ll experience</span>
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
