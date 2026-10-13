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

      {/* ── Milestones ── */}
      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Our journey</span>
          <h2 className="h2 ab-h">From a world congress to your family’s table</h2>
          <ol className="ab-time">
            <li>
              <img className="ab-time__img" src="/journey/eapc.jpg" alt="Norman Yuson Cuaño with the A Whole Family Matter poster at EAPC 2025." loading="lazy" />
              <span className="ab-time__when">2025 · Finland</span>
              <strong>The 19th World Congress of the European Association for Palliative Care</strong>
              <p>Where we began using AI to help the world hope for the best and plan for the rest.</p>
            </li>
            <li>
              <img className="ab-time__img" src="/journey/hague.jpg" alt="The Binnenhof in The Hague across the Hofvijver, with tulips in the foreground." loading="lazy" />
              <span className="ab-time__when">The Hague</span>
              <strong>Built in a country reckoning with its colonial history</strong>
              <p>A Whole Family Matter B.V. is based in The Hague — mutual care, for mutual benefit.</p>
            </li>
            <li>
              <div className="ab-candles" role="img" aria-label="Candles lit for All Souls’ Day.">
                {[18, 46, 70, 36, 10].map((h, i) => (
                  <span key={i} className="ab-candle" style={{ '--i': i, '--h': `${h}px` }}><i /></span>
                ))}
                <em>Nov 2</em>
              </div>
              <span className="ab-time__when">2 November 2026 · Philippines</span>
              <strong>Launching on All Souls’ Day</strong>
              <p>The day families across the Philippines remember their dead — and the day we begin planning together.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ── UN SDGs ── */}
      <section className="section section--cream">
        <div className="wrap">
          <span className="eyebrow">Our goals for 2030</span>
          <h2 className="h2 ab-h">Three U.N. Sustainable Development Goals</h2>
          <div className="ab-sdg">
            {[
              ['SDG 3.4', 'Reduce by one third premature mortality from non-communicable diseases.'],
              ['SDG 5.4', 'Recognize and value unpaid care and domestic work through the provision of public services.'],
              ['SDG 10.2', 'Empower and promote the social, economic and political inclusion of all.'],
            ].map(([k, d]) => (
              <article key={k}><b>{k}</b><p>{d}</p></article>
            ))}
          </div>
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
