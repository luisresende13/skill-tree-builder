---
title: 'Chore: Move SYSTEM_PROMPT constant to geminiService.ts'
labels: [chore, refactor, epic:core-frontend-setup, service:gemini]
---

**Description**
The `constants.ts` file currently holds the `SYSTEM_PROMPT` string, which is the instructional prompt for the Gemini API. This prompt is only used by `geminiService.ts`. To improve code organization and cohesion, the prompt should be moved to the file where it is used.

**Tasks**

- [ ] Cut the `SYSTEM_PROMPT` constant from `constants.ts`.
- [ ] Paste the `SYSTEM_PROMPT` constant into `services/geminiService.ts`.
- [ ] Update `geminiService.ts` to use the locally defined prompt instead of importing it.
- [ ] Ensure the application continues to function correctly after the change.

**Acceptance Criteria**

- [ ] The `SYSTEM_PROMPT` is defined inside `services/geminiService.ts`.
- [ ] The `constants.ts` file no longer contains the `SYSTEM_PROMPT`.
- [ ] The skill tree generation logic works as expected.
