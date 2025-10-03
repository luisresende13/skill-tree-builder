---
title: "Chore: Extract inline SVG from Header to a new Icon component"
labels: [chore, refactor, component:Header, epic:component-library]
---

**Description**
The `Header.tsx` component currently includes a hardcoded inline SVG for the map pin logo. To maintain consistency with the rest of the codebase, where icons are stored as separate components in `components/icons/`, this SVG should be extracted.

**Tasks**
- [ ] Create a new file `components/icons/MapPinIcon.tsx`.
- [ ] Move the SVG code from `Header.tsx` into the new `MapPinIcon.tsx` component.
- [ ] Update `Header.tsx` to import and use the new `MapPinIcon` component.
- [ ] Ensure the icon still renders correctly in the header.

**Acceptance Criteria**
- [ ] The inline SVG is removed from `Header.tsx`.
- [ ] A new `MapPinIcon.tsx` component exists in the `components/icons/` directory.
- [ ] The `Header` component uses the new icon component and appears visually unchanged.