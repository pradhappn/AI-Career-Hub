import { Link } from "react-router-dom";
import "../styles/landing.css";
import { appContent } from "../data/siteContent";

const { landing, brand, nav } = appContent;

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">AI</div>
          <span>{brand}</span>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#features">{nav.features}</a>
          <a href="#roadmaps">{nav.roadmaps}</a>
          <a href="#pricing">{nav.pricing}</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="login-btn">
            {nav.login}
          </Link>
          <Link to="/register" className="signup-btn">
            {nav.signUp}
          </Link>
        </div>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">{landing.eyebrow}</p>
            <h1>
              Build your future with <span>{landing.highlight}</span>.
            </h1>
            <p className="subtitle">{landing.subtitle}</p>

            <div className="hero-buttons">
              <Link to="/register" className="primary-btn">
                {landing.ctaPrimary}
              </Link>
              <button type="button" className="secondary-btn">
                {landing.ctaSecondary}
              </button>
            </div>

            <div className="hero-stats">
              {landing.stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Career dashboard preview">
            <div className="glass-panel">
              <div className="panel-header">
                <span className="status-dot" />
                <span>Career Growth</span>
              </div>

              <div className="progress-card">
                <div className="progress-title-row">
                  <span>Progress</span>
                  <strong>78%</strong>
                </div>
                <div className="progress-bar">
                  <span className="progress-fill" />
                </div>
              </div>

              <div className="mini-grid">
                <div className="mini-card">
                  <small>Mock Interview</small>
                  <strong>4.9/5</strong>
                </div>
                <div className="mini-card accent-card">
                  <small>Roadmap</small>
                  <strong>12 Weeks</strong>
                </div>
                <div className="mini-card wide-card">
                  <small>Resume Score</small>
                  <strong>88/100</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section" id="features">
          <div className="section-heading">
            <p className="eyebrow">Why choose us</p>
            <h2>Everything you need to grow your career.</h2>
          </div>

          <div className="feature-grid">
            {landing.features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">✦</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;