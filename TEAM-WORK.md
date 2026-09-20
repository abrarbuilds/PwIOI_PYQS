# Two-Person Execution Guide

Use two roles: **Frontend Owner** and **Backend Owner**. Both people read the planning documents, but each person owns their assigned folders and responsibilities.

## Ownership

| Area | Frontend Owner | Backend Owner |
| --- | --- | --- |
| Main folder | `frontend/` | `backend/` |
| Primary stack | React, Vite, TypeScript | Spring Boot, Java, PostgreSQL |
| UI | Pages, components, responsive design, client-side validation | Supplies data/contracts required by each screen |
| API | Typed API client, loading/error states, integration | REST endpoints, validation, authorization, error responses |
| Database | Uses API response types only | Entities, migrations, repositories, services |
| Authentication | Forms, route guards, logged-in UI state | Sessions, passwords, Google OAuth, roles, ownership checks |
| Testing | Component and user-flow tests | Unit, integration, database, and security tests |

## Shared rules

- Treat [docs/API.md](./docs/API.md) as the contract. Change it before changing an endpoint or response shape.
- The backend never returns answer keys or explanations during an active test attempt.
- The frontend never calculates final authoritative marks; it displays values returned by the backend.
- Keep secrets only in local environment files. Never commit a real `.env` file or API key.
- Use one task branch per feature: `codex/<area>-<feature>`. Review and merge small focused changes.
- At the end of each work session, update the relevant checkbox/notes in the issue or task tracker you use.

## Phase-by-phase split

### Phase 0 — Foundation

**Frontend Owner**

- Create Vite React TypeScript project in `frontend/`.
- Add routing, base layout, API-client wrapper, environment configuration, and a health-check screen.
- Establish visual basics: colors, typography, buttons, forms, loading and error states.

**Backend Owner**

- Create Spring Boot project in `backend/` with Web, Validation, JPA, PostgreSQL, Flyway, and test dependencies.
- Add Docker Compose PostgreSQL, application profiles, environment configuration, and `GET /api/v1/health`.
- Add a global error-response format.

**Handoff:** backend shares the health endpoint URL; frontend confirms the health screen can call it.

### Phase 1 — Admin catalog and paper authoring

**Frontend Owner**

- Create admin screens for branches, semesters, subjects, papers, and question authoring.
- Build reusable forms for MCQ choices and code-question details.
- Use local mock data until each backend endpoint is ready.

**Backend Owner**

- Write Flyway migrations and entities for academic catalog, papers, questions, and MCQ options.
- Build admin CRUD endpoints and request validation.
- Seed one development admin and sample catalog data.

**Handoff:** backend supplies sample request/response JSON; frontend replaces mocks endpoint by endpoint.

### Phase 2 — Paper Mode

**Frontend Owner**

- Build catalog search/filters, paper cards, paper-detail page, PDF viewer, and download button.

**Backend Owner**

- Implement published-paper listing/filtering, paper detail, Cloudinary upload, publication status, and authorized PDF URL response.

**Handoff:** frontend tests the full flow using one uploaded published paper.

### Phase 3 — MCQ Test Mode

**Frontend Owner**

- Build test screen, question navigator, MCQ UI, autosave indicator, pause/resume timer, submit confirmation, and result screen.

**Backend Owner**

- Create attempts/answers migrations and APIs for start/resume, answer upsert, timer persistence, MCQ grading, submit, and result retrieval.
- Enforce that answers and explanations are hidden before submission.

**Handoff:** together test refresh/resume, skipped questions, and final score accuracy.

### Phase 4 — Code-question practice

**Frontend Owner**

- Add code-answer editor/textarea, skip control, final-mark confirmation UI, feedback display, and post-submit reference-solution view.

**Backend Owner**

- Store code responses, skipped state, reference solutions, final marks, and response validation.
- Keep the code response safely escaped when returned to the browser.

**Handoff:** test a mixed MCQ/code paper without AI first.

### Phase 5 — Authentication

**Frontend Owner**

- Build registration, sign-in, verification, reset-password screens, logged-in navigation, and protected routes.

**Backend Owner**

- Implement email/password authentication, HTTP-only sessions, verification/reset tokens, roles, and resource ownership checks.

**Handoff:** test student/admin permissions in two separate browser sessions.

### Phase 6 — Dashboard

**Frontend Owner**

- Build attempt history, score cards, trend chart, and subject/exam accuracy views.

**Backend Owner**

- Implement dashboard aggregates scoped only to the authenticated user.

**Handoff:** compare dashboard figures with actual submitted attempts in the database.

### Phase 7 — Integrations and release

**Frontend Owner**

- Integrate Google sign-in UI, code-feedback experience, production error states, responsive testing, and deployment configuration.

**Backend Owner**

- Integrate Resend, Google OAuth, private Cloudinary signed URLs, NVIDIA NIM, rate limiting, production CORS, and deployment configuration.

**Handoff:** run a complete production-like user journey together before launch.

## Daily collaboration routine

1. Spend five minutes agreeing on the feature and API contract for the day.
2. Backend Owner publishes sample JSON in `docs/API.md` before the endpoint is implemented.
3. Frontend Owner builds against mock data or the documented response.
4. Integrate one endpoint at a time, then test it together.
5. Commit only your own focused changes; do not rewrite the other person's files without agreement.

## Definition of done for every feature

- API contract is documented and followed.
- Validation and error behavior are tested.
- Loading, empty, and error states exist in the UI.
- Authorization/ownership checks exist where student data is involved.
- The feature works after a page refresh.
- Both people have tested the full user flow.
