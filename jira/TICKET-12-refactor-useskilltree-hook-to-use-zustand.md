---
title: 'Chore: Refactor useSkillTree hook to use a state management library'
labels:
  [chore, refactor, tech-debt, hook:useSkillTree, epic:state-management-hooks]
---

**Description**
The `useSkillTree` hook is responsible for managing the entire state of the skill tree, including the tree structure, known skills, learning skills, and loading states. It currently uses multiple `useState` hooks, which can become difficult to manage as the application grows. This ticket proposes refactoring the state logic into a centralized store using a library like Zustand.

**Tasks**

- [ ] Install Zustand (`npm install zustand`).
- [ ] Create a new `store/skillTreeStore.ts` file to define the state and actions.
- [ ] Move all state management logic from `useSkillTree.ts` into the new Zustand store.
- [ ] Refactor the `useSkillTree` hook to be a simpler hook that connects to the Zustand store and exposes the state and actions.
- [ ] Update all components that use the hook to ensure they still function correctly.

**Acceptance Criteria**

- [ ] The state logic from `useSkillTree` is successfully migrated to a Zustand store.
- [ ] The `useSkillTree` hook is simplified and reads from the store.
- [ ] The application's skill tree functionality works exactly as it did before the refactor.
- [ ] The state is more decoupled and easier to test and maintain.
