/**
 * Particle text effect for Hero name using tsparticles.
 * Particles float around the name area for a "particle text" look.
 */
import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const options = {
  fullScreen: { enable: false },
  particles: {
    number: { value: 80, density: { enable: true, width: 200, height: 80 } },
    color: { value: "#00ff88" },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.15, max: 0.6 },
      animation: { enable: true, speed: 1.2, minimumValue: 0.1, sync: false },
    },
    size: { value: { min: 0.5, max: 2 } },
    links: {
      enable: true,
      distance: 120,
      color: "#00ff88",
      opacity: 0.2,
      width: 0.8,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.4 } },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
};

function ParticleText() {
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <Particles
        id="hero-particles"
        init={init}
        options={options}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export default ParticleText;
