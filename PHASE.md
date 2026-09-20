# Implementation Phases

Build and verify one phase before starting the next. Do not add AI, OAuth, or email services until the core PYQ workflow works locally.

## Phase 0 — Project foundation

- Create `frontend/` with Vite, React, and TypeScript.
- Create `backend/` with Spring Boot, Java 21, Maven, Spring Web, Validation, JPA, PostgreSQL, and Flyway.
- Add Docker Compose for PostgreSQL.
- Configure environment files from `.env.example`.
- Add a backend health endpoint and confirm React can call it.

**Done when:** frontend, backend, and PostgreSQL run locally and `GET /api/v1/health` succeeds.

## Phase 1 — Academic catalog and admin content

- Create Flyway migrations for branches, semesters, subjects, papers, questions, and MCQ options.
- Implement admin-only temporary access for local development.
- Build admin APIs to create branches, semesters, subjects, draft papers, MCQs, and code questions.
- Build the React admin forms and a simple paper/question list.

**Done when:** you can manually create one complete draft PYQ with MCQs and code questions.

## Phase 2 — Paper Mode

- Add Cloudinary PDF upload from the admin workspace.
- Store PDF metadata with the paper.
- Build student catalog filters: branch, semester, subject, exam type, and year.
- Build paper-detail and PDF-view/download screens.

**Done when:** an uploaded and published PYQ can be found, read, and downloaded by a student.

## Phase 3 — MCQ Test Mode

- Create attempt and answer migrations/entities.
- Build start/resume attempt APIs.
- Build question navigation, answer autosave, skip state, and pause/resume timer.
- Auto-grade MCQs at submission and reveal solutions only afterwards.

**Done when:** a student can complete an MCQ PYQ, submit it, and see accurate marks and explanations.

## Phase 4 — Code-question practice

- Add code-response editor/text area and save behavior.
- Allow code questions to be skipped.
- Show reference solutions after final submission.
- Add final-mark confirmation for code questions, initially without AI.

**Done when:** a mixed MCQ/code paper can be completed and reviewed without code execution.

## Phase 5 — Authentication and authorization

- Add email/password registration, BCrypt/Argon2 password hashing, verification tokens, and password reset.
- Use secure HTTP-only session cookies.
- Add `STUDENT` and `ADMIN` roles and ownership checks for attempts.
- Replace temporary admin access with the real admin account.

**Done when:** only verified students can access papers/tests, and only the admin can manage content.

## Phase 6 — Dashboard

- Add attempt-history and summary APIs.
- Show completed papers, score history, and MCQ accuracy by subject/exam type.
- Test that one student can never access another student's data.

**Done when:** students can track their own progress after several attempts.

## Phase 7 — External integrations and production hardening

- Add Google OAuth and Resend verification/reset email delivery.
- Move PDFs to private Cloudinary assets and return short-lived signed URLs.
- Add NVIDIA NIM code feedback and suggested marks, with graceful failure handling.
- Add validation, rate limits, CORS, error handling, automated tests, and deployment configuration.

**Done when:** the deployed app is secure, resilient, and all planned integrations work with production credentials.

## Important rule

NVIDIA feedback is advisory. Objective automatic code grading requires a future secure execution sandbox with test cases; do not claim that v1 has executed or proven submitted code correct.
