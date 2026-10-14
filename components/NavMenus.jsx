import { APP_URL, COMMUNITY_URL, HELP_URL, SPONSOR_URL, LEGAL_ENTITY } from '@/config/site';

// Mega-menu bodies (Parloa-style). Each receives `close` to dismiss on click
// and `featured` (the latest blog post, passed down from the server layout).
const A = ({ href, close, className = 'mm-link', children }) => (
  <a href={href} className={className} role="menuitem" onClick={close}>{children}</a>
);
const Orb = ({ tone = 'brand' }) => <span className={`mm-orb mm-orb--${tone}`} aria-hidden="true" />;

export function ProductMenu({ close }) {
  return (
    <div className="mm mm--product">
      <div className="mm-product__main">
        <A href="/" close={close} className="mm-overview"><Orb />Platform overview</A>
        <div className="mm-cols mm-cols--2">
          <div className="mm-col">
            <span className="mm-k">awholefamilymatter.app</span>
            <A href="/" close={close} className="mm-title">Platform</A>
            <p className="mm-desc">The care planning app for your whole family.</p>
            <div className="mm-list">
              <A href="/#plan" close={close}>Care team planning</A>
              <A href="/#fund" close={close}>Care fund pooling</A>
              <A href="/#advocate" close={close}>Patient advocacy</A>
              <A href="/#team" close={close}>Your care team page</A>
            </div>
          </div>
          <div className="mm-col">
            <span className="mm-k">awholefamilymatter.com</span>
            <A href="/community/" close={close} className="mm-title">Community</A>
            <p className="mm-desc">The free learning community for families.</p>
            <div className="mm-list">
              <A href="/community/#courses" close={close}>Global Problems courses</A>
              <A href="/community/#solutions" close={close}>Leading solutions</A>
              <A href="/community/#innovations" close={close}>Our innovations</A>
              <A href="/community/#groups" close={close}>Support groups</A>
            </div>
          </div>
        </div>
      </div>
      <div className="mm-side">
        <div className="mm-list mm-list--side">
          <A href="/security/" close={close}>Security &amp; privacy</A>
          <A href="/pricing/" close={close}>Pricing</A>
          <A href={HELP_URL} close={close}>Help Center</A>
        </div>
        <A href={APP_URL} close={close} className="mm-feature">
          <span className="mm-overview"><Orb tone="violet" />Open the app</span>
          <span className="mm-desc">Sign in to your family’s care team at awholefamilymatter.app.</span>
        </A>
      </div>
    </div>
  );
}

export function SolutionsMenu({ close }) {
  return (
    <div className="mm mm--solutions">
      <div className="mm-col mm-col--wide">
        <span className="mm-k">Most common use cases</span>
        <div className="mm-list mm-list--grid">
          <A href="/#plan" close={close}>Plan end-of-life care together</A>
          <A href="/solutions/families/" close={close}>Lead a care team from abroad</A>
          <A href="/#fund" close={close}>Pool money for care costs</A>
          <A href="/solutions/sponsors/" close={close}>Cover a family’s care plan</A>
          <A href="/#advocate" close={close}>Prepare to speak up in hospital</A>
          <A href="/solutions/organizations/" close={close}>Sponsor many families at once</A>
        </div>
      </div>
      <div className="mm-col">
        <span className="mm-k">By audience</span>
        <div className="mm-list">
          <A href="/solutions/families/" close={close}>Families &amp; medical migrants</A>
          <A href="/solutions/sponsors/" close={close}>Sponsors</A>
          <A href="/solutions/organizations/" close={close}>Organizations &amp; associations</A>
          <A href={`${APP_URL}/facilitator-preview`} close={close}>ICP Facilitators <i className="mm-soon">Coming soon</i></A>
        </div>
      </div>
    </div>
  );
}

export function ResourcesMenu({ close, featured }) {
  return (
    <div className="mm mm--resources">
      <div className="mm-col">
        <span className="mm-k">Knowledge hub</span>
        <div className="mm-list">
          <A href="/blog/" close={close}>Blog &amp; articles</A>
          <A href="/community/#courses" close={close}>Free courses</A>
          <A href={HELP_URL} close={close}>Help Center</A>
        </div>
      </div>
      <div className="mm-col">
        <span className="mm-k">Community</span>
        <div className="mm-list">
          <A href="/events/" close={close}>Events</A>
          <A href={COMMUNITY_URL} close={close}>Join the free community</A>
          <A href="/community/#groups" close={close}>Support groups</A>
        </div>
      </div>
      {featured && (
        <A href={`/blog/${featured.slug}/`} close={close} className="mm-card">
          <span className="mm-card__img" style={{ backgroundImage: `url(${featured.cover})` }} />
          <span className="mm-card__body">
            <span className="mm-card__k">Latest on the blog</span>
            <strong>{featured.title}</strong>
          </span>
        </A>
      )}
    </div>
  );
}

export function CompanyMenu({ close }) {
  return (
    <div className="mm mm--company">
      <div className="mm-col">
        <span className="mm-k">About us</span>
        <div className="mm-list">
          <A href="/about/" close={close}>Our story</A>
          <A href="/team/" close={close}>Team</A>
          <A href="/blog/" close={close}>Blog</A>
        </div>
      </div>
      <div className="mm-col">
        <span className="mm-k">Legal &amp; contact</span>
        <div className="mm-list">
          <A href={`${APP_URL}/legal`} close={close}>Privacy &amp; Legal Center</A>
          <A href={`${APP_URL}/terms`} close={close}>Terms of Service</A>
          <A href={`mailto:${LEGAL_ENTITY.email.replace('privacy@', 'info@')}`} close={close}>Contact us</A>
        </div>
      </div>
    </div>
  );
}

export const MENUS = { product: ProductMenu, solutions: SolutionsMenu, resources: ResourcesMenu, company: CompanyMenu };
