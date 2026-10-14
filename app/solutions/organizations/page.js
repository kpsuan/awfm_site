import SolutionPage from '@/components/solutions/SolutionPage';
import { SPONSOR_URL } from '@/config/site';

export const metadata = {
  alternates: { canonical: '/solutions/organizations/' },
  title: 'For organizations & associations',
  description: 'Associations, diaspora networks and congregations can sponsor a whole block of families in a single transaction — one charge, one receipt.',
};

export default function Organizations() {
  return (
    <SolutionPage
      kicker="For organizations & associations"
      title="One receipt. Many families."
      lead="Associations, diaspora networks, congregations — sponsor a whole block of families in a single transaction, and let each family plan their care together."
      image="https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_1400,ar_5:4,c_fill/v1791190625/Dreamy_Bayanihan_at_Sunrise_s80ewz.png"
      imageAlt="Neighbours carrying a house together at sunrise — bayanihan."
      ctas={[{ label: 'Sponsor as an organization', href: `${SPONSOR_URL}/organizations` }, { label: 'Sponsor one family', href: '/solutions/sponsors/' }]}
      stepsTitle="Sponsor many families at once"
      steps={[
        ['Choose how many', 'Sponsor anywhere from one to a hundred families — €30 each.'],
        ['Pay once', 'One charge, one receipt, however many families you sponsor.'],
        ['Direct each gift', 'Send each gift to a family by email, or keep them as credits to direct later.'],
        ['Families plan together', 'Each family’s whole care plan opens at once, for every member of their team.'],
      ]}
      benefitsTitle="Built for associations and communities"
      benefits={[
        ['No bulk discounts, ever', 'Every euro is a family — the price is always €30 per family.'],
        ['Credits that last', 'Gifts kept as credits stay valid for two years.'],
        ['Your name on each gift', 'Add your organization’s name, or keep the gift anonymous to the families.'],
        ['Nothing flows back', 'Nothing about any family reaches your organization.'],
        ['One receipt', 'A single charge and a single receipt for the whole block.'],
        ['EU consumer rights honored', 'Clear terms on every purchase.'],
      ]}
      close={{ title: 'Help your community plan, fund and advocate together.', label: 'Sponsor as an organization', href: `${SPONSOR_URL}/organizations` }}
    />
  );
}
