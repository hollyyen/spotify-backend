import { useEffect, useState } from "react";
import { api } from "../api/client";
import "./Audience.css";

function BarRow({ label, percent }) {
  return (
    <div className="bar-row">
      <span className="bar-label">{label}</span>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="bar-percent">{percent}%</span>
    </div>
  );
}

export default function Audience() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getAudience()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="home-loading">Loading audience data...</div>;
  if (error) return <div className="home-error">{error}</div>;

  return (
    <div className="audience-page">
      <div className="audience-header">
        <h1>Audience</h1>
        <p>Who's listening to your music</p>
      </div>

      <div className="audience-grid">
        <section className="audience-card">
          <h2>Where they're listening from</h2>
          <div className="bar-list">
            {data.country.map((c) => (
              <BarRow key={c.label} label={c.label} percent={c.percent} />
            ))}
          </div>
        </section>

        <section className="audience-card">
          <h2>Age</h2>
          <div className="bar-list">
            {data.age.map((a) => (
              <BarRow key={a.label} label={a.label} percent={a.percent} />
            ))}
          </div>
        </section>

        <section className="audience-card">
          <h2>Gender</h2>
          <div className="bar-list">
            {data.gender.map((g) => (
              <BarRow key={g.label} label={g.label} percent={g.percent} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
