import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [showVolume, setShowVolume] = useState(false);
  const [started, setStarted] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAudio = useCallback(() => {
    if (started || !audioRef.current) return;
    setStarted(true);
    audioRef.current.volume = volume;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [started, volume]);

  useEffect(() => {
    const events = ["click", "keydown", "scroll", "touchstart"];
    const handler = () => startAudio();
    events.forEach((e) =>
      document.addEventListener(e, handler, { once: true, passive: true })
    );
    return () =>
      events.forEach((e) => document.removeEventListener(e, handler));
  }, [startAudio]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    startAudio();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (v === 0) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (!isPlaying) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
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
                  className="volume-slider"
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
          onClick={toggleMute}
          data-cursor="hover"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: isPlaying ? "#C8F04E" : "rgba(20,20,20,0.92)",
            border: `1px solid ${isPlaying ? "#C8F04E" : "#2e2e2e"}`,
            backdropFilter: "blur(12px)",
            boxShadow: isPlaying
              ? "0 0 24px rgba(200,240,78,0.35)"
              : "0 4px 20px rgba(0,0,0,0.4)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
        >
          {isPlaying ? <PlayingIcon /> : <MutedIcon />}
        </motion.button>
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
          style={{ originY: 1 }}
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

function MutedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 7.5h2.5L10 4v12l-4.5-3.5H3V7.5z"
        fill="#555"
        stroke="#555"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <line x1="13" y1="7" x2="17" y2="13" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="7" x2="13" y2="13" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
