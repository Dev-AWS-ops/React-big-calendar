import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.emailVerified) {
        setMessage("✅ Login successful!");
      } else {
        setMessage("⚠️ Please verify your email before logging in.");
      }
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage("✅ Google login successful!");
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome back</h2>
        <p className="subtitle">Login to your account.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>

        <div className="separator">or</div>
        
        <div className="social-buttons">
          <button onClick={handleGoogleLogin} className="google-btn">
            
            Log In with Google
          </button>
        </div>

        {message && <p className={`message ${message.startsWith('❌') ? 'error' : ''}`}>{message}</p>}

        <p className="redirect-text">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;