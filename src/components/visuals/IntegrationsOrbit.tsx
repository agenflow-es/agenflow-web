"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Logo } from "@/components/ui/primitives";

/**
 * IntegrationsOrbit — "sobre tu stack". Real tool logos orbiting the Agenflow
 * hub (Magic UI OrbitingCircles). Responsive: the orbit radii scale with the
 * container width, so it fills whatever column it sits in. White chips so brand
 * logos read on both themes; guide rings use border tokens. Orbit halts under
 * prefers-reduced-motion (global CSS guard).
 */
type Tool = { src: string; alt: string };

const INNER: Tool[] = [
  { src: "/brands/tools/google-drive.svg", alt: "Google Drive" },
  { src: "/brands/tools/google-gmail.svg", alt: "Gmail" },
  { src: "/brands/tools/microsoft-teams.svg", alt: "Microsoft Teams" },
  { src: "/brands/tools/slack-icon.svg", alt: "Slack" },
];

const OUTER: Tool[] = [
  { src: "/brands/tools/notion.svg", alt: "Notion" },
  { src: "/brands/tools/microsoft-onedrive.svg", alt: "OneDrive" },
  { src: "/brands/tools/hubspot.svg", alt: "HubSpot" },
  { src: "/brands/tools/google-calendar.svg", alt: "Google Calendar" },
  { src: "/brands/tools/dropbox.svg", alt: "Dropbox" },
  { src: "/brands/tools/stripe.svg", alt: "Stripe" },
];

function Chip({ src, alt }: Tool) {
  return (
    <div className="flex size-full items-center justify-center rounded-full border border-border bg-white shadow-[0_8px_22px_-10px_rgba(0,0,0,0.45)]">
      <Image
        src={src}
        alt={alt}
        width={24}
        height={24}
        unoptimized
        className="size-1/2 object-contain"
      />
    </div>
  );
}

function Ring({ diameter }: { diameter: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border"
      style={{ width: diameter, height: diameter }}
    />
  );
}

export function IntegrationsOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const outer = w * 0.4;
  const inner = w * 0.24;
  const icon = Math.max(38, Math.min(54, w * 0.09));

  return (
    <div
      ref={ref}
      className="relative mx-auto flex aspect-square w-full max-w-[680px] items-center justify-center"
    >
      <Ring diameter={outer * 2} />
      <Ring diameter={inner * 2} />

      {/* centre hub (in-flow so the orbit centres on it) */}
      <div className="relative z-10 flex size-[74px] items-center justify-center rounded-2xl border border-accent/40 bg-[var(--accent-soft)] text-accent shadow-[0_0_0_10px_var(--accent-soft)]">
        <Logo className="h-8 w-8" />
      </div>

      {w > 0 && (
        <>
          <OrbitingCircles radius={inner} iconSize={icon} duration={28} path={false}>
            {INNER.map((t) => (
              <Chip key={t.alt} {...t} />
            ))}
          </OrbitingCircles>
          <OrbitingCircles
            radius={outer}
            iconSize={icon}
            duration={38}
            reverse
            path={false}
          >
            {OUTER.map((t) => (
              <Chip key={t.alt} {...t} />
            ))}
          </OrbitingCircles>
        </>
      )}
    </div>
  );
}
