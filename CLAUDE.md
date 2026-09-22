# Project: PwIOI_PYQS
A PYQ practice platform for PW IOI students.

## Stack
- Backend: Spring Boot 3.x, Java 17, PostgreSQL, JPA/Hibernate
- Frontend: React + Vite + TypeScript
- Auth: Session-based, HTTP-only cookies, BCrypt
- Storage: Cloudinary (PDFs)
- AI: NVIDIA NIM (code review)
- Migrations: Flyway

## Architecture
Modular monolith. Packages by feature:
com.pwioi.pyqs.{auth,catalog,paper,attempt,aireview,admin}

Each module has: controller, service, repository, dto, model.

## Rules
1. Never write logic in controllers. Delegate to services.
2. Use DTOs. Never expose entities in API responses.
3. Use Flyway migrations for ALL schema changes. Never edit applied migrations.
4. All timestamps in UTC (TIMESTAMPTZ in Postgres).
5. Validate all input server-side with @Valid + custom validators.
6. Treat student code submissions as plain text. NEVER eval or execute.
7. Never commit secrets. Use env vars.
8. Global exception handler returns proper HTTP status codes.
9. Write JUnit tests for every service method.
10. Log admin actions to audit_log table.

## Design docs
- PLAN.md — feature roadmap
- ARCHITECTURE.md — system design
- API_CONTRACT.md — endpoint spec
- DATABASE.md — schema

Always read the relevant design doc before implementing a feature.

## How I respond
- Explain your approach BEFORE writing code.
- Show me the diff and explain WHY for any non-obvious decision.
- Ask me to confirm the design before generating >50 lines.
- If you're unsure about a requirement, ASK. Don't guess.
