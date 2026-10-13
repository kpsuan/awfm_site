import Reveal from '@/components/Reveal';
import WhyWeExist from '@/components/community/WhyWeExist';
import { REGISTER_URL } from '@/config/site';
import '../inner.css';

export const metadata = {
  title: 'About',
  description:
    'A Filipino startup for social impact helping medical migrants and their collectivist families plan, fund, and advocate for dignified end-of-life care.',
};

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">About us</span>
          <h1>So no one dies in pain, in debt, and in silence.</h1>
          <p>
            We’re a Filipino startup for social impact, based in The Hague. We help families
            treat advance care planning as a collective, ongoing conversation about what
            matters most — especially when we’re dying.
          </p>
        </div>
      </section>

      <WhyWeExist />

      <section className="section">
        <div className="wrap prose-grid">
          <Reveal>
            <span className="eyebrow">What we believe</span>
            <h2 className="h2">The individual success of one is the collective success of all.</h2>
          </Reveal>
          <Reveal className="prose" delay={100}>
            <p>
              What is also true in our culture — as Filipinos with 377 years of lived
              experience with colonization — is <i>bayanihan</i>: a spirit of communal unity,
              cooperation, and mutual aid. It’s the value we build from.
            </p>
            <p>
              A family that plans their future together funds their future care together. We
              call it Interdependent Care Planning, and we’re building it so medical migrants
              can lead their immediate family, their family back home, and their local and
              chosen family through care team planning, care fund pooling, and patient
              advocacy learning — at global scale.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap cta-row">
          <h2 className="h2">Join our bayanihan.</h2>
          <a className="btn" href={REGISTER_URL}>Get Started Free</a>
        </div>
      </section>
    </>
  );
}
