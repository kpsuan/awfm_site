import './globals.css';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { SITE_URL } from '@/config/site';

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
    images: ['/logo.png'],
  },
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300..700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
