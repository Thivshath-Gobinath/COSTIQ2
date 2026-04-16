// Teach TypeScript about the ElevenLabs custom HTML element
import type { HTMLAttributes, DetailedHTMLProps } from "react";

type ElevenLabsConvaiProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  "agent-id"?: string;
};

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "elevenlabs-convai": ElevenLabsConvaiProps;
      }
    }
  }
}
