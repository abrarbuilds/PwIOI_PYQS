# Database Design

PostgreSQL is the system of record. Cloudinary stores PDF files; the database stores their metadata and secure URLs.

## Core entities

| Entity | Purpose | Key fields |
| --- | --- | --- |
| `users` | Student and admin accounts. | id, email, password_hash, role, email_verified |
| `oauth_accounts` | Links Google identities to users. | id, user_id, provider, provider_account_id |
| `email_tokens` | Verification and password-reset tokens. | id, user_id, type, token_hash, expires_at |
| `branches` | Academic branch catalog. | id, name, code |
| `semesters` | Semester catalog. | id, number |
| `subjects` | Subjects tied to a branch and semester. | id, name, code, branch_id, semester_id |
| `pyq_papers` | Original paper metadata and PDF location. | id, title, year, exam_type, duration_minutes, pdf_url, status, subject_id |
| `questions` | Digitized MCQ or code questions. | id, paper_id, type, prompt, maximum_marks, reference_solution, explanation, display_order |
| `mcq_options` | Options belonging to an MCQ question. | id, question_id, text, is_correct, display_order |
| `attempts` | A student's practice session for one paper. | id, user_id, paper_id, status, started_at, submitted_at, elapsed_seconds, final_score |
| `answers` | One saved answer per attempt/question pair. | id, attempt_id, question_id, selected_option_id, code_response, skipped, auto_marks, ai_suggested_marks, final_marks, ai_feedback |

## Relationship rules

- A subject belongs to one branch and one semester.
- A paper belongs to one subject and has many ordered questions.
- An attempt belongs to exactly one student and one paper.
- An attempt contains no more than one answer for each question.
- A question is either `MCQ` with options or `CODE` with a reference solution; it cannot be both in v1.
- A student sees only their own attempts and answers.
- Published papers are visible to verified students; draft/unpublished papers are admin-only.

## Required enums

- `role`: `STUDENT`, `ADMIN`
- `exam_type`: `CT1`, `CT2`, `MIDSEM`, `ENDSEM`
- `paper_status`: `DRAFT`, `PUBLISHED`, `UNPUBLISHED`
- `question_type`: `MCQ`, `CODE`
- `attempt_status`: `IN_PROGRESS`, `SUBMITTED`
- `email_token_type`: `VERIFY_EMAIL`, `RESET_PASSWORD`

## Data integrity

- Add foreign keys for every relationship and indexes for paper filters, subject lookups, user attempts, and attempt answers.
- Store all timestamps in UTC.
- Do not delete a published paper with student attempts; unpublish it instead.
- Persist AI feedback and marks with the answer so results remain stable after a model changes.
- Manage every schema change with Flyway versioned SQL migrations in `backend/src/main/resources/db/migration/`. Never alter production tables manually.
