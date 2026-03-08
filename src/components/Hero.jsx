/* Animation: framer-motion. Terminal text: pure React + CSS. */
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const headingWords = ["I", "build", "things", "that", "matter"];
import HeroTerminal from "./HeroTerminal";

function MagneticButton({ children, variant = "primary", href, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 24, mass: 0.4 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const baseClasses =
    "relative inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors overflow-hidden";
  const variants = {
    primary:
      "bg-accent text-black hover:bg-accentSoft shadow-soft-glow border border-accent/50",
    ghost:
      "border border-borderSubtle/70 bg-white/5 text-muted hover:text-accent hover:border-accent/40",
  };

  const content = (
    <motion.span
      className={`${baseClasses} ${variants[variant]}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="interactive"
    >
      <span className="pointer-events-none relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noreferrer"
        className="group inline-block"
        data-cursor="interactive"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-block"
      data-cursor="interactive"
    >
      {content}
    </button>
  );
}

function Hero() {
  function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col justify-center gap-12 pt-28 pb-16 lg:pt-8 lg:min-h-screen lg:flex-row lg:items-center lg:gap-24 xl:gap-32"
    >
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_top,_rgba(0,255,136,0.25),_transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_bottom,_rgba(0,229,255,0.25),_transparent_60%)] blur-3xl" />

      <div className="relative z-10 flex-1 space-y-6 lg:max-w-xl">
        <motion.p
          className="inline-flex items-center gap-2 rounded-full border border-borderSubtle/70 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-muted"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-soft-glow" />
          Available for internships & freelance
        </motion.p>

        <motion.h1
          className="text-4xl font-heading leading-tight sm:text-5xl lg:text-6xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {headingWords.map((word, index) => (
            <motion.span
              key={word}
              className="mr-2 inline-block heading-gradient"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 26 },
                },
              }}
            >
              {word}
              {index === headingWords.length - 1 ? "" : ""}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-xs font-heading uppercase tracking-[0.35em] text-muted sm:text-[11px]">
            Tajinder Singh — full‑stack engineer
          </p>
          <p className="max-w-xl text-sm text-muted">
            Full-stack engineer and product-focused problem solver. I design and
            build performant experiences that feel like premium SaaS — from
            real-time systems to cinematic landing pages.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <MagneticButton variant="primary" onClick={() => scrollToSection("contact")}>
            Hire me
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            href="https://drive.google.com/file/d/1nAZh2Foz1MCBq0gXh6tAusuUzsWQHMTy/view"
          >
            Resume
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            href="https://linkedin.com/in/tajinder-singh-70787a28b"
          >
            LinkedIn
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            href="https://github.com/tajinder102005"
          >
            GitHub
          </MagneticButton>
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-4 text-[11px] text-muted">
          <span className="rounded-full bg-white/5 px-3 py-1">
            500+ DSA problems solved
          </span>
        </div>
      </div>

      {/* dark terminal theme on the right */}
      <motion.div
        className="relative z-10 mt-6 flex-1 items-center justify-center lg:mt-0 lg:flex"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 28 }}
      >
        <HeroTerminal />
      </motion.div>
      {/* scroll prompt */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <button
          type="button"
          onClick={() => scrollToSection("about")}
          className="pointer-events-auto flex flex-col items-center gap-2 text-[11px] text-muted"
        >
          <motion.div
            className="flex h-8 w-4 items-center justify-center rounded-full border border-accent/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="h-1.5 w-1.5 rounded-[3px] bg-accent"
              animate={{ y: [2, 6, 2] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-0.5"
          >
            <span className="block h-1 w-2 rotate-45 rounded-[1px] bg-accent" />
            <span className="block h-1 w-2 -rotate-45 -mt-1 rounded-[1px] bg-accent" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}

export default Hero;

