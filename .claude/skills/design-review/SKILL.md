---
name: design-review
description: Visual verification pipeline — screenshot a running dev server, then review it against the brand system. Manual only.
disable-model-invocation: true
argument-hint: "[port] [routes...]"
---

Run a full visual-verification pass on a change, the reusable version of the before/after comparison workflow used during the 2026-07-03 hero redesign.

## Steps

1. **Resolve inputs.** Port defaults to `4000` (this repo's pinned dev port, `.claude/launch.json`). Routes default to `/es` (home) if none given in `$ARGUMENTS`. Confirm a dev server is actually reachable at that port before proceeding — if not, start one (`npm run dev -- -p <port>`) and wait for it to be ready.

2. **Capture.** Use the `Agent` tool to spawn the `screenshot-verifier` subagent with the resolved base URL and routes. Wait for it to return the list of saved screenshot paths.

3. **Review.** Use the `Agent` tool to spawn the `design-reviewer` subagent, passing it the screenshot file paths from step 2 (it can `Read` image files directly) plus the list of changed source files if known (e.g. from `git diff --stat`). Ask it to check both against the brand docs and against the specific generic-AI-SaaS failure mode it's briefed on.

4. **Summarize.** Report a pass/fail verdict per route/theme with the specific issues `design-reviewer` raised, not just its raw output. If it's clean, say so plainly — don't manufacture findings.

If comparing two versions (before/after, or two branches/worktrees), run steps 1–2 once per version against its own port, then pass both screenshot sets to `design-reviewer` in step 3 for a side-by-side verdict.
