"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";

// WebGL only runs in the browser; load it after hydration so it never blocks first paint.
const HelixField = dynamic(() => import("@/components/three/helix-field"), { ssr: false });

/** If WebGL is unavailable or the scene fails, drop the decoration rather than the page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Fixed 3D layer that sits behind every section of the page. */
export function SceneBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-90 max-md:opacity-50">
      <SceneBoundary>
        <HelixField />
      </SceneBoundary>
    </div>
  );
}
