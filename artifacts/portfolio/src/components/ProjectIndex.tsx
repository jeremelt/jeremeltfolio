import { motion } from "framer-motion";

const PROJECTS = [
  { id: "01", name: "[Project Alpha]", platform: "iOS App", category: "Product Design", locked: false },
  { id: "02", name: "[Project Beta]", platform: "Web", category: "Branding", locked: true },
  { id: "03", name: "[Project Gamma]", platform: "Dashboard", category: "UX Research", locked: false },
  { id: "04", name: "[Project Delta]", platform: "Mobile", category: "Motion Design", locked: true },
  { id: "05", name: "[Project Epsilon]", platform: "Web App", category: "Design System", locked: false },
  { id: "06", name: "[Project Zeta]", platform: "Multi-platform", category: "Product Strategy", locked: false },
];

export function ProjectIndex() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-sans text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-16"
      >All Works</motion.h2>
      <div className="w-full flex flex-col border-t border-border">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 py-4 border-b border-border/50 text-xs font-sans tracking-widest uppercase text-muted-foreground">
          <div className="col-span-2 md:col-span-1">No.</div>
          <div className="col-span-10 md:col-span-6">Project Name</div>
          <div className="hidden md:block md:col-span-3">Platform</div>
          <div className="hidden md:block md:col-span-2">Category</div>
        </div>

        {/* Table Rows */}
        {PROJECTS.map((project, index) => (
          <motion.a
            href={project.locked ? undefined : "#"}
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`grid grid-cols-12 gap-4 py-6 border-b border-border/50 items-center group transition-colors duration-300 ${
              project.locked ? "cursor-not-allowed opacity-60" : "hover:bg-foreground/5 cursor-none"
            }`}
          >
            <div className="col-span-2 md:col-span-1 font-sans text-sm text-muted-foreground">
              {project.id}
            </div>
            <div className="col-span-10 md:col-span-6 font-display text-2xl md:text-3xl group-hover:text-accent transition-colors">
              {project.name}
            </div>
            <div className="hidden md:block md:col-span-3 font-sans text-sm text-muted-foreground">
              {project.platform}
            </div>
            <div className="hidden md:block md:col-span-2 font-sans text-sm text-muted-foreground">
              {project.category}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
