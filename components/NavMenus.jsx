import { APP_URL, HELP_URL } from '@/config/site';

// Compact dropdowns: one link per real page, each listed once.
const Item = ({ href, title, body, soon, close }) => (
  <a href={href} className="mm-item" role="menuitem" onClick={close}>
    <strong>{title}{soon && <i className="mm-soon">Coming soon</i>}</strong>
    <span>{body}</span>
  </a>
);

const List = ({ items, close }) => (
  <div className="mm-items">{items.map((it) => <Item key={it.title} {...it} close={close} />)}</div>
);

export function ProductMenu({ close }) {
  return (
    <List close={close} items={[
      { href: APP_URL, title: 'Work App', body: 'Plan to pool and learn to advocate for each other on our Collective Work App.' },
      { href: '/community/', title: 'Community', body: 'Get educational and collaborative support in our Community Action Center.' },
      { href: '/security/', title: 'GDPR Security', body: 'Learn how we protect what matters most — your family’s collective work products.' },
    ]} />
  );
}

export function SolutionsMenu({ close }) {
  return (
    <List close={close} items={[
      { href: '/solutions/families/', title: 'Medical Migrants', body: 'Lead your whole family support system to plan, pool, and advocate together.' },
      { href: '/solutions/sponsors/', title: 'Sponsors', body: '€30 helps a biological family or 🏳️‍🌈 chosen care team get started.' },
      { href: '/solutions/organizations/', title: 'Organizations', body: 'Help many families and teams out of kindness and compassion.' },
      { href: `${APP_URL}/facilitator-preview`, title: 'ICP Facilitators', body: 'Get an interdependent care planning facilitator. Discover our ICP Facilitator Network.', soon: true },
    ]} />
  );
}

export function ResourcesMenu({ close, featured }) {
  return (
    <div className="mm-split">
      <List close={close} items={[
        { href: '/blog/', title: 'Blog', body: 'Research, stories, product notes.' },
        { href: '/events/', title: 'Events', body: 'Launches, webinars, conferences.' },
        { href: HELP_URL, title: 'Help Center', body: 'Guides and answers for every role.' },
      ]} />
      {featured && (
        <a href={`/blog/${featured.slug}/`} className="mm-card" role="menuitem" onClick={close}>
          <span className="mm-card__img" style={{ backgroundImage: `url(${featured.cover})` }} />
          <span className="mm-card__body">
            <span className="mm-card__k">Latest on the blog</span>
            <strong>{featured.title}</strong>
          </span>
        </a>
      )}
    </div>
  );
}

export function CompanyMenu({ close }) {
  return (
    <List close={close} items={[
      { href: '/about/', title: 'Our Story', body: 'Our why, what we believe, where we’re going.' },
      { href: '/team/', title: 'Startup Team', body: 'Filipino innovators fighting for social justice.' },
      { href: `${APP_URL}/legal`, title: 'Privacy & Legal', body: 'Policies and terms, consent and your rights.' },
    ]} />
  );
}

export const MENUS = { product: ProductMenu, solutions: SolutionsMenu, resources: ResourcesMenu, company: CompanyMenu };
