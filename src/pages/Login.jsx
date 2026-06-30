import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password || (mode === "signup" && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-logo">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
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

      <form className="login-card" onSubmit={handleSubmit}>
        <h1>{mode === "login" ? "Log in to your dashboard" : "Create your artist account"}</h1>

        {error && <div className="login-error">{error}</div>}

        {mode === "signup" && (
          <label>
            Artist / band name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>
        )}

        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>

        <button type="submit" className="btn-primary login-submit" disabled={submitting}>
          {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
        </button>

        <p className="login-hint">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button type="button" className="login-toggle" onClick={() => setMode("signup")}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" className="login-toggle" onClick={() => setMode("login")}>
                Log in
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
