'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_VIDEOS, HeroMontage } from './media';
import './CommunityLanding.css';

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function TypedPrompt({ prompts }) {
  const [text, setText] = useState('');
  const [qi, setQi] = useState(0);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(prompts[0]);
      return undefined;
    }
    let phrase = 0;
    let pos = 0;
    let deleting = false;
    let t;
    const tick = () => {
      const full = prompts[phrase];
      pos += deleting ? -1 : 1;
      setText(full.slice(0, pos));
      let delay = deleting ? 24 : 52;
      if (!deleting && pos === full.length) { deleting = true; delay = 2200; }
      if (deleting && pos === 0) {
        deleting = false;
        phrase = (phrase + 1) % prompts.length;
        setQi(phrase);
        delay = 500;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, [prompts]);
  return (
    <>
      <span className="cl-ask__q">{`Q${qi + 1}`}</span>
      <span className="cl-ask__text">{text}<i className="cl-ask__caret" /></span>
    </>
  );
}

// Full-bleed film hero: crossfading footage, glass question box, pink CTA,
// copy anchored lower-left; shrinks into a rounded card on scroll.
export default function FilmHero({ kicker, title, sub, prompts, primary, secondary, longTitle = false }) {
  const root = useRef(null);
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero copy rises in on load (a scroll trigger would leave the
        // lower lines hidden until the visitor scrolls).
        gsap.from(root.current.querySelectorAll('[data-reveal]'), {
          opacity: 0, y: 26, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.15,
        });

        // Hero (Lassie-style): the full-bleed film shrinks into a rounded
        // inset card as the visitor scrolls away from the top.
        const heroEl = root.current.querySelector('.cl-hero--film');
        if (heroEl) {
          gsap.to(heroEl, {
            scale: 0.955,
            borderRadius: 40,
            transformOrigin: '50% 0%',
            ease: 'none',
            scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom 55%', scrub: 0.4 },
          });
        }

      });
    }, root);
    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <div className="cl cl--embed" ref={root}>
      <section className="cl-hero cl-hero--film">
        <div className="cl-hero__media" aria-hidden="true">
          <HeroMontage clips={HERO_VIDEOS} />
          <div className="cl-hero__scrim" />
        </div>
        <div className="cl-hero__inner">
          <span className="cl-eyebrow" data-reveal>{kicker}</span>
          <h1 className={`cl-h1${longTitle ? ' cl-h1--long' : ''}`} data-reveal>{title}</h1>
          <p className="cl-sub" data-reveal>{sub}</p>
          {prompts && prompts.length > 0 && (
            <div className="cl-ask" data-reveal aria-hidden="true">
              <TypedPrompt prompts={prompts} />
            </div>
          )}
          <div className="cl-hero__ctas" data-reveal>
            <a className="cl-cta cl-cta--pill" href={primary.href}>{primary.label}</a>
            {secondary && <a className="cl-cta cl-cta--ghost" href={secondary.href}>{secondary.label}</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
