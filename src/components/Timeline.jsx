import { motion } from "framer-motion";
import experience from "../data/experience.js";

function Timeline() {
  return (
    <section
      id="experience"
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-heading heading-gradient">Experience</h2>
        <p className="max-w-md text-xs text-muted">
          A quick snapshot of how I&apos;ve been sharpening my craft across
          university, self-driven projects, and competitive programming.
        </p>
      </div>

      <div className="relative pl-6">
        <motion.div
          className="absolute left-2 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-accent via-accent/40 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        <div className="space-y-8">
          {experience.map((item, index) => (
            <motion.article
              key={item.id}
              className="relative pl-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
                delay: index * 0.08,
              }}
            >
              <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-accent shadow-soft-glow" />
              </div>
              <div className="glass-surface rounded-2xl px-4 py-3 text-xs">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-muted">
                  {item.company} • {item.location}
                </p>
                <p className="mt-2 text-[11px] text-muted">{item.summary}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;

