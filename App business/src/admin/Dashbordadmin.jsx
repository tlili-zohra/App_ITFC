import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function Dashbordadmin() {
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");
        // Replace with your backend endpoint
        const res = await axios.get("/adminlogin");
        setStats(res.data.stats);
        setRecentActivities(res.data.recentActivities);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  // Close nav when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    }
    if (navOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen]);

  const handleLogout = () => {
    logout();
    navigate("/adminlogin");
  };

  return (
    <div className="font-sans bg-gradient-to-br from-blue-950 via-violet-900 to-yellow-100 min-h-screen flex">
      {/* Sidebar Navigation */}
      <div>
        {/* Hamburger Icon */}
        <button
          className="m-4 p-2 rounded-md bg-blue-950 shadow hover:bg-violet-800 focus:outline-none"
          onClick={() => setNavOpen((open) => !open)}
          aria-label="Open navigation"
        >
          <span className="text-2xl text-yellow-400">☰</span>
        </button>
        {/* Sidebar */}
        {navOpen && (
          <div
            ref={navRef}
            className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-950 via-violet-900 to-blue-800 shadow-2xl z-50 flex flex-col pt-8"
          >
            <div className="flex items-center gap-2 px-6 mb-8">
              <span className="text-3xl text-yellow-400">👤</span>
              <span className="text-xl font-bold text-yellow-100">
                {currentUser?.username
                  ? `${currentUser.username} Dashboard`
                  : "Admin Dashboard"}
              </span>
            </div>
            <nav className="flex-1">
              <ul className="flex flex-col gap-4 px-6">
                <li>
                  <NavLink
                    to="home"
                    className={({ isActive }) =>
                      `flex items-center gap-2 font-medium transition ${
                        isActive
                          ? "text-yellow-400 bg-blue-900 rounded px-2 py-1"
                          : "text-yellow-200 hover:text-yellow-400"
                      }`
                    }
                  >
                    <span>/^^\</span>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="userfolders"
                    className={({ isActive }) =>
                      `flex items-center gap-2 font-medium transition ${
                        isActive
                          ? "text-yellow-400 bg-blue-900 rounded px-2 py-1"
                          : "text-yellow-200 hover:text-yellow-400"
                      }`
                    }
                  >
                    <span>📁</span>
                    User Folders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="paymentvideo"
                    className={({ isActive }) =>
                      `flex items-center gap-2 font-medium transition ${
                        isActive
                          ? "text-yellow-400 bg-blue-900 rounded px-2 py-1"
                          : "text-yellow-200 hover:text-yellow-400"
                      }`
                    }
                  >
                    <span>💳</span>
                    Payment Video
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="newadmin"
                    className={({ isActive }) =>
                      `flex items-center gap-2 font-medium transition ${
                        isActive
                          ? "text-yellow-400 bg-blue-900 rounded px-2 py-1"
                          : "text-yellow-200 hover:text-yellow-400"
                      }`
                    }
                  >
                    <span>👤👤</span>
                    New Admin
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="videomanagement"
                    className={({ isActive }) =>
                      `flex items-center gap-2 font-medium transition ${
                        isActive
                          ? "text-yellow-400 bg-blue-900 rounded px-2 py-1"
                          : "text-yellow-200 hover:text-yellow-400"
                      }`
                    }
                  >
                    <span>🎬</span>
                    Video Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="blogmanager"
                    className={({ isActive }) =>
                      `flex items-center gap-2 font-medium transition ${
                        isActive
                          ? "text-yellow-400 bg-blue-900 rounded px-2 py-1"
                          : "text-yellow-200 hover:text-yellow-400"
                      }`
                    }
                  >
                    <span>📝</span>
                    Blog Manager
                  </NavLink>
                </li>
              </ul>
            </nav>
            <button
              onClick={handleLogout}
              className="m-6 mt-auto bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {/* Main Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}
