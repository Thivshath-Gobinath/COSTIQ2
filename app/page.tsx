import Image from "next/image";
import ClientVoiceWrapper from "../components/ClientVoiceWrapper";

/* ── Feature card ────────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, body }: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: "28px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      boxShadow: "0 2px 20px rgba(12,30,50,0.07)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "rgba(30,190,105,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <p style={{
        fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
        lineHeight: 1.2, letterSpacing: "-0.02em",
        color: "#0C1E32", margin: 0,
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: "var(--font-text)", fontSize: 14, lineHeight: 1.55,
        letterSpacing: "-0.2px", color: "rgba(12,30,50,0.55)", margin: 0,
      }}>
        {body}
      </p>
    </div>
  );
}

/* ── Stat block ─────────────────────────────────────────────────────────── */
function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 4vw, 2.8rem)",
        fontWeight: 700, lineHeight: 1.07,
        letterSpacing: "-0.03em", color: "#1EBE69", margin: 0,
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: "var(--font-text)", fontSize: 13,
        letterSpacing: "-0.1px", color: "rgba(12,30,50,0.5)", marginTop: 5,
      }}>
        {label}
      </p>
    </div>
  );
}

/* ── How-it-works step ────────────────────────────────────────────────────── */
function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: "rgba(30,190,105,0.12)",
        border: "1.5px solid rgba(30,190,105,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
        color: "#1EBE69",
      }}>
        {n}
      </div>
      <p style={{
        fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700,
        color: "#0C1E32", margin: 0, letterSpacing: "-0.01em",
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: "var(--font-text)", fontSize: 13, lineHeight: 1.55,
        color: "rgba(12,30,50,0.55)", margin: 0, maxWidth: 160,
      }}>
        {desc}
      </p>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HERO — deep navy gradient
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(160deg, #0C1E32 0%, #0a1929 55%, #071220 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 24px 72px",
        position: "relative",
      }}>

        {/* Subtle radial glow — clipped inside its own layer */}
        <div style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}>
          <div style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30,190,105,0.09) 0%, transparent 68%)",
          }} />
        </div>

        {/* ── Logo — SVG, top-left, transparent background ─────────── */}
        {/* Container clips the square SVG to show just the logo content area.
            The SVG is 768×768 with the logo centred; we shift it up to crop
            the internal top/bottom padding and match the current visual ratio. */}
        <div style={{
          position: "relative", zIndex: 1,
          alignSelf: "flex-start",
          paddingBottom: 40,
          width: 150,
          height: 52,
          overflow: "hidden",
        }}>
          <Image
            src="/logo.svg"
            alt="COSTIQ Professionals"
            width={150}
            height={150}
            priority
            style={{
              width: 150,
              height: 150,
              objectFit: "contain",
              marginTop: -36,   /* crop top padding from square SVG */
              display: "block",
            }}
          />
        </div>

        {/* ── Headline ──────────────────────────────────────────────── */}
        <h1 className="display-hero" style={{
          position: "relative", zIndex: 1,
          color: "#fff",
          textAlign: "center",
          maxWidth: 680,
          marginBottom: 12,
        }}>
          Beyond Numbers.{" "}
          <span style={{ color: "#1EBE69" }}>Toward Impact.</span>
        </h1>

        {/* ── Subtitle ──────────────────────────────────────────────── */}
        <p style={{
          position: "relative", zIndex: 1,
          fontFamily: "var(--font-text)",
          fontSize: "clamp(16px, 2vw, 19px)",
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: "-0.02em",
          color: "rgba(255,255,255,0.62)",
          textAlign: "center",
          maxWidth: 480,
          marginBottom: 32,
        }}>
          
        </p>

        {/* ── Voice console ─────────────────────────────────────────── */}
        <div style={{
          position: "relative", zIndex: 1,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 28,
          padding: "32px 40px 36px",
          width: "100%",
          maxWidth: 460,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}>

          {/* Console label */}
          <p style={{
            fontFamily: "var(--font-text)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: 20,
          }}>
            Voice Consultation
          </p>

          <ClientVoiceWrapper />

          <p style={{
            fontFamily: "var(--font-text)",
            fontSize: 11,
            letterSpacing: "-0.08px",
            color: "rgba(255,255,255,0.2)",
            marginTop: 28,
            textAlign: "center",
          }}>
              End-to-end encrypted · Private &amp; confidential
          </p>
        </div>

        {/* Scroll indicator */}
        <p style={{
          position: "relative", zIndex: 1,
          marginTop: 40,
          fontFamily: "var(--font-text)",
          fontSize: 12,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.04em",
        }}>
          ↓ Scroll to explore
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURES — light background
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "#f0f5fa",
        padding: "88px 24px 96px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 56,
      }}>

        {/* Section header */}
        <div style={{ textAlign: "center", maxWidth: 600 }}>
          <p style={{
            fontFamily: "var(--font-text)", fontSize: 13, fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#1EBE69", marginBottom: 14,
          }}>
            Capabilities
          </p>
          <h2 className="display-section" style={{ color: "#0C1E32", marginBottom: 14 }}>
            Everything your advisor knows.
          </h2>
          <p style={{
            fontFamily: "var(--font-text)", fontSize: 17,
            lineHeight: 1.47, letterSpacing: "-0.374px",
            color: "rgba(12,30,50,0.55)",
          }}>
            Trained on NEC3 &amp; NEC4 standards with deep commercial
            management expertise. Ask anything, get expert answers instantly.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 14,
          width: "100%",
          maxWidth: 960,
        }}>
          {[
            {
              title: "NEC3 & NEC4 Contracts",
              body: "Expert interpretation of every clause, option, and secondary option across the full NEC suite.",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1EBE69" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
            },
            {
              title: "Risk Analysis",
              body: "Identify, quantify, and manage commercial risks before they become compensation events.",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1EBE69" strokeWidth="1.8" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
            },
            {
              title: "Payment Mechanisms",
              body: "Navigate compensation events, defined costs, and payment schedules with precision.",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1EBE69" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
            },
            {
              title: "Compliance Guidance",
              body: "Stay aligned with regulatory requirements, contract obligations, and industry best practices.",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1EBE69" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            },
          ].map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px 64px",
          paddingTop: 32,
          borderTop: "1px solid rgba(12,30,50,0.1)",
          width: "100%",
          maxWidth: 700,
        }}>
          <StatBlock value="10,000+" label="Consultations completed" />
          <StatBlock value="98%"     label="Advisor satisfaction" />
          <StatBlock value="< 1s"    label="Avg. response time" />
          <StatBlock value="NEC4"    label="Latest standard" />
        </div>

        {/* How it works */}
        <div style={{ width: "100%", maxWidth: 760, display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
          <h2 className="display-section" style={{ color: "#0C1E32", textAlign: "center" }}>
            How it works.
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 24,
            width: "100%",
          }}>
            <Step n="1" title="Open the app"        desc="No login required. Your advisor is always ready." />
            <Step n="2" title="Click Start Talking"  desc="Allow microphone access in your browser." />
            <Step n="3" title="Ask anything"         desc="Speak naturally about your NEC contract query." />
            <Step n="4" title="Get expert answers"   desc="Instant voice responses with precise guidance." />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA — deep navy
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(160deg, #0a1929 0%, #0C1E32 100%)",
        padding: "88px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 24,
      }}>
        <h2 className="display-section" style={{ color: "#fff", maxWidth: 520 }}>
          Your advisor is ready.
        </h2>
        <p style={{
          fontFamily: "var(--font-text)",
          fontSize: 17,
          lineHeight: 1.47,
          letterSpacing: "-0.374px",
          color: "rgba(255,255,255,0.6)",
          maxWidth: 420,
        }}>
          No appointment. No wait. Just speak and receive expert contract guidance in seconds.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
          <a href="#" className="btn-green">Start Consultation</a>
          <a href="#" className="btn-outline">Learn more</a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer style={{
        background: "#08111f",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "28px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 90, height: 32, overflow: "hidden", opacity: 0.55, flexShrink: 0 }}>
            <Image
              src="/logo.svg"
              alt="COSTIQ"
              width={90}
              height={90}
              style={{ width: 90, height: 90, objectFit: "contain", marginTop: -22, display: "block" }}
            />
          </div>
          <span style={{
            fontFamily: "var(--font-text)", fontSize: 12,
            letterSpacing: "-0.1px", color: "rgba(255,255,255,0.3)",
          }}>
            © {new Date().getFullYear()} COSTIQ Professionals
          </span>
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Security"].map((l) => (
            <a key={l} href="#"
              style={{ fontFamily: "var(--font-text)", fontSize: 12, textDecoration: "none", color: "rgba(255,255,255,0.3)" }}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
