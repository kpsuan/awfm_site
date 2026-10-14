'use client';

import { useEffect, useState } from 'react';
import { APP_URL } from '@/config/site';
import { OPEN_SETTINGS_EVENT, readConsent, writeConsent } from './consent';
import './CookieBanner.css';

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (value) => { writeConsent(value); setOpen(false); };

  return (
    <div className="ck" role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <p className="ck__text">
        We don&rsquo;t use analytics or advertising cookies on this site. Our community video is
        embedded from YouTube, which may set its own cookies when it plays — accept all to watch
        it here, or keep essential only and we&rsquo;ll open it on YouTube instead.{' '}
        <a href={`${APP_URL}/cookie-policy`}>Cookie Policy</a>
      </p>
      <div className="ck__actions">
        <button type="button" className="ck__btn ck__btn--line" onClick={() => choose('essential')}>Essential only</button>
        <button type="button" className="ck__btn ck__btn--fill" onClick={() => choose('all')}>Accept all</button>
      </div>
    </div>
  );
}
