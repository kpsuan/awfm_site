import { APP_URL, REGISTER_URL, SPONSOR_URL, HELP_URL } from './site';

// Solutions menu: who A Whole Family Matter is for. Roles mirror the app's
// Help Center ("Learn by role") and the Sponsor a Care Team pages.
const p = (d) => d;
export const SOLUTIONS = [
  {
    heading: 'For families',
    items: [
      {
        title: 'Medical migrants & their care teams',
        body: 'Lead your immediate family, your family back home, and your chosen family as one care team — with a Leader, a Witness and a shared Care Fund.',
        href: REGISTER_URL,
        icon: p(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" /></>),
      },
      {
        title: 'ICP Facilitator Network',
        body: 'Guides from your own diaspora, trained to walk families through the journey.',
        href: `${APP_URL}/facilitator-preview`,
        soon: true,
        icon: p(<><circle cx="12" cy="7" r="3" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" /><path d="M19 4l1.5-1.5M5 4 3.5 2.5" /></>),
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

// Company menu.
export const COMPANY = [
  {
    heading: 'Company',
    items: [
      {
        title: 'Our Story',
        body: 'Why we exist — the protective silence, the twelve countries, and bayanihan.',
        href: '/about/',
        icon: p(<><path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M8 7h7M8 11h5" /></>),
      },
      {
        title: 'Team',
        body: 'The three Filipino innovators building A Whole Family Matter.',
        href: '/team/',
        icon: p(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" /></>),
      },
    ],
  },
];
