# Email Creator

A block-based email template editor. Email templates are built on a block-by-block basis, supporting various block types such as rich text, images, and complex layouts. Features include ordering, image sizing, color selection, and more.


## Requirements

- Docker desktop
- Poetry


## Overview

There are two main build:

- **Production Backend app**: Django backend & Nginx that serves the frontend and assets.
- **Development Backend app & Frontend app**: Django backend & React frontend app with hot-reload support for development.


## Installation & Setup


### Development environment
- Development build is exposed at:
	- Backend: 8000
	- Frontend: 3000	

Ideally you can just use localhost:3000. 
Shared container network & Vite frontend setup should take care of the routes and proxying requests.
Development container stack also provides hot reload and better error feedback.


#### Start development container stack
```bash
# Start Docker Desktop
make setup

make start
```

### Production environment
- Development build is exposed at:
	- Backend: 8080 (internally)
	- Frontend: 3000 (internally)
	- Nginx: 80

Ideally you can just use localhost. No ports. 
Nginx should take care of the routes and proxying requests.

#### Start production container stack:
```bash
# Start Docker Desktop
make setup

# Build frontend
cd src/frontend && npm ci --silent && npm run build

# Build container stack
make build-prod
make start-prod
make migrate-prod
```

This setup does not provide hot reload.
Frontend production build is required before build.


## Migration:

### Steps:
Follow the commands in terminal:

- make make-migrations
- make migrate


## Commands Reference

| Command               | Description                                          |
|-----------------------|------------------------------------------------------|
| `make setup`          | Create `.env` file from example if not present       |
| `make start`          | Start & build backend & front end Docker container with hot reload        |
| `make make-migrations`| Generate Django migrations                           |
| `make migrate`        | Apply Django migrations                              |
| `make deps-export`    | Export Poetry dependencies to `requirements.txt`     |
| `make build-prod`     | Build backend Docker container with Nginx            |
| `make start-prod`     | Start backend container with Nginx                   |
