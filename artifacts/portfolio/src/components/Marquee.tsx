import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

export function Marquee({ text, reverse = false }: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const speedRef = useRef(0.12);
  const x = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);

  const items = Array(8).fill(text);

  useAnimationFrame((_, delta) => {
    const targetSpeed = isHoveredRef.current ? 0.03 : 0.12;
    speedRef.current += (targetSpeed - speedRef.current) * 0.06;

    const direction = reverse ? 1 : -1;
    let newX = x.get() + direction * speedRef.current * delta;

    if (innerRef.current) {
      const halfWidth = innerRef.current.scrollWidth / 2;
      if (!reverse && newX <= -halfWidth) newX += halfWidth;
      if (reverse && newX >= 0) newX -= halfWidth;
    }

    x.set(newX);
  });

  return (
    <div
      className="w-full overflow-hidden bg-background border-y border-border py-6 relative flex items-center"
      onMouseEnter={() => { setIsHovered(true); isHoveredRef.current = true; }}
      onMouseLeave={() => { setIsHovered(false); isHoveredRef.current = false; }}
    >
      <motion.div
        ref={innerRef}
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-foreground font-sans text-sm md:text-base tracking-[0.25em] uppercase mx-6 flex-shrink-0 flex items-center font-normal"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
