'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Hero background montage — clips chosen for the communities we serve
// (Cloudinary collection, 16 Oct 2026).
export const HERO_VIDEOS = [
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1792146639/ElevenLabs_video_seedance-2-5-video-edit_please_turn_whi_2026-10-16T10_18_16_x42kpj.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1792146620/ElevenLabs_video_seedance-2-5_Turn_this_image_2026-10-16T10_29_19_rs6hwo.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1792146598/compassionate-nurse-supporting-senior-man-outdoors-2026-10-03-13-05-19-utc_li7fb5.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1792154925/ElevenLabs_video_seedance-2-5-video-edit_change_couple_e_2026-10-16T11_28_05_ccluyc.mp4',
  'https://res.cloudinary.com/de3kbbv2o/video/upload/f_auto,q_auto:best,w_1920/v1792146649/ElevenLabs_video_seedance-2-5_Create_video_of_2026-10-16T07_38_48_izomef.mp4',
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

