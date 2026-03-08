import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { viewportOnce, springTransition } from "../animations/variants.js";

function Contact() {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Portfolio contact from ${name || "someone"}`
    );
    const body = encodeURIComponent(
      `Name: ${name || "N/A"}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Open Gmail directly in a new tab instead of the default mail client
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=tajinderpro96@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");

    event.target.reset();
  }

  function handleCopyEmail() {
    const email = "tajinderpro96@gmail.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }
  }

  return (
    <section
      id="contact"
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-heading heading-gradient">Contact</h2>
        <p className="max-w-md text-xs text-muted">
          Let&apos;s build something meaningful together — I&apos;m open to
          internships, freelance work, and collaborations on ambitious ideas.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <motion.form
          className="glass-surface rounded-3xl p-5 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          onSubmit={handleSubmit}
        >
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
          ].map((field) => (
            <div key={field.id} className="relative">
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                required
                className="peer w-full rounded-2xl border border-borderSubtle/70 bg-black/60 px-3 pt-4 pb-2 text-sm text-foreground outline-none transition focus:border-accent focus:bg-black"
                data-cursor="interactive"
              />
              <label
                htmlFor={field.id}
                className="pointer-events-none absolute left-3 top-2 text-[11px] text-muted transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent"
              >
                {field.label}
              </label>
            </div>
          ))}

          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="peer w-full resize-none rounded-2xl border border-borderSubtle/70 bg-black/60 px-3 pt-4 pb-2 text-sm text-foreground outline-none transition focus:border-accent focus:bg-black"
              data-cursor="interactive"
            />
            <label
              htmlFor="message"
              className="pointer-events-none absolute left-3 top-2 text-[11px] text-muted transition-all peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent"
            >
              Message
            </label>
          </div>

          <motion.button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-black shadow-soft-glow transition hover:bg-accentSoft"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-cursor="interactive"
          >
            Send message
          </motion.button>
        </motion.form>

        <motion.div
          className="space-y-4 text-sm text-muted"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ ...springTransition, delay: 0.1 }}
        >

          <p>
            Prefer email? Reach out directly and I&apos;ll respond as soon as I
            can.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[13px]">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-borderSubtle/70 bg-black/60 px-4 py-1.5 text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
              data-cursor="interactive"
            >
              <span>tajinderpro96@gmail.com</span>
              <span className="text-[10px]">Copy</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <a
              href="https://tajfolio.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-borderSubtle/70 bg-black/60 px-3 py-1.5 text-muted transition-colors hover:border-accent hover:text-accent"
              data-cursor="interactive"
            >
              Portfolio
            </a>
            <a
              href="https://linkedin.com/in/tajinder-singh-70787a28b"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-borderSubtle/70 bg-black/60 px-3 py-1.5 text-muted transition-colors hover:border-accent hover:text-accent"
              data-cursor="interactive"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/tajinder102005"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-borderSubtle/70 bg-black/60 px-3 py-1.5 text-muted transition-colors hover:border-accent hover:text-accent"
              data-cursor="interactive"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;

