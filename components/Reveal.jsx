'use client';

import { useEffect, useRef, useState } from 'react';

// One-shot fade-up when the element enters the viewport. Content renders
// visible in the static HTML and only hides once JS confirms motion is OK,
// so crawlers, no-JS and reduced-motion visitors always see everything.
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState('static');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return undefined;
    setState('hidden');
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState('shown'); io.disconnect(); }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${state} ${className}`.trim()}
      style={{ transitionDelay: state === 'shown' ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
