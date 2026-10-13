'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOGIN_URL, REGISTER_URL } from '@/config/site';
import './SiteNav.css';

const LINKS = [
  { href: '/', label: 'The app' },
  { href: '/community/', label: 'Community' },
  { href: '/about/', label: 'About' },
  { href: '/team/', label: 'Team' },
  { href: '/security/', label: 'Security' },
];

// Fixed nav. On the community page it starts transparent over the film hero;
// everywhere it turns into a compact glass bar once the visitor scrolls.
export default function SiteNav() {
  const pathname = usePathname();
  const overlay = pathname === '/community/' || pathname === '/community';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const cls = ['nav', overlay ? 'nav--overlay' : '', scrolled ? 'is-scrolled' : '', open ? 'is-open' : '']
    .filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <Link href="/" className="nav__brand" aria-label="A Whole Family Matter — home">
        <img src="/logo.png" alt="" width="34" height="34" />
        <span>a whole <strong>family matter</strong></span>
      </Link>
      <nav className="nav__links" aria-label="Site">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
            {l.label}
          </Link>
        ))}
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
