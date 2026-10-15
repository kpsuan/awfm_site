'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOGIN_URL, REGISTER_URL } from '@/config/site';
import { MENUS } from './NavMenus';
import './SiteNav.css';

const LINKS = [
  { menu: 'product', label: 'Products' },
  { menu: 'solutions', label: 'Solutions' },
  { menu: 'resources', label: 'Resources' },
  { href: '/pricing/', label: 'Pricing' },
  { menu: 'company', label: 'Company' },
];

// Fixed nav. On the community page it starts transparent over the film hero;
// everywhere it turns into a compact glass bar once the visitor scrolls.
export default function SiteNav({ featured }) {
  const pathname = usePathname();
  const overlay = ['/', '/security/', '/security'].includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMenu(null); }, [pathname]);
  useEffect(() => {
    if (!menu) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenu(null); };
    const onDoc = (e) => { if (!e.target.closest('.nav__menu')) setMenu(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onDoc);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onDoc); };
  }, [menu]);

  const cls = ['nav', overlay ? 'nav--overlay' : '', scrolled ? 'is-scrolled' : '', open ? 'is-open' : '']
    .filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <Link href="/" className="nav__brand" aria-label="A Whole Family Matter — home">
        <img src="/logo.png" alt="" width="34" height="34" />
        <span>a whole <strong>family matter</strong></span>
      </Link>
      <nav className="nav__links" aria-label="Site">
        {LINKS.map((l) => (l.menu ? (
          <div
            key={l.menu}
            className={`nav__menu${menu === l.menu ? ' is-open' : ''}`}
            onMouseEnter={() => setMenu(l.menu)}
            onMouseLeave={() => setMenu(null)}
          >
            <button
              type="button"
              className="nav__menubtn"
              aria-expanded={menu === l.menu}
              aria-haspopup="menu"
              onClick={() => setMenu(menu === l.menu ? null : l.menu)}
            >
              {l.label}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className={`mega${menu === l.menu ? ' is-open' : ''}`} role="menu" aria-hidden={menu !== l.menu}>
              {(() => { const M = MENUS[l.menu]; return <M close={() => { setMenu(null); setOpen(false); }} featured={featured} />; })()}
            </div>
          </div>
        ) : (
          <Link key={l.href} href={l.href} aria-current={pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href)) ? 'page' : undefined}>
            {l.label}
          </Link>
        )))}
      </nav>
      <div className="nav__right">
        <a className="nav__login" href={LOGIN_URL}>Sign in</a>
        <a className="nav__join" href={REGISTER_URL}>Join free</a>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
