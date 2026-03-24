import { motion } from "framer-motion";
import { useState } from "react";

const TOOLS = [
  { name: "Figma", level: "Advanced" },
  { name: "Figma Make", level: "Confident" },
  { name: "Miro", level: "Confident" },
  { name: "Jitter", level: "Confident" },
  { name: "Framer", level: "Confident" },
  { name: "Maze", level: "Basic" },
  { name: "ChatGPT", level: "Confident" },
  { name: "Photoshop", level: "Confident" },
  { name: "Illustrator", level: "Confident" },
  { name: "Canva", level: "Confident" },
  { name: "Microsoft Word", level: "Confident" },
  { name: "PowerPoint", level: "Confident" },
];

const SKILLS = [
  { name: "Attention to detail", type: "Soft skills" },
  { name: "Product Thinking", type: "Soft skills" },
  { name: "Creativity", type: "Soft skills" },
  { name: "Structured & Organized", type: "Soft skills" },
  { name: "Time management", type: "Soft skills" },
  { name: "Team worker", type: "Soft skills" },
  { name: "Logo design", type: "Hard skills" },
  { name: "User Research", type: "Hard skills" },
  { name: "Design systems", type: "Hard skills" },
  { name: "Wireframes & Prototypes", type: "Hard skills" },
  { name: "User Flows / Wireflow", type: "Hard skills" },
  { name: "Information Architecture", type: "Hard skills" },
  { name: "Sketching", type: "Hard skills" },
];

const LEVEL_COLORS: Record<string, string> = {
  Advanced: "bg-[#C8F04E]/20 text-[#8ab836] border-[#C8F04E]/30",
  Confident: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Basic: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const TYPE_COLORS: Record<string, string> = {
  "Soft skills": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Hard skills": "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export function About() {
  const [activeTab, setActiveTab] = useState<"tools" | "skills">("tools");

  const items = activeTab === "tools" ? TOOLS : SKILLS;

  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

        {/* Left Column: Section Title & Bio */}
        <div className="lg:col-span-7 pr-0 lg:pr-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-16"
          >
            About
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8 font-sans text-xl md:text-2xl text-foreground leading-relaxed font-light"
          >
            <p>
              I'm a designer who believes that form and function are not separate entities, but two sides of the same coin. I design digital products that respect the user's intelligence and time, rejecting dark patterns in favor of clarity and delight.
            </p>
            <p className="text-muted-foreground">
              My journey started in architecture before shifting to digital product. That structural foundation informs my approach: build a solid skeleton first, then obsess over the finishes. Previously, I've shaped experiences at <span className="text-foreground">[Company A]</span>, <span className="text-foreground">[Company B]</span>, and <span className="text-foreground">[Company C]</span>.
            </p>
            <p>
              When I'm not pushing pixels or arguing about border radii, you'll find me collecting obscure typography books, attempting latte art, or over-analyzing the UX of physical objects in the real world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex items-center space-x-3 text-muted-foreground font-sans tracking-wider uppercase text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Based in [Your City], Earth</span>
          </motion.div>
        </div>

        {/* Right Column: Tools & Skills */}
        <div className="lg:col-span-5 pt-0 lg:pt-[5.5rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Tabs */}
            <div className="flex items-center gap-1 mb-8 border border-border/40 rounded-lg p-1 w-fit">
              {(["tools", "skills"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-1.5 rounded-md font-sans text-sm font-medium tracking-wide capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? "text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 bg-foreground rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                </button>
              ))}
            </div>

            {/* Cards grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 gap-3"
            >
              {items.map((item, i) => {
                const badge = "level" in item ? item.level : item.type;
                const badgeClass = "level" in item
                  ? LEVEL_COLORS[item.level]
                  : TYPE_COLORS[item.type];

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="flex flex-col gap-2 p-4 rounded-xl border border-border/40 bg-secondary/20 hover:border-border/80 transition-colors duration-200"
                  >
                    <span className="font-sans text-sm font-medium text-foreground leading-tight">
                      {item.name}
                    </span>
                    <span className={`self-start px-2 py-0.5 rounded-md border text-[11px] font-medium font-sans ${badgeClass}`}>
                      {badge}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
