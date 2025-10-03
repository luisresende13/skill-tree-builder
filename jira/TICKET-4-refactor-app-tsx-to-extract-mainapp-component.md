---
title: 'Chore: Refactor App.tsx to extract MainApp component'
labels: [chore, refactor, epic:core-frontend-setup]
---

**Description**
The `App.tsx` file currently contains both the main `App` component (which handles domain selection) and the `MainApp` component (which renders the main application layout). This makes the file larger than necessary and mixes concerns.

**Tasks**

- [ ] Create a new file `components/MainApp.tsx`.
- [ ] Move the `MainApp` component logic from `App.tsx` to the new file.
- [ ] Update `App.tsx` to import and use the new `MainApp` component.
- [ ] Ensure all props are passed correctly and the application functions as before.

**Acceptance Criteria**

- [ ] The `MainApp` component is in its own file at `components/MainApp.tsx`.
- [ ] The `App.tsx` file is simplified and only contains the logic for the initial domain selection.
- [ ] The application's functionality remains unchanged after the refactor.
