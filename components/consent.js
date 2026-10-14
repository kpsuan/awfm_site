// Cookie consent for the .org site. The site itself sets no analytics or
// advertising cookies; the only third-party content is the embedded YouTube
// video (privacy-enhanced mode), so "all" means "embedded videos allowed".
export const CONSENT_KEY = 'awfm_org_consent';
export const CONSENT_EVENT = 'awfm:consent';
export const OPEN_SETTINGS_EVENT = 'awfm:cookie-settings';

export const readConsent = () => {
  try { return window.localStorage.getItem(CONSENT_KEY); } catch { return null; }
};

export const writeConsent = (value) => {
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* storage blocked */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
};

export const videosAllowed = () => readConsent() === 'all';

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
