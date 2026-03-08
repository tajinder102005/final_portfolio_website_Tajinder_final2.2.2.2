import React, { useState, useEffect } from "react";

const terminalRoles = [
  "Java Developer",
  "Web Developer",
  "UI/UX Expert",
  "Cloud Engineer",
  "Backend Developer",
  "Frontend Expert",
  "Passionate Coder",
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
const HOLD_TIME = 1600;
const SCRAMBLE_SPEED = 30;
const DELETE_SPEED = 42;

function randomScrambleChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export default function HeroTerminal() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("scramble"); // scramble | hold | delete
  const [time, setTime] = useState(new Date());
  const [matrixCols, setMatrixCols] = useState([]);

  // Matrix background
  useEffect(() => {
    const cols = Array.from({ length: 32 }).map(() => ({
      chars: Array.from({ length: 14 }).map(() => randomScrambleChar()),
    }));
    setMatrixCols(cols);

    const interval = setInterval(() => {
      setMatrixCols((prev) =>
        prev.map((col) => ({
          chars: col.chars.map((c) =>
            Math.random() > 0.8 ? randomScrambleChar() : c
          ),
        }))
      );
    }, 90);

    return () => clearInterval(interval);
  }, []);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Role cycle with scramble → hold → delete
  useEffect(() => {
    const target = terminalRoles[currentRoleIndex];
    let timeoutId;

    if (phase === "scramble") {
      if (displayedText === target) {
        timeoutId = setTimeout(() => {
          setPhase("hold");
        }, HOLD_TIME);
      } else {
        timeoutId = setTimeout(() => {
          const nextLength = Math.min(displayedText.length + 1, target.length);
          const targetSub = target.substring(0, nextLength);
          const scrambleSub = Array.from({
            length: target.length - nextLength,
          })
            .map(() => randomScrambleChar())
            .join("");
          const next = targetSub + scrambleSub;
          setDisplayedText(next);
          if (next === target) {
            setDisplayedText(target);
          }
        }, SCRAMBLE_SPEED);
      }
    } else if (phase === "hold") {
      timeoutId = setTimeout(() => {
        setPhase("delete");
      }, HOLD_TIME);
    } else if (phase === "delete") {
      if (!displayedText.length) {
        const nextIndex = (currentRoleIndex + 1) % terminalRoles.length;
        setCurrentRoleIndex(nextIndex);
        setPhase("scramble");
      } else {
        timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, DELETE_SPEED);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentRoleIndex, displayedText, phase]);

  const clockString = time.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="hero-terminal-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        .hero-terminal-container {
          font-family: 'Space Mono', monospace;
          color: #00ff88;
          min-width: 380px;
          max-width: 480px;
          width: 100%;
          background: #030805;
          position: relative;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.8), 0 0 30px rgba(0, 255, 136, 0.15);
          border: 1px solid rgba(0,255,136,0.25);
          overflow: hidden;
        }

        .hero-terminal-container:hover {
          border-color: rgba(0,255,136,0.6);
          box-shadow: 0 15px 40px -10px rgba(0,0,0,0.9), 0 0 50px rgba(0, 255, 136, 0.3);
        }

        .ht-matrix-bg {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          display: flex;
          justify-content: space-around;
          font-size: 13px;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          line-height: 1;
        }

        .ht-matrix-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ht-crt-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.18),
            rgba(0,0,0,0.18) 1px,
            transparent 1px,
            transparent 3px
          );
          pointer-events: none;
          z-index: 10;
        }

        .ht-scan-beam {
          position: absolute;
          top: -100px;
          left: 0;
          width: 100%;
          height: 60px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 255, 136, 0.12) 60%,
            transparent
          );
          animation: scanBeam 5s linear infinite;
          pointer-events: none;
          z-index: 11;
        }

        @keyframes scanBeam {
          0% { top: -100px; }
          100% { top: 110%; }
        }

        .ht-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(0,255,136,0.1);
          font-size: 13px;
          background: rgba(3, 8, 5, 0.9);
          position: relative;
          z-index: 2;
        }

        .ht-mac-dots {
          display: flex;
          gap: 6px;
        }

        .ht-mac-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .ht-mac-dot.r { background: #ff5f56; box-shadow: 0 0 6px #ff5f56; }
        .ht-mac-dot.y { background: #ffbd2e; box-shadow: 0 0 6px #ffbd2e; }
        .ht-mac-dot.g { background: #27c93f; box-shadow: 0 0 6px #27c93f; }

        .ht-identity {
          padding: 30px 26px 18px;
          position: relative;
          z-index: 2;
        }

        .ht-id-label {
          color: rgba(0,255,136,0.5);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .ht-name-block {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }

        .ht-first-name {
          font-size: 2.2rem;
          font-weight: 900;
          color: #00ff88;
          text-shadow: 0 0 20px rgba(0,255,136,0.6), 0 0 40px rgba(0,255,136,0.2);
          line-height: 1;
        }

        .ht-last-name {
          font-size: 2.2rem;
          font-weight: 400;
          color: rgba(0,255,136,0.45);
          line-height: 1;
        }

        .ht-title {
          font-variant: small-caps;
          letter-spacing: 0.25em;
          color: rgba(0,255,136,0.7);
          margin-top: 10px;
          font-size: 14px;
        }

        .ht-role-section {
          padding: 0 26px 22px;
          position: relative;
          z-index: 2;
        }

        .ht-prompt {
          font-size: 14px;
          margin-bottom: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ht-output-block {
          background: rgba(0, 255, 136, 0.05);
          border: 1px solid rgba(0, 255, 136, 0.18);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ht-arrow {
          color: #00ccff;
          font-size: 1.2rem;
        }

        .ht-role-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #00ff88;
          text-shadow: 0 0 15px rgba(0,255,136,0.5);
        }

        .ht-cursor {
          display: inline-block;
          width: 9px;
          height: 1.5rem;
          background: #00ff88;
          vertical-align: bottom;
          margin-left: 6px;
          animation: blink 1s step-end infinite;
          box-shadow: 0 0 10px #00ff88;
        }

        @keyframes blink {
          0%,49% { opacity: 1; }
          50%,100% { opacity: 0; }
        }

        .ht-pills {
          display: flex;
          gap: 8px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        .ht-pill {
          font-size: 10px;
          padding: 2px 6px;
          border: 1px solid rgba(0,255,136,0.25);
          color: rgba(0,255,136,0.4);
        }

        .ht-pill.active {
          border-color: #00ff88;
          color: #00ff88;
          box-shadow: 0 0 8px rgba(0,255,136,0.4);
        }

        .ht-footer {
          padding: 14px 24px;
          border-top: 1px solid rgba(0,255,136,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          position: relative;
          z-index: 2;
          background: rgba(3,8,5,0.96);
        }

        .ht-status {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(0,255,136,0.8);
        }

        .ht-pulse-dot {
          width: 8px;
          height: 8px;
          background: #00ff88;
          border-radius: 50%;
          box-shadow: 0 0 8px #00ff88;
          animation: pulseStatus 2s infinite;
        }

        @keyframes pulseStatus {
          0% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px #00ff88; }
          50% { opacity: 0.5; transform: scale(0.9); box-shadow: 0 0 2px #00ff88; }
          100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px #00ff88; }
        }

        .ht-clock {
          color: rgba(0,255,136,0.5);
          font-size: 11px;
        }

        .ht-exit {
          color: rgba(0,255,136,0.5);
        }
        .ht-exit span {
          color: #00ff88;
        }

        @media (max-width: 768px) {
          .hero-terminal-container {
            min-width: 0;
          }
        }
      `}</style>

      {/* Matrix + CRT + scan-line */}
      <div className="ht-matrix-bg">
        {matrixCols.map((col, i) => (
          <div key={i} className="ht-matrix-col">
            {col.chars.map((char, j) => (
              <span key={j}>{char}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="ht-crt-overlay" />
      <div className="ht-scan-beam" />

      {/* Top bar */}
      <div className="ht-top-bar">
        <div className="ht-mac-dots">
          <div className="ht-mac-dot r" />
          <div className="ht-mac-dot y" />
          <div className="ht-mac-dot g" />
        </div>
        <div>tajinder@dev-machine</div>
        <div style={{ color: "rgba(0,255,136,0.5)" }}>~/portfolio.sh · {clockString}</div>
      </div>

      {/* Identity block */}
      <div className="ht-identity">
        <div className="ht-id-label">// IDENTIFIED AS</div>
        <div className="ht-name-block">
          <div className="ht-first-name">TAJINDER</div>
          <div className="ht-last-name">SINGH</div>
        </div>
        <div className="ht-title">Software Development Engineer · I</div>
      </div>

      {/* Roles section */}
      <div className="ht-role-section">
        <div className="ht-prompt">
          <span style={{ color: "#00ff88" }}>tajinder</span>
          <span style={{ color: "rgba(0,255,136,0.6)" }}>@</span>
          <span style={{ color: "#00ff88" }}>portfolio</span>
          <span style={{ color: "#00ccff" }}>$</span>
          <span style={{ color: "#ffffff" }}>whoami</span>
          <span style={{ color: "rgba(0,255,136,0.8)" }}>--role</span>
          <span style={{ color: "rgba(0,255,136,0.8)" }}>--verbose</span>
        </div>

        <div className="ht-output-block">
          <div className="ht-arrow">▶</div>
          <div>
            <span className="ht-role-text">
              {displayedText || "\u00A0"}
            </span>
            <span className="ht-cursor" />
          </div>
        </div>

        <div className="ht-pills">
          {terminalRoles.map((_, i) => (
            <div
              key={i}
              className={`ht-pill ${i === currentRoleIndex ? "active" : ""}`}
            >
              0{i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="ht-footer">
        <div className="ht-status">
          <div className="ht-pulse-dot" />
          AVAILABLE FOR OPPORTUNITIES
        </div>
        <div className="ht-exit">
          exit <span>0</span>
        </div>
      </div>
    </div>
  );
}


