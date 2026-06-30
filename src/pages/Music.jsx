import { useEffect, useRef, useState } from "react";
import { Play, Pause, Trash2, UploadCloud, X } from "lucide-react";
import { api } from "../api/client";
import "./Music.css";

export default function Music() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  async function loadSongs() {
    setLoading(true);
    try {
      const { songs } = await api.getSongs();
      setSongs(songs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSongs();
  }, []);

  async function handlePlay(song) {
    if (!song.audioUrl) return;

    if (playingId === song.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(song.audioUrl);
    audioRef.current = audio;
    audio.play();
    setPlayingId(song.id);
    audio.onended = () => setPlayingId(null);

    // Log a real play event once playback actually starts
    try {
      await api.logPlay(song.id);
      setSongs((prev) =>
        prev.map((s) => (s.id === song.id ? { ...s, streams: s.streams + 1 } : s))
      );
    } catch {
      // Non-critical if this fails — playback still works
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this song? This can't be undone.")) return;
    try {
      await api.deleteSong(id);
      setSongs((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="music-page">
      <div className="music-header">
        <div>
          <h1>Music</h1>
          <p>Manage your catalog and see how each release is performing</p>
        </div>
        <button className="btn-primary upload-btn" onClick={() => setShowUpload(true)}>
          <UploadCloud size={16} />
          Upload track
        </button>
      </div>

      {loading && <div className="home-loading">Loading your catalog...</div>}
      {error && <div className="home-error">{error}</div>}

      {!loading && !error && songs.length === 0 && (
        <div className="empty-state">
          <p>You haven't uploaded any songs yet.</p>
          <button className="btn-primary" onClick={() => setShowUpload(true)}>
            Upload your first track
          </button>
        </div>
      )}

      {!loading && songs.length > 0 && (
        <div className="song-table">
          <div className="song-row song-row-head">
            <span>#</span>
            <span>Title</span>
            <span>Streams</span>
            <span>Saves</span>
            <span>Duration</span>
            <span></span>
          </div>
          {songs.map((song, i) => (
            <div className="song-row" key={song.id}>
              <span className="song-rank">
                <button
                  className="play-btn-static"
                  onClick={() => handlePlay(song)}
                  disabled={!song.audioUrl}
                  aria-label={playingId === song.id ? "Pause" : "Play"}
                >
                  {playingId === song.id ? <Pause size={14} fill="#000" /> : <Play size={14} fill="#000" />}
                </button>
              </span>
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
              <span>{song.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, "0")}` : "—"}</span>
              <button className="row-menu-btn" onClick={() => handleDelete(song.id)} aria-label="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUploaded={() => {
            setShowUpload(false);
            loadSongs();
          }}
        />
      )}
    </div>
  );
}

function UploadModal({ onClose, onUploaded }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      setError("Title is required.");
      return;
    }

    setSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    if (duration) formData.append("duration", duration);
    if (coverFile) formData.append("cover", coverFile);
    if (audioFile) formData.append("audio", audioFile);

    try {
      await api.uploadSong(formData);
      onUploaded();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal-card" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>Upload a track</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && <div className="login-error">{error}</div>}

        <label>
          Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Song title" />
        </label>

        <label>
          Duration (seconds, optional)
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="204" />
        </label>

        <label>
          Cover image
          <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
        </label>

        <label>
          Audio file
          <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} />
        </label>

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
