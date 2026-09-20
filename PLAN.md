# PYQ Practice Platform — React + Spring Boot

Detailed system design: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Summary

Build a responsive web app for college students to browse and practice CT-1, CT-2, midsem, and endsem PYQs. Each paper supports:

- **Paper Mode:** read, view, and download the original PDF.
- **Test Mode:** attempt a digitized paper, receive MCQ scores, submit code answers, receive NVIDIA AI feedback with suggested marks, and review solutions after submission.
- **Personal dashboard:** track attempts, marks, accuracy, and improvement over time.

Use React with Vite and TypeScript for the frontend, Spring Boot for the API, PostgreSQL for data, Cloudinary for PDF storage, NVIDIA NIM for AI code review, Resend for verification/reset emails, and deployment-ready free-tier hosting.

## Implementation Changes

### Frontend

- Create a Vite + React + TypeScript single-page application.
- Add pages for Home, PYQ catalog, paper details, Paper Mode PDF viewer, Test Mode, test result/review, dashboard, authentication, and admin workspace.
- Provide filters for branch, semester, subject, exam type (`CT1`, `CT2`, `MIDSEM`, `ENDSEM`), and year; include keyword search.
- Test Mode supports:
  - MCQs with automatic grading.
  - Code questions with editor/text area, save-progress behavior, and a skip option.
  - A pause/resume practice timer based on the paper’s configured duration.
  - Submission confirmation; answers and solutions stay hidden until final submission.
  - Per-code-question NVIDIA review, showing feedback and a suggested score that students may accept or adjust.
- Dashboard shows completed attempts, score history, MCQ accuracy by subject/exam type, and improvement over time.
- Admin UI lets the sole admin manage catalog data, upload a paper PDF, create digitized questions/options/solutions, set marks and duration, and publish/unpublish PYQs.

### Spring Boot backend

- Use Spring Boot with Spring Web, Spring Data JPA, Spring Security, validation, OAuth2 client support, and PostgreSQL.
- Authenticate users through:
  - Verified email/password registration.
  - Google sign-in.
  - Password-reset links and email-verification links sent through Resend.
- Allow any verified email address; keep this policy configurable if college-only access is needed later.
- Use roles: `STUDENT` and `ADMIN`; seed or configure one initial admin account securely.
- Store uploaded PDFs as Cloudinary raw assets; persist only secure URLs and metadata in PostgreSQL.
- Model core records:
  - `User`: profile, authentication identity, role, verification state.
  - `Branch`, `Semester`, `Subject`: academic catalog.
  - `PyqPaper`: title, year, exam type, duration, PDF URL, publication status, and academic mappings.
  - `Question`: ordered question, type (`MCQ` or `CODE`), marks, prompt, reference solution, explanation.
  - `McqOption`: option text and correctness flag.
  - `Attempt`: student, paper, started/submitted times, timer state, final score.
  - `Answer`: selected MCQ answer or code response, auto/suggested/final marks, AI feedback, skipped status.
- Expose a versioned REST API for auth, catalog browsing, paper/PDF metadata, attempt lifecycle, answer save/submit, dashboard analytics, and admin CRUD.
- Protect all student data by ownership checks; restrict all content-management endpoints to the admin role.
- Keep NVIDIA credentials server-side. The backend sends only the code prompt, student code, expected behavior/reference solution, and marking context to NVIDIA NIM; it records feedback and suggested marks. If NVIDIA is unavailable, preserve the answer and allow skip/self-scoring rather than blocking submission.
- Do not run submitted code in v1. AI review is assistance, not an executable compiler/sandbox.

### Content and test flow

1. Admin creates branch, semester, and subject metadata.
2. Admin uploads the original PYQ PDF to Cloudinary and creates its paper record.
3. Admin manually adds ordered MCQ/code questions, marks, answer choices, solutions, and explanations.
4. Admin publishes the paper; students can browse it in Paper Mode or start Test Mode.
5. Test Mode creates a resumable attempt, saves answers incrementally, tracks elapsed practice time, and allows code questions to be skipped.
6. On final submission, MCQs are automatically marked, code responses receive NVIDIA suggested marks/feedback, the student confirms or adjusts suggested code marks, and the final score is stored.
7. The result screen reveals answers, explanations, reference code/solution material, question-level marks, and improvement guidance.

### Infrastructure and configuration

- Run locally with Docker Compose for Spring Boot and PostgreSQL; configure React separately with the API base URL.
- Deploy React to Vercel or Netlify, Spring Boot to a free-tier Java host, PostgreSQL to a managed free-tier database, PDFs to Cloudinary, and transactional email through Resend.
- Configure secrets only through environment variables: database URL, session/signing secret, Google OAuth keys, Cloudinary credentials, Resend key/from-address, NVIDIA NIM key/model, frontend URL, and API URL.
- Enable CORS only for configured frontend origins, use HTTPS in production, validate upload type/size, rate-limit authentication and AI-review endpoints, and never expose provider secrets to the browser.

## Public interfaces

- `GET /api/v1/papers` supports catalog filters and search.
- `GET /api/v1/papers/{id}` returns paper metadata and mode availability; the PDF URL is returned only to authenticated users.
- `POST /api/v1/papers/{id}/attempts`, `PATCH /api/v1/attempts/{id}/questions/{questionId}/answer`, and `POST /api/v1/attempts/{id}/submit` manage test attempts.
- `POST /api/v1/attempts/{id}/questions/{questionId}/ai-review` requests NVIDIA code feedback and suggested marks; it is never proof that code executed correctly.
- `GET /api/v1/dashboard` returns only the signed-in student’s progress data.
- `/api/v1/admin/**` provides admin-only catalog, paper, question, and publishing operations.

## Test Plan

- Unit-test MCQ scoring, final-score calculation, ownership/role checks, timer-state handling, and AI-result fallback behavior.
- Integration-test email/password registration, verification, reset flow, Google OAuth callback, protected endpoints, catalog filtering, admin publishing, attempt resume, MCQ submission, code-answer save, and result visibility only after submission.
- Mock Cloudinary, Resend, Google, and NVIDIA NIM in automated tests.
- Add frontend tests for filters, authentication guards, question navigation, timer pause/resume, skipped code questions, AI feedback confirmation, and dashboard rendering.
- Perform end-to-end checks for a student browsing a paper, completing MCQs/code responses, submitting, reviewing solutions, and seeing the result on the dashboard.

## Assumptions

- You alone manage and upload all PYQs in v1; student file-contribution/moderation is out of scope.
- Papers are digitized manually by the admin after the original PDF is uploaded.
- Code answers are reviewed by NVIDIA NIM for suggested—not authoritative—marks, with no online compiler in v1. Objective code grading is a future feature requiring an isolated execution sandbox and hidden test cases.
- The initial academic catalog requires branch, semester, subject, exam type, and year.
