import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import profilePic from "@assets/Jeremy_Profile_Picture_1_1774334445184.jpeg";
import photo1 from "@assets/DSC_0223_-_Copy_1774410658464.JPG";
import photo2 from "@assets/DSC_0272_1774410658466.JPG";
import photo3 from "@assets/DSC_0316_1774410658467.JPG";

const PHOTOS = [photo1, photo2, photo3];

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
  const [isMomentsHovered, setIsMomentsHovered] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const jeremyRef = useRef<HTMLSpanElement>(null);
  const designerRef = useRef<HTMLSpanElement>(null);
  const momentsRef = useRef<HTMLSpanElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const checkHits = useCallback((x: number, y: number) => {
    const hit = (ref: React.RefObject<HTMLSpanElement | null>) => {
      if (!ref.current) return false;
      const r = ref.current.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };
    setIsJeremyHovered(hit(jeremyRef));
    setIsDesignerHovered(hit(designerRef));
    setIsMomentsHovered(hit(momentsRef));
  }, []);

  useEffect(() => {
    if (!isMomentsHovered) return;
    const id = setInterval(() => {
      setPhotoIndex(i => (i + 1) % PHOTOS.length);
    }, 1500);
    return () => clearInterval(id);
  }, [isMomentsHovered]);

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

      {/* Moments — cycling photo card */}
      <AnimatePresence>
        {isMomentsHovered && (
          <motion.div
            className="fixed pointer-events-none z-[200]"
            initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 2, x: mousePos.x + 24, y: mousePos.y - 300 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={cardTransition}
            style={{ top: 0, left: 0 }}
          >
            <div className="relative flex shadow-2xl" style={{ width: 280, borderRadius: 8, overflow: "hidden", background: "#EDE8DC" }}>
              {/* Sidebar */}
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 22, background: "#DDD8CC", alignSelf: "stretch" }}>
                <span style={{ ...SIDEBAR_STYLE, color: "#8a8478" }}>
                  EDITOR&apos;S NOTE&nbsp;&nbsp;·&nbsp;&nbsp;EDITOR&apos;S NOTE&nbsp;&nbsp;·&nbsp;&nbsp;EDITOR&apos;S NOTE
                </span>
              </div>
              {/* Content */}
              <div className="flex-1 flex flex-col" style={{ padding: "14px 14px 16px 12px" }}>
                {/* Cycling photo */}
                <div style={{ position: "relative", height: 220, borderRadius: 8, overflow: "hidden", background: "#111" }}>
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={photoIndex}
                      src={PHOTOS[photoIndex]}
                      alt={`Photo ${photoIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </AnimatePresence>
                  {/* Photo counter dots */}
                  <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
                    {PHOTOS.map((_, i) => (
                      <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i === photoIndex ? "#C8F04E" : "rgba(255,255,255,0.35)", transition: "background 0.3s" }} />
                    ))}
                  </div>
                </div>
                {/* Caption */}
                <div className="flex items-start mt-3 gap-2">
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M4 4 C4 12, 12 18, 18 16" stroke="#5a5448" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M15 13 L18 16 L14 17" stroke="#5a5448" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#3a3530", lineHeight: 1.4, fontWeight: 400 }}>
                    here are some pics he took!
                  </p>
                </div>
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
            >Jeremy Meldika</motion.span>
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
          <p className="font-sans md:text-2xl text-foreground mb-8 font-extralight text-[20px]">He finds inspiration in capturing <span ref={momentsRef} className="cursor-none">moments 📸</span>, appreciating architecture 🏛️, and spending playful time with his dog 🐶.</p>

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
