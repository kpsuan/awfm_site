'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Hero background montage (licensed Envato clips on Cloudinary).
export const HERO_VIDEOS = [
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1791178169/healthcare-provider-holding-elderly-patient-s-hand-2026-10-02-19-15-58-utc_rzhb0i.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1791179341/smiling-woman-assisted-by-caregiver-in-a-living-ro-2026-10-03-05-37-16-utc_hmz827.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1791184558/affectionate-couple-embracing-in-urban-canal-setti-2026-10-02-19-21-48-utc_oggy0e.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1791183998/healthcare-worker-with-senior-in-green-urban-park-2026-10-02-14-07-52-utc_ubgjuy.mp4',
];
const HERO_CLIP_SECONDS = 7;

export const heroPoster = (url) =>
  url.replace('/video/upload/', '/video/upload/so_0/').replace(/\.(mp4|webm|mov)(\?.*)?$/, '.jpg');

export function HeroMontage({ clips }) {
  const [idx, setIdx] = useState(0);
  const reduced = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced || clips.length < 2) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % clips.length), HERO_CLIP_SECONDS * 1000);
    return () => clearInterval(t);
  }, [clips.length, reduced]);

  if (reduced) {
    return <img className="cl-hero__film is-on" src={heroPoster(clips[0])} alt="" />;
  }
  // Two mounted layers: the active clip and the next one warming up.
  const nxt = (idx + 1) % clips.length;
  return (
    <>
      {[idx, nxt].map((ci, layer) => (
        <video
          key={clips[ci] + (layer === 0 ? '-a' : '-b')}
          className={`cl-hero__film${layer === 0 ? ' is-on' : ''}`}
          src={clips[ci]}
          poster={heroPoster(clips[ci])}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        />
      ))}
    </>
  );
}
// Intro statement helpers (Sora-style): words that brighten on scroll,
// with small inline video chips embedded mid-sentence.
export const wds = (t) => t.split(' ').map((w, i) => (
  <span className="cl-wds__w" key={`${w}-${i}`}>{w}{' '}</span>
));
const chipClip = (u) => u.replace('q_auto:best,w_1920', 'q_auto,w_480');

export function WordChip({ clip }) {
  return (
    <span className="cl-wds__chip" aria-hidden="true">
      <video src={chipClip(clip)} poster={heroPoster(chipClip(clip))} muted loop autoPlay playsInline />
    </span>
  );
}

