import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Topbar.css";

export default function Topbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (!user) return null;

  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} />
        <input type="text" placeholder="Search for stats, songs, or playlists" />
      </div>

      <div className="topbar-right">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <div className="profile-menu-wrap">
          <button className="profile-pill" onClick={() => setMenuOpen((o) => !o)}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} />
            ) : (
              <span className="avatar-fallback" style={{ display: "flex" }}>
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="profile-name">{user.name}</span>
            <ChevronDown size={16} />
          </button>

          {menuOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
