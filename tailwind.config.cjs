/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Cabinet Grotesk", "Syne", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accentSoft: "rgb(var(--color-accent-soft) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        borderSubtle: "rgb(var(--color-border-subtle) / <alpha-value>)",
      },
      boxShadow: {
        "soft-glow":
          "0 0 60px rgba(0, 255, 136, 0.3), 0 0 120px rgba(0, 255, 136, 0.15)",
      },
      backgroundImage: {
        "noise-soft":
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
        "radial-primary":
          "radial-gradient(circle at top, rgba(0,255,136,0.25), transparent 60%)",
      },
    },
  },
  plugins: [],
};

