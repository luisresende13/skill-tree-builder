---
title: 'Chore: Set up Vitest for unit and component testing'
labels: [chore, project-health, testing, epic:project-health-dx]
---

**Description**
The project has no testing framework, which makes it risky to refactor code or add new features. This ticket is to set up Vitest and React Testing Library to enable unit and component testing.

**Tasks**

- [x] Install Vitest, jsdom, and React Testing Library.
- [x] Configure Vite (`vite.config.ts`) to work with Vitest.
- [x] Create a `setupTests.ts` file for any global test setup.
- [x] Add a `test` script to `package.json`.
- [x] Write a simple example test for a component (e.g., `Header.tsx`) to ensure the setup is working.

**Acceptance Criteria**

- [x] The `npm run test` command runs successfully.
- [x] A sample component test passes.
- [x] The testing environment is configured and ready for writing further tests.
