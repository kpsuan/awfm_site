import Link from 'next/link';
import { LEGAL_ENTITY, REGISTER_URL, LOGIN_URL, APP_URL, HELP_URL, COMMUNITY_URL } from '@/config/site';
import CookieSettingsLink from './CookieSettingsLink';
import './SiteFooter.css';

const HELLO = 'help@awholefamilymatter.com';
// Engraved family-under-the-sky illustration; its plain sky blends into the
// footer ground (#483876), so the content sits on "sky".
const ART = 'https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_2400/v1791980820/Family_Beneath_the_Vast_Purple_Sky_u340vm.png';

const Icon = {
  mail: <path d="M3 6.5h18v11H3zM3.5 7l8.5 6.5L20.5 7" />,
  phone: <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />,
  pin: <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15 12 21 12 21z" /><circle cx="12" cy="10" r="2.3" /></>,
};
const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot__top">
        <div className="foot__brand">
          <Link href="/" className="foot__logo">
            <img src="/logo.png" alt="" width="44" height="44" />
            <span>a whole family matter</span>
          </Link>
          <p className="foot__tagline">
            Helping whole families plan, fund and advocate for a dignified death &mdash; together.
          </p>
          <ul className="foot__contact">
            <li><Ico d={Icon.mail} /><a href={`mailto:${HELLO}`}>{HELLO}</a></li>
            <li><Ico d={Icon.phone} /><a href={`tel:${LEGAL_ENTITY.phone.replace(/\s/g, '')}`}>{LEGAL_ENTITY.phone}</a></li>
            <li><Ico d={Icon.pin} /><span>The Hague, Netherlands</span></li>
          </ul>
        </div>

        <nav className="foot__cols" aria-label="Footer">
          <div className="foot__col">
            <h4>Product</h4>
            <Link href="/">Platform</Link>
            <a href={COMMUNITY_URL}>Community</a>
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
            <h4>Company</h4>
            <Link href="/about/">Our story</Link>
            <Link href="/team/">Team</Link>
            <Link href="/blog/">Blog</Link>
            <Link href="/events/">Events</Link>
          </div>
          <div className="foot__col">
            <h4>Support</h4>
            <a href={HELP_URL}>Help Center</a>
            <a href={LOGIN_URL}>Sign in</a>
            <a href={`${APP_URL}/legal`}>Privacy &amp; Legal</a>
          </div>
        </nav>

        <div className="foot__start">
          <h4>Start your plan</h4>
          <p>Questions 1&ndash;9 are free. Bring your three circles of care together today.</p>
          <a className="foot__startbtn" href={REGISTER_URL}>
            Get started free
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <div className="foot__tags" aria-label="Campaign hashtags">
            <span>#BreakTheSilence</span>
            <span>#DeathDebtIsStructural</span>
            <span>#FightTheHydra</span>
          </div>
        </div>
      </div>

      <div className="wrap foot__legal">
        <p>© {new Date().getFullYear()} {LEGAL_ENTITY.name} &middot; {LEGAL_ENTITY.address} &middot; KVK {LEGAL_ENTITY.kvk}</p>
        <div className="foot__legal-links">
          <a href={`${APP_URL}/privacy`}>Privacy Policy</a>
          <a href={`${APP_URL}/terms`}>Terms of Service</a>
          <a href={`${APP_URL}/cookie-policy`}>Cookie Policy</a>
          <CookieSettingsLink />
        </div>
      </div>

      <div className="foot__art" role="img" aria-label="A family standing together in a wide field beneath a purple sky." style={{ backgroundImage: `url(${ART})` }} />
    </footer>
  );
}
