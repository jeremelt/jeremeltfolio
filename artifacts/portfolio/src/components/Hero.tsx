import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
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
  const jeremyRef = useRef<HTMLSpanElement>(null);
  const designerRef = useRef<HTMLSpanElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const checkHits = useCallback((x: number, y: number) => {
    const hit = (ref: React.RefObject<HTMLSpanElement | null>) => {
      if (!ref.current) return false;
      const r = ref.current.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };
    setIsJeremyHovered(hit(jeremyRef));
    setIsDesignerHovered(hit(designerRef));
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    mousePosRef.current = { x, y };
    setMousePos({ x, y });
    checkHits(x, y);
  }, [checkHits]);

  useEffect(() => {
    const onScroll = () => {
      const { x, y } = mousePosRef.current;
      checkHits(x, y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [checkHits]);

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
            <div className="relative flex shadow-2xl" style={{ width: 260, borderRadius: 8, overflow: "hidden", background: "#D5CFC0" }}>
              {/* Sidebar */}
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 22, background: "#C8C2B2", alignSelf: "stretch" }}>
                <span style={{ ...SIDEBAR_STYLE, color: "#7a7468" }}>
                  EDITOR&apos;S NOTE&nbsp;&nbsp;·&nbsp;&nbsp;EDITOR&apos;S NOTE&nbsp;&nbsp;·&nbsp;&nbsp;EDITOR&apos;S NOTE
                </span>
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
            <div className="relative flex shadow-2xl" style={{ width: 310, borderRadius: 8, overflow: "hidden", background: "#8BAF9F" }}>
              {/* Sidebar */}
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 22, background: "#7A9E8E", alignSelf: "stretch" }}>
                <span style={{ ...SIDEBAR_STYLE, color: "#4a7060" }}>
                  EDITOR&apos;S NOTE&nbsp;&nbsp;·&nbsp;&nbsp;EDITOR&apos;S NOTE&nbsp;&nbsp;·&nbsp;&nbsp;EDITOR&apos;S NOTE
                </span>
              </div>
              {/* Content */}
              <div style={{ flex: 1, padding: "22px 20px 16px 16px", display: "flex", alignItems: "center" }}>
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
          <h1 className="font-display text-[12vw] leading-[0.85] tracking-tight md:text-[8vw] lg:text-[140px] text-foreground mb-[36px]">
            {/* "Jeremy" */}
            <motion.span
              ref={jeremyRef}
              className="inline-block cursor-none"
              data-cursor="hover"
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
              ref={designerRef}
              className="inline-block cursor-none"
              data-cursor="hover"
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
          className="w-full"
        >
          <p className="font-sans md:text-2xl text-foreground mb-8 font-extralight text-[20px]">He finds inspiration in capturing moments, appreciating architecture, and spending playful time with his dog.</p>

          <button
            onClick={scrollToProjects}
            className="group flex items-center space-x-4 font-sans font-medium text-lg text-accent hover:text-accent/80 transition-colors"
          >
            <span>See His Work</span>
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
    </section>
  );
}
