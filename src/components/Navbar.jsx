import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TSLogo from "./TSLogo";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "tech", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  }

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none" : "bg-transparent"
        }`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:py-3 md:px-6 lg:px-8">
        <button
          type="button"
          className="flex items-center gap-1.5 md:gap-3 text-accent group"
          onClick={() => handleNavClick("home")}
          data-cursor="interactive"
        >
          {/* Use significantly smaller scale on mobile to match image 2 */}
          <div className="block md:hidden">
            <TSLogo scale={0.18} />
          </div>
          <div className="hidden md:block">
            <TSLogo scale={0.65} />
          </div>
          <motion.div
            className="flex items-center font-heading text-base md:text-xl font-bold tracking-widest md:tracking-[0.35em]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="bg-gradient-to-r from-accent via-white to-[#00ccff] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,255,136,0.8)]"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              TAJINDER
            </motion.span>
          </motion.div>
        </button>

        <nav
          className={`hidden items-center text-xs font-medium md:flex ${scrolled
            ? "rounded-full border border-accent/20 bg-[#030805]/95 backdrop-blur-xl px-2 py-1 shadow-lg shadow-black/80"
            : "rounded-full border border-borderSubtle/40 bg-black/50 px-2 py-1"
            }`}
        >
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className="relative mx-1 rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-accent hover:text-black hover:font-bold"
              onClick={() => handleNavClick(link.id)}
              data-cursor="interactive"
            >
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="relative ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-borderSubtle/70 bg-black/80 text-xs font-medium text-muted backdrop-blur md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          data-cursor="interactive"
        >
          <motion.span
            className="block h-[1.5px] w-4 bg-foreground"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 3 : -2,
            }}
          />
          <motion.span
            className="absolute block h-[1.5px] w-4 bg-foreground"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -3 : 2,
            }}
          />
        </button>
      </div>

      <motion.nav
        className="mx-auto block max-w-6xl px-4 md:hidden pb-4"
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.24, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div className="glass-surface border border-borderSubtle/50 rounded-2xl bg-black/90 px-4 py-3 text-sm text-foreground shadow-2xl backdrop-blur-xl">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              className="my-1.5 block w-full text-left py-2 px-3 text-sm font-medium rounded-lg transition-colors hover:bg-white/5 hover:text-accent active:bg-white/10"
              onClick={() => handleNavClick(link.id)}
              data-cursor="interactive"
            >
              {link.label}
            </button>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}

export default Navbar;

