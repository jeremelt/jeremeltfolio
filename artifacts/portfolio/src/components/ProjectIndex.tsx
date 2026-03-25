import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sketch1 from "@assets/Sketch_1774425780668.jpeg";
import sketch2 from "@assets/Sketch001_1774425780707.jpeg";
import sketch3 from "@assets/Sketch002_1774425780708.jpeg";
import sketch4 from "@assets/Sketch003_1774425780709.jpeg";
import sketch5 from "@assets/Sketch004_1774425780710.jpeg";

const PROJECTS = [
  { id: "01", name: "Wannabee: Know Your True Self", platform: "Mobile App", category: "Design Challenge", locked: false, link: "https://jeremelt.notion.site/Design-Challenge-Wannabee-2ff5137bc09a80718c5dd852331d6e94" },
  { id: "02", name: "Aloshop - Product Scraping", platform: "Web", category: "Product Design - Confidential", locked: true },
  { id: "03", name: "Self-Service Warehouse Onboarding", platform: "Web", category: "Design Exploration - Confidential", locked: true },
  { id: "04", name: "ERP Recruitment Process Redesign", platform: "Web", category: "Product Design - Confidential", locked: true },
];

const SKETCHES = [
  { src: sketch1, label: "Westminster Abbey", date: "04.08.15", rotate: -5, tx: 0,   ty: 10 },
  { src: sketch2, label: "Japanese Alley",    date: "08.09.23", rotate:  3, tx: 12,  ty: -8 },
  { src: sketch3, label: "Garden Sculpture",  date: "09.09.23", rotate: -2, tx: -8,  ty: 16 },
  { src: sketch4, label: "Library Interior",  date: "15.10.23", rotate:  6, tx: 6,   ty: -12 },
  { src: sketch5, label: "Coffee Bar",        date: "22.09.23", rotate: -4, tx: -14, ty: 8 },
];

export function ProjectIndex() {
  const [activeTab, setActiveTab] = useState<"works" | "sketches">("works");
  const [selectedSketch, setSelectedSketch] = useState<typeof SKETCHES[0] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedSketch(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-16 flex-wrap gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground"
        >
          All Works
        </motion.h2>

        {/* Tab toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-1 border border-border/40 rounded-lg p-1"
        >
          {(["works", "sketches"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-1.5 rounded-md font-sans text-sm font-medium tracking-wide capitalize transition-colors duration-200 cursor-none ${
                activeTab === tab ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="project-tab-bg"
                  className="absolute inset-0 bg-foreground rounded-md"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">
                {tab === "works" ? "Design Work" : "Sketches"}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "works" && (
          <motion.div
            key="works"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col border-t border-border"
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 py-4 border-b border-border/50 text-xs font-sans tracking-widest uppercase text-muted-foreground">
              <div className="col-span-2 md:col-span-1">No.</div>
              <div className="col-span-10 md:col-span-6">Project Name</div>
              <div className="hidden md:block md:col-span-3">Platform</div>
              <div className="hidden md:block md:col-span-2">Category</div>
            </div>

            {PROJECTS.map((project, index) => {
              const [categoryMain, categorySub] = project.category.includes(" - ")
                ? project.category.split(" - ")
                : [project.category, null];

              const sharedMotionProps = {
                key: project.id,
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: index * 0.1 },
              };

              const innerContent = (
                <>
                  <div className="col-span-2 md:col-span-1 font-sans text-sm text-muted-foreground">
                    {project.id}
                  </div>
                  <div className="col-span-10 md:col-span-6 font-display text-2xl md:text-3xl group-hover:text-accent transition-colors">
                    {project.name}
                  </div>
                  <div className="hidden md:block md:col-span-3 font-sans text-sm text-muted-foreground">
                    {project.platform}
                  </div>
                  <div className="hidden md:block md:col-span-2 font-sans text-sm text-muted-foreground leading-snug">
                    <span>{categoryMain}</span>
                    {categorySub && (
                      <><br /><span className="text-xs opacity-60">{categorySub}</span></>
                    )}
                  </div>
                </>
              );

              if (project.locked) {
                return (
                  <motion.div
                    {...sharedMotionProps}
                    className="grid grid-cols-12 gap-4 py-6 border-b border-border/50 items-center group transition-colors duration-300 cursor-not-allowed opacity-60"
                  >
                    {innerContent}
                  </motion.div>
                );
              }

              return (
                <motion.a
                  {...sharedMotionProps}
                  href={project.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-12 gap-4 py-6 border-b border-border/50 items-center group transition-colors duration-300 hover:bg-foreground/5 cursor-none"
                >
                  {innerContent}
                </motion.a>
              );
            })}
          </motion.div>
        )}

        {activeTab === "sketches" && (
          <motion.div
            key="sketches"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="flex flex-wrap justify-center gap-10 py-12">
              {SKETCHES.map((sketch, i) => (
                <motion.div
                  key={sketch.label}
                  onClick={() => setSelectedSketch(sketch)}
                  initial={{ opacity: 0, scale: 0.88, rotate: sketch.rotate * 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: sketch.rotate,
                    x: sketch.tx,
                    y: sketch.ty,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    rotate: 0,
                    x: 0,
                    y: -8,
                    scale: 1.06,
                    zIndex: 10,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  className="relative cursor-none"
                  style={{ zIndex: i + 1 }}
                >
                  {/* Polaroid card */}
                  <div
                    className="bg-[#F2EDE3] shadow-2xl"
                    style={{
                      padding: "12px 12px 40px 12px",
                      width: 220,
                      borderRadius: 4,
                    }}
                  >
                    <img
                      src={sketch.src}
                      alt={sketch.label}
                      className="w-full object-cover"
                      style={{ height: 260, display: "block", borderRadius: 2 }}
                      draggable={false}
                    />
                    {/* Polaroid caption strip */}
                    <div className="flex justify-between items-end px-1 pt-3">
                      <span
                        className="font-sans text-[11px] font-medium text-[#5a4a3a] uppercase tracking-widest leading-tight"
                        style={{ maxWidth: 130 }}
                      >
                        {sketch.label}
                      </span>
                      <span className="font-sans text-[10px] text-[#9a8a7a] tabular-nums">
                        {sketch.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center font-sans text-xs text-muted-foreground tracking-widest uppercase mt-4 opacity-50">
              Ink on paper · Field sketches
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sketch lightbox modal */}
      <AnimatePresence>
        {selectedSketch && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedSketch(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal card */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Polaroid wrapper */}
              <div
                className="bg-[#F2EDE3] shadow-2xl"
                style={{ padding: "16px 16px 56px 16px", borderRadius: 4, maxWidth: "min(90vw, 640px)" }}
              >
                <img
                  src={selectedSketch.src}
                  alt={selectedSketch.label}
                  className="w-full object-contain block"
                  style={{ maxHeight: "65vh", borderRadius: 2 }}
                  draggable={false}
                />
                <div className="flex justify-between items-end px-1 pt-4">
                  <span className="font-sans text-sm font-medium text-[#5a4a3a] uppercase tracking-widest">
                    {selectedSketch.label}
                  </span>
                  <span className="font-sans text-xs text-[#9a8a7a] tabular-nums">
                    {selectedSketch.date}
                  </span>
                </div>
              </div>

              {/* Close hint */}
              <p className="mt-5 font-sans text-xs text-white/40 tracking-widest uppercase">
                Click outside or press Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
