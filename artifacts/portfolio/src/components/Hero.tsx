import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import profilePic from "@assets/Profile_Pict_1774333879125.png";

export function Hero() {
  const [isJeremyHovered, setIsJeremyHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <section
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 max-w-[1400px] mx-auto pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Polaroid image that follows cursor */}
      <AnimatePresence>
        {isJeremyHovered && (
          <motion.div
            className="fixed pointer-events-none z-[200]"
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -4,
              x: mousePos.x + 24,
              y: mousePos.y - 80,
            }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
              x: { type: "tween", ease: "linear", duration: 0 },
              y: { type: "tween", ease: "linear", duration: 0 },
              rotate: { duration: 0.3 },
            }}
            style={{ top: 0, left: 0 }}
          >
            {/* Polaroid frame */}
            <div className="bg-white p-3 pb-10 shadow-2xl" style={{ width: 220, borderRadius: 16, overflow: "hidden" }}>
              <img
                src={profilePic}
                alt="Jeremy"
                className="w-full object-cover"
                style={{ height: 200, objectPosition: "top" }}
              />
              <p
                className="mt-3 text-black text-sm leading-snug"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                oh, there he is, spotted!
              </p>
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
            {/* "Jeremy" — interactive */}
            <span
              className="inline-block cursor-none"
              onMouseEnter={() => setIsJeremyHovered(true)}
              onMouseLeave={() => setIsJeremyHovered(false)}
              style={{
                transition: "opacity 0.35s ease",
                opacity: 1,
              }}
            >
              Jeremy
            </span>
            <br />
            {/* "is a Product" — dims on hover */}
            <motion.span
              className="italic text-[#c7ee4f]"
              animate={{ opacity: isJeremyHovered ? 0.2 : 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              is a Product
            </motion.span>
            <br />
            {/* "Designer." — dims on hover */}
            <motion.span
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
          <p className="font-sans text-xl md:text-2xl text-foreground leading-relaxed mb-8">
            [Your highly opinionated, sharp, 1-sentence tagline about crafting unforgettable digital experiences and challenging the status quo.]
          </p>

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
