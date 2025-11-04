// src/App.jsx
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
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    // some browsers use addEventListener
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

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
        {/* BackgroundMesh is only mounted on non-mobile devices */}
        {!isMobile && <BackgroundMesh />}

        <ResponsiveAdjustments />

        <Sidebar />

        <main className="main-with-sidebar relative z-10">
          <div className="md:pt-0 pt-16">
            {/* HeroMobile will show on small screens; Hero will show on larger */}
            <HeroMobile />
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