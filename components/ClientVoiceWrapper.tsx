"use client";

import dynamic from "next/dynamic";

const VoiceAgent = dynamic(() => import("./VoiceAgent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center" style={{ height: 420 }}>
      <div
        className="rounded-full border-[2px]"
        style={{ width: 240, height: 240, borderColor: "#0C1E32", opacity: 0.2 }}
      />
    </div>
  ),
});

export default function ClientVoiceWrapper() {
  return <VoiceAgent />;
}
