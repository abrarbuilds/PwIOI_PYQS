# Project Structure

This structure is agreed before coding. Keep files focused: a page composes feature components, a component renders one focused UI concern, and a backend service owns one business capability. Do not create giant “everything” files.

```text
PwIOI_PYQS/
├── frontend/                         # React + Vite + TypeScript
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── app/                      # App bootstrap, router, providers
│   │   │   ├── App.tsx
│   │   │   ├── router.tsx
│   │   │   └── providers.tsx
│   │   ├── assets/                   # Local logo/images only
│   │   ├── components/               # Shared UI: Header, Button, Modal, EmptyState
│   │   ├── features/                 # Feature-specific code
│   │   │   ├── catalog/
│   │   │   │   ├── components/
│   │   │   │   ├── catalog.api.ts
│   │   │   │   ├── catalog.types.ts
│   │   │   │   └── catalog.utils.ts
│   │   │   ├── paper/
│   │   │   ├── practice/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   └── admin/
│   │   ├── pages/                    # Route-level page composition only
│   │   │   ├── HomePage.tsx
│   │   │   ├── BrowsePapersPage.tsx
│   │   │   └── PaperDetailPage.tsx
│   │   ├── services/                 # Shared HTTP client and external integrations
│   │   ├── data/                     # Release 1 local paper catalog data
│   │   ├── hooks/                    # Shared reusable hooks
│   │   ├── styles/                   # Global tokens and base styles
│   │   ├── types/                    # Cross-feature shared types only
│   │   ├── utils/                    # Pure shared helper functions
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                          # Spring Boot + Maven
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/.../pyqhub/
│   │   │   │   ├── config/           # Security, CORS, provider configuration
│   │   │   │   ├── common/           # Error handling, common DTOs, utilities
│   │   │   │   ├── auth/             # Auth controller, service, DTOs, entities
│   │   │   │   ├── catalog/          # Branch, semester, subject, paper browsing
│   │   │   │   ├── paper/            # Paper authoring and Cloudinary files
│   │   │   │   ├── attempt/          # Test attempts, answers, MCQ marking
│   │   │   │   ├── dashboard/        # Student progress aggregates
│   │   │   │   ├── ai/               # NVIDIA NIM adapter and feedback logic
│   │   │   │   └── PyqHubApplication.java
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-dev.yml
│   │   │       └── db/migration/     # Flyway SQL migrations
│   │   └── test/
│   │       └── java/.../pyqhub/
│   ├── pom.xml
│   └── Dockerfile
│
├── docs/                             # Project knowledge; update when decisions change
│   └── screenshots/                  # Real screenshots after deployment
├── docker-compose.yml                 # PostgreSQL for local development
├── .env.example                      # Variable names only; no real secrets
├── .gitignore
├── .editorconfig
├── README.md
├── PLAN.md
├── ARCHITECTURE.md
├── PHASE.md
├── MVP-RELEASE.md
├── TEAM-WORK.md
└── PROJECT-STRUCTURE.md
```

## Frontend file rules

- A page only arranges sections and route-level behavior. Put real UI logic in its feature folder.
- Shared components must be genuinely reusable across at least two features; otherwise keep them inside the feature.
- Keep API calls in `*.api.ts`, types in `*.types.ts`, and non-React logic in `*.utils.ts`.
- Keep the Release 1 catalog in `src/data/papers.ts`; move it behind `catalog.api.ts` only when Spring Boot is ready.
- Split a component before it becomes difficult to read or has more than one visual/business responsibility. Do not allow a 4,000-line page/component.

## Backend file rules

- Organize by domain feature (`auth`, `catalog`, `attempt`) rather than one global controllers/services/entities folder.
- Each feature may contain `controller`, `service`, `repository`, `entity`, `dto`, and `mapper` subfolders only when it has enough files to justify them.
- Controllers validate/request-response map; services own business rules; repositories only access the database.
- Never expose JPA entities directly from API endpoints; return DTOs.
- One Flyway migration represents one intentional schema change. Never edit an already-applied migration.

## Naming rules

- React: `PascalCase.tsx` for components/pages; `camelCase.ts` for hooks, APIs, utilities, and data files.
- Java: `PascalCase.java` classes; package names lowercase.
- Name files by their responsibility: `PaperCard.tsx`, `CatalogFilterBar.tsx`, `AttemptService.java`; never use vague names such as `helpers.ts`, `utils2.ts`, or `finalCode.ts`.

## Dependency rule

```text
pages → features/components → services/data → backend API
backend controller → service → repository → PostgreSQL
```

Dependencies point inward. A shared component must not import a page, and a repository must not contain business logic.

## File-size review rules

Line count is a warning sign, not a reason to split related code artificially. Use these limits to start a review:

| File type | Review at | Split required at | Split by |
| --- | ---: | ---: | --- |
| React component | 200 lines | 350 lines | Visual section or focused child component |
| React page | 250 lines | 400 lines | Route composition, feature sections, hooks |
| React hook/API file | 150 lines | 300 lines | Independent query/mutation or responsibility |
| Spring controller | 150 lines | 250 lines | Feature endpoint group |
| Spring service | 250 lines | 400 lines | Business use case or domain capability |
| DTO/entity/configuration | 300 lines | Review only | Separate only when it improves clarity |
| Test file | 400 lines | Review only | Test scenario or feature area |

Before adding more code to a file at its review threshold, ask: “Does this new code have a different responsibility?” If yes, create a focused file. Do not split one coherent component merely to satisfy a number.
