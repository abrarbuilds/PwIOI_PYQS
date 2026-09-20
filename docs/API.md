# API Contract

Base path: `/api/v1`

All protected endpoints require an authenticated user. Spring Security maintains the session through a `Secure`, HTTP-only, `SameSite` cookie; React never stores a JWT. Endpoints under `/admin` additionally require the `ADMIN` role.

## Authentication

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/register` | Create an email/password account and send verification email. |
| `POST` | `/auth/login` | Sign in with email and password. |
| `POST` | `/auth/logout` | End the active session. |
| `GET` | `/auth/google` | Start Google OAuth sign-in. |
| `POST` | `/auth/verify-email` | Verify the account using a verification token. |
| `POST` | `/auth/forgot-password` | Request a password-reset email. |
| `POST` | `/auth/reset-password` | Set a new password with a valid reset token. |
| `GET` | `/auth/me` | Return the current user profile and role. |

## Student endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/papers` | List published papers; filter by branch, semester, subject, exam type, year, or search term. |
| `GET` | `/papers/{paperId}` | Return published-paper metadata and a short-lived signed PDF URL for Paper Mode/download. |
| `POST` | `/papers/{paperId}/attempts` | Start or resume a practice attempt. |
| `GET` | `/attempts/{attemptId}` | Return the signed-in student's in-progress attempt. |
| `PATCH` | `/attempts/{attemptId}/questions/{questionId}/answer` | Upsert an MCQ selection, code response, skip state, or elapsed time. |
| `POST` | `/attempts/{attemptId}/questions/{questionId}/ai-review` | Request NVIDIA NIM feedback and suggested marks for a code answer. |
| `POST` | `/attempts/{attemptId}/submit` | Finalize an attempt and calculate marks. |
| `GET` | `/attempts/{attemptId}/result` | Return submitted result, answers, solutions, and feedback. |
| `GET` | `/dashboard` | Return the signed-in student's progress summaries and attempt history. |

## Admin endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET`, `POST` | `/admin/branches` | Read or create branches. |
| `GET`, `POST` | `/admin/semesters` | Read or create semesters. |
| `GET`, `POST` | `/admin/subjects` | Read or create subjects. |
| `GET`, `POST` | `/admin/papers` | List all papers or create a draft paper. |
| `PATCH`, `DELETE` | `/admin/papers/{paperId}` | Edit or remove a draft paper. |
| `POST` | `/admin/papers/{paperId}/pdf` | Upload the original PDF to Cloudinary. |
| `POST` | `/admin/papers/{paperId}/questions` | Add a digitized question. |
| `PATCH`, `DELETE` | `/admin/questions/{questionId}` | Edit or remove a question. |
| `POST` | `/admin/papers/{paperId}/publish` | Publish a complete paper. |
| `POST` | `/admin/papers/{paperId}/unpublish` | Hide a paper from students. |

## Conventions

- Use JSON for requests and responses, except multipart PDF uploads.
- Return validation errors as a consistent error object with a user-safe message and field errors.
- Never include MCQ correctness, reference solutions, or explanations in an active attempt response.
- Return solutions only after the attempt is submitted.
- AI review returns feedback and suggested marks only. It does not claim that code has executed or passed hidden tests.

## Core examples

### Register

`POST /api/v1/auth/register`

```json
{
  "email": "student@example.com",
  "password": "A secure password"
}
```

```json
{
  "message": "Check your email to verify your account."
}
```

### List papers

`GET /api/v1/papers?branch=CSE&semester=3&examType=MIDSEM&year=2025`

```json
{
  "items": [
    {
      "id": "paper-uuid",
      "title": "Data Structures Midsem 2025",
      "subject": { "code": "CS201", "name": "Data Structures" },
      "examType": "MIDSEM",
      "year": 2025,
      "durationMinutes": 60
    }
  ],
  "page": 0,
  "size": 20,
  "totalItems": 1
}
```

### Start or resume a test

`POST /api/v1/papers/{paperId}/attempts`

```json
{
  "attemptId": "attempt-uuid",
  "status": "IN_PROGRESS",
  "elapsedSeconds": 0,
  "paper": {
    "title": "Data Structures Midsem 2025",
    "durationMinutes": 60
  },
  "questions": [
    {
      "id": "question-uuid",
      "type": "MCQ",
      "prompt": "Which data structure follows FIFO?",
      "maximumMarks": 2,
      "options": [
        { "id": "option-a", "text": "Stack" },
        { "id": "option-b", "text": "Queue" }
      ]
    }
  ]
}
```

### Save an answer

`PATCH /api/v1/attempts/{attemptId}/questions/{questionId}/answer`

```json
{
  "selectedOptionId": "option-b",
  "codeResponse": null,
  "skipped": false,
  "elapsedSeconds": 420
}
```

### Request AI feedback for a code response

`POST /api/v1/attempts/{attemptId}/questions/{questionId}/ai-review`

```json
{
  "suggestedMarks": 6,
  "maximumMarks": 10,
  "feedback": "The approach is correct for normal input, but the empty-list case is not handled.",
  "status": "ADVISORY"
}
```

### Submit an attempt

`POST /api/v1/attempts/{attemptId}/submit`

```json
{
  "attemptId": "attempt-uuid",
  "status": "SUBMITTED",
  "finalScore": 34,
  "maximumScore": 50,
  "resultUrl": "/api/v1/attempts/attempt-uuid/result"
}
```

### Error response

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Some fields need attention.",
  "fieldErrors": {
    "email": "Enter a valid email address."
  }
}
```
- Define exact request/response examples beside each endpoint before implementation begins.
