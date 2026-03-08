import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
`;

const draw = (delay = 0, dur = 0.8) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1, opacity: 1,
        transition: {
            pathLength: { delay, duration: dur, ease: "easeInOut" },
            opacity: { delay, duration: 0.01 },
        },
    },
});

function OrbitDot({ radius, speed, color, size = 5, startAngle = 0, delay = 0 }) {
    const [angle, setAngle] = useState(startAngle);
    useEffect(() => {
        let raf, last = performance.now();
        const tick = (now) => {
            setAngle(a => a + speed * (now - last) / 1000);
            last = now;
            raf = requestAnimationFrame(tick);
        };
        const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay * 1000);
        return () => { clearTimeout(t); cancelAnimationFrame(raf); };
    }, [speed, delay]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            style={{
                position: "absolute", left: "50%", top: "50%",
                width: size, height: size, borderRadius: "50%",
                background: color,
                boxShadow: `0 0 6px ${color}, 0 0 14px ${color}55`,
                transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))`,
                pointerEvents: "none",
            }}
        />
    );
}

export default function TSLogo({ scale = 0.35 }) {
    const [showTS, setShowTS] = useState(false);
    const [showOrbits, setShowOrbits] = useState(false);
    const size = 130, cx = 65, cy = 65, R = 54;

    const hexPts = (r) =>
        [0, 1, 2, 3, 4, 5].map(i => {
            const a = (i * 60 - 90) * Math.PI / 180;
            return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
        }).join(" ");

    // We use actual scaled dimensions for the container
    const actualSize = 200 * scale;

    return (
        <div style={{
            width: actualSize,
            height: actualSize,
            position: "relative",
            overflow: "visible"
        }}>
            <style>{STYLES}</style>

            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 200,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${scale})`,
                transformOrigin: "top left"
            }}>



                <div style={{ position: "relative", width: size, height: size }}>
                    <motion.svg
                        width={size} height={size} viewBox={`0 0 ${size} ${size}`}
                        initial="hidden" animate="visible"
                        onAnimationComplete={() => {
                            setTimeout(() => setShowTS(true), 100);
                            setTimeout(() => setShowOrbits(true), 400);
                        }}
                    >
                        <defs>
                            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00ff88" />
                                <stop offset="100%" stopColor="#00ccff" />
                            </linearGradient>
                            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            <filter id="softglow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="1.5" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>

                        {/* Outer hex */}
                        <motion.polygon points={hexPts(R)} fill="none" stroke="#00ff88" strokeWidth="2.5" variants={draw(0, 1.0)} filter="url(#softglow)" />
                        {/* Inner hex */}
                        <motion.polygon points={hexPts(R * 0.7)} fill="rgba(0,255,136,0.03)" stroke="rgba(0,255,136,0.3)" strokeWidth="1" variants={draw(0.3, 0.6)} />

                        {/* Vertex diamonds */}
                        {[0, 2, 4].map(i => {
                            const a = (i * 60 - 90) * Math.PI / 180;
                            const dx = cx + Math.cos(a) * R, dy = cy + Math.sin(a) * R;
                            return (
                                <motion.rect key={i}
                                    x={dx - 3.5} y={dy - 3.5} width={7} height={7}
                                    fill="#00ff88"
                                    transform={`rotate(45 ${dx} ${dy})`}
                                    variants={{
                                        hidden: { scale: 0, opacity: 0 },
                                        visible: { scale: 1, opacity: 1, transition: { delay: 1.2 + i * 0.1, duration: 0.4, type: "spring" } },
                                    }}
                                />
                            );
                        })}
                    </motion.svg>

                    {/* TS text */}
                    <AnimatePresence>
                        {showTS && (
                            <motion.div
                                key="ts"
                                initial={{ opacity: 0, scale: 0.4, filter: "blur(14px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.6, ease: [0.34, 1.5, 0.64, 1] }}
                                style={{
                                    position: "absolute", inset: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontFamily: "'Syne', sans-serif", fontWeight: 900,
                                    fontSize: "2.4rem", letterSpacing: "0em",
                                    color: "#00ff88",
                                    backgroundClip: "text",
                                    pointerEvents: "none", userSelect: "none",
                                }}
                            >
                                TS
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
