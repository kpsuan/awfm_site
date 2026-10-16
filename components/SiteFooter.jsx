import Link from 'next/link';
import { LEGAL_ENTITY, REGISTER_URL, LOGIN_URL, APP_URL, HELP_URL } from '@/config/site';
import CookieSettingsLink from './CookieSettingsLink';
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
            <h4>Product</h4>
            <Link href="/">Platform</Link>
            <Link href="/community/">Community</Link>
            <Link href="/security/">Security</Link>
            <Link href="/pricing/">Pricing</Link>
          </div>
          <div className="foot__col">
            <h4>Solutions</h4>
            <Link href="/solutions/families/">Families</Link>
            <Link href="/solutions/sponsors/">Sponsors</Link>
            <Link href="/solutions/organizations/">Organizations</Link>
          </div>
          <div className="foot__col">
            <h4>Resources</h4>
            <Link href="/blog/">Blog</Link>
            <Link href="/events/">Events</Link>
            <a href={HELP_URL}>Help Center</a>
          </div>
          <div className="foot__col">
            <h4>Company</h4>
            <Link href="/about/">Our story</Link>
            <Link href="/team/">Team</Link>
            <a href={`${APP_URL}/legal`}>Privacy &amp; Legal</a>
            <CookieSettingsLink />
            <a href={LOGIN_URL}>Sign in</a>
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
          <a href={`mailto:${LEGAL_ENTITY.infoEmail}`}>{LEGAL_ENTITY.infoEmail}</a>
          <span>{LEGAL_ENTITY.phone}</span>
        </p>
      </div>
      <div className="foot__word" aria-hidden="true"><span>awfm.</span></div>
    </footer>
  );
}
