import { EVENTS } from '@/content/events';
import { COMMUNITY_URL } from '@/config/site';
import './events.css';

export const metadata = {
  alternates: { canonical: '/events/' },
  title: 'Events',
  description: 'Launches, conferences and community gatherings from A Whole Family Matter.',
};

const today = new Date().toISOString().slice(0, 10);
const isUpcoming = (d) => d.length === 10 && d >= today;
const fmt = (d) => (d.length === 10
  ? new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  : d);

function EventCard({ e }) {
  const [day, mon] = e.date.length === 10
    ? [new Date(`${e.date}T12:00:00Z`).getUTCDate(), new Date(`${e.date}T12:00:00Z`).toLocaleDateString('en-GB', { month: 'short' })]
    : [e.date, ''];
  const Tag = e.link ? 'a' : 'article';
  return (
    <Tag className="ev-card" {...(e.link ? { href: e.link } : {})}>
      <span className="ev-card__img" style={{ backgroundImage: `url(${e.image})` }}>
        <span className="ev-date"><b>{day}</b>{mon && <em>{mon}</em>}</span>
      </span>
      <span className="ev-card__body">
        <span className="ev-meta"><b>{e.type}</b> · {e.place} · {fmt(e.date)}</span>
        <strong>{e.title}</strong>
        <span className="ev-desc">{e.body}</span>
      </span>
    </Tag>
  );
}

export default function Events() {
  const upcoming = EVENTS.filter((e) => isUpcoming(e.date));
  const past = EVENTS.filter((e) => !isUpcoming(e.date));
  return (
    <>
      <section className="ev-hero">
        <div className="ev-wrap ev-hero__top">
          <div>
            <span className="ev-k">Events</span>
            <h1>Where to find us</h1>
          </div>
          <p>Launches, conferences and community gatherings — and live sessions in our free community.</p>
        </div>
      </section>
      <section className="ev-list">
        <div className="ev-wrap">
          <h2>Upcoming</h2>
          {upcoming.length
            ? <div className="ev-grid">{upcoming.map((e) => <EventCard key={e.title} e={e} />)}</div>
            : <p className="ev-empty">No upcoming events right now — check back soon.</p>}
          <div className="ev-community">
            <div>
              <strong>Community sessions</strong>
              <span>Live discussions and support groups happen inside our free community.</span>
            </div>
            <a className="ev-btn" href={COMMUNITY_URL}>See community events</a>
          </div>
          {past.length > 0 && (
            <>
              <h2 className="ev-past">Past events</h2>
              <div className="ev-grid">{past.map((e) => <EventCard key={e.title} e={e} />)}</div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
