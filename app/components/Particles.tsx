"use client";
import { motion } from "motion/react";
import { useMemo } from "react";

export type ParticleKind = "petal" | "mote" | "leaf" | "snow";

// deterministic PRNG (same values on SSR and client)
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const COUNT: Record<ParticleKind, number> = { petal: 36, mote: 40, leaf: 26, snow: 90 };

export default function Particles({ kind, seed = 7 }: { kind: ParticleKind; seed?: number }) {
  const items = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: COUNT[kind] }, (_, i) => ({
      i,
      x: r() * 100,
      size: r(),
      delay: r() * -20,
      dur: 8 + r() * 12,
      sway: 20 + r() * 80,
      spin: (r() > 0.5 ? 1 : -1) * (180 + r() * 540),
      depth: r(),
    }));
  }, [kind, seed]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {items.map((p) => {
        const blur = p.depth < 0.25 ? 3 : p.depth > 0.85 ? 1.5 : 0;
        const common = {
          position: "absolute" as const,
          left: `${p.x}%`,
          filter: blur ? `blur(${blur}px)` : undefined,
          opacity: 0.35 + p.depth * 0.6,
        };

        if (kind === "mote") {
          const s = 2 + p.size * 5;
          return (
            <motion.span
              key={p.i}
              style={{ ...common, bottom: -10, width: s, height: s, borderRadius: "50%", background: "#fff3c4", boxShadow: `0 0 ${s * 3}px #ffd27a` }}
              animate={{ y: ["0vh", "-110vh"], x: [0, p.sway, -p.sway / 2, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: p.dur * 1.4, delay: p.delay, repeat: Infinity, ease: "linear" }}
            />
          );
        }

        const s =
          kind === "snow" ? 2 + p.size * 6 + p.depth * 4 :
          kind === "petal" ? 8 + p.size * 10 + p.depth * 8 :
          14 + p.size * 16 + p.depth * 10;

        const shape =
          kind === "snow"
            ? { width: s, height: s, borderRadius: "50%", background: "#fff" }
            : kind === "petal"
            ? { width: s, height: s * 0.7, borderRadius: "80% 0 80% 0", background: "linear-gradient(135deg,#ffd6e3,#f49ab7)" }
            : { width: s, height: s, background: p.size > 0.5 ? "#c4471b" : "#e08a1e", clipPath: "polygon(50% 0%,62% 30%,95% 22%,75% 50%,100% 70%,62% 66%,55% 100%,45% 100%,38% 66%,0% 70%,25% 50%,5% 22%,38% 30%)" };

        return (
          <motion.span
            key={p.i}
            style={{ ...common, top: -40, ...shape }}
            animate={{
              y: ["0vh", "115vh"],
              x: [0, p.sway, -p.sway, p.sway / 2],
              rotate: kind === "snow" ? 0 : [0, p.spin],
            }}
            transition={{ duration: kind === "snow" ? p.dur * 0.9 : p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
