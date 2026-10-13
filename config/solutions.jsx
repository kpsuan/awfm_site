import { REGISTER_URL, SPONSOR_URL, HELP_URL } from './site';

// Solutions menu: who A Whole Family Matter is for. Roles mirror the app's
// Help Center ("Learn by role") and the Sponsor a Care Team pages.
const p = (d) => d;
export const SOLUTIONS = [
  {
    heading: 'For families',
    items: [
      {
        title: 'Start a care team',
        body: 'Bring your three circles of care together and lead the planning as the team’s Leader.',
        href: REGISTER_URL,
        icon: p(<><path d="M12 5v14M5 12h14" /></>),
      },
      {
        title: 'Join your family’s team',
        body: 'Answer the questions in your own words, one a day, alongside everyone else.',
        href: '/#team',
        icon: p(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" /></>),
      },
      {
        title: 'Medical migrants',
        body: 'Lead your immediate family, your family back home, and your chosen family — from wherever you work.',
        href: '/about/',
        icon: p(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>),
      },
      {
        title: 'Witness & Custodian',
        body: 'Affirm the family’s decisions and run Care Fund approvals and releases.',
        href: `${HELP_URL}#learn-by-role`,
        icon: p(<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />),
      },
    ],
  },
  {
    heading: 'For supporters',
    items: [
      {
        title: 'Sponsor a family',
        body: '€30 opens a family’s whole care plan. Nothing about the family flows back to you.',
        href: SPONSOR_URL,
        icon: p(<path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />),
      },
      {
        title: 'Organizations & associations',
        body: 'Sponsor many families with one charge and one receipt.',
        href: `${SPONSOR_URL}/organizations`,
        icon: p(<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" /></>),
      },
      {
        title: 'Join the free community',
        body: 'A guided space for the hardest questions a family can face.',
        href: '/community/',
        icon: p(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />),
      },
    ],
  },
];
