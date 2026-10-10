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
};

const MOUNTAINS =
  "M0,260 L80,190 L140,215 L230,120 L290,170 L360,95 L420,150 L470,130 L540,60 L610,140 L680,110 L760,170 L840,90 L900,140 L980,120 L1060,180 L1140,130 L1200,170 L1200,400 L0,400 Z";
const FAR =
  "M0,230 L120,170 L200,190 L310,140 L420,175 L520,120 L650,160 L780,130 L900,165 L1020,135 L1200,180 L1200,400 L0,400 Z";

// simplified skyline (downtown)
const towers = [
  [40, 70], [70, 110], [100, 85], [128, 150], [160, 120], [190, 175], [222, 140], [250, 200], [282, 160],
  [310, 130], [340, 185], [372, 145], [400, 105], [430, 125], [460, 90], [490, 60],
];

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

  // camera: slow dolly-in
  const camScale = useTransform(p, [0, 1], [1.15, 1]);
  const skyY = useTransform(p, [0, 1], ["0%", "-8%"]);
  const farY = useTransform(p, [0, 1], ["6%", "-2%"]);
  const nearY = useTransform(p, [0, 1], ["12%", "0%"]);
  const cityY = useTransform(p, [0, 1], ["22%", "0%"]);

  // subtle camera sway driven by the mouse
  const farX = useTransform(mx, (v) => v * -10);
  const nearX = useTransform(mx, (v) => v * -24);
  const cityX = useTransform(mx, (v) => v * -40);
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
          <motion.div
            style={{
              position: "absolute", inset: "-10% 0 0 0", y: skyY,
              background: `linear-gradient(180deg, ${d.sky[0]} 0%, ${d.sky[1]} 45%, ${d.sky[2]} 75%)`,
            }}
          />
          <motion.div style={{ position: "absolute", inset: 0, background: glow, mixBlendMode: "screen" }} />

          <motion.svg viewBox="0 0 1200 400" preserveAspectRatio="none"
            style={{ position: "absolute", left: "-5%", width: "110%", bottom: "18%", height: "45%", x: farX, y: farY, opacity: 0.55 }}>
            <path d={FAR} fill={d.mountain} />
          </motion.svg>
          <motion.svg viewBox="0 0 1200 400" preserveAspectRatio="none"
            style={{ position: "absolute", left: "-5%", width: "110%", bottom: "14%", height: "50%", x: nearX, y: nearY }}>
            <path d={MOUNTAINS} fill={d.mountain} style={{ filter: "brightness(0.6)" }} />
            {d.particles === "snow" && (
              <path d="M540,60 L520,95 L545,85 L560,100 L575,80 Z M840,90 L822,118 L845,110 L858,122 L870,104 Z M360,95 L345,120 L365,113 L378,124 Z" fill="#fff" opacity="0.85" />
            )}
          </motion.svg>

          {/* water surface */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "20%", background: `linear-gradient(180deg, ${d.water}, #000)` }} />

          <motion.svg viewBox="0 0 520 220" preserveAspectRatio="xMidYMax meet"
            style={{ position: "absolute", right: "4%", bottom: "19%", width: "min(60vw, 720px)", x: cityX, y: cityY }}>
            {towers.map(([x, h], i) => (
              <g key={i}>
                <rect x={x} y={220 - h} width={24} height={h} fill={d.city} />
                {Array.from({ length: Math.floor(h / 14) }, (_, j) => (
                  <rect key={j} x={x + 5 + ((i + j) % 3) * 6} y={226 - h + j * 14} width={3} height={4}
                    fill="#ffe7a8" opacity={(i * 7 + j * 3) % 5 === 0 ? 0.9 : 0.15} />
                ))}
              </g>
            ))}
          </motion.svg>

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
