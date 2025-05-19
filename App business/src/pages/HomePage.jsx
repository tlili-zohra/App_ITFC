import { useEffect } from "react";
import AboutSection from "../Compenents/AboutSection";
import BlogSection from "../Compenents/BlogSection";
import Contact from "../Compenents/Contact";
import Footer from "../Compenents/Footer";
import HeroSection from "../Compenents/HeroSection";
import Navbar from "../Compenents/Navbar";
import NewSection from "../Compenents/NewSection";
import ServicesSection from "../Compenents/ServicesSection";

export default function HomePage({ blog, services }) {
  return (
    <>
      {/* Background & Navbar / Hero Section */}

      <HeroSection />
      <NewSection />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection services={services} />
      {/* Blog Section */}
      <BlogSection blog={blog} />
      {/* Conatct Section */}
      <Contact />
    </>
  );
}
