import Link from 'next/link';
import { getAllPosts, getPost, formatDate } from '@/lib/blog';
import { REGISTER_URL } from '@/config/site';
import '../blog.css';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, images: [post.cover], type: 'article' },
  };
}

export default function Post({ params }) {
  const post = getPost(params.slug);
  const more = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <article className="bl-post">
      <header className="bl-wrap bl-post__head">
        <Link href="/blog/" className="bl-back">← All articles</Link>
        <span className="bl-meta"><b>{post.category}</b> · {formatDate(post.date)} · {post.minutes} min read</span>
        <h1>{post.title}</h1>
        <p className="bl-post__lede">{post.description}</p>
        <span className="bl-by"><img src="/logo.png" alt="" width="28" height="28" />{post.author}</span>
      </header>
      <div className="bl-wrap"><div className="bl-cover" style={{ backgroundImage: `url(${post.cover})` }} /></div>
      <div className="bl-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

      <div className="bl-wrap bl-cta">
        <div>
          <h2>Start your family’s care plan</h2>
          <p>The first nine questions are free. Bring your three circles of care together.</p>
        </div>
        <a className="btn" href={REGISTER_URL}>Get Started Free</a>
      </div>

      {more.length > 0 && (
        <div className="bl-wrap bl-more-posts">
          <h2>Keep reading</h2>
          <div className="bl-grid bl-grid--2">
            {more.map((p) => (
              <Link href={`/blog/${p.slug}/`} className="bl-card" key={p.slug}>
                <span className="bl-card__img" style={{ backgroundImage: `url(${p.cover})` }} />
                <span className="bl-meta"><b>{p.category}</b> · {formatDate(p.date)}</span>
                <h3>{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
