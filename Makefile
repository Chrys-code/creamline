setup:
	@if [ ! -f .env ]; then \
		cp .env.example.env; \
	fi
	echo "Make sure you have the correct values in the .env file!"

# DEV App commands

build:
	docker-compose -f dockerfiles/docker-compose.dev.yml build --no-cache 

start:
	docker-compose -f dockerfiles/docker-compose.dev.yml -p creamline-dev up -d

# Run black formatter
code-format:
	cd src/services && poetry run black .

make-migrations:
	docker-compose -f dockerfiles/docker-compose.dev.yml -p creamline-dev exec backend python3 manage.py makemigrations

migrate:
	docker-compose -f dockerfiles/docker-compose.dev.yml -p creamline-dev exec backend python3 manage.py migrate

# Run tests in project
test:
	docker-compose -f dockerfiles/docker-compose.dev.yml -p creamline-dev exec backend pytest

# Run tests in specific app
test-app:
	@read -p "Enter app route (e.g., apps/authentication): " APP; \
		docker-compose -f dockerfiles/docker-compose.dev.yml -p creamline-dev exec backend pytest $$APP

# Export dependencies into requirements.txt from poetry
deps-export:
	cd src/services && poetry export --with dev --without-hashes -f requirements.txt -o requirements.txt

# Initiate a new app in Django
start-app:
	@read -p "Enter app name (e.g., authentication): " APP; \
	docker-compose -f dockerfiles/docker-compose.dev.yml -p creamline-dev exec backend python3 manage.py startapp $$APP

# Initialize translation ".po" in a specific app
make-translations:
	@read -p "Enter app folder (e.g., authentication): " APP; \
	docker-compose -f dockerfiles/docker-compose.dev.yml -p creamline-dev exec backend \
	sh -c "cd $$APP && django-admin makemessages -l hu"

# Compile ".po"s in project
compile-translations:
	@read -p "Enter app folder (e.g., authentication): " APP; \
	docker-compose -f dockerfiles/docker-compose.dev.yml -p creamline-dev exec backend \
	sh -c "cd $$APP && django-admin compilemessages"


# PROD App commands
build-prod:
	docker-compose -f dockerfiles/docker-compose.yml -p creamline build --no-cache 

start-prod:
	docker-compose -f dockerfiles/docker-compose.yml -p creamline up -d

migrate-prod:
	docker-compose -f dockerfiles/docker-compose.yml -p creamline exec backend python3 src/manage.py migrate
