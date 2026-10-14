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
      { href: '/', title: 'Platform', body: 'The care planning app for your whole family.' },
      { href: '/community/', title: 'Community', body: 'Free courses and support for medical migrants and their families.' },
      { href: '/security/', title: 'Security', body: 'How we protect your family’s most private conversations.' },
    ]} />
  );
}

export function SolutionsMenu({ close }) {
  return (
    <List close={close} items={[
      { href: '/solutions/families/', title: 'Families & medical migrants', body: 'Lead your three circles of care as one team.' },
      { href: '/solutions/sponsors/', title: 'Sponsors', body: '€30 opens a family’s whole care plan.' },
      { href: '/solutions/organizations/', title: 'Organizations', body: 'Sponsor many families with one receipt.' },
      { href: `${APP_URL}/facilitator-preview`, title: 'ICP Facilitators', body: 'Guides from your own diaspora.', soon: true },
    ]} />
  );
}

export function ResourcesMenu({ close, featured }) {
  return (
    <div className="mm-split">
      <List close={close} items={[
        { href: '/blog/', title: 'Blog', body: 'Research, stories and product notes.' },
        { href: '/events/', title: 'Events', body: 'Launches, conferences and community sessions.' },
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
      { href: '/about/', title: 'Our story', body: 'Why we exist, and where we’re going.' },
      { href: '/team/', title: 'Team', body: 'The three Filipino innovators behind it.' },
      { href: `${APP_URL}/legal`, title: 'Privacy & Legal', body: 'Policies, terms and your rights.' },
    ]} />
  );
}

export const MENUS = { product: ProductMenu, solutions: SolutionsMenu, resources: ResourcesMenu, company: CompanyMenu };
