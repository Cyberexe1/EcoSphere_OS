# Contributing to EcoSphere OS

Thank you for your interest in contributing to EcoSphere OS! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/EcoSphere_OS.git
   cd EcoSphere_OS
   ```
3. Set up the development environment (see [README](./README.md#-local-development))

## Development Workflow

### Branch Naming

```
feature/   → New features (e.g., feature/carbon-forecasting)
fix/       → Bug fixes (e.g., fix/token-refresh-loop)
enhance/   → UI/UX improvements (e.g., enhance/dashboard-charts)
docs/      → Documentation (e.g., docs/api-reference)
deploy/    → Infrastructure changes (e.g., deploy/add-monitoring)
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add carbon forecasting to environmental module
fix: resolve token refresh race condition
enhance: improve dashboard card gradients
docs: update API endpoint reference
deploy: configure App Runner auto-scaling
```

### Pull Requests

1. Create a feature branch from `main`
2. Make your changes with clear, atomic commits
3. Ensure the application builds successfully:
   ```bash
   cd frontend && npm run build
   cd ../backend && node src/server.js
   ```
4. Open a PR with a clear description of changes

## Code Style

### Frontend (React)

- Functional components with hooks
- Tailwind CSS for styling (no inline styles or CSS modules)
- Custom hooks in `src/hooks/`
- Centralized API calls through `src/utils/api.js`
- Context for global state (`AuthContext`)

### Backend (Express)

- ES Modules (`import/export`)
- Route handlers in `src/routes/`
- Database queries through Prisma in `src/data/`
- Middleware in `src/middleware/`
- Environment config in `src/config/`

### General

- Use meaningful variable names
- Keep functions small and focused
- Handle errors gracefully
- Add comments for complex business logic

## Project Architecture

```
Frontend (React + Vite)
    ↕ HTTP/JSON
Backend (Express REST API)
    ↕ Prisma ORM
Database (PostgreSQL)
```

- **Frontend** handles all UI rendering and state management
- **Backend** provides authenticated REST endpoints
- **Database** stores all persistent data with Prisma migrations

## Adding New Features

### New API Endpoint

1. Add route handler in `backend/src/routes/`
2. Register route in `backend/src/server.js`
3. Add Prisma model if needed in `backend/prisma/schema.prisma`
4. Run `npx prisma migrate dev` for schema changes
5. Add API function in `frontend/src/utils/api.js`
6. Build the frontend page/component

### New Database Model

1. Define model in `backend/prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name add_model_name`
3. Add seed data in `backend/prisma/seed.js`
4. Create data access functions in `backend/src/data/`

## Reporting Issues

When reporting bugs, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/environment details
- Screenshots if applicable

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
