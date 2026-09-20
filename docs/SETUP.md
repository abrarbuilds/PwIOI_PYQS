# Local Development Setup

## Prerequisites

- Node.js LTS and npm
- Java 21
- Docker Desktop for local PostgreSQL
- Cloudinary, Google OAuth, Resend, and NVIDIA NIM accounts/credentials for full integration

## Planned services

- React frontend: `frontend/`
- Spring Boot backend: `backend/`
- PostgreSQL: Docker Compose service

## Environment setup

1. Copy `.env.example` to the environment files used by the frontend and backend.
2. Fill in local database and provider credentials; never commit those files.
3. Start PostgreSQL through Docker Compose after it is added.
4. Start Spring Boot, then start React with its API base URL pointing at the backend.

## Before first run

- Register Google OAuth redirect URLs for local and production frontend/backend URLs.
- Configure a verified Resend sender domain/address.
- Create a Cloudinary upload configuration for raw PDF assets.
- Set an NVIDIA NIM API key and selected model in the backend environment.

Exact commands will be added after frontend and backend scaffolding establishes the package/build names.
