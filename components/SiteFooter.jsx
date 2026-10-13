import Link from 'next/link';
import { LEGAL_ENTITY, REGISTER_URL, LOGIN_URL, APP_URL, HELP_URL } from '@/config/site';
import './SiteFooter.css';

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot__top">
        <div className="foot__cta">
          <h2>Plan, fund, and advocate.<br />This is a whole family matter.</h2>
          <a className="btn foot__btn" href={REGISTER_URL}>Get Started Free</a>
          <div className="foot__tags" aria-label="Campaign hashtags">
            <span>#BreakTheSilence</span>
            <span>#DeathDebtIsStructural</span>
            <span>#FightTheHydra</span>
          </div>
        </div>
        <div className="foot__cols">
          <div className="foot__col">
            <h4>Platform</h4>
            <Link href="/#plan">Care team planning</Link>
            <Link href="/#fund">Care fund pooling</Link>
            <Link href="/#advocate">Patient advocacy</Link>
          </div>
          <div className="foot__col">
            <h4>Organisation</h4>
            <Link href="/about/">Our Story</Link>
            <Link href="/team/">Team</Link>
            <Link href="/security/">Security</Link>
            <Link href="/community/">Community</Link>
            <Link href="/blog/">Blog</Link>
          </div>
          <div className="foot__col">
            <h4>Account</h4>
            <a href={REGISTER_URL}>Join free</a>
            <a href={LOGIN_URL}>Sign in</a>
            <a href={HELP_URL}>Help Center</a>
            <a href={`${APP_URL}/legal`}>Privacy &amp; Legal Center</a>
          </div>
        </div>
      </div>
      <div className="foot__base">
        <img src="/logo.png" alt="" width="38" height="38" />
        <p>© {new Date().getFullYear()} {LEGAL_ENTITY.name} All rights reserved. Made in The Hague.</p>
        <p className="foot__entity">
          <strong>{LEGAL_ENTITY.name}</strong>
          <span>{LEGAL_ENTITY.address}</span>
          <span>KVK {LEGAL_ENTITY.kvk}</span>
          <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>
          <span>{LEGAL_ENTITY.phone}</span>
        </p>
      </div>
      <div className="foot__word" aria-hidden="true"><span>awfm.</span></div>
    </footer>
  );
}
