import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    const sections = ["projects", "about", "contact"];

    const onScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-sans text-sm tracking-[0.2em] uppercase hover:text-accent transition-colors font-bold"
        >MeltFolio.</a>

        <div className="hidden md:flex items-center space-x-8">
          {[
            { id: "projects", label: "Work" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative font-sans text-sm font-medium tracking-wide uppercase hover:text-accent transition-colors group"
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
          <a
            href="https://drive.google.com/file/d/1sg72JYU4AsZFpuh4QixU7BSiSsbaZEsh/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-medium tracking-wide uppercase px-4 py-1.5 border border-foreground/40 rounded-full hover:border-accent hover:text-accent transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
