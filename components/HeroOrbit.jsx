import './HeroOrbit.css';

// The three circles of care, drawn around the person being cared for:
// immediate family (inner), local or chosen family (middle), family back
// home (outer, farthest away). Each member is joined to the centre by a
// thread. Pure SVG + CSS, so it prerenders and needs no JS.
const C = 300;
const CLD = 'https://res.cloudinary.com/de3kbbv2o/video/upload';
// Portraits cropped from the licensed hero footage, keyed ring-member.
const HMZ = 'v1791179341/smiling-woman-assisted-by-caregiver-in-a-living-ro-2026-10-03-05-37-16-utc_hmz827.jpg';
const OGG = 'v1791184558/affectionate-couple-embracing-in-urban-canal-setti-2026-10-02-19-21-48-utc_oggy0e.jpg';
const UBG = 'v1791183998/healthcare-worker-with-senior-in-green-urban-park-2026-10-02-14-07-52-utc_ubgjuy.jpg';
const FACES = {
  'near-0': `${CLD}/so_7,c_crop,w_320,h_320,x_660,y_340/c_scale,w_120/f_auto,q_auto/${HMZ}`,
  'near-1': `${CLD}/so_1,c_crop,w_600,h_600,x_1380,y_40/c_scale,w_120/f_auto,q_auto/${OGG}`,
  'chosen-0': `${CLD}/so_7,c_thumb,g_face,w_120,h_120,z_0.75/f_auto,q_auto/${HMZ}`,
  'chosen-1': `${CLD}/so_5,c_crop,w_260,h_260,x_940,y_230/e_brightness:35/c_scale,w_120/f_auto,q_auto/${UBG}`,
  'home-0': `${CLD}/so_3,c_thumb,g_face,w_120,h_120,z_0.75/f_auto,q_auto/${OGG}`,
};

const RINGS = [
  { key: 'near', r: 96, label: 'Immediate family', dur: 70, members: [0, 135, 250] },
  { key: 'chosen', r: 172, label: 'Local or chosen family', dur: 110, members: [40, 160, 290] },
  { key: 'home', r: 252, label: 'Family back home', dur: 160, members: [15, 105, 200, 315] },
];

export default function HeroOrbit() {
  return (
    <figure className="orbit" aria-label="Three circles of care around the person being cared for: immediate family, local or chosen family, and family back home.">
      <svg viewBox="0 0 600 600" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="orbitCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="55%" stopColor="#f3c8ea" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b432a3" stopOpacity="0" />
          </radialGradient>
        </defs>

        {RINGS.map((ring, ri) => (
          <circle
            key={ring.key}
            className={`orbit__ring orbit__ring--${ring.key}`}
            cx={C}
            cy={C}
            r={ring.r}
            style={{ '--len': 2 * Math.PI * ring.r, '--d': `${ri * 0.35}s` }}
          />
        ))}

        {RINGS.map((ring, ri) => ring.members.map((deg, mi) => (
          <g
            key={`${ring.key}-${deg}`}
            className={`orbit__arm orbit__arm--${ring.key}`}
            style={{
              '--dur': `${ring.dur}s`,
              '--deg': `${deg}deg`,
              '--d': `${1.1 + ri * 0.3 + mi * 0.08}s`,
            }}
          >
            <line className="orbit__thread" x1={C} y1={C} x2={C + ring.r} y2={C} />
            {FACES[`${ring.key}-${mi}`] ? (
              // Portrait member: counter-rotates so the face stays upright
              <g
                className="orbit__face"
                style={{ transformOrigin: `${C + ring.r}px ${C}px`, '--deg': `${-deg}deg` }}
              >
                <clipPath id={`face-${ring.key}-${mi}`}>
                  <circle cx={C + ring.r} cy={C} r="21" />
                </clipPath>
                <image
                  href={FACES[`${ring.key}-${mi}`]}
                  x={C + ring.r - 21}
                  y={C - 21}
                  width="42"
                  height="42"
                  clipPath={`url(#face-${ring.key}-${mi})`}
                  preserveAspectRatio="xMidYMid slice"
                />
                <circle className="orbit__facering" cx={C + ring.r} cy={C} r="22" />
              </g>
            ) : (
              <circle className="orbit__member" cx={C + ring.r} cy={C} r={ring.key === 'home' ? 7 : 6} />
            )}
          </g>
        )))}

        <circle className="orbit__halo" cx={C} cy={C} r="62" fill="url(#orbitCore)" />
        <image className="orbit__logo" href="/logo.png" x={C - 30} y={C - 30} width="60" height="60" />
      </svg>

      <figcaption className="orbit__legend">
        {RINGS.map((ring) => (
          <span key={ring.key} className={`orbit__key orbit__key--${ring.key}`}>{ring.label}</span>
        ))}
      </figcaption>
    </figure>
  );
}
