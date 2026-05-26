import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [showVolume, setShowVolume] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    // Attempt autoplay after 2 second delay
    const timer = setTimeout(() => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay — wait for first user gesture
        setAutoplayBlocked(true);
      });
    }, 2000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once blocked, start on first interaction
  useEffect(() => {
    if (!autoplayBlocked) return;

    const resume = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = volume;
      audio.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      }).catch(() => {});
    };

    const events = ["click", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) =>
      document.addEventListener(e, resume, { once: true, passive: true })
    );
    return () => events.forEach((e) => document.removeEventListener(e, resume));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayBlocked]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = volume;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = v;
    if (v === 0) {
      audio.pause();
      setIsPlaying(false);
    } else if (!isPlaying) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setShowVolume(true);
  };

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => setShowVolume(false), 300);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}ambient.mp3`}
        loop
        preload="auto"
      />

      <div
        className="fixed bottom-6 right-6 z-[500] flex flex-col items-center gap-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Volume slider — appears above button on hover */}
        <AnimatePresence>
          {showVolume && (
            <motion.div
              key="volume"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2 px-3 py-4 rounded-2xl"
              style={{
                background: "rgba(20,20,20,0.92)",
                border: "1px solid #2e2e2e",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="text-[10px] font-medium tracking-widest uppercase"
                style={{ color: "#555" }}
              >
                Vol
              </span>
              <div className="relative flex items-center justify-center h-28">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolume}
                  style={{
                    writingMode: "vertical-lr" as React.CSSProperties["writingMode"],
                    direction: "rtl",
                    width: "4px",
                    height: "100px",
                    cursor: "pointer",
                    appearance: "slider-vertical" as React.CSSProperties["appearance"],
                    WebkitAppearance: "slider-vertical",
                    accentColor: "#C8F04E",
                  }}
                />
              </div>
              <span
                className="text-[10px] font-medium"
                style={{ color: "#555" }}
              >
                {Math.round(volume * 100)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={togglePlay}
          data-cursor="hover"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          animate={autoplayBlocked ? { scale: [1, 1.08, 1] } : {}}
          transition={autoplayBlocked ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : {}}
          className="relative w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: isPlaying ? "#C8F04E" : "rgba(20,20,20,0.92)",
            border: `1px solid ${isPlaying ? "#C8F04E" : autoplayBlocked ? "#C8F04E66" : "#2e2e2e"}`,
            backdropFilter: "blur(12px)",
            boxShadow: isPlaying
              ? "0 0 24px rgba(200,240,78,0.35)"
              : autoplayBlocked
              ? "0 0 16px rgba(200,240,78,0.18)"
              : "0 4px 20px rgba(0,0,0,0.4)",
            transition: "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          }}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
        >
          {isPlaying ? <PlayingIcon /> : <MutedIcon highlight={autoplayBlocked} />}
        </motion.button>

        {/* Tooltip hint when autoplay is blocked */}
        <AnimatePresence>
          {autoplayBlocked && !showVolume && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="absolute right-14 bottom-0 pointer-events-none"
            >
              <div
                className="whitespace-nowrap px-3 py-1.5 rounded-lg font-sans text-[11px] tracking-wide"
                style={{
                  background: "rgba(20,20,20,0.92)",
                  border: "1px solid #2e2e2e",
                  color: "#C8F04E",
                  backdropFilter: "blur(12px)",
                }}
              >
                ♪ Click to play music
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function PlayingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={4 + i * 5}
          rx={1.5}
          width={3}
          fill="#0D0D0D"
          animate={{ height: [4, 12, 4], y: [13, 5, 13] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

function MutedIcon({ highlight = false }: { highlight?: boolean }) {
  const col = highlight ? "#C8F04E" : "#555";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 7.5h2.5L10 4v12l-4.5-3.5H3V7.5z"
        fill={col}
        stroke={col}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <line x1="13" y1="7" x2="17" y2="13" stroke={col} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="7" x2="13" y2="13" stroke={col} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
