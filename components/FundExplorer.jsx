'use client';

import { useState } from 'react';
import FundPool from './FundPool';
import './FundExplorer.css';

// The five pools of one Care Fund, as the app presents them: icon, label,
// hint, a goal gauge, and the moment that is specific to that pool. Labels,
// hints, targets and status strings follow the app (Funding/constants.js,
// SetupWizard defaults, WithdrawTab / ContributeTab copy).
const eur = (n) => `€${Math.round(n).toLocaleString('en-NL')}`;

const ICONS = {
  urgent: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  qol: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  legacy: <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z" />,
  repat: <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />,
  mutual: (
    <>
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 15 6 6" />
      <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
    </>
  ),
};

const POOLS = [
  {
    key: 'urgent', name: 'Urgent', label: 'Urgent / Active Medical',
    hint: 'Active medical: meds, equipment, treatment.', blurb: 'For the emergency no one saw coming.',
    saved: 3100, target: 5000,
    moment: (
      <div className="fx-moment fx-moment--alert">
        <strong>Emergency override</strong>
        <p>Your Emergency Approver can release Urgent funds without the normal approval process — for when minutes matter.</p>
        <span className="fx-btn fx-btn--solid">Trigger override</span>
      </div>
    ),
  },
  {
    key: 'qol', name: 'Quality of life', label: 'Quality of Life / Dignity',
    hint: 'Dignity costs: home mods, in-home care.', blurb: 'Comfort, care, and dignity in the time that remains.',
    saved: 1500, target: 3000,
    moment: (
      <div className="fx-moment">
        <div className="fx-req"><strong>In-home care</strong><span>{eur(600)}</span></div>
        <div className="fx-votes"><i className="is-on" /><i /></div>
        <p className="fx-meta">1 of 2 approvals · Waiting on 1 approval</p>
        <div className="fx-actions"><span className="fx-btn fx-btn--solid">Approve</span><span className="fx-btn">Deny</span></div>
      </div>
    ),
  },
  {
    key: 'legacy', name: 'Legacy and rites', label: 'Legacy & Rites / Ceremony',
    hint: 'Burial rites, mourning, ceremony.', blurb: 'Honouring a life the way the family believes it should be.',
    saved: 1440, target: 4000,
    moment: (
      <div className="fx-moment">
        <div className="fx-req"><strong>Ate logged a contribution</strong><span className="fx-pill fx-pill--ok">Received</span></div>
        <ol className="fx-steps">
          <li>Send the money</li><li>Log it here</li><li>The Custodian confirms receipt</li>
        </ol>
      </div>
    ),
  },
  {
    key: 'repat', name: 'Repatriation', label: 'Repatriation / Transport',
    hint: 'Body transport, emergency travel.', blurb: 'Bringing a loved one home.',
    saved: 3600, target: 12000,
    moment: (
      <div className="fx-moment">
        <div className="fx-req"><strong>Emergency travel</strong><span>{eur(1200)}</span></div>
        <span className="fx-pill">Approved · awaiting release</span>
        <p className="fx-meta">Approved and cleared — the money still needs to be sent, then recorded here.</p>
        <span className="fx-btn fx-btn--solid">Release funds</span>
      </div>
    ),
  },
  {
    key: 'mutual', name: 'Mutual aid', label: 'Mutual Aid / Whole-Family',
    hint: 'Whole-family resilience — children, surviving spouse.', blurb: 'Support for whoever in the circle needs it next.',
    saved: 4480, target: 8000,
    moment: (
      <div className="fx-moment fx-moment--quiet">
        <p className="fx-quote">“Mutual Aid carries on — the team still carrying each other.”</p>
        <p className="fx-meta">When a loved one dies, Urgent and Quality of Life are fulfilled, Legacy & Rites and Repatriation become active, and Mutual Aid keeps the family going.</p>
      </div>
    ),
  },
];

function Gauge({ pct }) {
  const r = 70;
  const len = Math.PI * r;
  return (
    <svg className="fx-gauge" viewBox="0 0 180 104" aria-hidden="true">
      <path d="M20 94 A70 70 0 0 1 160 94" className="fx-gauge__track" />
      <path
        d="M20 94 A70 70 0 0 1 160 94"
        className="fx-gauge__fill"
        style={{ strokeDasharray: len, strokeDashoffset: len * (1 - pct / 100) }}
      />
      <text x="90" y="80" textAnchor="middle" className="fx-gauge__n">{pct}%</text>
      <text x="90" y="99" textAnchor="middle" className="fx-gauge__l">of target</text>
    </svg>
  );
}

export default function FundExplorer({ intro }) {
  const [active, setActive] = useState(null);
  const pool = active === null ? null : POOLS[active];

  return (
    <>
      <div className="wrap home-split">
        {intro}
        <FundPool active={active} />
      </div>
      <div className="wrap">
        <p className="fx-tip">Tap a pool to open it</p>
        <div className="fx-tabs" role="tablist" aria-label="Care fund pools">
          {POOLS.map((p, i) => (
            <button
              key={p.key}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls="fx-panel"
              className={`fx-tab${active === i ? ' is-active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <strong>{p.name}</strong>
              <span>{p.blurb}</span>
            </button>
          ))}
        </div>

        <div id="fx-panel" role="tabpanel" className={`fx-panel${pool ? ' is-open' : ''}`} aria-hidden={!pool}>
          {pool && (
            <div className="fx-card" key={pool.key}>
              <div className="fx-card__head">
                <span className="fx-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[pool.key]}</svg>
                </span>
                <div>
                  <span className="fx-eyebrow">Care Fund · Pool</span>
                  <h3>{pool.name}</h3>
                  <p className="fx-label">{pool.label}</p>
                </div>
              </div>
              <div className="fx-card__body">
                <div className="fx-goal">
                  <Gauge pct={Math.round((pool.saved / pool.target) * 100)} />
                  <p className="fx-meta">Saved {eur(pool.saved)} · Target {eur(pool.target)}</p>
                  <p className="fx-hint">{pool.hint}</p>
                </div>
                {pool.moment}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
