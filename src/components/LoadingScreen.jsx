import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/20 via-black to-accentSoft/10 shadow-soft-glow"
        initial={{ scale: 0.5, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <motion.span
          className="font-heading text-2xl tracking-[0.3em] text-accent"
          initial={{ letterSpacing: "0.1em" }}
          animate={{ letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        >
          TS
        </motion.span>
        <motion.div
          className="absolute -inset-2 rounded-3xl border border-accent/20"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;

