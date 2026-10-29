"use client";

import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";

/**
 * App-wide motion setup:
 * - Lenis gives inertial, buttery scrolling (and smooth #anchor jumps) while
 *   still driving native scroll, so motion's scroll-linked effects stay in sync.
 * - MotionConfig respects the visitor's "reduce motion" OS setting.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        anchors: { offset: -80 },
        // Let native scrolling handle anything inside the full-screen menu.
        prevent: (node) => node.closest?.("#site-menu") != null,
      }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
