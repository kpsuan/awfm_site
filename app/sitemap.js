import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap() {
  const pages = ['', 'community/', 'pricing/', 'security/', 'blog/', 'events/', 'about/', 'team/', 'solutions/families/', 'solutions/sponsors/', 'solutions/organizations/'].map((p) => ({
    url: `${SITE_URL}/${p}`,
    changeFrequency: p === 'blog/' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));
  const posts = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}/`,
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
