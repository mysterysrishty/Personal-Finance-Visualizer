import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import BudgetsPage from "./pages/BudgetsPage";
import CategoriesPage from "./pages/CategoriesPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./AuthContext";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return <div className="text-center py-20 text-lg">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RedirectIfAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return <div className="text-center py-20 text-lg">Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/transactions", label: "Transactions", icon: "💰" },
    { to: "/budgets", label: "Budgets", icon: "🎯" },
    { to: "/categories", label: "Categories", icon: "🏷️" },
  ];
  return (
    <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 mb-8">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* App Name - Left Side */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-2xl">💼</span>
            <span className="truncate">Personal Finance Visualizer</span>
          </Link>
        </div>
        {/* Hamburger for mobile/tablet */}
        <button
          className="lg:hidden flex items-center px-3 py-2 border rounded-lg text-gray-700 border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <span className="text-xl">{menuOpen ? "✖" : "☰"}</span>
        </button>
        {/* Desktop Nav - Right Side */}
        <div className="hidden lg:flex items-center gap-x-10 ml-12">
          {user ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-all duration-200 px-3 py-2 rounded-xl font-medium text-base hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center gap-2 ${
                    location.pathname === link.to
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200 shadow-sm"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              {/* User Dropdown - Desktop */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 shadow-sm hover:shadow-lg transition-all focus:outline-none"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow text-white text-xl font-bold">
                    <FaUserCircle />
                  </div>
                  <span
                    className="text-gray-900 font-semibold text-sm truncate max-w-[80px]"
                    title={user.name}
                  >
                    {user.name}
                  </span>
                  <FaChevronDown
                    className={`text-gray-500 text-base transition-transform ${
                      userMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-blue-100 z-50 animate-fade-in-up">
                    <div className="flex flex-col items-center gap-2 p-5">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow text-white text-3xl font-bold mb-2">
                        <FaUserCircle />
                      </div>
                      <span
                        className="text-gray-900 font-semibold text-lg truncate w-full text-center"
                        title={user.name}
                      >
                        {user.name}
                      </span>
                      <span
                        className="text-xs text-gray-500 truncate w-full text-center"
                        title={user.email}
                      >
                        {user.email}
                      </span>
                      <button
                        onClick={logout}
                        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-all text-sm shadow-sm w-full justify-center"
                        title="Logout"
                      >
                        <FaSignOutAlt className="text-base" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-x-1">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl font-medium text-blue-600 border-2 border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
        {/* Mobile Nav - Hamburger Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-xl border-b border-gray-100 transition-all duration-300 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col py-2 gap-1">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`transition-all duration-200 px-4 py-3 font-medium text-base hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center gap-3 ${
                      location.pathname === link.to
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-700"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
                {/* User Dropdown - Mobile */}
                <div className="flex flex-col items-center gap-2 mt-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 shadow-sm w-full">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow text-white text-2xl font-bold mb-1">
                    <FaUserCircle />
                  </div>
                  <span
                    className="text-gray-900 font-semibold text-base truncate max-w-[120px]"
                    title={user.name}
                  >
                    {user.name}
                  </span>
                  <span
                    className="text-xs text-gray-500 truncate max-w-[120px]"
                    title={user.email}
                  >
                    {user.email}
                  </span>
                  <button
                    onClick={logout}
                    className="mt-2 flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-all text-sm shadow-sm w-full justify-center"
                    title="Logout"
                  >
                    <FaSignOutAlt className="text-base" />
                    <span className="inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-x-1 px-4">
                <Link
                  to="/login"
                  className="px-4 py-3 font-medium text-blue-600 border-2 border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-3 font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-4">
            © 2025 <span className="font-semibold">Srihsty Singh</span>. All
            rights reserved.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Check out my other projects here:
          </p>
        </div>

        <div className="flex justify-center items-center gap-6">
          {/* GitHub Link */}
          <a
            href="https://github.com/mysterysrishty"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-medium">GitHub</span>
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/srishty-singh-b4a0b4393/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-medium">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <NavBar />
        <main className="flex-1 max-w-6xl mx-auto px-4 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <RedirectIfAuth>
                  <LandingPage />
                </RedirectIfAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              }
            />
            <Route
              path="/transactions"
              element={
                <RequireAuth>
                  <TransactionsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/budgets"
              element={
                <RequireAuth>
                  <BudgetsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/categories"
              element={
                <RequireAuth>
                  <CategoriesPage />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
