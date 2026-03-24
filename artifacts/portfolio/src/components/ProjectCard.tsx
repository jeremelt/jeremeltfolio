import { motion } from "framer-motion";

interface ProjectCardProps {
  company: string;
  name: string;
  description: string;
  tags: string;
  imageFallbackGradient: string;
  imageUrl?: string;
  link?: string;
  badge?: string;
  ctaLabel?: string;
}

export function ProjectCard({ company, name, description, tags, imageFallbackGradient, imageUrl, link, badge = "REAL PROJECT", ctaLabel = "VIEW PROJECT" }: ProjectCardProps) {
  const handleClick = () => {
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleClick}
      className={`group block w-full mb-32 last:mb-0 cursor-none${link ? " cursor-pointer" : ""}`}
    >
      <div className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-sm mb-8 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        
        {/* Fallback gradient as requested in requirements */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{ background: imageFallbackGradient }}
        />
        
        {/* Placeholder comment visually rendered for development clarity as requested */}
        <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-white/30 uppercase tracking-widest mix-blend-overlay hidden md:block">
          // Placeholder image area (16:9 aspect ratio)
        </div>

        {/* The actual image (layered on top if provided) */}
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={name}
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-80 mix-blend-luminosity transition-all duration-500 group-hover:opacity-100 group-hover:mix-blend-normal"
          />
        )}

        {/* Dark overlay that intensifies on hover */}
        <div className="absolute inset-0 bg-black/20 z-20 transition-opacity duration-500 group-hover:bg-black/40" />

        {/* Badge inside image area */}
        <div className="absolute top-6 right-6 z-30">
          <div className="px-3 py-1 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-foreground">
              {badge}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="font-sans text-sm font-medium tracking-widest text-accent uppercase">
          {company}
        </div>
        <div className="font-sans text-xs tracking-[0.2em] text-muted-foreground uppercase text-right">
          {tags}
        </div>
      </div>

      <h3 className="font-display text-4xl md:text-5xl lg:text-6xl w-full group-hover:text-accent transition-colors duration-300 mb-6">
        {name}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-8">
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="md:col-span-4 flex flex-col md:items-end justify-end h-full">
          <button className="flex items-center space-x-2 font-sans text-sm tracking-widest uppercase text-foreground group-hover:text-accent transition-colors border-b border-transparent group-hover:border-accent pb-1 w-fit">
            <span>{ctaLabel}</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
