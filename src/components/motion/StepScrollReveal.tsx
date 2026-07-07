"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/ui/primitives";

/**
 * StepScrollReveal — a scroll-pinned reveal chain. Slide 0 is the section title
 * ("Cómo trabajamos") shown big in accent; as you scroll it gives way to each
 * step, one at a time (fade + slide), with a progress bar per step. The title is
 * the zeroth link of the chain. Falls back to a static list under
 * prefers-reduced-motion.
 */
export type Step = { n: string; title: string; desc: string };

const SLIDE = "absolute inset-0 flex flex-col items-center justify-center text-center";

function Slide({
  index,
  count,
  progress,
  children,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const seg = 1 / count;
  const start = index * seg;
  const end = (index + 1) * seg;
  const f = seg * 0.3;
  const isFirst = index === 0;
  const isLast = index === count - 1;

  // Full-range keyframes ([0..1] covered explicitly) so each slide is forced to
  // opacity 0 outside its own window — no reliance on clamp/extrapolation, so a
  // slide (e.g. the title) can never bleed back in during later steps.
  const inRange = isFirst
    ? [0, end - f, end, 1]
    : isLast
      ? [0, start, start + f, 1]
      : [0, start, start + f, end - f, end, 1];
  const opacityOut = isFirst
    ? [1, 1, 0, 0]
    : isLast
      ? [0, 0, 1, 1]
      : [0, 0, 1, 1, 0, 0];
  const yOut = isFirst
    ? [0, 0, -44, -44]
    : isLast
      ? [44, 44, 0, 0]
      : [44, 44, 0, 0, -44, -44];

  const opacity = useTransform(progress, inRange, opacityOut);
  const y = useTransform(progress, inRange, yOut);

  return (
    <motion.div style={{ opacity, y }} className={SLIDE}>
      {children}
    </motion.div>
  );
}

function ProgressBar({
  slide,
  count,
  progress,
}: {
  slide: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / count;
  const scaleX = useTransform(progress, [slide * seg, (slide + 1) * seg], [0, 1]);
  return (
    <div className="h-1 w-9 overflow-hidden rounded-full bg-border sm:w-12">
      <motion.div style={{ scaleX }} className="h-full origin-left bg-accent" />
    </div>
  );
}

export function StepScrollReveal({
  title,
  intro,
  steps,
}: {
  title: string;
  intro?: string;
  steps: Step[];
}) {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = steps.length; // shown as "0X / 0N"
  const count = steps.length + 1; // + the title slide (index 0)

  // Static fallback: title + plain list, no pinning/scroll-jacking.
  if (rm) {
    return (
      <section className="border-y border-border bg-surface py-[clamp(64px,10vw,120px)]">
        <Container>
          <h2 className="font-display text-[clamp(28px,4.4vw,48px)] font-semibold tracking-[-0.02em] text-accent">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted">
              {intro}
            </p>
          )}
          <div className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-border pt-6">
                <span className="font-label text-[13px] tracking-[0.14em] text-accent">
                  {s.n}
                </span>
                <h3 className="mt-2 font-display text-[21px] font-semibold text-fg">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative border-y border-border bg-surface"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center">
        <Container>
          <div className="mx-auto max-w-[820px]">
            <div className="relative h-[340px]">
              {/* Slide 0 — the title, as the zeroth link */}
              <Slide index={0} count={count} progress={scrollYProgress}>
                <h2 className="max-w-[16ch] font-display text-[clamp(32px,6vw,60px)] font-semibold leading-[1.05] tracking-[-0.025em] text-accent">
                  {title}
                </h2>
                {intro && (
                  <p className="mx-auto mt-6 max-w-[46ch] text-[clamp(15px,1.9vw,18px)] leading-relaxed text-fg-muted">
                    {intro}
                  </p>
                )}
              </Slide>

              {/* Slides 1..N — the steps */}
              {steps.map((s, i) => (
                <Slide
                  key={s.n}
                  index={i + 1}
                  count={count}
                  progress={scrollYProgress}
                >
                  <span className="font-label text-[13px] tracking-[0.2em] text-accent">
                    {s.n} / 0{total}
                  </span>
                  <h3 className="mt-6 max-w-[18ch] font-display text-[clamp(26px,4.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-[46ch] text-[clamp(15px,1.9vw,18px)] leading-relaxed text-fg-muted">
                    {s.desc}
                  </p>
                </Slide>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {steps.map((s, i) => (
                <ProgressBar
                  key={s.n}
                  slide={i + 1}
                  count={count}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
