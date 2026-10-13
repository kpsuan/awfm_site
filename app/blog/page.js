import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/blog';
import './blog.css';

export const metadata = {
  title: 'Blog',
  description: 'Stories, research and product notes from A Whole Family Matter — on care planning, the protective silence, and families caring across borders.',
};

export default function Blog() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;
  return (
    <>
      <section className="bl-hero">
        <div className="bl-wrap bl-hero__top">
          <div>
            <span className="bl-k">Blog</span>
            <h1>Notes on caring<br />as a whole family</h1>
          </div>
          <p>Research, stories and product notes on breaking the silence around death and dying — and planning, funding and advocating together.</p>
        </div>
      </section>

      <section className="bl-list">
        <div className="bl-wrap">
          {lead && (
            <Link href={`/blog/${lead.slug}/`} className="bl-lead">
              <span className="bl-lead__img" style={{ backgroundImage: `url(${lead.cover})` }} />
              <div className="bl-lead__body">
                <span className="bl-meta"><b>{lead.category}</b> · {formatDate(lead.date)} · {lead.minutes} min read</span>
                <h2>{lead.title}</h2>
                <p>{lead.description}</p>
                <span className="bl-more">Read the article</span>
              </div>
            </Link>
          )}
          <div className="bl-grid">
            {rest.map((p) => (
              <Link href={`/blog/${p.slug}/`} className="bl-card" key={p.slug}>
                <span className="bl-card__img" style={{ backgroundImage: `url(${p.cover})` }} />
                <span className="bl-meta"><b>{p.category}</b> · {formatDate(p.date)}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
