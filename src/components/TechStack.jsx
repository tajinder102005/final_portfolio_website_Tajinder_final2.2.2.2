import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import skills from "../data/skills.js";

const marqueeVariants = (direction = 1) => ({
  animate: {
    x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 22,
      ease: "linear",
    },
  },
});

function TechPill({ skill }) {
  return (
    <div className="group relative mr-4 flex min-w-[120px] items-center gap-2 rounded-full border border-borderSubtle/60 bg-black/60 px-3 py-1.5 text-xs text-muted backdrop-blur">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-[11px] text-accent">
        {skill.name[0]}
      </span>
      <span className="truncate">{skill.name}</span>
    </div>
  );
}

function TechStack() {
  const [showStatic, setShowStatic] = useState(false);
  const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
  const secondRow = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section
      id="tech"
      className="space-y-6"
    >
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-heading heading-gradient">
            Tech stack
          </h2>
          <p className="max-w-md text-xs text-muted">
            A pragmatic mix of modern web technologies — from performant
            frontends to scalable backends and everything in between.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowStatic((prev) => !prev)}
            className="rounded-full border border-borderSubtle/70 bg-black/60 px-3 py-1 text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
            data-cursor="interactive"
          >
            {showStatic ? "Hide full stack" : "View full stack"}
          </button>
        </div>
      </div>

      <div className="space-y-4 overflow-hidden rounded-3xl border border-borderSubtle/60 bg-gradient-to-b from-white/5 to-black/60 p-4">
        <motion.div
          className="flex"
          variants={marqueeVariants(1)}
          animate="animate"
        >
          {[...firstRow, ...firstRow].map((skill, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TechPill key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </motion.div>
        <motion.div
          className="flex"
          variants={marqueeVariants(-1)}
          animate="animate"
        >
          {[...secondRow, ...secondRow].map((skill, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TechPill key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {showStatic && (
          <motion.div
            className="grid gap-3 rounded-3xl border border-borderSubtle/60 bg-black/80 p-4 text-xs text-muted md:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
          >
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col gap-1 rounded-2xl border border-borderSubtle/60 bg-black/60 px-3 py-2"
              >
                <span className="text-sm text-foreground">{skill.name}</span>
                <span className="text-[11px] text-muted">
                  {skill.category} • {skill.level}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default TechStack;

