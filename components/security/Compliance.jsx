'use client';

import { useState } from 'react';

// Taito-style compliance list: icon, title, expandable details.
export default function Compliance({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <ul className="sc-list">
      {items.map((it, i) => (
        <li key={it.title} className={open === i ? 'is-open' : ''}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            <span className="sc-ico" aria-hidden="true">{it.icon}</span>
            <strong>{it.title}</strong>
            <em>{open === i ? 'Close' : 'Details'}</em>
          </button>
          <div className="sc-detail"><div><p>{it.detail}</p></div></div>
        </li>
      ))}
    </ul>
  );
}
