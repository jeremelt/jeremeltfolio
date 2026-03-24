import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectIndex } from "@/components/ProjectIndex";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full selection:bg-accent selection:text-background relative">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Custom Cursor taking over the default one */}
      <CustomCursor />
      
      <Navbar />
      
      <main>
        <Hero />
        
        <Marquee text="Product Designer · UI/UX Designer · Bachelor of Architecture · Photography & Art Enthusiast · " />
        
        {/* Featured Projects Section */}
        <section id="projects" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-16"
          >
            Selected Work
          </motion.h2>
          
          <div className="flex flex-col w-full">
            <ProjectCard 
              company="ALOSHOP - SHIPPER"
              name="Checkout Buyer Side"
              description="Redefining the digital ecosystem for a global brand. A comprehensive overhaul of their mobile experience focusing on seamless interaction and conversion."
              tags="UI/UX · MOBILE · iOS"
              imageFallbackGradient="linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)"
              imageUrl={`${import.meta.env.BASE_URL}images/project-1.png`}
              link="https://jeremelt.notion.site/Aloshop-Checkout-Buyer-Side-23f5137bc09a8011b8e4c2ded6fe0200"
            />
            
            <ProjectCard 
              company="[CLIENT TWO]"
              name="[Project Name Two]"
              description="Architecting a scalable design system that unified 14 different sub-brands under one cohesive visual language while reducing developer handoff time by 40%."
              tags="WEB · DESIGN SYSTEM"
              imageFallbackGradient="linear-gradient(135deg, #0d0d0d 0%, #1f1f1f 100%)"
              imageUrl={`${import.meta.env.BASE_URL}images/project-2.png`}
            />
            
            <ProjectCard 
              company="[CLIENT THREE]"
              name="[Project Name Three]"
              description="Strategic user research and experience design for a complex B2B financial dashboard, translating dense data into actionable insights."
              tags="UX RESEARCH · STRATEGY"
              imageFallbackGradient="linear-gradient(135deg, #111111 0%, #222222 100%)"
              imageUrl={`${import.meta.env.BASE_URL}images/project-3.png`}
            />
          </div>
        </section>

        <ProjectIndex />
        
        <Marquee 
          text="FIGMA · PROTOTYPING · DESIGN SYSTEMS · USER RESEARCH · USABILITY TESTING · FRAMER · NOTION · " 
          reverse={true} 
        />
        
        <About />
        
        <Contact />
      </main>
    </div>
  );
}
