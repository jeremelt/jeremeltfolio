import { motion } from "framer-motion";
import { useState } from "react";

const EXPERIENCE = [
  { duration: "Feb 2024 – now",         role: "Product Designer",          company: "REDComm Indonesia" },
  { duration: "Feb 2022 – Nov 2023",    role: "Junior Product Designer",   company: "Shipper" },
  { duration: "Apr 2019 – Apr 2021",    role: "Project Management Officer", company: "Bank Mandiri" },
  { duration: "Jun 2018 – Sep 2018",    role: "Landscape Architect Intern", company: "AECOM Indonesia" },
];

const EDUCATION = [
  { duration: "Aug 2014 – Oct 2018", role: "Bachelor of Architecture",  company: "Institut Teknologi Bandung (ITB)" },
  { duration: "Apr 2021 – Oct 2021", role: "UI/UX Design Course",       company: "Purwadhika Digital Technology School" },
];

const TOOLS = [
  { name: "Figma" },
  { name: "Figma Make" },
  { name: "Miro" },
  { name: "Jitter" },
  { name: "Framer" },
  { name: "Maze" },
  { name: "ChatGPT" },
  { name: "Photoshop" },
  { name: "Illustrator" },
  { name: "Canva" },
  { name: "Microsoft Word" },
  { name: "PowerPoint" },
];

const SKILLS = [
  { name: "Attention to detail", type: "Soft skills" },
  { name: "Product Thinking",    type: "Soft skills" },
  { name: "Creativity",          type: "Soft skills" },
  { name: "Structured & Organized", type: "Soft skills" },
  { name: "Time management",    type: "Soft skills" },
  { name: "Team worker",        type: "Soft skills" },
  { name: "Logo design",        type: "Hard skills" },
  { name: "User Research",      type: "Hard skills" },
  { name: "Design systems",     type: "Hard skills" },
  { name: "Wireframes & Prototypes", type: "Hard skills" },
  { name: "User Flows / Wireflow",   type: "Hard skills" },
  { name: "Information Architecture", type: "Hard skills" },
  { name: "Sketching",          type: "Hard skills" },
];

const TYPE_COLORS: Record<string, string> = {
  "Soft skills": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Hard skills": "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const TABS = ["experience", "education", "tools", "skills"] as const;
type Tab = typeof TABS[number];

const TAB_LABELS: Record<Tab, string> = {
  experience: "Experience",
  education:  "Education",
  tools:      "Tools",
  skills:     "Skills",
};

export function About() {
  const [activeTab, setActiveTab] = useState<Tab>("experience");

  const renderTimeline = (rows: typeof EXPERIENCE) => (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col"
    >
      {rows.map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: i * 0.06 }}
          className="grid grid-cols-[1fr_1.6fr] gap-4 py-4 border-b border-border/30 last:border-b-0"
        >
          <span className="font-sans text-xs text-muted-foreground leading-relaxed pt-0.5">
            {row.duration}
          </span>
          <div>
            <span className="font-sans text-sm font-semibold text-foreground">{row.role}</span>
            <span className="font-sans text-sm text-muted-foreground"> | {row.company}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderGrid = () => {
    const items = activeTab === "tools" ? TOOLS : SKILLS;
    return (
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-2 gap-3"
      >
        {items.map((item, i) => {
          const isSkill = "type" in item;
          const badge = isSkill ? (item as typeof SKILLS[0]).type : null;
          const badgeClass = badge ? TYPE_COLORS[badge] : "";

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
              {badge && (
                <span className={`self-start px-2 py-0.5 rounded-md border text-[11px] font-medium font-sans ${badgeClass}`}>
                  {badge}
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

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
            className="space-y-8 font-sans md:text-2xl text-foreground font-light text-[20px]"
          >
            <p>I'm a Product Designer with experience in building and improving digital products across ERP systems, logistics, and e-commerce platforms.</p>
            <p>With a background in architecture, I bring a structured, systems-thinking approach to solving complex user problems.</p>
            <p className="text-[20px]">I've worked closely with cross-functional teams to design end-to-end experiences, from research and user flows to high-fidelity prototypes.</p>
            <p>I'm particularly interested in crafting seamless, impactful solutions that work behind the scenes but make a meaningful difference for users.</p>
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
            <span>Based in Cimahi, Indonesia</span>
          </motion.div>
        </div>

        {/* Right Column: Tabs */}
        <div className="lg:col-span-5 pt-0 lg:pt-[5.5rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Tab bar */}
            <div className="flex items-center gap-1 mb-8 border border-border/40 rounded-lg p-1 w-fit flex-wrap">
              {TABS.map((tab) => (
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
                  <span className="relative z-10">{TAB_LABELS[tab]}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "experience" && renderTimeline(EXPERIENCE)}
            {activeTab === "education"  && renderTimeline(EDUCATION)}
            {(activeTab === "tools" || activeTab === "skills") && renderGrid()}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
