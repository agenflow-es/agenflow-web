"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * TextReveal — the line pins in the viewport (sticky) and its words fade from
 * faint to solid as you scroll THROUGH a tall container, so the scroll effectively
 * "pauses" until the whole sentence has revealed. Supports line breaks via "\n".
 * Pure motion/react. Honours prefers-reduced-motion: static, no tall container.
 */
function Word({
  children,
  progress,
  start,
  end,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  // Explicit 4-stop map: faint until its turn (start), ramp to solid (end), and
  // then HELD solid all the way to the end of the scroll (1) — the word never
  // fades back out once revealed.
  const opacity = useTransform(
    progress,
    [0, start, end, 1],
    [0.12, 0.12, 1, 1],
  );
  return (
    <motion.span style={{ opacity }}>
      {children}
      {" "}
    </motion.span>
  );
}

export function TextReveal({
  text,
  className,
  containerClassName,
}: {
  /** use "\n" to force a line break */
  text: string;
  className?: string;
  containerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lines = text.split("\n");

  if (reduce) {
    return (
      <p className={className}>
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }

  const total = lines.reduce((n, l) => n + l.split(" ").length, 0);
  // Finish revealing well before the end of the scroll (COMPLETE), so from there
  // to the end the whole sentence stays fully visible (held) while still pinned —
  // instead of the last word landing just as the section scrolls away.
  const COMPLETE = 0.55;
  let idx = 0;

  return (
    <div ref={ref} className={cn("relative h-[110vh]", containerClassName)}>
      <div className="sticky top-0 flex h-[85vh] items-center justify-center">
        <p className={className}>
          {lines.map((line, li) => (
            <span key={li}>
              {line.split(" ").map((word) => {
                const i = idx++;
                const start = (i / total) * COMPLETE;
                const end = ((i + 1) / total) * COMPLETE;
                return (
                  <Word
                    key={i}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                  >
                    {word}
                  </Word>
                );
              })}
              {li < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
