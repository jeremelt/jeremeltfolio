import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import profilePic from "@assets/Jeremy_Profile_Picture_1_1774334445184.jpeg";

const SIDEBAR_STYLE = {
  writingMode: "vertical-rl" as const,
  transform: "rotate(180deg)",
  fontSize: 7,
  letterSpacing: "0.18em",
  fontFamily: "DM Sans, sans-serif",
  fontWeight: 500,
  textTransform: "uppercase" as const,
  userSelect: "none" as const,
};

export function Hero() {
  const [isJeremyHovered, setIsJeremyHovered] = useState(false);
  const [isDesignerHovered, setIsDesignerHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const cardTransition = {
    opacity: { duration: 0.2 },
    scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    x: { type: "tween" as const, ease: "linear" as const, duration: 0 },
    y: { type: "tween" as const, ease: "linear" as const, duration: 0 },
    rotate: { duration: 0.3 },
  };

  return (
    <section
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 max-w-[1400px] mx-auto pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Jeremy — photo card */}
      <AnimatePresence>
        {isJeremyHovered && (
          <motion.div
            className="fixed pointer-events-none z-[200]"
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -4, x: mousePos.x + 24, y: mousePos.y - 160 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={cardTransition}
            style={{ top: 0, left: 0 }}
          >
            <div className="relative flex shadow-2xl" style={{ width: 260, borderRadius: 20, overflow: "hidden", background: "#D5CFC0" }}>
              {/* Sidebar */}
              <div className="flex-shrink-0 flex flex-col justify-around items-center py-4" style={{ width: 22, background: "#C8C2B2" }}>
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} style={{ ...SIDEBAR_STYLE, color: "#7a7468" }}>EDITOR&apos;S NOTE</span>
                ))}
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col" style={{ padding: "14px 14px 18px 12px" }}>
                <img
                  src={profilePic}
                  alt="Jeremy"
                  className="w-full object-cover"
                  style={{ height: 260, objectPosition: "top center", borderRadius: 10, filter: "grayscale(20%)" }}
                />
                <div className="flex items-start mt-4 gap-2">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M4 4 C4 12, 12 18, 18 16" stroke="#5a5448" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M15 13 L18 16 L14 17" stroke="#5a5448" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#3a3530", lineHeight: 1.4, fontWeight: 400 }}>
                    oh, there he is, spotted!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Designer — text card */}
      <AnimatePresence>
        {isDesignerHovered && (
          <motion.div
            className="fixed pointer-events-none z-[200]"
            initial={{ opacity: 0, scale: 0.88, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 4, x: mousePos.x - 300, y: mousePos.y - 200 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={cardTransition}
            style={{ top: 0, left: 0 }}
          >
            <div className="relative flex shadow-2xl" style={{ width: 310, borderRadius: 20, overflow: "hidden", background: "#8BAF9F" }}>
              {/* Sidebar */}
              <div className="flex-shrink-0 flex flex-col justify-around items-center py-4" style={{ width: 22, background: "#7A9E8E" }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ ...SIDEBAR_STYLE, color: "#4a7060" }}>EDITOR&apos;S NOTE</span>
                ))}
              </div>
              {/* Content */}
              <div style={{ flex: 1, padding: "22px 20px 16px 16px" }}>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 17, color: "#0f1f1a", lineHeight: 1.55, fontWeight: 400 }}>
                  To break it down, he&apos;s basically a{" "}
                  <strong style={{ fontWeight: 700 }}>multidisciplinary designer,</strong>{" "}
                  a{" "}
                  <strong style={{ fontWeight: 700 }}>lifelong learner,</strong>{" "}
                  presently specializing in{" "}
                  <strong style={{ fontWeight: 700 }}>digital product</strong>{" "}
                  and based in{" "}
                  <strong style={{ fontWeight: 700 }}>Indonesia 🇮🇩, SEA.</strong>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="font-display text-[12vw] leading-[0.85] tracking-tight md:text-[8vw] lg:text-[140px] text-foreground">
            {/* "Jeremy" */}
            <motion.span
              className="inline-block cursor-none"
              onMouseEnter={() => setIsJeremyHovered(true)}
              onMouseLeave={() => setIsJeremyHovered(false)}
              animate={{ opacity: isDesignerHovered ? 0.2 : 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              Jeremy
            </motion.span>
            <br />
            {/* "is a Product" */}
            <motion.span
              className="italic text-[#c7ee4f]"
              animate={{ opacity: isJeremyHovered || isDesignerHovered ? 0.2 : 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              is a Product
            </motion.span>
            <br />
            {/* "Designer." */}
            <motion.span
              className="inline-block cursor-none"
              onMouseEnter={() => setIsDesignerHovered(true)}
              onMouseLeave={() => setIsDesignerHovered(false)}
              animate={{ opacity: isJeremyHovered ? 0.2 : 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              Designer.
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="max-w-2xl"
        >
          <p className="font-sans md:text-2xl text-foreground mb-8 font-light text-[20px]">Currently, I’m a Product Designer at RED Comm Indonesia, focused on improving software experiences, such as ERP features, through intuitive design, and AI-driven solutions. I work closely with cross-functional teams to create user flows and high-fidelity prototypes that enhance usability and product impact. </p>

          <div className="flex items-center space-x-3 mb-12">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="font-sans text-sm tracking-widest uppercase text-muted-foreground">
              Currently at [Company] / Open to roles
            </span>
          </div>

          <button
            onClick={scrollToProjects}
            className="group flex items-center space-x-4 font-sans font-medium text-lg text-accent hover:text-accent/80 transition-colors"
          >
            <span>See My Work</span>
            <motion.span
              className="inline-block"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-6 md:left-12 flex justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]"
      >
        <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
          © 2025 PORTFOLIO
        </span>
        <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground hidden md:block">
          SCROLL TO EXPLORE
        </span>
      </motion.div>
    </section>
  );
}
