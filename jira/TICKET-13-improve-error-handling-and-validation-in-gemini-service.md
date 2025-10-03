---
title: 'Chore: Improve error handling and validation in geminiService'
labels: [chore, refactor, service:gemini, epic:api-integration-services]
---

**Description**
The `geminiService.ts` file is critical for the application's functionality, but its error handling and response validation could be more robust. This ticket covers three key improvements: better API key validation, more specific error propagation, and stricter response schema validation.

**Tasks**

- [x] **API Key Check**: Update the initial API key check to throw a more user-friendly error message that instructs the user to create a `.env` file and set the `API_KEY`.
- [x] **Specific Error Handling**: Modify the `catch` block to re-throw more specific errors (e.g., `ApiError`, `ValidationError`) instead of a generic one. This will allow the UI to display more context-aware error messages.
- [x] **Schema Validation**: Introduce a validation library like Zod to strictly validate the structure of the JSON response from the Gemini API. This is more reliable than the current manual property checks.

**Acceptance Criteria**

- [x] The application provides a clear, actionable error message if the `API_KEY` is not set.
- [x] The `getNextSkills` function throws specific errors that can be caught and handled by the calling code.
- [x] The API response is rigorously validated against a schema, and an error is thrown if the validation fails.
