import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import "./Home.css";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p>{label}</p>
        <p className="chart-tooltip-value">
          {payload[0].value.toLocaleString()} streams
        </p>
      </div>
    );
  }
  return null;
}

export default function Home() {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [trend, setTrend] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [overviewRes, trendRes, songsRes] = await Promise.all([
          api.getStatsOverview(),
          api.getStatsTrend(),
          api.getSongs(),
        ]);
        setOverview(overviewRes);
        setTrend(trendRes.trend);
        setSongs(songsRes.songs.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="home-loading">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="home-error">Couldn't load your stats: {error}</div>;
  }

  const statCards = [
    { label: "Listeners", value: overview.listeners.toLocaleString() },
    { label: "Streams", value: overview.streams.toLocaleString() },
    { label: "Saves", value: overview.saves.toLocaleString() },
    { label: "Followers", value: overview.followers.toLocaleString() },
  ];

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Good to see you, {user.name.split(" ")[0]}</h1>
        <p>Here's how your music is performing</p>
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
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="listenerFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1ED760" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1ED760" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#282828" vertical={false} />
              <XAxis dataKey="date" stroke="#6a6a6a" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#6a6a6a" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="listeners" stroke="#1ED760" strokeWidth={2} fill="url(#listenerFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="top-songs-section">
        <div className="section-heading">
          <h2>Your songs</h2>
          <Link to="/dashboard/music" className="section-sub">View all</Link>
        </div>

        {songs.length === 0 ? (
          <div className="empty-state">
            <p>You haven't uploaded any songs yet.</p>
            <Link to="/dashboard/music" className="btn-primary">Upload your first track</Link>
          </div>
        ) : (
          <div className="song-table">
            <div className="song-row song-row-head">
              <span>#</span>
              <span>Title</span>
              <span>Streams</span>
              <span>Saves</span>
            </div>
            {songs.map((song, i) => (
              <div className="song-row" key={song.id}>
                <span className="song-rank">{i + 1}</span>
                <span className="song-title-cell">
                  {song.coverUrl ? (
                    <img src={song.coverUrl} alt={song.title} />
                  ) : (
                    <span className="cover-fallback" />
                  )}
                  <span>{song.title}</span>
                </span>
                <span>{song.streams.toLocaleString()}</span>
                <span>{song.saves.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
