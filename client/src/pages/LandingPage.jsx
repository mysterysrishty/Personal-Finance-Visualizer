import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaWallet,
  FaUserShield,
  FaMobileAlt,
  FaRupeeSign,
  FaSignInAlt,
  FaUserPlus,
  FaArrowRight,
  FaRegSmile,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserShield className="text-3xl text-blue-600" />,
    title: "Secure Authentication",
    desc: "Register, login, and keep your data private with JWT-based authentication.",
  },
  {
    icon: <FaChartPie className="text-3xl text-purple-600" />,
    title: "Analytics Dashboard",
    desc: "Visualize your spending with interactive charts and insights.",
  },
  {
    icon: <FaWallet className="text-3xl text-green-600" />,
    title: "Budget Planning",
    desc: "Set monthly budgets and track your progress in real time.",
  },
  {
    icon: <FaRupeeSign className="text-3xl text-yellow-500" />,
    title: "Indian Localization",
    desc: "Rupee (₹) support and Indian number formatting for all users.",
  },
  {
    icon: <FaMobileAlt className="text-3xl text-pink-500" />,
    title: "Mobile Friendly",
    desc: "Responsive design for a seamless experience on any device.",
  },
];

const steps = [
  {
    icon: <FaUserPlus className="text-2xl text-blue-500" />,
    title: "Sign Up",
    desc: "Create your free account in seconds.",
  },
  {
    icon: <FaWallet className="text-2xl text-green-500" />,
    title: "Add Transactions",
    desc: "Log your expenses and income easily.",
  },
  {
    icon: <FaChartPie className="text-2xl text-purple-500" />,
    title: "Visualize & Improve",
    desc: "See insights and optimize your spending.",
  },
];

const testimonials = [
  {
    name: "Amit S.",
    text: "This app made budgeting so easy! The charts are beautiful and the insights are spot on.",
  },
  {
    name: "Priya R.",
    text: "I love the Indian number formatting and Rupee support. Super helpful for my family!",
  },
  {
    name: "Rahul K.",
    text: "Secure, fast, and mobile-friendly. I use it every day to track my expenses.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-white flex flex-col items-center justify-start px-4 pb-16 overflow-x-hidden">
      {/* Animated SVG Background */}
      <svg
        className="absolute top-0 left-0 w-full h-96 pointer-events-none z-0"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#a5b4fc"
          fillOpacity="0.25"
          d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>
      {/* Hero Section */}
      <div className="relative w-full max-w-4xl text-center mt-20 mb-12 animate-fade-in-up z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-5 shadow-2xl mb-2 animate-pulse">
            <FaWallet className="text-6xl text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight drop-shadow-lg">
            Personal Finance Visualizer
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto mb-4 font-medium">
            Take control of your finances. Track spending, set budgets, and gain
            insights with beautiful charts and a modern dashboard. Designed for
            Indian users with full Rupee (₹) support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Link
              to="/login"
              className="btn-gradient px-8 py-3 rounded-xl text-white font-semibold text-lg shadow-lg hover-lift flex items-center gap-2 group transition-transform duration-200"
            >
              <FaSignInAlt /> Login{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="bg-white border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-50 hover-lift flex items-center gap-2 group transition-transform duration-200"
            >
              <FaUserPlus /> Register{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 animate-fade-in-up z-10">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 card-hover animate-fade-in-up group"
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            <div className="mb-4 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {f.title}
            </h3>
            <p className="text-gray-600 text-base font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
      {/* How it Works Section */}
      <div className="relative w-full max-w-4xl mt-20 animate-fade-in-up z-10">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          How it Works
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            >
              <div className="mb-3">{step.icon}</div>
              <h4 className="text-lg font-bold mb-1 text-blue-700">
                {step.title}
              </h4>
              <p className="text-gray-600 text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="relative w-full max-w-4xl mt-20 animate-fade-in-up z-10">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
            >
              <FaRegSmile className="text-3xl text-yellow-400 mb-2" />
              <p className="text-gray-700 italic mb-2">“{t.text}”</p>
              <span className="text-blue-700 font-semibold">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="mt-20 text-center animate-fade-in-up z-10">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Ready to take control of your finances?
        </h2>
        <Link
          to="/register"
          className="btn-gradient px-10 py-4 rounded-2xl text-white font-semibold text-xl shadow-lg hover-lift inline-block"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
}
