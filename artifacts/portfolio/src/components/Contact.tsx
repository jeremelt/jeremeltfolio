import { motion } from "framer-motion";

const SOCIALS = [
  { name: "LinkedIn", url: "#" },
  { name: "Behance", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "Dribbble", url: "#" },
];

export function Contact() {
  return (
    <section id="contact" className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      <div className="mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tight mb-12 max-w-4xl"
        >
          Say hi or stalk me <span className="text-muted-foreground italic text-stroke">online.</span>
        </motion.h2>

        <motion.a
          href="mailto:your@email.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-block group"
        >
          <div className="flex items-center space-x-6">
            <span className="font-sans text-xl md:text-3xl text-accent underline underline-offset-8 decoration-accent/30 group-hover:decoration-accent transition-all duration-300">
              [your@email.com]
            </span>
            <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center text-accent transform transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:bg-accent group-hover:text-background">
              ↗
            </div>
          </div>
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-32">
        <div className="flex flex-col space-y-6">
          {SOCIALS.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              className="group flex items-center font-display text-3xl md:text-4xl text-muted-foreground hover:text-accent transition-colors duration-300 w-fit"
            >
              <span>{social.name}</span>
              <span className="ml-4 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-sans text-xl">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-border/50 mb-8" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center font-sans text-xs tracking-[0.2em] text-muted-foreground uppercase">
        <p>Designed & built by [YOUR NAME]</p>
        <p className="mt-2 md:mt-0">© 2025 ALL RIGHTS RESERVED</p>
      </div>
    </section>
  );
}
