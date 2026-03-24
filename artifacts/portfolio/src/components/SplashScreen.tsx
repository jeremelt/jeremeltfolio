import { useState, useEffect, useCallback, useRef } from "react";

const TEXT = "Fear of the Lord is beginning of wisdom...";

interface SplashScreenProps {
  onComplete: () => void;
}

function TvNoise({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SCALE = 3;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / SCALE);
      canvas.height = Math.ceil(window.innerHeight / SCALE);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const draw = () => {
      frame++;
      if (frame % 2 === 0) {
        const w = canvas.width;
        const h = canvas.height;
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255 | 0;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        imageRendering: "pixelated",
        transition: "opacity 0.8s ease",
      }}
    />
  );
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [noiseOpacity, setNoiseOpacity] = useState(0);
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

    add(() => setNoiseOpacity(0.18), 50);
    add(() => {
      setTextOpacity(1);
      setShowCursor(true);
      let i = 0;
      const typeNext = () => {
        i++;
        setDisplayedText(TEXT.slice(0, i));
        if (i < TEXT.length) {
          const delay = 45 + Math.random() * 30 + (TEXT[i - 1] === " " ? 15 : 0);
          const t = setTimeout(typeNext, delay);
          timersRef.current.push(t);
        }
      };
      const t = setTimeout(typeNext, 0);
      timersRef.current.push(t);
    }, 500);

    add(() => setShowCursor(false), 6500);
    add(complete, 6500);

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
      <TvNoise opacity={noiseOpacity} />

      <p
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'PP Kyoto', Georgia, serif",
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
          zIndex: 1,
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
