import './solution.css';

// Shared layout for /solutions/* pages: hero with image, numbered steps,
// a benefits grid and a closing call to action.
export default function SolutionPage({ kicker, title, lead, image, imageAlt, ctas, stepsTitle, steps, benefitsTitle, benefits, close }) {
  return (
    <>
      <section className="so-hero">
        <div className="so-wrap so-hero__grid">
          <div className="so-hero__copy">
            <span className="so-k">{kicker}</span>
            <h1>{title}</h1>
            <p>{lead}</p>
            <div className="so-ctas">
              {ctas.map((c, i) => (
                <a key={c.label} className={`so-btn${i === 0 ? ' so-btn--solid' : ''}`} href={c.href}>{c.label}</a>
              ))}
            </div>
          </div>
          <div className="so-hero__img" role="img" aria-label={imageAlt} style={{ backgroundImage: `url(${image})` }} />
        </div>
      </section>

      <section className="so-sec">
        <div className="so-wrap">
          <span className="so-k">How it works</span>
          <h2>{stepsTitle}</h2>
          <ol className="so-steps">
            {steps.map(([t, d], i) => (
              <li key={t}><b>{String(i + 1).padStart(2, '0')}</b><strong>{t}</strong><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="so-sec so-sec--alt">
        <div className="so-wrap">
          <span className="so-k">What you get</span>
          <h2>{benefitsTitle}</h2>
          <div className="so-grid">
            {benefits.map(([t, d]) => (
              <article key={t}><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="so-close">
        <div className="so-wrap so-close__in">
          <h2>{close.title}</h2>
          <a className="so-btn so-btn--light" href={close.href}>{close.label}</a>
        </div>
      </section>
    </>
  );
}
