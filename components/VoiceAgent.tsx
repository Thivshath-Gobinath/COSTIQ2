"use client";

import { useConversation, ConversationProvider } from "@elevenlabs/react";
import { motion, AnimatePresence, type Variants, type Easing } from "framer-motion";
import { useCallback, useState } from "react";

const AGENT_ID = "agent_4701kc2hmmwsf87tvzsw5vdvqqp2";
const NAVY = "#0C1E32";
const GREEN = "#1EBE69";
const EASE: Easing = "easeInOut";

// ─── Status helpers ────────────────────────────────────────────────────────────

type VisualState = "idle" | "connecting" | "listening" | "speaking" | "finished";

function getVisualState(status: string, isSpeaking: boolean): VisualState {
  if (status === "connecting") return "connecting";
  if (status === "connected" && isSpeaking) return "speaking";
  if (status === "connected" && !isSpeaking) return "listening";
  if (status === "disconnected") return "finished";
  return "idle";
}

const statusLabels: Record<VisualState, string> = {
  idle: "Ready to begin your consultation",
  connecting: "Establishing secure connection…",
  listening: "Listening",
  speaking: "Speaking",
  finished: "Session complete",
};

const statusColors: Record<VisualState, string> = {
  idle:       "rgba(255,255,255,0.45)",
  connecting: "rgba(255,255,255,0.55)",
  listening:  GREEN,
  speaking:   "rgba(255,255,255,0.90)",
  finished:   "rgba(255,255,255,0.35)",
};

// ─── Framer Motion variants ────────────────────────────────────────────────────

const outerRingVariants: Variants = {
  idle: {
    scale: 1,
    boxShadow: "0 0 0 0px rgba(30,190,105,0)",
    borderColor: "rgba(255,255,255,0.18)",
    opacity: 1,
  },
  connecting: {
    scale: [1, 1.015, 1] as number[],
    borderColor: "rgba(255,255,255,0.28)",
    opacity: [0.5, 0.9, 0.5] as number[],
    transition: { duration: 1.4, repeat: Infinity, ease: EASE },
  },
  listening: {
    scale: 1,
    borderColor: GREEN,
    opacity: 1,
    boxShadow:
      "0 0 0 12px rgba(30,190,105,0.06), 0 0 40px 8px rgba(30,190,105,0.16), 0 0 80px 16px rgba(30,190,105,0.08)",
    transition: { duration: 0.5, ease: EASE },
  },
  speaking: {
    scale: [1, 1.035, 0.985, 1.025, 1] as number[],
    borderColor: "rgba(255,255,255,0.55)",
    opacity: 1,
    boxShadow: "0 0 0 0px rgba(255,255,255,0)",
    transition: { duration: 1.6, repeat: Infinity, ease: EASE },
  },
  finished: {
    scale: 1,
    borderColor: "rgba(255,255,255,0.12)",
    opacity: 1,
    boxShadow: "0 0 0 0px rgba(30,190,105,0)",
    transition: { duration: 0.6, ease: EASE },
  },
};

const innerRingVariants: Variants = {
  idle: { rotate: 0, opacity: 0 },
  connecting: {
    rotate: 360,
    opacity: 0.5,
    transition: { duration: 2, repeat: Infinity, ease: "linear" as Easing },
  },
  listening: {
    rotate: 360,
    opacity: 0.35,
    transition: { duration: 8, repeat: Infinity, ease: "linear" as Easing },
  },
  speaking: {
    rotate: -360,
    opacity: 0.5,
    transition: { duration: 3, repeat: Infinity, ease: "linear" as Easing },
  },
  finished: { rotate: 0, opacity: 0, transition: { duration: 0.4 } },
};

const dotVariants: Variants = {
  idle: { scale: 1, opacity: 0.3 },
  connecting: {
    scale: [1, 1.3, 1] as number[],
    opacity: [0.3, 0.7, 0.3] as number[],
    transition: { duration: 1, repeat: Infinity, ease: EASE },
  },
  listening: {
    scale: [1, 1.15, 1] as number[],
    opacity: [0.8, 1, 0.8] as number[],
    transition: { duration: 1.2, repeat: Infinity, ease: EASE },
  },
  speaking: {
    scale: [1, 1.4, 0.9, 1.2, 1] as number[],
    opacity: 1,
    transition: { duration: 1.6, repeat: Infinity, ease: EASE },
  },
  finished: { scale: 1, opacity: 0.2 },
};

// ─── Waveform bars ─────────────────────────────────────────────────────────────

