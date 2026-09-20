# Contributing

## Before starting work

1. Read `MVP-RELEASE.md` to confirm whether the task belongs in Release 1 or Release 2.
2. Read `TEAM-WORK.md` to confirm frontend/backend ownership.
3. Check `docs/API.md` before changing a frontend/backend data contract.

## Branch and commit rules

- `main` is the protected production branch. Deploy the live student website only from `main`.
- `develop` is the shared integration branch. It contains completed work that is ready for team testing, but is not yet production.
- Every person creates a focused feature branch from `develop`: `feature/frontend-catalog`, `feature/pdf-viewer`, `feature/backend-papers`, `feature/backend-attempts`.
- Open a pull request from the feature branch into `develop`; another team member reviews it before merging.
- Test `develop` together. When it is stable, open one pull request from `develop` into `main`, then deploy `main`.
- Do not commit directly to `main`. Avoid committing directly to `develop` except for urgent, team-agreed documentation fixes.
- Use clear commits, for example: `feat: add PYQ filter bar` or `docs: add paper inventory`.
- Do not commit `.env` files, API keys, `node_modules`, or `target` output.

## Branch flow

```text
feature/frontend-catalog ─┐
feature/pdf-viewer ───────┼──→ develop ───→ main (live deployment)
feature/backend-papers ───┘
```

## Before merging

- Verify the feature works on mobile and desktop where it affects the UI.
- Verify loading, empty, and error states.
- Run the relevant formatter, tests, and build after those commands exist.
- Update docs when API shapes, database fields, architecture, or release scope changes.
