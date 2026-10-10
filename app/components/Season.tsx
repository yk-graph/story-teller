"use client";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import Particles, { ParticleKind } from "./Particles";

export type SeasonData = {
  chapter: string;
  name: string;
  jp: string;
  sky: [string, string, string];
  mountain: string;
  city: string;
  water: string;
  glow: string;
  particles: ParticleKind;
  lines: string[];          // trailer narration cards
  subtitles: string[];      // on-screen subtitles
  place: string;
  video: string;            // full-screen background clip served from /public
};

function Line({ text, i, total, p }: { text: string; i: number; total: number; p: MotionValue<number> }) {
  const start = 0.18 + (i / total) * 0.5;
  const end = start + 0.5 / total;
  const opacity = useTransform(p, [start, start + 0.03, end - 0.03, end], [0, 1, 1, 0]);
  const scale = useTransform(p, [start, end], [1.08, 1]);
  const blur = useTransform(p, [start, start + 0.04], ["blur(12px)", "blur(0px)"]);
  const spacing = useTransform(p, [start, end], ["0.6em", "0.25em"]);
  return (
    <motion.p
      className="display"
      style={{
        position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center",
        fontSize: "clamp(28px, 5vw, 72px)", opacity, scale, filter: blur, letterSpacing: spacing, padding: "0 16px",
        textShadow: "0 0 40px rgba(0,0,0,0.6)",
      }}
    >
      {text}
    </motion.p>
  );
}

function Subtitle({ text, i, total, p }: { text: string; i: number; total: number; p: MotionValue<number> }) {
  const start = 0.15 + (i / total) * 0.72;
  const end = start + 0.72 / total;
  const opacity = useTransform(p, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
  return (
    <motion.p
      style={{
        position: "absolute", left: 0, right: 0, bottom: "calc(12vh + 28px)", textAlign: "center",
        fontSize: "clamp(14px, 1.6vw, 20px)", opacity, padding: "0 16px",
        fontFamily: "'Hiragino Mincho ProN','Yu Mincho',serif", letterSpacing: "0.1em",
        textShadow: "0 1px 6px #000",
      }}
    >
      {text}
    </motion.p>
  );
}

export default function Season({ d, mx, my }: { d: SeasonData; mx: MotionValue<number>; my: MotionValue<number> }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  // camera: slow dolly-in (applied to the background video)
  const camScale = useTransform(p, [0, 1], [1.15, 1]);

  // seasonal color glow that follows the mouse
  const glowX = useTransform(mx, (v) => `${50 + v * 15}%`);
  const glowY = useTransform(my, (v) => `${30 + v * 10}%`);
  const glow = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, ${d.glow}, transparent 55%)`);

  // chapter title
  const chapOp = useTransform(p, [0, 0.04, 0.14, 0.18], [0, 1, 1, 0]);
  const titleOp = useTransform(p, [0.7, 0.76, 0.93, 0.97], [0, 1, 1, 0]);
  const fadeOut = useTransform(p, [0.92, 0.99], [0, 1]);
  const titleScale = useTransform(p, [0.7, 1], [1.6, 1]);
  const titleSpacing = useTransform(p, [0.7, 0.85], ["0.6em", "0.12em"]);
  const titleBlur = useTransform(p, [0.7, 0.78], ["blur(20px)", "blur(0px)"]);
  const jpOp = useTransform(p, [0.8, 0.86], [0, 1]);

  // scene-transition flash
  const flash = useTransform(p, [0, 0.02, 0.06], [1, 0.6, 0]);

  return (
    <section ref={ref} style={{ height: "420vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <motion.div style={{ position: "absolute", inset: 0, scale: camScale }}>
          {/* full-screen background clip — object-fit: cover fills the viewport whatever the aspect ratio */}
          <video
            src={d.video}
            autoPlay muted loop playsInline preload="auto"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* seasonal color glow that follows the mouse */}
          <motion.div style={{ position: "absolute", inset: 0, background: glow, mixBlendMode: "screen" }} />
          <Particles kind={d.particles} seed={d.chapter.length * 31 + 3} />
        </motion.div>

        {/* dark tonal overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.35), transparent 30%, transparent 60%, rgba(0,0,0,0.6))" }} />

        <motion.div style={{ position: "absolute", inset: 0, opacity: chapOp, display: "grid", placeItems: "center", background: "rgba(0,0,0,0.55)" }}>
          <div style={{ textAlign: "center" }}>
            <p className="kicker">{d.chapter}</p>
            <p className="serif-i" style={{ fontSize: "clamp(22px, 3vw, 40px)", marginTop: 18 }}>{d.place}</p>
          </div>
        </motion.div>

        {d.lines.map((t, i) => <Line key={i} text={t} i={i} total={d.lines.length} p={p} />)}

        <motion.div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: titleOp }}>
          <div style={{ textAlign: "center" }}>
            <motion.h2 className="display"
              style={{ fontSize: "clamp(72px, 17vw, 260px)", scale: titleScale, letterSpacing: titleSpacing, filter: titleBlur, textShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.4)" }}>
              {d.name}
            </motion.h2>
            <motion.p style={{ opacity: jpOp, fontFamily: "'Hiragino Mincho ProN','Yu Mincho',serif", letterSpacing: "1em", fontSize: "clamp(22px, 3vw, 40px)", marginTop: 20, textShadow: "0 0 20px #000" }}>
              {d.jp}
            </motion.p>
          </div>
        </motion.div>

        {d.subtitles.map((t, i) => <Subtitle key={i} text={t} i={i} total={d.subtitles.length} p={p} />)}

        <motion.div style={{ position: "absolute", inset: 0, background: "#000", opacity: fadeOut, pointerEvents: "none" }} />
        <motion.div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash, pointerEvents: "none" }} />
      </div>
    </section>
  );
}