function WaveformBars({ active }: { active: boolean }) {
  const heights = [0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1, 0.75, 0.45];
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 32 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          style={{
            width: 3,
            height: 32,
            borderRadius: 2,
            backgroundColor: active ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.18)",
            transformOrigin: "center",
          }}
          animate={
            active
              ? {
                  scaleY: [h * 0.5, h, h * 0.3, h * 0.8, h * 0.5],
                  opacity: [0.6, 1, 0.7, 1, 0.6],
                }
              : { scaleY: 0.2, opacity: 0.2 }
          }
          transition={
            active
              ? {
                  duration: 0.8 + i * 0.07,
                  repeat: Infinity,
                  ease: EASE,
                  delay: i * 0.05,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

type Line = { id: number; role: "agent" | "user"; text: string };
let lineId = 0;

function VoiceAgentInner() {
  const [hasStarted, setHasStarted] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  const conversation = useConversation({
    onConnect:    () => { console.log("COSTIQ Agent connected"); setLines([]); },
    onDisconnect: () => console.log("COSTIQ Agent disconnected"),
    onError:      (error: string | Error) => console.error("Agent error:", error),
    onMessage:    (msg: { source: string; message: string }) => {
      setLines(prev => [
        ...prev,
        { id: lineId++, role: (msg.source === "ai" ? "agent" : "user") as "agent" | "user", text: msg.message },
      ].slice(-2)); // keep only last 2 lines
    },
  });

  const { status, isSpeaking } = conversation;
  const visualState = getVisualState(status, isSpeaking);

  const handleStart = useCallback(async () => {
    setHasStarted(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId: AGENT_ID });
    } catch (err) {
      console.error("Could not start session:", err);
      setHasStarted(false);
    }
  }, [conversation]);

  const handleEnd = useCallback(async () => {
    await conversation.endSession();
    setHasStarted(false);
  }, [conversation]);

  const isActive = status === "connected" || status === "connecting";
  const dotColor = visualState === "listening" ? GREEN : "rgba(255,255,255,0.5)";
  const innerBorderColor = visualState === "listening" ? GREEN : "rgba(255,255,255,0.18)";

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      {/* ── Central orb — clickable when idle/finished ────────────── */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: 200,
          height: 200,
          overflow: "hidden",
          borderRadius: "50%",
          cursor: !isActive ? "pointer" : "default",
        }}
        onClick={!isActive ? handleStart : undefined}
        whileHover={!isActive ? { scale: 1.04 } : {}}
        whileTap={!isActive ? { scale: 0.96 } : {}}
        transition={{ duration: 0.18 }}
      >
        {/* Ambient glow — listening only */}
        <AnimatePresence>
          {visualState === "listening" && (
            <motion.div
              key="ambient-glow"
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 240,
                height: 240,
                background:
                  "radial-gradient(circle, rgba(30,190,105,0.1) 0%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full border-[2px]"
          style={{ width: 168, height: 168 }}
          variants={outerRingVariants}
          animate={visualState}
          initial="idle"
        />

        {/* Inner orbiting dashed ring */}
        <motion.div
          className="absolute rounded-full border border-dashed"
          style={{
            width: 128,
            height: 128,
            borderColor: innerBorderColor,
            opacity: 0.4,
          }}
          variants={innerRingVariants}
          animate={visualState}
          initial="idle"
        />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <AnimatePresence mode="wait">
            {/* Idle / finished — show mic icon */}
            {(visualState === "idle" || visualState === "finished" || visualState === "connecting") && (
              <motion.div
                key="mic"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="36" height="36" viewBox="0 0 24 24"
                  fill="none" stroke={visualState === "connecting" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.65)"}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8"  y1="23" x2="16" y2="23" />
                </svg>
              </motion.div>
            )}

            {/* Listening — mic in green */}
            {visualState === "listening" && (
              <motion.div
                key="mic-active"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: [1, 1.12, 1] }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: EASE }}
              >
                <svg
                  width="36" height="36" viewBox="0 0 24 24"
                  fill="none" stroke={GREEN}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8"  y1="23" x2="16" y2="23" />
                </svg>
              </motion.div>
            )}

            {/* Speaking — waveform bars */}
            {visualState === "speaking" && (
              <motion.div
                key="waveform"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.3 }}
              >
                <WaveformBars active />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Status / subtitle — fixed height, never grows the card ─── */}
      {/* Shows the latest transcript line when available, otherwise status */}
      <div style={{
        width: "100%",
        height: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        overflow: "hidden",
        padding: "0 8px",
      }}>
        <AnimatePresence mode="wait">
          {/* Live transcript: show last 1 line (most recent) */}
          {lines.length > 0 ? (
            <motion.p
              key={lines[lines.length - 1].id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: lines[lines.length - 1].role === "agent" ? 0.9 : 0.65 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
              transition={{ duration: 0.25 }}
              style={{
                margin: 0,
                fontFamily: "var(--font-text)",
                fontSize: 13,
                lineHeight: 1.5,
                letterSpacing: "-0.1px",
                color: lines[lines.length - 1].role === "agent" ? "#ffffff" : GREEN,
                textAlign: "center",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }}
            >
              {lines[lines.length - 1].text}
            </motion.p>
          ) : (
            /* Default: status pill */
            <motion.div
              key={visualState}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <motion.span
                className="block rounded-full flex-shrink-0"
                style={{ width: 8, height: 8, backgroundColor: statusColors[visualState] }}
                animate={
                  visualState === "listening"
                    ? { opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ duration: 1.2, repeat: Infinity, ease: EASE }}
              />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: statusColors[visualState], letterSpacing: "0.12em" }}
              >
                {statusLabels[visualState]}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Action button ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3">
        {!isActive ? (
          <motion.button
            onClick={handleStart}
            disabled={hasStarted && visualState === "connecting"}
            className="btn-green disabled:opacity-60 disabled:cursor-wait"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {visualState === "finished" ? "New Consultation" : "Start Consultation"}
          </motion.button>
        ) : (
          <motion.button
            onClick={handleEnd}
            className="btn-outline"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            End Session
          </motion.button>
        )}

        <AnimatePresence>
          {!hasStarted && (
            <motion.p
              className="text-xs text-center"
              style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              Microphone access required
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function VoiceAgent() {
  return (
    <ConversationProvider>
      <VoiceAgentInner />
    </ConversationProvider>
  );
}
