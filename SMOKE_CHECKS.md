# MemoryCV Smoke Checks

Run before shipping meaningful UI, AI, or export changes.

## Commands

```powershell
npm run typecheck
npm run build
npm run lint
```

## Manual Flow Checks

1. Landing
   - Open `/` on mobile width and desktop width.
   - Toggle language.
   - Open and close the mobile menu.
   - Start CTA routes to onboarding or dashboard correctly.

2. Onboarding
   - Paste a short memory and verify validation appears.
   - Paste a real memory and verify profile extraction starts.
   - With no API key, verify the missing-key message is clear.
   - Complete template selection and create a resume.

3. Editor
   - Open a saved resume.
   - On mobile, verify preview loads only after tapping View Resume.
   - Chat edit, Tailor, Fix Errors, and Cover Letter should show clear errors if AI is unavailable.
   - Export standard PDF, print PDF, and DOCX.

4. Dashboard
   - Open sidebar on mobile and close it by tapping outside.
   - Create, update, and delete a Job Tracker item.
   - Verify Settings language and API key fields persist.

5. RTL
   - Switch to Kurdish.
   - Verify dashboard, onboarding, editor preview, and Job Tracker do not horizontally scroll.
