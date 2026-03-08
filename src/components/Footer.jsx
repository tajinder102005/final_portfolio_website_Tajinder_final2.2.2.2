import { motion } from "framer-motion";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-borderSubtle/60 bg-black/80 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-[11px] text-muted md:flex-row md:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          Built with ❤️ using React, Vite, TailwindCSS &amp; Framer Motion.
        </motion.p>
        <p className="opacity-70">© {year} Tajinder Singh</p>
      </div>
    </footer>
  );
}

export default Footer;

