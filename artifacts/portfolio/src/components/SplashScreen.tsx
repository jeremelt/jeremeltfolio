import { useState, useEffect, useCallback, useRef } from "react";

const TEXT = "Fear of the Lord is beginning of wisdom...";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [grainOpacity, setGrainOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const complete = useCallback(() => {
    setFadeOut(true);
    const t = setTimeout(() => {
      setRemoved(true);
      onComplete();
    }, 1500);
    timersRef.current.push(t);
  }, [onComplete]);

  const skip = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    setShowCursor(false);
    complete();
  }, [complete]);

  useEffect(() => {
    const add = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timersRef.current.push(t);
    };

    add(() => setGrainOpacity(0.1), 50);
    add(() => {
      setTextOpacity(1);
      setShowCursor(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayedText(TEXT.slice(0, i));
        if (i >= TEXT.length) clearInterval(interval);
      }, 50);
      timersRef.current.push(interval as unknown as ReturnType<typeof setTimeout>);
    }, 500);

    add(() => setShowCursor(false), 5500);
    add(complete, 7500);

    return () => timersRef.current.forEach(clearTimeout);
  }, [complete]);

  if (removed) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0D0D0D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1.5s ease-in-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: grainOpacity,
          transition: "opacity 0.5s ease",
          mixBlendMode: "overlay",
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <p
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
          color: "#E8E0D0",
          opacity: textOpacity,
          transition: "opacity 0.8s ease",
          letterSpacing: "0.02em",
          maxWidth: "55ch",
          textAlign: "center",
          padding: "0 2rem",
          lineHeight: 1.6,
        }}
      >
        {displayedText}
        {showCursor && <span className="splash-cursor" />}
      </p>

      <button
        onClick={skip}
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          background: "none",
          border: "none",
          color: "#555555",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          cursor: "pointer",
          padding: "0.5rem 0.75rem",
          textTransform: "uppercase",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#E8E0D0")}
        onMouseLeave={e => (e.currentTarget.style.color = "#555555")}
      >
        skip →
      </button>
    </div>
  );
}
