setup:
	@if [ ! -f .env ]; then \
		cp .env.example.env; \
	fi
	echo "Make sure you have the correct values in the .env file!"

# DEV App commands

build:
	docker-compose -f dockerfiles/docker-compose.dev.yml  build --no-cache 

start:
	docker-compose -f dockerfiles/docker-compose.dev.yml -p email-creator-dev up -d

make-migrations:
	docker-compose -f dockerfiles/docker-compose.dev.yml -p email-creator-dev exec app src/manage.py makemigrations

migrate:
	docker-compose -f dockerfiles/docker-compose.dev.yml -p email-creator-dev exec app src/manage.py migrate

deps-export:
	poetry export --with dev --without-hashes -f requirements.txt -o requirements.txt


# PROD App commands

build-prod:
	docker-compose -f dockerfiles/docker-compose.yml -p email-creator build --no-cache 

start-prod:
	docker-compose -f dockerfiles/docker-compose.yml -p email-creator up -d

migrate-prod:
	docker-compose -f dockerfiles/docker-compose.yml -p email-creator exec app src/manage.py migrate
