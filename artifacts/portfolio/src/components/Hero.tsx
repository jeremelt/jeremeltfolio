import { motion } from "framer-motion";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-center px-6 md:px-12 max-w-[1400px] mx-auto pt-20">
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="font-display text-[12vw] leading-[0.85] tracking-tight md:text-[8vw] lg:text-[140px] text-foreground">
            [YOUR NAME]
            <br />
            <span className="italic text-[#c7ee4f]">is a Product</span>
            <br />
            Designer.
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
