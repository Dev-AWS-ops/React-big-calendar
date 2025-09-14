import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import "./registration.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        setMessage("✅ Registration successful! Please check your email for verification.");
      }
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    setMessage("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage("✅ Google registration successful!");
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an account</h2>
        <p className="subtitle">Start your journey with us.</p>
        
        <form onSubmit={handleRegister}>
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
          <button type="submit">Sign Up with Email</button>
        </form>
        
        <div className="separator">or</div>
        
        <div className="social-buttons">
          <button onClick={handleGoogleRegister} className="google-btn">
                        Sign Up with Google
          </button>
        </div>
        
        {message && <p className={`message ${message.startsWith('❌') ? 'error' : ''}`}>{message}</p>}
        
        <p className="redirect-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;