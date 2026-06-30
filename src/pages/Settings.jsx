import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import "./Settings.css";

export default function Settings() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const { user: updated } = await api.updateProfile(formData);
      setUser(updated);
      setMessage("Saved.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and account preferences</p>
      </div>

      <form className="settings-card" onSubmit={handleSave}>
        <h2>Profile</h2>

        {message && <div className="login-error" style={{ background: "rgba(30,215,96,0.12)", borderColor: "var(--green)", color: "var(--green)" }}>{message}</div>}
        {error && <div className="login-error">{error}</div>}

        <label>
          Artist name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Bio
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell listeners about yourself..."
          />
        </label>
        <label>
          Profile photo
          <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} />
        </label>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
