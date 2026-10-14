'use client';

import { useState } from 'react';
import { SPONSOR_URL } from '@/config/site';
import './SponsorCards.css';

const CLD = 'https://res.cloudinary.com/de3kbbv2o';
const I = (d) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
const SOON_ICONS = [
  I(<path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />),
  I(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" /></>),
  I(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>),
  I(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 11h18M8 7V5a4 4 0 0 1 8 0v2" /></>),
  I(<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />),
  I(<><path d="M20 12v9H4v-9" /><path d="M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></>),
  I(<><path d="M4 4h16v12H5.2L4 17.2V4z" /><path d="M8 9h8M8 12h5" /></>),
  I(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  I(<path d="m5 12 5 5 9-10" />),
];

const CARDS = [
  {
    key: 'org', badge: 'OA', tone: 'amber', label: 'Organizations & associations', status: 'Live today · €30 per team',
    title: 'Organizations & associations', body: 'Associations, diaspora networks and congregations activate 5, 10, 25 or 50 care teams at €30 each — one charge, one receipt.',
    href: `${SPONSOR_URL}/organizations`, cta: 'Sponsor now',
    media: (
      <div className="sc-media">
        <img className="sc-photo sc-photo--framed" src={`${CLD}/image/upload/f_auto,q_auto,w_900/v1791963926/busy-crossing-street-in-hong-kong-china-2026-09-25-08-19-34-utc_wktfrp.jpg`} alt="" />
      </div>
    ),
  },
  {
    key: 'family', badge: 'SF', tone: 'brand', label: 'Sponsor a family', status: 'Preview',
    title: 'Sponsor a family', body: 'Soon you’ll pick a family who shared their story and open their whole care plan — with nothing about them flowing back to you. See how it will work.',
    href: SPONSOR_URL, cta: 'See how it works',
    media: (
      <div className="sc-media sc-media--family">
        <img className="sc-photo" src={`${CLD}/image/upload/f_auto,q_auto,w_900,ar_4:3,c_fill,g_auto/v1791266522/a3b49eac3bd0e12cd395a5a6261d3f4a_vxkhrf.jpg`} alt="" />
        <div className="sc-glass sc-glass--a"><span>Sample family · Yogyakarta</span><b>€30</b><em>Needs: their plan unlock</em></div>
        <div className="sc-glass sc-glass--b"><span>Status</span><b className="sc-ok">✓ Plan unlocked</b><em>Whole team, at once</em></div>
        <div className="sc-glass sc-glass--c"><span>Privacy</span><b>Nothing about the family flows to you</b></div>
      </div>
    ),
  },
  {
    key: 'soon', badge: 'BP', tone: 'violet', label: 'Blind-pool giving', status: 'Coming soon',
    title: 'Give to the next family in line', body: 'Blind-pool giving is on its way — give without choosing, and the next family waiting gets their plan.',
    href: SPONSOR_URL, cta: 'Learn more',
    media: (
      <div className="sc-media sc-media--icons">
        <div className="sc-icons">{SOON_ICONS.map((ic, i) => <span key={i}>{ic}</span>)}</div>
      </div>
    ),
  },
];

export default function SponsorCards() {
  const [open, setOpen] = useState(0);
  return (
    <div className="sc" onMouseLeave={() => setOpen(0)}>
      {CARDS.map((c, i) => (
        <article
          key={c.key}
          className={`sc-card${open === i ? ' is-open' : ''}`}
          onMouseEnter={() => setOpen(i)}
          onFocus={() => setOpen(i)}
        >
          <header className="sc-head">
            <span className={`sc-badge sc-badge--${c.tone}`}>{c.badge}</span>
            <strong>{c.label}</strong>
            <em>{c.status}</em>
          </header>
          {c.media}
          <footer className="sc-foot">
            <div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
            <a className="sc-btn" href={c.href}>{c.cta}</a>
          </footer>
        </article>
      ))}
    </div>
  );
}
