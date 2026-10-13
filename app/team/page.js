import Reveal from '@/components/Reveal';
import '../inner.css';

export const metadata = {
  title: 'Team',
  description: 'The people building A Whole Family Matter.',
};

// TODO before launch: confirm full names, titles and bios, and add photos
// (drop files in /public/team/ and set `photo`). Placeholder initials render
// until then.
const TEAM = [
  {
    name: 'Norman',
    role: 'Founder',
    bio: 'Leads A Whole Family Matter’s mission to break the silence around death and dying for medical migrants and their collectivist families.',
  },
  {
    name: 'Kismet Suan',
    role: 'Platform Innovation Lead',
    bio: 'Leads product research, design, and full-stack development — turning care planning that was traditionally done on paper into a healthcare app built for whole families.',
  },
];

const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

export default function Team() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Team</span>
          <h1>Built from lived experience.</h1>
          <p>
            We’re a small team building for the families we come from — medical migrants
            and the collectivist families who rely on them.
          </p>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap team-grid">
          {TEAM.map((m, i) => (
            <Reveal as="article" className="member" key={m.name} delay={i * 110}>
              {m.photo
                ? <img className="member__photo" src={m.photo} alt={m.name} />
                : <span className="member__photo member__photo--initials" aria-hidden="true">{initials(m.name)}</span>}
              <h2>{m.name}</h2>
              <span className="member__role">{m.role}</span>
              <p>{m.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
