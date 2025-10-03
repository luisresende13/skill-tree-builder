---
title: 'Chore: Move RESPONSE_SCHEMA constant to geminiService.ts'
labels: [chore, refactor, epic:core-frontend-setup, service:gemini]
---

**Description**
The `constants.ts` file currently holds the `RESPONSE_SCHEMA` object, which defines the expected JSON structure from the Gemini API. This schema is only used by `geminiService.ts`. To improve code organization and cohesion, the schema should be moved to the file where it is used.

**Tasks**

- [ ] Cut the `RESPONSE_SCHEMA` object from `constants.ts`.
- [ ] Paste the `RESPONSE_SCHEMA` object into `services/geminiService.ts`.
- [ ] Update `geminiService.ts` to use the locally defined schema instead of importing it.
- [ ] Ensure the application continues to function correctly after the change.

**Acceptance Criteria**

- [ ] The `RESPONSE_SCHEMA` is defined inside `services/geminiService.ts`.
- [ ] The `constants.ts` file no longer contains the `RESPONSE_SCHEMA`.
- [ ] The skill tree generation logic works as expected.
