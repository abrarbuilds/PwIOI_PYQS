# PYQ Practice Platform

A platform for college students to read and practice CT-1, CT-2, midsem, and endsem previous-year questions.

> **Current status:** Release 1 is being built as a public PYQ library. It will let students browse, view, and download papers before Test Mode and login are added.

## Project documents

- [Implementation plan](./PLAN.md)
- [System architecture](./ARCHITECTURE.md)
- [API contract](./docs/API.md)
- [Database design](./docs/DATABASE.md)
- [User flows](./docs/USER-FLOWS.md)
- [Technical decisions](./docs/DECISIONS.md)
- [Local setup](./docs/SETUP.md)
- [Two-person execution guide](./TEAM-WORK.md)
- [MVP launch and midsem roadmap](./MVP-RELEASE.md)
- [Paper inventory](./docs/PAPER-INVENTORY.md)
- [Contribution guide](./CONTRIBUTING.md)
- [Project structure](./PROJECT-STRUCTURE.md)
- [Figma design](https://www.figma.com/make/2qlBqq2hKf0PIZqvUzSdUa/Design-PYQ-Hub-Web-App?t=c5MBwfWtbiGVAW7u-1)

## Screenshots

Screenshots will be added after the first frontend deployment. See [screenshot instructions](./docs/screenshots/README.md).

## Release 1 frontend

The public paper library is in [`frontend/`](./frontend). It intentionally has no backend,
authentication, API keys, or provider secrets.

```bash
cd frontend
npm install
npm run dev
```

Before deploying, replace the sample records in [`frontend/src/data/papers.ts`](./frontend/src/data/papers.ts)
with collected-paper metadata and the final Cloudinary PDF URLs. Then run `npm run build`.

## Live site

Add the production URL here after the first Vercel/Netlify deployment.
