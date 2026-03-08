import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import TechStack from "./components/TechStack.jsx";
import Projects from "./components/Projects.jsx";
import Timeline from "./components/Timeline.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

import useScrollProgress from "./hooks/useScrollProgress.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground font-body">
      <div className="pointer-events-none fixed inset-0 bg-noise-soft opacity-50 mix-blend-soft-light" />
      <div className="pointer-events-none fixed inset-0 bg-radial-primary opacity-70 blur-3xl" />

      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-[3px] bg-gradient-to-r from-accent to-accentSoft origin-left"
        style={{ scaleX: scrollProgress }}
      />

      <CustomCursor />

      <Toaster position="top-center" toastOptions={{ duration: 2000, style: { background: "#0a0a0a", color: "#f0f0f5", border: "1px solid rgb(0,255,136)" } }} />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: isLoading ? 0.4 : 0 }}
        className="relative z-10"
      >
        <Navbar />

        <div className="mx-auto flex max-w-6xl flex-col gap-32 px-4 pb-24 pt-24 md:px-6 lg:px-8 lg:pt-28">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Timeline />
          <Testimonials />
          <Contact />
        </div>

        <Footer />
      </motion.main>
    </div>
  );
}

export default App;

