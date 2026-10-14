import SolutionPage from '@/components/solutions/SolutionPage';
import { SPONSOR_URL } from '@/config/site';

export const metadata = {
  alternates: { canonical: '/solutions/sponsors/' },
  title: 'Sponsor a care team',
  description: '€30 opens a family’s whole care plan, once. Your gift covers their fee — it never becomes cash, and nothing about the family flows back to you.',
};

export default function Sponsors() {
  return (
    <SolutionPage
      kicker="For sponsors"
      title="€30 opens a family’s whole care plan"
      lead="Paid once, for the whole team. Your gift covers their platform fee — it never passes through anyone’s pockets, and nothing about the family flows back to you."
      image="https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_1400,ar_5:4,c_fill,g_auto/v1791962846/0.1_wpqlos.jpg"
      imageAlt="Two people planning together over a laptop at a café table."
      ctas={[{ label: 'Sponsor a family — €30', href: SPONSOR_URL }, { label: 'Sponsoring as an organization?', href: '/solutions/organizations/' }]}
      stepsTitle="How your €30 travels"
      steps={[
        ['Choose how you give', 'Pick a family who chose to share their story.'],
        ['Secure checkout', 'Pay the €30 fee on a secure hosted page. Your gift covers their fee — it never becomes cash.'],
        ['Their plan unlocks', 'The whole family’s journey opens at once — and their card retires from the page.'],
        ['The wall holds', 'You’ll know a family was helped — never who they are, what they wrote, or how they decide.'],
      ]}
      benefitsTitle="Why you can trust this"
      benefits={[
        ['100% covers their fee', 'Every gift is a platform-fee credit. It never becomes cash.'],
        ['Nothing flows to you', 'No data about the family ever reaches a sponsor.'],
        ['The plan belongs to the family', 'Held in common, by the whole care team.'],
        ['Secure checkout', 'Payments are handled on a secure hosted page by Airwallex.'],
        ['EU consumer rights honored', 'Clear terms on every purchase.'],
        ['No account needed', 'Give in a couple of clicks — and you can give anonymously.'],
      ]}
      close={{ title: 'Stand behind a family you’ll never meet.', label: 'Sponsor a family — €30', href: SPONSOR_URL }}
    />
  );
}
