<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Geek Room — AI Agent Operating Contract

**Version:** 1.0 | **Established:** 2026-10-25 | **Maintained by:** Web Development Lead

This file governs the behavior of every AI coding agent that works on this project. All agents must read and follow these rules before making any changes.

---

## 1. READ BEFORE YOU ACT

At the start of every session, read these files in order:

1. `AGENTS.md` (this file)
2. `README.md`
3. `docs/PROJECT_MAP.md`
4. `docs/IMPLEMENTATION_LOG.md`
5. `docs/NEXT_STEPS.md`
6. Relevant sections of `docs/DESIGN_SYSTEM.md`, `docs/DECISIONS.md`, `docs/CONTENT_STATUS.md`

Inspect the relevant source files. Check the current Git state. Determine what is already implemented before proposing or making changes.

**Do not assume a feature exists because it is documented as planned.** Verify by reading the actual code.

---

## 2. PRESERVE THE PRODUCT VISION

Geek Room is a premium, distinctive technology society website. It must communicate curiosity, belonging, and creation. It is not a generic college club template.

Every change must be consistent with the product vision in `README.md` and the design principles in `docs/DESIGN_SYSTEM.md`. If a change conflicts with the vision, flag it before implementing.

---

## 3. INSPECT BEFORE EDITING

Before modifying any file:

- Read the entire file first.
- Understand the existing structure and intent.
- Preserve all existing comments, docstrings, and documentation that are not directly related to your change.
- Do not rewrite or restructure files unrelated to the current task.

---

## 4. PLAN BEFORE IMPLEMENTING

For any change beyond trivial edits:

1. Identify the smallest coherent change that satisfies the request.
2. Identify which files will be created, modified, or deleted.
3. Identify dependencies and side effects.
4. Implement the change.
5. Validate the result.
6. Update documentation.

Do not implement multiple unrelated features in a single session without explicit approval.

---

## 5. AVOID UNNECESSARY REWRITES

Do not rewrite existing, working code unless:
- It directly causes a bug or type error.
- The current implementation contradicts an explicit user instruction.
- A documented architectural decision requires it.

Prefer incremental changes over full rewrites.

---

## 6. REUSE EXISTING COMPONENTS AND UTILITIES

Before creating a new component, type, utility, or hook:
- Check `components/` for existing UI primitives.
- Check `lib/types/index.ts` for existing types.
- Check `lib/data/` for existing data utilities.
- Check `lib/hooks/` and `lib/utils/` for existing logic.

Do not duplicate logic that already exists.

---

## 7. MAINTAIN DESIGN CONSISTENCY

All visual work must follow `docs/DESIGN_SYSTEM.md`:

- Use CSS custom properties from `app/globals.css` — **never** hardcode color values.
- Use the established type scale (`text-display`, `text-headline`, `text-title`).
- Use the `container-gr` and `section-padding` layout utilities.
- Follow the animation timing conventions.
- Respect `prefers-reduced-motion` in every animated component.

Do not introduce new visual styles or animation patterns without documenting them in `docs/DESIGN_SYSTEM.md`.

---

## 8. NO FABRICATED DATA

Under no circumstances may you:

- Invent team member names, bios, or social links.
- Fabricate event dates, venues, or registration links.
- Create fake project contributors or GitHub URLs.
- Invent achievement results or competition rankings.
- Insert testimonials or quotes attributed to real people without verification.

All placeholder content must be clearly labeled with `// PLACEHOLDER` comments and listed in `docs/CONTENT_STATUS.md`.

---

## 9. KEEP DEPENDENCIES MINIMAL

Before installing a new dependency:
- Verify it is necessary for the current task.
- Check that it is compatible with the installed versions of Next.js, React, and TypeScript.
- Check that it is actively maintained.
- Record the decision in `docs/DECISIONS.md`.

Heavy libraries (GSAP, Three.js, React Three Fiber) are planned for specific milestones. **Do not install them ahead of schedule** unless a Milestone 1+ task explicitly requires them.

---

## 10. NO INSECURE CODE

