import './globals.css';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import CookieBanner from '@/components/CookieBanner';
import HashScroll from '@/components/HashScroll';
import { SITE_URL, LEGAL_ENTITY } from '@/config/site';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'A Whole Family Matter — Interdependent care planning',
    template: '%s · A Whole Family Matter',
  },
  description:
    'A healthcare app for interdependent end-of-life care planning: medical migrants and their collectivist families plan, fund, and advocate together.',
  openGraph: {
    siteName: 'A Whole Family Matter',
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'A Whole Family Matter — interdependent care planning' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'A Whole Family Matter',
            legalName: LEGAL_ENTITY.name,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            email: LEGAL_ENTITY.infoEmail,
            telephone: LEGAL_ENTITY.phone,
            address: { '@type': 'PostalAddress', streetAddress: 'Fluwelen Burgwal 58', postalCode: '2511 CJ', addressLocality: 'The Hague', addressCountry: 'NL' },
            sameAs: ['https://awholefamilymatter.app', 'https://awholefamilymatter.com'],
          }) }}
        />
        <SiteNav featured={(({ slug, title, cover }) => ({ slug, title, cover }))(getAllPosts()[0])} />
        <main>{children}</main>
        <SiteFooter />
        <HashScroll />
        <CookieBanner />
      </body>
    </html>
  );
}
