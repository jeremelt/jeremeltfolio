import { useState } from "react";

interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

export function Marquee({ text, reverse = false }: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const items = Array(4).fill(text);

  const animationStyle = {
    animationDuration: isHovered ? "70s" : "25s",
    animationDirection: reverse ? "reverse" : "normal" as const,
    transition: "animation-duration 0.6s ease",
  };

  return (
    <div
      className="w-full overflow-hidden bg-background border-y border-border py-6 relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex whitespace-nowrap w-max animate-marquee"
        style={animationStyle}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-foreground font-sans text-sm md:text-base tracking-[0.25em] uppercase mx-4 flex-shrink-0 flex items-center font-normal"
          >
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="text-foreground font-sans text-sm md:text-base font-medium tracking-[0.25em] uppercase mx-4 flex-shrink-0 flex items-center"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
