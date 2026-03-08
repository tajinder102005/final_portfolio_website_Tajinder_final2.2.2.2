import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    id: "cp",
    title: "Competitive Programming",
    quote:
      "Solved 500+ DSA problems across arrays, trees, graphs, and DP — building a calm, systematic approach to problem-solving.",
    context: "LeetCode • Codeforces • GeeksForGeeks",
  },
  {
    id: "teamwork",
    title: "Teamwork & Ownership",
    quote:
      "Comfortable driving features end-to-end — from ideation and architecture to clean implementation and debugging.",
    context: "Group projects & hackathons",
  },
  {
    id: "quality",
    title: "Product Quality",
    quote:
      "Obsessed with pixel quality and performance. I treat personal projects like real products, not throwaway demos.",
    context: "Personal portfolio & client work",
  },
];

function Testimonials() {
  const [showStatic, setShowStatic] = useState(false);

  return (
    <section id="testimonials" className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-heading heading-gradient">
            Achievements & mindset
          </h2>
          <p className="max-w-md text-xs text-muted">
            Not just what I&apos;ve built, but how I think about engineering,
            learning, and collaboration.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowStatic((prev) => !prev)}
          className="rounded-full border border-borderSubtle/70 bg-black/60 px-3 py-1 text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
          data-cursor="interactive"
        >
          {showStatic ? "Hide cards" : "View all as cards"}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-borderSubtle/70 bg-white/5 p-4">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <motion.article
              key={`${item.id}-${index}`}
              className="glass-surface mr-4 flex min-w-[260px] max-w-xs flex-col justify-between rounded-2xl px-4 py-3 text-xs"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div>
                <p className="text-[11px] text-accent uppercase tracking-[0.2em]">
                  {item.title}
                </p>
                <p className="mt-2 text-[11px] text-muted leading-relaxed">
                  {item.quote}
                </p>
              </div>
              <p className="mt-3 text-[10px] text-muted">{item.context}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {showStatic && (
          <motion.div
            className="grid gap-3 text-xs text-muted md:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="glass-surface flex flex-col justify-between rounded-2xl px-4 py-3"
              >
                <p className="text-[11px] text-accent uppercase tracking-[0.2em]">
                  {item.title}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed">
                  {item.quote}
                </p>
                <p className="mt-3 text-[10px] text-muted">{item.context}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Testimonials;

