import React from "react";

type GlowProps = {
  rgb?: string; // e.g. "255, 208, 77" (warm yellow)
  x?: string; // e.g. "50%", "320px"
  y?: string; // e.g. "40%", "120px"
  radius?: number; // px
  centerAlpha?: number; // 0..1
  midAlpha?: number; // 0..1
  edgeAlpha?: number; // 0..1
  blur?: number; // px
  blend?: "normal" | "screen" | "lighten";
  className?: string;
  style?: React.CSSProperties;
};

export function Glow({
  rgb = "255, 208, 77",
  x = "50%",
  y = "40%",
  radius = 320,
  centerAlpha = 0.9,
  midAlpha = 0.35,
  edgeAlpha = 0.0,
  blur = 24,
  blend = "screen",
  className = "",
  style,
}: GlowProps) {
  const bg = `radial-gradient(circle at ${x} ${y}, rgba(${rgb}, ${centerAlpha}) 0px, rgba(${rgb}, ${midAlpha}) ${Math.round(
    radius * 0.5,
  )}px, rgba(${rgb}, ${edgeAlpha}) ${radius}px)`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: bg,
        filter: `blur(${blur}px) saturate(1.08)`,
        mixBlendMode: blend,
        willChange: "opacity, transform",
        transform: "translateZ(0)",
        transition: "opacity 200ms ease-out",
        ...style,
      }}
    />
  );
}

