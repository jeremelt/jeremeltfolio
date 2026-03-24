import { motion } from "framer-motion";

const SKILLS = [
  "Figma", "Prototyping", "Design Systems", "User Research", 
  "Usability Testing", "Framer", "Notion", "Miro", "Adobe Suite", "Principle"
];

export function About() {
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Based in [Your City], Earth</span>
          </motion.div>
        </div>

        {/* Right Column: Skills */}
        <div className="lg:col-span-5 pt-0 lg:pt-[5.5rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="font-sans text-sm font-medium tracking-[0.2em] uppercase text-foreground mb-8">
              Capabilities
            </h3>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + (i * 0.05) }}
                  className="px-4 py-2 rounded-full border border-border/60 bg-secondary/30 text-foreground font-sans text-sm tracking-wide hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
