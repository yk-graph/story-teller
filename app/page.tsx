"use client";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import Season, { SeasonData } from "./components/Season";

const SEASONS: SeasonData[] = [
  {
    chapter: "CHAPTER I", name: "SPRING", jp: "Spring", place: "Stanley Park — Queen Elizabeth Park",
    sky: ["#2b3a5c", "#d89bb0", "#f7d7c4"], mountain: "#4b4f72", city: "#2a2440", water: "#3d4766", glow: "rgba(255,190,215,0.55)",
    particles: "petal",
    lines: ["THE RAIN SOFTENS", "THE CITY BLOOMS", "FORTY THOUSAND CHERRY TREES"],
    subtitles: ["The long rainy season comes to an end.", "Across the city, the cherry blossoms wake all at once.", "Beneath the petals, a story begins."],
  },
  {
    chapter: "CHAPTER II", name: "SUMMER", jp: "Summer", place: "English Bay — Kitsilano Beach",
    sky: ["#0d2a52", "#f2925a", "#ffd88a"], mountain: "#3a3350", city: "#1c1630", water: "#2b4c6e", glow: "rgba(255,200,120,0.7)",
    particles: "mote",
    lines: ["THE LONGEST DAYS", "THE OCEAN CALLS", "THE SKY CATCHES FIRE"],
    subtitles: ["Even past nine at night, the sky still glows.", "The sea and the mountains are right there.", "And in the night sky, flowers of light bloom."],
  },
  {
    chapter: "CHAPTER III", name: "AUTUMN", jp: "Autumn", place: "Granville Island — Capilano",
    sky: ["#1f1b24", "#8a3d1e", "#d98a3a"], mountain: "#2b2022", city: "#190f10", water: "#3a2620", glow: "rgba(255,140,60,0.55)",
    particles: "leaf",
    lines: ["THE MAPLES TURN", "THE SALMON RETURN", "THE FOG ROLLS IN"],
    subtitles: ["The maples turn, blazing with color.", "The salmon return to the rivers where they were born.", "Beyond the fog, the city lights blur."],
  },
  {
    chapter: "CHAPTER IV", name: "WINTER", jp: "Winter", place: "Grouse Mountain — North Shore",
    sky: ["#05070f", "#1d2a44", "#5b7193"], mountain: "#c7d3e6", city: "#0a0e18", water: "#141c2c", glow: "rgba(170,200,255,0.45)",
    particles: "snow",
    lines: ["RAIN IN THE CITY", "SNOW ON THE PEAKS", "TWENTY MINUTES APART"],
    subtitles: ["Rain falls on the city,", "while snow gathers on the mountain peaks.", "Twenty minutes from downtown to the slopes."],
  },
];

function Countdown({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n === 0) { onDone(); return; }
    const t = setTimeout(() => setN(n - 1), 900);
    return () => clearTimeout(t);
  }, [n, onDone]);
  return (
    <div style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", background: "#d9d3c6", color: "#111", zIndex: 40 }}>
      <svg width="min(70vmin,520px)" height="min(70vmin,520px)" viewBox="0 0 200 200" style={{ position: "absolute" }}>
        <circle cx="100" cy="100" r="90" fill="none" stroke="#111" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="#111" strokeWidth="1.5" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#111" strokeWidth="1" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#111" strokeWidth="1" />
        <motion.circle key={n} cx="100" cy="100" r="45" fill="none" stroke="#111" strokeWidth="90" strokeOpacity="0.18"
          pathLength={1} strokeDasharray="1 1" transform="rotate(-90 100 100)"
          initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.9, ease: "linear" }} />
      </svg>
      <AnimatePresence mode="popLayout">
        <motion.span key={n} className="display" style={{ fontSize: "min(40vmin,300px)", position: "relative" }}
          initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          {n}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

const OPENING = [
  { k: "a", text: "THIS YEAR", sub: "" },
  { k: "b", text: "ONE CITY", sub: "between the mountains and the sea" },
  { k: "c", text: "FOUR LIVES", sub: "" },
];

