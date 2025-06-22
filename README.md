# Email Creator

A block-based email template editor. Email templates are built on a block-by-block basis, supporting various block types such as rich text, images, and complex layouts. Features include ordering, image sizing, color selection, and more.

---

## Requirements

- Docker desktop
- Poetry

---

## Overview

There are two main apps:

- **Backend ("app")**: Django backend that serves the frontend build from `./src/frontend/dist`.
- **Frontend ("frontend")**: React frontend app with hot-reload support for development.

In development, the backend serves the built frontend (`dist`), but to use hot reload, the frontend runs separately in its own container.

---

## Installation & Setup

### Notes

- In development, backend and frontend run in separate Docker containers with hot reload enabled.
- Both containers **must be on the same Docker network** to allow API proxying from frontend to backend.
- Backend serves frontend directly in production.

---

### Steps

#### 1. Start Backend
```bash
# Start Docker Desktop

make build
make start
make migrate
```

- This builds and starts the backend container
- Runs database migrations

#### Starting frontend separately:
```bash
# Depends on "Starting the app"

make build-fe
make start-fe
make setup-dev-network
```

- Builds and starts the frontend container separately.
- Connects frontend and backend containers to the same Docker network for API proxying.

#### Notes on development
- To see frontend changes in the app (not the separate frontend), you must build the frontend (`cd src/frontend && npm run build`) and refresh the page
- Backend listens on port 8080
- Frontend listens on port 3000
- Network setup allows frontend at localhost:3000 to proxy API requests to backend at localhost:8080

---

## Migration:

### Steps:
Follow the commands in terminal:

- make make-migrations
- make migrate

---

## Commands Reference

| Command               | Description                                          |
|-----------------------|------------------------------------------------------|
| `make setup`          | Create `.env` file from example if not present       |
| `make build`          | Build backend Docker container with no cache         |
| `make start`          | Start backend container                               |
| `make make-migrations`| Generate Django migrations                            |
| `make migrate`        | Apply Django migrations                               |
| `make deps-export`    | Export Poetry dependencies to `requirements.txt`     |
| `make build-fe`       | Build frontend Docker container with no cache        |
| `make start-fe`       | Start frontend container                              |
| `make setup-dev-network` | Connect backend and frontend containers to same Docker network |