---
title: 'Chore: Refactor DomainSelector into smaller components'
labels: [chore, refactor, component:DomainSelector, epic:component-library]
---

**Description**
The `DomainSelector.tsx` component is currently over 160 lines long and handles multiple responsibilities, including search, custom domain input, displaying selected domains, and rendering the domain list. This makes the component complex and hard to maintain. This ticket is to break it down into smaller, more manageable components.

**Tasks**

- [ ] Create a new `DomainSearchInput.tsx` component to handle the search and custom domain input logic.
- [ ] Create a new `SelectedDomains.tsx` component to display the list of currently selected domains.
- [ ] Create a new `DomainList.tsx` component to render the categories and domain buttons.
- [ ] Update `DomainSelector.tsx` to act as a container component, managing state and composing the new, smaller components.

**Acceptance Criteria**

- [ ] The `DomainSelector` logic is broken down into at least three new, smaller components.
- [ ] The `DomainSelector.tsx` file is significantly smaller and easier to read.
- [ ] The functionality of the domain selection screen remains identical to the user.
