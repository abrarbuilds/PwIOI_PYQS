# Technical Decisions

| Decision | Chosen approach | Reason |
| --- | --- | --- |
| Frontend | React, Vite, TypeScript | Fast SPA development with typed API integration. |
| Backend | Spring Boot modular monolith | Builds Java backend experience and keeps v1 simple to deploy. |
| Database | PostgreSQL | Reliable relational storage for users, papers, questions, and attempts. |
| Authentication | Email/password plus Google OAuth using HTTP-only cookie sessions | Supports standard and convenient sign-in without exposing browser tokens to JavaScript. |
| Email | Resend | Sends verification and password-reset emails. |
| PDF storage | Cloudinary private raw assets with short-lived signed URLs | Verified students can view/download, but PDF links do not stay permanently public. |
| Code review | NVIDIA NIM API | Gives feedback and suggested marks without running untrusted code; it cannot prove correctness. |
| Code execution | Not included in v1 | Avoids compiler sandbox, security, and hosting complexity. |
| Scoring | Auto-mark MCQs; student-confirmed AI suggestions for code | Supports mixed PYQ formats without pretending AI feedback is execution-based grading. |
| Access | Any verified email | Keeps initial adoption simple; a college-domain allowlist may be added later. |
| Content ownership | Sole admin uploads and digitizes PYQs | Maintains quality and avoids a moderation workflow in v1. |
| Test timing | Pause/resume practice timer | Supports preparation rather than strict examination simulation. |
