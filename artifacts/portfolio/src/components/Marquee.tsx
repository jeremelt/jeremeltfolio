interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

export function Marquee({ text, reverse = false }: MarqueeProps) {
  // Create an array of repeating text items to ensure smooth infinite scroll
  const items = Array(4).fill(text);

  return (
    <div className="w-full overflow-hidden bg-background border-y border-border py-6 relative flex items-center">
      <div className={`flex whitespace-nowrap w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {items.map((item, i) => (
          <span
            key={i}
            className="text-foreground font-sans text-sm md:text-base tracking-[0.25em] mx-4 flex-shrink-0 flex items-center font-normal"
          >
            {item}
          </span>
        ))}
        {/* Duplicate set for seamless looping */}
        {items.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="text-foreground font-sans text-sm md:text-base font-medium tracking-[0.25em] mx-4 flex-shrink-0 flex items-center"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
