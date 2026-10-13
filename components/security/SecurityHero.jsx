import './SecurityHero.css';

// Primefold-style hero: nested arch rings with glowing arcs travelling
// along them, around a GDPR tile stacked on the brand mark.
const RINGS = [210, 184, 158, 132, 106];

export default function SecurityHero({ children }) {
  return (
    <section className="sh">
      <div className="sh__inner">
        <div className="sh__copy">{children}</div>
        <div className="sh__art" aria-hidden="true">
          <svg viewBox="0 0 480 520" className="sh__rings">
            <defs>
              <linearGradient id="shGlowA" x1="0" x2="1"><stop offset="0" stopColor="#e05cc9" stopOpacity="0" /><stop offset="1" stopColor="#e05cc9" /></linearGradient>
              <linearGradient id="shGlowB" x1="0" x2="1"><stop offset="0" stopColor="#f6a51d" stopOpacity="0" /><stop offset="1" stopColor="#f6a51d" /></linearGradient>
              <linearGradient id="shGlowC" x1="0" x2="1"><stop offset="0" stopColor="#ffffff" stopOpacity="0" /><stop offset="1" stopColor="#ffffff" /></linearGradient>
            </defs>
            {RINGS.map((r, i) => {
              const d = `M ${240 - r} 520 V ${250} A ${r} ${r} 0 0 1 ${240 + r} 250 V 520`;
              return (
                <g key={r}>
                  <path d={d} className="sh__ring" />
                  {i < 3 && (
                    <path
                      d={d}
                      className={`sh__glow sh__glow--${i}`}
                      stroke={`url(#shGlow${'ABC'[i]})`}
                      pathLength="100"
                    />
                  )}
                </g>
              );
            })}
          </svg>
          <div className="sh__tiles">
            <div className="sh__tile sh__tile--gdpr">
              <span className="sh__stars">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--i': i }}>★</i>)}</span>
              <b>GDPR</b>
            </div>
            <div className="sh__tile sh__tile--logo"><img src="/logo.png" alt="" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
