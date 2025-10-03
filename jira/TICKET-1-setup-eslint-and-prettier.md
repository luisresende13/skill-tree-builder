---
title: "Chore: Set up ESLint and Prettier for code quality"
labels: [chore, project-health, epic:project-health-dx]
---

**Description**
The project currently lacks automated tools for code linting and formatting. This leads to inconsistent code styles and makes it harder to catch common errors early. This ticket involves setting up ESLint for linting and Prettier for code formatting.

**Tasks**
- [ ] Install ESLint, Prettier, and their required plugins for React and TypeScript.
- [ ] Create configuration files (`.eslintrc.cjs`, `.prettierrc`).
- [ ] Add `lint` and `format` scripts to `package.json`.
- [ ] Integrate Prettier with ESLint to avoid conflicts.
- [ ] Run the formatter on the entire codebase to establish a baseline.

**Acceptance Criteria**
- [ ] The `npm run lint` command successfully lints the codebase and reports errors.
- [ ] The `npm run format` command successfully formats all relevant files (`.ts`, `.tsx`).
- [ ] The codebase adheres to the new linting and formatting rules.