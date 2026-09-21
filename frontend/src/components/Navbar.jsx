import React, { useEffect, useState } from "react";

// Safe Firebase auth resolver to prevent build errors in preview environments
let authInstance = null;
try {
  // Attempt dynamic or standard import if present in host project
  const firebaseModule = require("../firebase");
  authInstance = firebaseModule.auth;
} catch (e) {
  // Fallback mock auth object if '../firebase' file is not present in build sandbox
  authInstance = {
    currentUser: { email: "pam.nautiyal@gmail.com" }
  };
}

export function Navbar({ onNavigate }) {
  const [user, setUser] = useState(null);
  const [modalInfo, setModalInfo] = useState({ show: false, title: "", message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("/discover");

  useEffect(() => {
    // If Firebase Auth is available in the environment
    try {
      const { onAuthStateChanged } = require("firebase/auth");
      if (authInstance && onAuthStateChanged) {
        const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
      }
    } catch (err) {
      // Fallback state for preview mode
      setUser(authInstance?.currentUser || null);
    }
  }, []);

  const handleNavigate = (path) => {
    setCurrentRoute(path);
    if (onNavigate) onNavigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { signOut } = require("firebase/auth");
      if (authInstance) await signOut(authInstance);
    } catch (e) {
      console.log("Logged out");
    }
    setUser(null);
    setMobileMenuOpen(false);
    handleNavigate("/");
  };

  const handleListPropertyClick = (e) => {
    if (!user) {
      if (e) e.preventDefault();
      setModalInfo({
        show: true,
        title: "Authentication Required",
        message: "You need to log in or sign up first before listing your property on The Himalayans."
      });
      setMobileMenuOpen(false);
    } else {
      handleNavigate("/list-property");
    }
  };

  const handleMyTripsClick = (e) => {
    if (!user) {
      if (e) e.preventDefault();
      setModalInfo({
        show: true,
        title: "Authentication Required",
        message: "Please log in or sign up first to view your trips!"
      });
      setMobileMenuOpen(false);
    } else {
      handleNavigate("/mytrips");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-700/60 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left Section: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-2.5 text-xl sm:text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200 hover:opacity-90 transition-opacity focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-sky-500/20 border border-white/15 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M14 6l-3.8 5.7 1.8 2.7L14 6zm-8 8l3-4.5 2.5 3.75L9 17l-3-3zm14 3l-6-9-2.5 3.75L15 17h5z" />
                </svg>
              </div>
              <span>The Himalayans</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            <button 
              onClick={() => handleNavigate("/hotels")}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute === "/hotels" ? "bg-white/15 text-white font-semibold" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              Hotels
            </button>

            <button 
              onClick={handleMyTripsClick} 
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute === "/mytrips" ? "bg-white/15 text-white font-semibold" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              My Trips
            </button>

            {/* Glowing Offers Tag */}
            <button 
              onClick={() => handleNavigate("/offers")}
              className="px-3.5 py-2 rounded-xl text-sm font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Offers</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </button>

            <button 
              onClick={() => handleNavigate("/admin")}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute === "/admin" ? "bg-white/15 text-white font-semibold" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              🛠️ Admin
            </button>

            <button 
              onClick={handleListPropertyClick} 
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute === "/list-property" ? "bg-white/15 text-white font-semibold" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              List Property
            </button>
            
            <div className="h-5 w-px bg-slate-700/80 mx-2" />

            {/* User Profile / Auth State Controls */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 py-1.5 px-3 rounded-full shadow-inner">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-xs text-slate-300">
                    Hi, <strong className="text-white font-semibold">{user.email ? user.email.split('@')[0] : "User"}</strong>
                  </span>
                </div>

                <button 
                  onClick={handleLogout} 
                  className="bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 hover:text-rose-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleNavigate("/login")} 
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  Login
                </button>
                <button 
                  onClick={() => handleNavigate("/signup")} 
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-200"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 transition-all duration-300">
          {user && (
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 mb-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center">
                {user.email ? user.email.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-semibold text-white">{user.email}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            <button 
              onClick={() => handleNavigate("/hotels")}
              className="text-left text-slate-300 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2"
            >
              🏨 Hotels
            </button>

            <button 
              onClick={handleMyTripsClick}
              className="text-left text-slate-300 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2"
            >
              🧳 My Trips
            </button>

            <button 
              onClick={() => handleNavigate("/offers")}
              className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-between"
            >
              <span>✨ Special Offers</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">New</span>
            </button>

            <button 
              onClick={() => handleNavigate("/admin")}
              className="text-left text-slate-300 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2"
            >
              🛠️ Admin
            </button>

            <button 
              onClick={handleListPropertyClick}
              className="text-left text-slate-300 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2"
            >
              🏡 List Property
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800">
            {user ? (
              <button 
                onClick={handleLogout}
                className="w-full text-center bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 py-2.5 rounded-xl font-semibold text-sm transition-all"
              >
                Logout
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button 
                  onClick={() => handleNavigate("/login")}
                  className="text-center bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 py-2.5 rounded-xl font-semibold text-sm"
                >
                  Login
                </button>
                <button 
                  onClick={() => handleNavigate("/signup")}
                  className="text-center bg-sky-500 hover:bg-sky-400 text-white py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-sky-500/20"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {modalInfo.show && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center max-w-sm w-full shadow-2xl">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {modalInfo.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {modalInfo.message}
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setModalInfo({ show: false, title: "", message: "" })}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setModalInfo({ show: false, title: "", message: "" });
                  handleNavigate("/login");
                }}
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-sky-500/20 transition-all"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState("/discover");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Responsive Glassmorphism Navbar */}
      <Navbar onNavigate={(route) => setActiveRoute(route)} />

      {/* Hero Showcase Background */}
      <main className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Discover the True Spirit of the Himalayas
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal">
            Book Verified Mountain Stays, Sacred Char Dham Yatra Packages & Guided Treks.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => setActiveRoute("/hotels")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-sky-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Explore Hotels
            </button>
            <button 
              onClick={() => setActiveRoute("/offers")}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/15 backdrop-blur-md transition-all transform hover:-translate-y-0.5"
            >
              Special Offers
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}