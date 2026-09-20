# MVP Launch and Midsem Roadmap

## Purpose

Release a useful live PYQ library immediately, so students can read and download available papers before their exams. Build the full authenticated practice platform after the MVP is live and before midsems.

This document is the source of truth for the release sequence. A new collaborator or IDE should read this file, then `PLAN.md`, `ARCHITECTURE.md`, `PHASE.md`, and `TEAM-WORK.md` before changing the project.

## Release 1 — Live PYQ Library

### Goal

Students can open a public URL, find a PYQ, view its PDF, and download it on mobile or desktop.

### Include

- React + Vite + TypeScript frontend only.
- Home page with a clear purpose and exam-type shortcuts: CT-1, CT-2, midsem, endsem.
- Catalog page with branch, semester, subject, exam type, and year filters.
- Paper cards with title, subject, exam type, year, and available actions.
- Paper-detail page with PDF viewer and download button.
- Responsive mobile design.
- Static paper metadata stored locally in a JSON/TypeScript data file.
- PDFs stored on Cloudinary and referenced by the catalog metadata.
- Deploy the frontend to Vercel or Netlify and record the live URL in `README.md` after deployment.

### Exclude

- Spring Boot backend.
- PostgreSQL and Flyway migrations.
- Login, Google OAuth, email verification, and roles.
- Admin dashboard and browser-based uploads.
- Test Mode, attempt saving, scoring, results, dashboard, rankings, or analytics.
- NVIDIA NIM and all code-question evaluation.

### Content workflow for Release 1

1. Collect the available PYQ PDFs.
2. Upload each PDF to Cloudinary.
3. Add one catalog record per paper: branch, semester, subject, exam type, year, title, and PDF URL.
4. Test each PDF on a phone and desktop browser.
5. Deploy and share the live URL.

### Acceptance checklist

- A student can find a paper using at least subject and exam-type filters.
- Every listed paper opens correctly in the viewer.
- Every PDF downloads successfully.
- The site remains usable at a 320px-wide mobile viewport.
- No secret/API key is present in the frontend repository or browser bundle.

## Release 2 — Full Practice Platform

Start only after Release 1 is deployed and verified. Preserve Release 1 behavior while adding the backend gradually.

### Order of work

1. Create Spring Boot backend, PostgreSQL Docker setup, Flyway, and health endpoint.
2. Add academic catalog/paper/question database schema and admin content management.
3. Move catalog data from local files to Spring Boot APIs without changing the student browsing experience.
4. Add Paper Mode access through backend-authorized short-lived Cloudinary links.
5. Implement MCQ Test Mode: start/resume, autosave, timer, submission, auto-scoring, and solution review.
6. Add secure email/password authentication, admin role, and ownership checks.
7. Add the personal dashboard and attempt-history analytics.
8. Add Google OAuth, Resend emails, private Cloudinary assets, and production hardening.
9. Add NVIDIA NIM advisory feedback for code answers only after the core test flow is stable.

### Code-question rule

NVIDIA NIM can explain code and suggest marks, but it cannot prove correctness because it does not execute untrusted student code against test cases. Do not show AI feedback as objective automatic grading.

If automatic code grading is needed later, design a separate secure judge service that compiles/runs code in isolation and checks visible/hidden test cases. This is out of scope until the core platform works.

## Team split during Release 1

### Frontend Owner

- Scaffold React/Vite project.
- Build all Release 1 pages, filters, cards, PDF viewer, mobile layout, and deployment.
- Maintain the local catalog metadata file.

### Backend Owner

- Do not block the MVP on Spring Boot.
- Prepare Spring Boot/PostgreSQL/Flyway locally in a separate branch after the frontend MVP works.
- Review `DATABASE.md`, `API.md`, and `ARCHITECTURE.md`; prepare the Release 2 foundation.

## Handoff instructions

Before taking a task, identify the current release:

- If Release 1 is not live, work only on the React PDF-library scope above.
- If Release 1 is live, follow the Release 2 order exactly; do not start AI, OAuth, or code grading early.
- Update this document if release scope or sequencing changes.
- Keep implementation decisions synchronized with `PLAN.md`, `ARCHITECTURE.md`, `docs/API.md`, and `docs/DATABASE.md`.
