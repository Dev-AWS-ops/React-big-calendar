import { useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaGlobe } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google logo

import "./Registration.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        setMessage("✅ Registration successful! Please check your email for verification.");
        navigate("/dashboard");
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
      navigate("/dashboard");
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  const handleFacebookRegister = async () => {
    setMessage("");
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage("✅ Facebook registration successful!");
      navigate("/dashboard");
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  // Placeholder for other social platforms
  const handleOtherSocialRegister = (platform: string) => {
    setMessage(`Attempting to register with ${platform}... (Handler not fully implemented)`);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <button className="close-btn" onClick={() => navigate("/")}>
          &times;
        </button>

        <h2 className="register-title">Register Now</h2>

        <p className="existing-user-text">
          Already a user? <Link to="/login" className="login-link">Log in</Link>
        </p>

        {/* Google Button */}
        <button onClick={handleGoogleRegister} className="google-sign-in-btn">
          <span className="google-icon">
            <FcGoogle size={20} />
          </span>
          Continue with Google
        </button>

        {/* Social Buttons */}
        <div className="social-icons-bar">
          <button onClick={handleFacebookRegister} className="social-icon-btn facebook-icon">
            <FaFacebookF color="#fff" />
          </button>
          <button onClick={() => handleOtherSocialRegister("LinkedIn")} className="social-icon-btn linkedin-icon">
            <FaLinkedinIn color="#fff" />
          </button>
          <button onClick={() => handleOtherSocialRegister("GitHub")} className="social-icon-btn github-icon">
            <FaGithub color="#fff" />
          </button>
          <button onClick={() => handleOtherSocialRegister("Generic")} className="social-icon-btn generic-icon">
            <FaGlobe color="#fff" />
          </button>
        </div>

        <div className="separator">or</div>

        {/* Email/Password Form */}
        <form onSubmit={handleRegister}>
          <label htmlFor="email">Username or Email</label>
          <input
            id="email"
            type="email"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="sign-in-btn">Sign Up</button>
        </form>

        {/* Feedback + Policy */}
        {message && (
          <p className={`message ${message.startsWith("❌") ? "error" : ""}`}>
            {message}
          </p>
        )}

        <p className="policy-text">
          By creating this account, you agree to our
          <a href="/privacy" target="_blank"> Privacy Policy</a> & 
          <a href="/cookies" target="_blank"> Cookie Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default Register;
