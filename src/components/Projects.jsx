/* Animation: framer-motion. Tilt: react-tilt. Class merge: clsx + tailwind-merge. */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import projectsData from "../data/projects.js";
import { staggerContainer, staggerChildren, viewportOnce, springTransition } from "../animations/variants.js";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const tags = useMemo(() => {
    const allTags = new Set();
    projectsData.forEach((project) =>
      project.tags.forEach((tag) => allTags.add(tag))
    );
    return ["All", ...Array.from(allTags)];
  }, []);

  const filteredProjects =
    activeTag === "All"
      ? projectsData
      : projectsData.filter((project) => project.tags.includes(activeTag));

  return (
    <motion.section
      id="projects"
      className="space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <motion.div className="space-y-2" variants={staggerChildren}>
          <h2 className="text-2xl font-heading heading-gradient">Projects</h2>
          <p className="max-w-md text-xs text-muted">
            A selection of projects that blend solid engineering with
            high-fidelity interaction design — from algorithm tooling to
            production-ready SaaS-style apps.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 text-[11px]">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={cn(
                "rounded-full border px-3 py-1 transition-colors",
                activeTag === tag
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-borderSubtle/70 bg-black/60 text-muted hover:border-accent/40 hover:text-accent"
              )}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Magic bento grid: irregular layout with featured span */}
      <motion.div
        className="grid auto-rows-[minmax(200px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        variants={staggerContainer}
      >
        {filteredProjects.map((project, index) => (
          <BentoCard
            key={project.id}
            project={project}
            index={index}
            variants={staggerChildren}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}

const defaultTiltOptions = { max: 8, scale: 1.02, glare: true, "max-glare": 0.18 };

function BentoCard({ project, index, variants }) {
  const isFeatured = project.featured;
  const bentoClass = cn(
    "group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-3xl border border-borderSubtle/80 bg-gradient-to-br from-white/5 via-black to-accentSoft/5 p-4 shadow-[0_0_0_1px_rgba(148,163,184,0.12)]",
    "transition-[box-shadow,border-color] duration-300 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(0,255,136,0.12)]",
    isFeatured && "sm:col-span-2 sm:row-span-2 md:min-h-[320px]"
  );

  return (
    <motion.div
      className={cn(isFeatured && "sm:col-span-2 sm:row-span-2")}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ ...springTransition, delay: index * 0.06 }}
    >
      <Tilt options={defaultTiltOptions} style={{ height: "100%", minHeight: isFeatured ? 320 : 220 }}>
        <motion.article className={bentoClass} whileHover={{ y: -6 }}>
        {/* Animated gradient border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:border-accent/30" />
        <div className="pointer-events-none absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-accent/0 via-accent/5 to-accentSoft/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-muted">
            {project.year}
          </span>
          <div className="flex gap-1.5 text-[10px] text-muted">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full bg-black/60 px-2 py-0.5">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-base font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="text-xs text-muted">{project.tagline}</p>
        </div>

        <p className={cn("mt-3 text-xs text-muted", isFeatured ? "line-clamp-6" : "line-clamp-4")}>
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-muted">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-black/60 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 text-xs">
          <div className="flex gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-borderSubtle/70 bg-black/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              Live Preview
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-borderSubtle/70 bg-black/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/60 hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.article>
      </Tilt>
    </motion.div>
  );
}

export default Projects;
