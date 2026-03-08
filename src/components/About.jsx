/* Animation: framer-motion. Styling: Tailwind only. */
import { motion } from "framer-motion";
import { fadeIn, viewportOnce, staggerContainer, staggerChildren, springTransition } from "../animations/variants.js";

function About() {
  return (
    <motion.section
      id="about"
      className="flex flex-col gap-10 md:flex-row md:items-center"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.div
        className="relative mx-auto w-72 max-w-sm md:mx-0 md:w-80"
        variants={staggerChildren}
      >
        <motion.div
          className="group relative rounded-[2rem] bg-gradient-to-br from-accent/20 via-black to-accentSoft/10 p-[1px] shadow-soft-glow"
          whileHover={{ scale: 1.02 }}
          transition={springTransition}
        >
          <div className="relative overflow-hidden rounded-[1.9rem] bg-black/80">
            <motion.img
              src="/tajinder_professional_pic.png"
              alt="Professional portrait of Tajinder Singh"
              className="h-80 w-full object-cover object-top transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-96"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 translate-x-1 bg-[linear-gradient(90deg,rgba(0,255,136,0.35),transparent)] mix-blend-screen" />
              <div className="absolute inset-0 -translate-x-1 bg-[linear-gradient(-90deg,rgba(0,229,255,0.35),transparent)] mix-blend-screen" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex-1 space-y-5 text-sm text-muted"
        variants={staggerChildren}
      >
        <h2 className="text-2xl font-heading heading-gradient">About</h2>
        <p className="text-base text-foreground">
          I&apos;m Tajinder Singh, a{" "}
          <span className="text-accent">full-stack engineer</span> and{" "}
          <span className="text-accent">problem solver</span> currently
          pursuing a B.E. in Computer Science &amp; Engineering at Chandigarh
          University (2027 batch).
        </p>
        <p>
          I love building experiences that feel tangible — products that are
          fast, delightful, and grounded in solid engineering. From DSA-heavy
          algorithm visualizers to production-ready MERN applications, I enjoy
          working across the stack and sweating the details.
        </p>
        <p>
          Outside of shipping projects, you&apos;ll find me solving DSA
          challenges on LeetCode and Codeforces, refining my understanding of
          systems, and exploring animation libraries that make interfaces feel
          alive.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 text-xs max-w-[140px]">
          <motion.div
            className="glass-surface rounded-2xl px-3 py-3"
            whileHover={{ y: -4 }}
            transition={springTransition}
          >
            <p className="text-sm font-semibold text-foreground">500+</p>
            <p className="mt-1 text-[11px] text-muted">DSA Problems</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default About;