- Do not create arbitrary code execution features.
- Do not expose API keys, secrets, or tokens in client-side code.
- Do not store sensitive information in `localStorage` or `sessionStorage`.
- Do not use `dangerouslySetInnerHTML` on user-controlled content without sanitization.
- Treat all form submission endpoints as external integrations that must be explicitly configured and verified.
- Do not commit `.env.local` or any file containing credentials.

---

## 11. PRESERVE RESPONSIVE DESIGN AND ACCESSIBILITY

Every component must work on mobile, tablet, and desktop.

Every interactive element must:
- Be keyboard-accessible.
- Have appropriate ARIA labels.
- Have visible focus indicators.
- Have sufficient color contrast.
- Provide appropriate `alt` text for images.
- Respect `prefers-reduced-motion`.

Do not implement touch-hostile interactions (hover-only features, tiny tap targets).

---

## 12. TEST BEFORE CLAIMING COMPLETION

A task is not complete because code has been generated. It is complete when:

1. The implementation matches the agreed scope.
2. Relevant type checks have passed: `npx tsc --noEmit`
3. Linting has passed: `npm run lint`
4. The application builds without errors: `npm run build` (when the task affects application code)
5. Navigation and interactions have been manually verified or clearly noted as requiring manual verification.
6. Responsive and accessibility implications have been considered.
7. All known failures are disclosed.

**Never claim a command passed unless you ran it and inspected the output.**

---

## 13. UPDATE DOCUMENTATION AFTER EVERY TASK

After every meaningful implementation:

1. Append a new entry to `docs/IMPLEMENTATION_LOG.md`. **Never overwrite history.**
2. Update `docs/NEXT_STEPS.md` to reflect the real current state.
3. Update `docs/PROJECT_MAP.md` if routes, components, or data relationships changed.
4. Update `README.md` if installation, commands, or the folder structure changed.
5. Update `docs/DESIGN_SYSTEM.md` if new visual conventions were introduced.
6. Update `docs/DECISIONS.md` if a significant architectural decision was made.
7. Update `docs/CONTENT_STATUS.md` if placeholder items were resolved or added.

Do not update documentation that was not affected by the change.

---

## 14. HONEST REPORTING

At the end of every session, report:

- What was implemented (only what is actually done).
- What was tested and what the results were.
- Any known bugs or limitations.
- What remains unimplemented.
- The recommended next step.

Do not present intended work as completed work. Do not omit known failures.

---

## 15. GIT AND CHANGE MANAGEMENT

- Inspect the current branch and working tree before editing.
- Preserve unrelated user changes.
- Do not reset, force-push, or discard work without explicit approval.
- Do not create commits unless explicitly requested by the user.
- Keep changes focused on the current task.

---

## 16. ASK BEFORE DESTRUCTIVE ACTIONS

Before performing any of the following, confirm with the user:

- Deleting files or directories.
- Resetting or reverting Git history.
- Large-scale architectural changes (restructuring the whole app).
- Removing or replacing a working feature.
- Changes that affect multiple pages or shared components in unpredictable ways.

---

## 17. IF DOCUMENTATION CONFLICTS WITH CODE

If this file or any documentation contradicts what the actual code does:

1. Read the code. The code is the ground truth.
2. Reconcile the documentation to match the code before proceeding.
3. Record the discrepancy and resolution in `docs/IMPLEMENTATION_LOG.md`.

---

## 18. CONTENT DATA LIVES IN lib/data/

All site content — teams, events, projects, achievements, social links, navigation — must be stored in `lib/data/`. Page components read from data files; they do not contain hardcoded content.

When adding new content types, add the TypeScript type to `lib/types/index.ts` first.

---

## SUMMARY

| Rule | Keyword |
|---|---|
| Read docs first | Read |
| Preserve the vision | Vision |
| Inspect before editing | Inspect |
| Plan before implementing | Plan |
| Avoid rewrites | Minimal |
| Reuse existing code | Reuse |
| Follow design system | Design |
| No fabricated data | Authentic |
| Minimal dependencies | Lean |
| Secure code | Secure |
| Accessible and responsive | Accessible |
| Test before claiming done | Verify |
| Update docs after every task | Document |
| Honest reporting | Honest |
| Safe Git practices | Git |
| Ask before destructive actions | Confirm |
| Code wins over docs | Truth |
| Content in lib/data/ | Data |
