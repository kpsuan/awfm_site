'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Re-applies the #anchor once the page has laid out: sections far down the
// page shift as media above them loads, so the browser's initial jump can
// land short. Runs on every route change.
export default function HashScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    const go = () => document.getElementById(id)?.scrollIntoView({ block: 'start' });
    const timers = [80, 400, 1200].map((ms) => setTimeout(go, ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname]);
  return null;
}
