import { motion } from "framer-motion";

const PROJECTS = [
  { id: "01", name: "Wannabee: Know Your True Self", platform: "Mobile App", category: "Design Challenge", locked: false, link: "https://jeremelt.notion.site/Design-Challenge-Wannabee-2ff5137bc09a80718c5dd852331d6e94" },
  { id: "02", name: "Aloshop - Product Scraping", platform: "Web", category: "Product Design - Confidential", locked: true },
  { id: "03", name: "Self-Service Warehouse Onboarding", platform: "Web", category: "Design Exploration - Confidential", locked: true },
  { id: "04", name: "ERP Recruitment Process Redesign", platform: "Web", category: "Product Design - Confidential", locked: true },
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
      </div>
    </section>
  );
}
