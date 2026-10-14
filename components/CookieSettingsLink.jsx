'use client';

import { openCookieSettings } from './consent';

export default function CookieSettingsLink() {
  return <button type="button" className="foot__cookie" onClick={openCookieSettings}>Cookie settings</button>;
}
