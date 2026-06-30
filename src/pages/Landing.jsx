import { Link } from "react-router-dom";
import { useState } from "react";
import "./Landing.css";

const tabs = [
  { key: "amplify", label: "Amplify your music" },
  { key: "connect", label: "Connect with fans" },
  { key: "grow", label: "Grow your business" },
  { key: "understand", label: "Understand your audience" },
];

export default function Landing() {
  const [activeTab, setActiveTab] = useState("amplify");

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#1ED760" />
            <path
              d="M6.5 9.5c3-1 8-1 11 1M6 12.5c2.5-1 6.5-1 9 .5M6 15.5c2-.8 5-.8 7 .5"
              stroke="#000"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <span>for Artists</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#resources">Resources</a>
          <a href="#help">Help</a>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn-outline nav-btn">Log in</Link>
          <Link to="/login" className="btn-primary nav-btn">Sign up free</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1>
            Where your music
            <br />
            is everything
          </h1>
          <p>
            Develop your fanbase, build your business, and create the world
            around your music.
          </p>

          <div className="hero-tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={"hero-tab" + (activeTab === t.key ? " active" : "")}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="feature-intro" id="features">
        <span className="eyebrow">Features</span>
        <h2>Tools built for your music</h2>
        <p>
          Grow your career while keeping your music at the center. Amplify
          your reach, share videos, build pre-release hype, and connect
          everything right where streaming happens.
        </p>
      </section>

      <section className="feature-row">
        <div className="feature-media find-fans-media" />
        <div className="feature-copy">
          <h3>Find your next fans</h3>
          <p>
            Reach new listeners with a set of tools designed to drive
            meaningful growth for artists and music marketers.
          </p>
          <ul>
            <li>Display campaigns put your music front and center.</li>
            <li>Get a boost in personalized playlists with Discovery Mode.</li>
            <li>Share upcoming tracks with editors through playlist pitching.</li>
          </ul>
          <Link to="/login" className="btn-outline">Explore campaign tools</Link>
        </div>
      </section>

      <section className="feature-row reverse">
        <div className="feature-media connect-fans-media" />
        <div className="feature-copy">
          <h3>Connect with fans</h3>
          <p>
            Invite listeners into your creative world. Customize your profile,
            create videos and visuals, and tell the story behind your music.
          </p>
          <ul>
            <li>Short clips keep your music front and center.</li>
            <li>Add a looping visual to every track you release.</li>
            <li>Build hype for upcoming releases with countdown pages.</li>
          </ul>
          <Link to="/login" className="btn-outline">Explore video & visuals</Link>
        </div>
      </section>

      <section className="feature-row">
        <div className="feature-media grow-business-media" />
        <div className="feature-copy">
          <h3>Grow your business</h3>
          <p>
            There are many ways to earn as an artist. Track royalties with
            full transparency, and explore more ways to turn streams into
            income.
          </p>
          <ul>
            <li>Sell and promote merch alongside your music.</li>
            <li>List concert and festival dates so fans never miss a show.</li>
            <li>Collect tips or rally listeners around a cause.</li>
          </ul>
          <Link to="/login" className="btn-outline">Explore merch & live</Link>
        </div>
      </section>

      <section className="feature-row reverse">
        <div className="feature-media understand-audience-media" />
        <div className="feature-copy">
          <h3>Understand your audience</h3>
          <p>
            Dig into audience, playlist, and music data to help you reach
            your goals — and turn listeners into lifelong fans.
          </p>
          <ul>
            <li>Segments break down exactly who's listening.</li>
            <li>Track release engagement and conversion metrics.</li>
            <li>Benchmark against an ongoing global fan behavior report.</li>
          </ul>
          <Link to="/login" className="btn-outline">Explore analytics</Link>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to claim your artist profile?</h2>
        <p>Create an account to get access to your dashboard.</p>
        <Link to="/login" className="btn-primary cta-btn">Get started</Link>
      </section>

      <footer className="landing-footer">
        <div className="footer-grid">
          <div>
            <h4>Helpful links</h4>
            <a href="#">About</a>
            <a href="#">Press & media</a>
            <a href="#">Contact us</a>
          </div>
          <div>
            <h4>Creator tools</h4>
            <a href="#">Songwriting</a>
            <a href="#">Resources</a>
            <a href="#">Help center</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <p className="footer-copyright">© 2026 Your Company. This is a demo clone for learning purposes.</p>
      </footer>
    </div>
  );
}
