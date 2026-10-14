import SolutionPage from '@/components/solutions/SolutionPage';
import { REGISTER_URL } from '@/config/site';

export const metadata = {
  alternates: { canonical: '/solutions/families/' },
  title: 'For families & medical migrants',
  description: 'Lead your immediate family, your family back home and your chosen family through end-of-life care planning — as one care team, from wherever you work.',
};

export default function Families() {
  return (
    <SolutionPage
      kicker="For families & medical migrants"
      title="Lead your whole family’s care plan — from wherever you work"
      lead="You care for strangers every shift. A Whole Family Matter gives your own family a way to plan, fund and advocate together — your immediate family, your family back home, and your local or chosen family."
      image="https://res.cloudinary.com/de3kbbv2o/image/upload/f_auto,q_auto,w_1400,ar_5:4,c_fill,g_auto/v1791962845/21.0_lcb5wq.jpg"
      imageAlt="An older man resting on a park bench."
      ctas={[{ label: 'Get Started Free', href: REGISTER_URL }, { label: 'See pricing', href: '/pricing/' }]}
      stepsTitle="From one question to one family plan"
      steps={[
        ['Start your care team', 'Create your account and bring in four to six family members across your three circles of care.'],
        ['Answer together', 'Each question moves through three checkpoints — your position, your challenges, your mind-changer.'],
        ['Explain and affirm', 'Record your reasoning by video, audio or text. Your team sees your answers and affirms them.'],
        ['Fund and advocate', 'Pool money for care in a shared Care Fund, and learn to speak up together with the advocacy workbook.'],
      ]}
      benefitsTitle="Built for families like yours"
      benefits={[
        ['One shared space', 'Posts, recordings, polls and check-ins — your family’s private care team page.'],
        ['Questions that lead to love', 'Guided questions built on the Uniform Health-Care Decisions Act 2023 and lived experience.'],
        ['Where you agree and differ', 'Insights show where the family sees things differently, so you can talk it through.'],
        ['A Care Fund with five pools', 'Urgent, quality of life, legacy and rites, repatriation, and mutual aid — every movement on the record.'],
        ['A seven-stage workbook', 'From permission to resilience, based on the 7 keys of Hope for the Best, Plan for the Rest.'],
        ['Fair, per-family pricing', 'Start free. One fee covers the whole team — and the Leader never pays.'],
      ]}
      close={{ title: 'Start your family’s care plan today.', label: 'Get Started Free', href: REGISTER_URL }}
    />
  );
}
