import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition.js";

const TRAIL_TTL = 450;

function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHidden, setIsHidden] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [trail, setTrail] = useState([]);

  const springX = useSpring(0, { stiffness: 220, damping: 26, mass: 0.4 });
  const springY = useSpring(0, { stiffness: 220, damping: 26, mass: 0.4 });

  useEffect(() => {
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  useEffect(() => {
    function handleMouseEnter() {
      setIsHidden(false);
    }
    function handleMouseLeave() {
      setIsHidden(true);
    }
    function handleMove(event) {
      const target = event.target;
      const interactive =
        target.closest &&
        target.closest("a, button, [data-cursor='interactive']");
      setIsInteractive(Boolean(interactive));

      const rectSize = 6;
      const snappedX = Math.round(event.clientX / rectSize) * rectSize;
      const snappedY = Math.round(event.clientY / rectSize) * rectSize;

      setTrail((current) => [
        ...current.slice(-18),
        {
          id: performance.now(),
          x: snappedX,
          y: snappedY,
          angle: Math.random() * 45 - 22,
        },
      ]);
    }

    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMove);

    const cleanupId = window.setInterval(() => {
      const now = performance.now();
      setTrail((current) => current.filter((bit) => now - bit.id < TRAIL_TTL));
    }, 120);

    return () => {
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMove);
      window.clearInterval(cleanupId);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* main cursor dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-3 w-3 -translate-x-1.5 -translate-y-1.5 rounded-full border border-accent/70 bg-accent/40 md:block"
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isInteractive ? 1.2 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      />

      {/* crunchy rect trail */}
      {trail.map((bit) => (
        <motion.div
          // eslint-disable-next-line react/no-array-index-key
          key={bit.id}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[59] hidden md:block"
          initial={{ opacity: 0.6, scale: 1, rotate: bit.angle }}
          animate={{ opacity: 0, scale: 0.4, rotate: bit.angle * 2 }}
          transition={{ duration: TRAIL_TTL / 1000 }}
          style={{
            x: bit.x,
            y: bit.y,
            width: 6,
            height: 6,
            borderRadius: 2,
            background:
              "linear-gradient(135deg, rgba(0,255,136,0.9), rgba(0,229,255,0.7))",
          }}
        />
      ))}
    </>
  );
}

export default CustomCursor;

