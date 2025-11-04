// src/App.jsx
import React, { useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsGrid from "./components/ProjectsGrid";
import TechStack from "./components/TechStack";
import CertificatesGallery from "./components/CertificatesGallery";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ResponsiveAdjustments from "./components/ResponsiveAdjustments";

// background mesh animation
import BackgroundMesh from "./components/BackgroundMesh";

export default function App() {
  const [openConnect, setOpenConnect] = useState(false);

  // event listener for connect drawer (if used elsewhere)
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
        {/* background mesh behind everything */}
        <BackgroundMesh />

        {/* responsive helpers (viewport + small-screen tweaks) */}
        <ResponsiveAdjustments />

        {/* sidebar */}
        <Sidebar />

        {/* main content area */}
        <main className="main-with-sidebar relative z-10">
          <div className="md:pt-0 pt-16">
            <Hero />
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
