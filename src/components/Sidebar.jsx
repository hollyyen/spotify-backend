import { NavLink } from "react-router-dom";
import { Home, Music2, Users, LineChart, Settings } from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home, end: true },
  { to: "/dashboard/music", label: "Music", icon: Music2 },
  { to: "/dashboard/audience", label: "Audience", icon: Users },
  { to: "/dashboard/stats", label: "Stats", icon: LineChart },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <Icon size={20} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/dashboard/settings" className="sidebar-link">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
