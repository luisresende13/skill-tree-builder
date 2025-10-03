# Prioritized Project Backlog

This document outlines the recommended implementation order for the generated tickets. The priority is based on a critical review aimed at maximizing stability and reducing risk before undertaking large-scale refactoring.

## Phase 1: Stabilize the Core Application

First, we must ensure the application is stable and has a safety net for future changes.

1.  **[High] Fortify the API Service**
    -   **Ticket:** [TICKET-13: Improve error handling and validation in geminiService](TICKET-13-improve-error-handling-and-validation-in-gemini-service.md)
    -   **Reasoning:** The API integration is the most critical and fragile part of the application. Hardening it first provides the greatest immediate impact on stability.

2.  **[High] Establish a Testing Safety Net**
    -   **Ticket:** [TICKET-2: Set up Vitest for unit and component testing](TICKET-2-setup-vitest-for-unit-testing.md)
    -   **Reasoning:** Major refactors are planned. A testing framework is essential to prevent regressions and validate the success of these changes. This must be in place before any significant code is altered.

## Phase 2: Code Quality and Architectural Improvements

With a stable and testable foundation, we can now focus on improving the codebase's structure and quality.

3.  **[Medium] Implement Code Quality Tooling**
    -   **Ticket:** [TICKET-1: Set up ESLint and Prettier for code quality](TICKET-1-setup-eslint-and-prettier.md)
    -   **Reasoning:** Enforces a consistent code style, which is crucial for the upcoming refactoring work and long-term maintainability.

4.  **[Medium] Refactor State Management**
    -   **Ticket:** [TICKET-12: Refactor useSkillTree hook to use a state management library](TICKET-12-refactor-useskilltree-hook-to-use-zustand.md)
    -   **Reasoning:** This is the most significant architectural refactor. It will simplify the core logic, but should only be attempted with the testing framework in place.

## Phase 3: Component-Level Refactoring and Fixes

These tickets address issues within specific components and can be tackled once the core architecture is sound.

5.  **[Low] Refactor DomainSelector**
    -   **Ticket:** [TICKET-9: Refactor DomainSelector into smaller components](TICKET-9-refactor-domainselector-into-smaller-components.md)

6.  **[Low] Fix InputBar Logic**
    -   **Ticket:** [TICKET-11: Fix logic in InputBar handleSubmit](TICKET-11-fix-logic-in-inputbar-handlesubmit.md)

## Phase 4: Documentation and Minor Improvements

These tickets are important for long-term health but are the lowest priority for immediate implementation.

7.  **[Low] Improve Project Documentation**
    -   **Ticket:** [TICKET-3: Improve project documentation in README.md](TICKET-3-improve-project-documentation.md)
8.  **[Low] Add JSDoc to Components**
    -   **Tickets:** [TICKET-7](TICKET-7-add-jsdoc-documentation-to-chatmessage-component.md), [TICKET-8](TICKET-8-add-jsdoc-documentation-to-checklist-component.md)
9.  **[Low] Minor Refactors**
    -   **Tickets:** [TICKET-4](TICKET-4-refactor-app-tsx-to-extract-mainapp-component.md), [TICKET-5](TICKET-5-move-response-schema-to-gemini-service.md), [TICKET-6](TICKET-6-move-system-prompt-to-gemini-service.md), [TICKET-10](TICKET-10-extract-inline-svg-from-header-to-icon-component.md)