function Opening({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => (i < OPENING.length ? setI(i + 1) : onDone()), i < OPENING.length ? 2000 : 3200);
    return () => clearTimeout(t);
  }, [i, onDone]);
  const card = OPENING[i];
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", display: "grid", placeItems: "center", zIndex: 40 }}>
      <AnimatePresence mode="wait">
        {card ? (
          <motion.div key={card.k} style={{ textAlign: "center", padding: "0 16px" }}
            initial={{ opacity: 0, letterSpacing: "0.8em", filter: "blur(10px)" }}
            animate={{ opacity: 1, letterSpacing: "0.3em", filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <p className="display" style={{ fontSize: "clamp(34px, 6vw, 90px)" }}>{card.text}</p>
            {card.sub && <p className="serif-i" style={{ fontSize: "clamp(18px,2.2vw,28px)", marginTop: 14, letterSpacing: "0.05em" }}>{card.sub}</p>}
          </motion.div>
        ) : (
          <motion.div key="title" style={{ textAlign: "center" }}
            initial={{ opacity: 0, scale: 1.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="display" style={{
              fontSize: "clamp(64px, 15vw, 230px)",
              background: "linear-gradient(180deg,#fff 20%,#9a8f7c)", WebkitBackgroundClip: "text", color: "transparent",
            }}>VANCOUVER</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Gate({ onPlay }: { onPlay: () => void }) {
  return (
    <motion.div style={{ position: "fixed", inset: 0, background: "#000", display: "grid", placeItems: "center", zIndex: 40, textAlign: "center", padding: 16 }}
      exit={{ opacity: 0 }}>
      <div>
        <p className="kicker">THE FOLLOWING PREVIEW HAS BEEN APPROVED FOR</p>
        <p className="kicker" style={{ marginTop: 8 }}>ALL AUDIENCES</p>
        <motion.button onClick={onPlay}
          whileHover={{ scale: 1.06, letterSpacing: "0.6em" }} whileTap={{ scale: 0.96 }}
          className="display"
          style={{
            marginTop: 56, background: "transparent", color: "#f3ede2", border: "1px solid rgba(243,237,226,0.5)",
            padding: "18px 40px", fontSize: 20, letterSpacing: "0.45em", cursor: "pointer",
          }}>
          ▶ PLAY
        </motion.button>
        <p className="serif-i" style={{ marginTop: 22, opacity: 0.6 }}>Scroll to begin</p>
      </div>
    </motion.div>
  );
}

function Finale() {
  return (
    <section style={{ height: "160vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "grid", placeItems: "center", background: "#000", textAlign: "center", padding: 16 }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} viewport={{ amount: 0.6 }}>
          <p className="kicker">FOUR SEASONS · ONE CITY</p>
          <motion.h2 className="display" initial={{ letterSpacing: "0.5em", opacity: 0 }} whileInView={{ letterSpacing: "0.1em", opacity: 1 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }} viewport={{ amount: 0.6 }}
            style={{ fontSize: "clamp(56px, 13vw, 200px)", margin: "24px 0" }}>
            VANCOUVER
          </motion.h2>
          <p className="serif-i" style={{ fontSize: "clamp(20px, 2.6vw, 34px)" }}>Now showing — all year round.</p>
          <p className="display" style={{ marginTop: 56, fontSize: "clamp(10px, 1vw, 13px)", letterSpacing: "0.25em", opacity: 0.55, maxWidth: 720, lineHeight: 1.7 }}>
            A PACIFIC NORTHWEST PRODUCTION · STARRING THE NORTH SHORE MOUNTAINS · ENGLISH BAY · STANLEY PARK ·
            GRANVILLE ISLAND · WITH THE RAIN · AND THE CHERRY BLOSSOMS · MUSIC BY THE TIDE · FILMED ON LOCATION
          </p>
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} whileHover={{ opacity: 1 }}
            className="kicker" style={{ marginTop: 48, background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
            ↺ REPLAY
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default function Page() {
  const [stage, setStage] = useState<"gate" | "count" | "open" | "main">("gate");
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });
  const { scrollYProgress } = useScroll();
  const reel = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const barH = "12vh";

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  useEffect(() => {
    document.body.style.overflow = stage === "main" ? "" : "hidden";
    if (stage === "main") window.scrollTo(0, 0);
  }, [stage]);

  return (
    <main>
      <div className="grain" />
      <div className="vignette" />

      {/* letterbox bars */}
      <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: barH, background: "#000", zIndex: 50, transformOrigin: "top" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: stage === "gate" ? 0 : 1 }} transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }} />
      <motion.div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: barH, background: "#000", zIndex: 50, transformOrigin: "bottom" }}
        initial={{ scaleY: 0 }} animate={{ scaleY: stage === "gate" ? 0 : 1 }} transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }} />

      {stage === "main" && (
        <>
          <motion.div style={{ position: "fixed", left: 0, right: 0, bottom: "calc(12vh - 2px)", height: 2, background: "#f3ede2", zIndex: 51, scaleX: reel, transformOrigin: "left", opacity: 0.6 }} />
          <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1 }}
            style={{ position: "fixed", top: "calc(12vh + 18px)", left: 24, zIndex: 51 }}>VANCOUVER · FOUR SEASONS</motion.p>
          <motion.p className="kicker flicker" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0] }} transition={{ delay: 1.5, duration: 3, repeat: Infinity }}
            style={{ position: "fixed", bottom: "calc(12vh + 70px)", left: 0, right: 0, textAlign: "center", zIndex: 51, pointerEvents: "none" }}>
            SCROLL ↓
          </motion.p>
        </>
      )}

      <AnimatePresence>
        {stage === "gate" && <Gate key="gate" onPlay={() => setStage("count")} />}
      </AnimatePresence>
      {stage === "count" && <Countdown onDone={() => setStage("open")} />}
      {stage === "open" && <Opening onDone={() => setStage("main")} />}

      <div className="flicker">
        {SEASONS.map((s) => <Season key={s.name} d={s} mx={smx} my={smy} />)}
        <Finale />
      </div>
    </main>
  );
}
