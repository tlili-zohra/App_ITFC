// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/ITFC_LOGO.ico";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const servicesRef = useRef(null);
  const navRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mouseleave", handleClickOutside);
  }, []);
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutsidenav = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsidenav);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsidenav);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashNavigation = (hash) => {
    if (location.pathname !== "/") {
      navigate(`/${hash}`);
    } else {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 "
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <img src={logo} alt="ITFC Logo" className="h-10" />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-black text-2xl hover:text-yellow-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "" : "☰"}
        </button>

        {/* Links */}
        <ul
          className={`${
            menuOpen ? "flex flex-col gap-4 mt-4" : "hidden"
          } md:flex md:items-center md:gap-6`}
        >
          <li>
            <button
              onClick={() => handleHashNavigation("#home")}
              className="block hover:text-yellow-600 text-black cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleHashNavigation("#about")}
              className="block hover:text-yellow-600 text-black cursor-pointer"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => handleHashNavigation("#services")}
              className="block hover:text-yellow-600 text-black cursor-pointer"
            >
              Services
            </button>
          </li>
          {/*<li className="relative" ref={servicesRef}>
            <a href="#services">
              <button
                onMouseDownCapture={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 hover:text-yellow-400 focus:outline-none text-black"
              >
                Services
                {servicesOpen && (
                  <span
                    className={`transition-opacity duration-300 transform w-6 h-6 inline-block ${
                      servicesOpen ? "rotate-360" : ""
                    }`}
                  >
                    ▼
                  </span>
                )}
              </button>
            </a>
            {servicesOpen && (
              <ul className="absolute bg-white text-black shadow rounded mt-2 py-2 w-48 right-0">
                <li>
                  <Link
                    to="#activites"
                    className="block px-4 py-2 hover:bg-yellow-600 text-black"
                  >
                    Nos Activités
                  </Link>
                </li>
                <li>
                  <Link
                    to="/videosection"
                    className="block px-4 py-2 hover:bg-yellow-600 text-black"
                  >
                    Nos Vidéos
                  </Link>
                </li>
              </ul>
            )}
          </li>*/}
          <li>
            <button
              onClick={() => handleHashNavigation("#blog")}
              className="block hover:text-yellow-600 text-black cursor-pointer"
            >
              Blog
            </button>
          </li>
          <li>
            <button
              onClick={() => handleHashNavigation("#contact")}
              className="block hover:text-yellow-600 text-black cursor-pointer"
            >
              Contact Us
            </button>
          </li>
          <li className="flex gap-4 md:ml-4">
            <button className="block border border-yellow-600 px-4 py-2 rounded hover:bg-yellow-600 hover:text-white transition text-black">
              Connexion
            </button>
            <button className="block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 hover:text-white transition">
              Start Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
