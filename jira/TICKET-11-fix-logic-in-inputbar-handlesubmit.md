---
title: 'Bug: InputBar allows submitting empty messages'
labels: [bug, component:InputBar, epic:component-library]
---

**Description**
In `InputBar.tsx`, the `handleSubmit` function contains a logical flaw in its conditional check: `if (input.trim() || !isLoading)`. This condition incorrectly allows the `onSendMessage` function to be called with an empty string if the input contains only whitespace and the component is not in a loading state.

**Steps to Reproduce**

1. Enter only spaces into the input bar.
2. The submit button is correctly disabled.
3. However, if the `disabled` check on the button were to be bypassed, the `handleSubmit` logic would incorrectly proceed.

**Expected Behavior**
The `handleSubmit` function should strictly check that the trimmed input has content _and_ that the component is not loading.

**Suggested Fix**
Change the conditional logic from `if (input.trim() || !isLoading)` to `if (input.trim() && !isLoading)`.

**Acceptance Criteria**

- [ ] The logic in the `handleSubmit` function in `InputBar.tsx` is corrected to prevent submitting empty or whitespace-only messages.
