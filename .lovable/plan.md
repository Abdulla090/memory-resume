
# MemoryCV — MVP Build Plan

A premium AI resume builder that turns an AI memory export (ChatGPT/Claude/Gemini) into tailored resumes for any career path — adapted for this stack.

## Stack adaptations
- **Framework**: TanStack Start (not Next.js) with file-based routing in `src/routes/`
- **AI**: Lovable AI Gateway (default model: `google/gemini-3-flash-preview`, swappable). No Anthropic key needed.
- **No auth**: Profile + resumes stored in `localStorage` (Zustand for state)
- **PDF**: `@react-pdf/renderer` for pixel-accurate, selectable-text exports
- **Animations**: Framer Motion
- **Design tokens**: Indigo/violet accent, near-black surfaces, Clash Display + DM Sans via Google Fonts equivalents (Space Grotesk + DM Sans)

## Pages & routes
1. **`/`** — Landing: hero, rotating resume previews, "Works with ChatGPT/Claude/Gemini" logos, dark editorial aesthetic, staggered Framer reveals
2. **`/onboarding`** — 4-step flow: pick AI source → paste memory (with "Try sample memory" dropdown for 3 personas: Engineer/Designer/PM) → cinematic AI extraction loader → editable profile preview
3. **`/dashboard`** — 3 tabs:
   - **Quick Generate**: job title or JD input + style picker → streaming live resume build
   - **Career Explorer**: 6 AI-suggested career paths with match %, salary, gaps
   - **My Resumes**: grid of saved resumes
4. **`/resume/$id`** — Split editor + live preview, AI bullet improver toolbar, template switcher, "Tailor to Job" button, PDF export
5. **`/templates`** — Showcase of 2 templates (Minimal, Executive) populated with user data

## Backend (server functions via `createServerFn`)
- `parseMemory` — extracts structured profile JSON from raw memory
- `generateResume` — generates tailored resume JSON for a job target (streaming via server route)
- `improveBullet` — rewrites a single bullet
- `suggestCareerPaths` — returns 6 career paths with match scores
- `tailorToJob` — rewrites existing resume against a JD

All call Lovable AI Gateway with the prompts from your spec. Errors (429/402) surfaced as toasts.

## State & storage
- Zustand store persisted to `localStorage`: `profile`, `resumes[]`, `preferences`
- Each resume has `id`, `title`, `jobTarget`, `template`, `data`, `createdAt`

## Templates (MVP: 2)
- **Minimal** — ultra-clean sans-serif, single column
- **Executive** — serif headers, two-column with sidebar

Both rendered as React components for preview AND as `@react-pdf/renderer` documents for export (shared data model).

## Demo polish
- Sample memories one-click loadable on onboarding
- Cinematic "Reading your story…" loader with rotating phrases
- Typewriter streaming on generated resume
- Toast feedback on every action
- Skeleton shimmers (no spinners)

## Out of scope (v2)
3 extra templates (Noir/Terminal/Atlas), DOCX export, LinkedIn import, cover letters, ATS scoring, collaboration, auth.

After approval I'll enable Lovable AI Gateway, scaffold routes, build landing → onboarding → dashboard → editor → PDF export in that order.
