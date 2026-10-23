export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-top">
        <span className="eyebrow">COLOMBIAN ROOTS. LONDON CHAPTER.</span>
        <span className="edition">A CONTINUING STORY / 01</span>
      </div>
      <h1>
        Building businesses.
        <br />
        Connecting people.
        <br />
        <em>Creating possibility.</em>
      </h1>
      <div className="hero-bottom">
        <p>
          I’m Vladimir, an entrepreneur and software engineer.
          <br />
          My purpose is to help entrepreneurs make a living
          <br className="desktop" /> from their passion.
        </p>
        <a className="circle-link" href="#journey">
          <span>Explore my journey</span>
          <b aria-hidden="true">↓</b>
        </a>
      </div>
      <div className="hero-rule">
        <span>PRODUCT</span>
        <span>TECHNOLOGY</span>
        <span>ENTREPRENEURSHIP</span>
        <span>COMMUNITY</span>
      </div>
    </section>
  );
}
