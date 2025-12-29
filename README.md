# Creamline

Creamline is an administrative application for the milk industries. This application aims to save time in administration and to reduce effort to gain insights in form of analytics and data exports.

**Key features**:
- Multilingual support: HU & EN
- Auth (Django built-in)
- Permissing handling by User Groups
- User Management
- Milk Collection administration, time series and pie chart analytics, pdf export
- Pasteurisation administration, time series and pie chart analytics, pdf export
- Other models to support the above administrative processes

## Requirements

Running with docker:
- Docker desktop
- Poetry

- Node 24.2.0
- Python 3.13


## Technical Overview

- **Production Stack**: Dockerized Django backend & Nginx that serves the React frontend and as zipped assets which also helps with caching.
- **Development Stack**: Separate Dockerized Django backend & React frontend. This is due to hot-reload support for development mode.
- **Design Patterns**: The application uses Layered architecture with Domain Driven Design (DDD). 
- **Additional Note**: Currently the front-end and back-end applications are built and ran in a single Docker container in order to make development faster with considerations to make it easy to split the domains onto separate infrastructure as the project scales.


## Installation & Setup

### Development environment
- Development build is exposed at:
	- Backend: 8000
	- Frontend: 3000	

Shared container network & Vite frontend setup takes care of the routes and proxying requests from front-end to back-end.
Development container stack also provides hot reload and improved error feedback.


#### Start development container stack
```bash
# Start Docker Desktop
make setup

# Build container stack
make build
make start
make migrate
```


### Production environment
- Production build is exposed at:
	- Backend: 8080 (internally to Docker)
	- Nginx: 80 - serves frontend(s)

#### Steps:

##### 1. Map localhost to the app you want to check on

This is required as apps are set up to be exposed on subdomains by Nginx.

List of [appname]:
- Creamline

Alternatively check on root/dockerfiles/docker-compose.yml and look for a service name you want to check out in production environment.

In terminal:
```bash
sudo nano /etc/hosts

127.0.0.1 localhost => 127.0.0.1 [appname].x.com
```

##### 2. Set cookies to allow unsafe

This is required to share cookies on http

```bash
# root/src/services/settings.py
SESSION_COOKIE_SECURE = False
```

##### 3. Start production container stack:
```bash
# Start Docker Desktop
make setup

# Build container stack
make build-prod
make start-prod
make migrate-prod
```

Note: This setup does not provide hot reload!


## Migration:

### Steps:
Follow the commands in terminal at project root:

- make make-migrations
- make migrate



## Commands Reference

| Command               | Description                                          |
|-----------------------|------------------------------------------------------|
| `make setup`          | Create `.env` file from example if not present       |
| `make build`          | Build the docker images                              |
| `make start`          | Start & build backend & front end Docker container with hot reload        |
| `make test`           | Runs pytest on services                              |
| `make test-app`           | Runs pytest on selected service                  |
| `make run-black-formatter`| Runs black formatter on services                 |
| `make deps-export`    | Export Poetry dependencies to `requirements.txt`     |
| `make start-app`    | Start a new app in services                            |
| `make make-translations` | Initialize translation ".po" in a specific app    |
| `make compile-translations` | Compile ".po" translation files                |
| `make make-migrations`| Generate Django migrations                           |
| `make migrate`        | Apply Django migrations                              |
| `make build-prod`     | Build backend Docker container with Nginx            |
| `make start-prod`     | Start backend container with Nginx                   |
| `make migrate-prod`   | Apply Django migrations                              |


## Considerations before hosting demo
This is not a production ready application yet as some factors below still need consideration: 

- Adding Husky to BE & FE pre-commit to run tests and formatter
- Re-visit setup considering hosting on Digital Ocean App Platform (Cookies + auto SSL)
- Planned CI/CD (ideal): 
	1. Push to "main" branch
		1. Triggers Github action
		2. Build image, run, test, flags image for "staging"
		3. Pushes to Container Registry
		4. App Platform Builds
	2. Promote to Prod
		1. In github actions trigger prod deploy via button click
		2. Pull docker images from Container Registry
		2. Flag image for "prod"
		3. Pushes back to Container Registry
		4. App Platform Builds