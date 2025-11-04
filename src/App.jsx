import React, { useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import HeroMobile from "./components/HeroMobile";
import About from "./components/About";
import ProjectsGrid from "./components/ProjectsGrid";
import TechStack from "./components/TechStack";
import CertificatesGallery from "./components/CertificatesGallery";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ResponsiveAdjustments from "./components/ResponsiveAdjustments";
import BackgroundMesh from "./components/BackgroundMesh";

export default function App() {
  const [openConnect, setOpenConnect] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Handle event listener for connect drawer
  useEffect(() => {
    const onOpenConnect = () => setOpenConnect(true);
    window.addEventListener("openConnect", onOpenConnect);
    return () => {
      window.removeEventListener("openConnect", onOpenConnect);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] relative">
        {/* ✅ Background mesh only for desktop */}
        {!isMobile && <BackgroundMesh />}

        <ResponsiveAdjustments />

        <Sidebar />

        <main className="main-with-sidebar relative z-10">
          <div className="md:pt-0 pt-16">
            {/* ✅ Mobile Hero first so it takes over small screens */}
            <HeroMobile />

            {/* ✅ Desktop Hero visible only on large screens */}
            {!isMobile && <Hero />}

            <About />
            <ProjectsGrid />
            <TechStack />
            <CertificatesGallery />
            <ContactSection />
            <Footer />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}