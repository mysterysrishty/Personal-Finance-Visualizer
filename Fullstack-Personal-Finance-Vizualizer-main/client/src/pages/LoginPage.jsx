import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white px-4 overflow-x-hidden">
      {/* Animated SVG Background */}
      <svg
        className="absolute top-0 left-0 w-full h-80 pointer-events-none z-0"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#a5b4fc"
          fillOpacity="0.18"
          d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>
      <div className="flex flex-col md:flex-row bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 max-w-3xl w-full overflow-hidden animate-fade-in-up min-h-[520px] z-10 glass">
        {/* Illustration / Icon */}
        <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-10 min-h-[520px]">
          <FaSignInAlt className="text-white text-6xl mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-white text-base text-center">
            Login to access your personal finance dashboard and insights.
          </p>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-center p-8 space-y-6 w-full md:w-1/2 min-h-[520px]"
        >
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 tracking-tight">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-2">
            Sign in to your account to continue
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-2 text-center">
              {error}
            </div>
          )}
          <div className="relative mb-2">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-white placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              autoFocus
            />
          </div>
          <div className="relative mb-2">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-purple-100 focus:border-purple-400 bg-white placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex justify-end mb-2">
            <button
              type="button"
              className="text-blue-500 hover:underline text-sm font-medium"
              tabIndex={-1}
              disabled
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="btn-gradient w-full py-3 rounded-xl text-white font-semibold text-lg shadow-lg hover-lift mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-center text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
