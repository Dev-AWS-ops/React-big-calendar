import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaGlobe } from "react-icons/fa";
import "./Login.css";

// Assuming you have icons for the social media buttons, you would import them here
// Example:
// import { FaFacebookF, FaLinkedinIn, FaGithub, FaGlobe } from 'react-icons/fa'; // You'd need to install react-icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // New state for 'Remember Me'
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      // NOTE: Firebase signInWithEmailAndPassword doesn't natively handle 'Remember Me'.
      // For persistent sessions, you would use 'setPersistence' *before* signing in.
      // This is UI-only for this example.
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Removed email verification check to simplify the example. 
      // Re-add your verification logic as needed.
      setMessage("✅ Login successful!");
      navigate("/dashboard");
      
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
      navigate("/dashboard");
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  // The rest of the social login handlers (Facebook, etc.) would be similar
  const handleFacebookLogin = async () => {
    setMessage("");
    try {
      const provider = new FacebookAuthProvider(); // Ensure you've configured this in Firebase
      await signInWithPopup(auth, provider);
      setMessage("✅ Facebook login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  // Placeholder functions for other social logins to match the UI
  const handleOtherSocialLogin = (platform: string) => {
    setMessage(`Attempting to log in with ${platform}... (Handler not fully implemented)`);
    // Implement actual logic for LinkedIn, Github, etc.
  };


  return (
    <div className="login-container">
      <div className="login-box">
        {/* Close Button - Added for design completeness */}
        <button className="close-btn" onClick={() => navigate('/')}>&times;</button> 

        <h2 className="login-title">Log in</h2>
        
        {/* Register/New User Link - Positioned as in the image */}
        <p className="new-user-text">
          New user? <Link to="/register" className="register-link">Register Now</Link>
        </p>
        
        {/* Google Login Button (First and Prominent) */}
        <button onClick={handleGoogleLogin} className="google-sign-in-btn">
          <span className="google-icon">
             {/* You would put your Google icon/SVG here */} 
                       </span> 
          Continue with Google
        </button>

        {/* Other Social Icons */}
      <div className="social-icons-bar">
  <button onClick={handleFacebookLogin} className="social-icon-btn facebook-icon">
    <FaFacebookF />
  </button>
  <button onClick={() => handleOtherSocialLogin("LinkedIn")} className="social-icon-btn linkedin-icon">
    <FaLinkedinIn />
  </button>
  <button onClick={() => handleOtherSocialLogin("GitHub")} className="social-icon-btn github-icon">
    <FaGithub />
  </button>
  <button onClick={() => handleOtherSocialLogin("Generic")} className="social-icon-btn generic-icon">
    <FaGlobe />
  </button>
</div>

        
        <div className="separator">or</div>
        
        {/* Email/Password Form */}
        <form onSubmit={handleLogin}>
          <label htmlFor="username-email">Username or Email</label>
          <input
            id="username-email"
            type="text" // Changed to text to allow for username or email
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

          {/* Remember Me and Forgot Password */}
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password
            </Link>
          </div>
          
          <button type="submit" className="sign-in-btn">Sign In</button>
        </form>

        {/* Message and Privacy/Cookie Policy */}
        {message && <p className={`message ${message.startsWith('❌') ? 'error' : ''}`}>{message}</p>}
        
        <p className="policy-text">
          By creating this account, you agree to our 
          <a href="/privacy" target="_blank"> Privacy Policy</a> & 
          <a href="/cookies" target="_blank"> Cookie Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default Login;