import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { api } from "../api/client";
import "./Home.css";

export default function Stats() {
  const [overview, setOverview] = useState(null);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getStatsOverview(), api.getStatsTrend()])
      .then(([o, t]) => {
        setOverview(o);
        setTrend(t.trend);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="home-loading">Loading stats...</div>;
  if (error) return <div className="home-error">{error}</div>;

  const statCards = [
    { label: "Listeners", value: overview.listeners.toLocaleString() },
    { label: "Streams", value: overview.streams.toLocaleString() },
    { label: "Saves", value: overview.saves.toLocaleString() },
    { label: "Followers", value: overview.followers.toLocaleString() },
  ];

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Stats</h1>
        <p>Deep dive into your performance over time</p>
      </div>

      <section className="stats-grid">
        {statCards.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-label">{s.label}</span>
            <span className="stat-value">{s.value}</span>
          </div>
        ))}
      </section>

      <section className="chart-section">
        <div className="section-heading">
          <h2>Streams over time</h2>
          <span className="section-sub">Last 12 months</span>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={trend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="statsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1ED760" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1ED760" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#282828" vertical={false} />
              <XAxis dataKey="date" stroke="#6a6a6a" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#6a6a6a" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#282828", border: "1px solid #3a3a3a", borderRadius: 4 }}
                labelStyle={{ color: "#fff" }}
              />
              <Area type="monotone" dataKey="listeners" stroke="#1ED760" strokeWidth={2} fill="url(#statsFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
