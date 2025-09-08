"use client";

// Overlay ánh sáng vàng (đi kèm class .bulb-on/.bulb-off trên <html>)
export default function LightOverlay() {
  return <div id="light-overlay" className="pointer-events-none fixed inset-0 z-40" />;
}

