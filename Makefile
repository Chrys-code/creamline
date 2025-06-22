setup:
	@if [ ! -f .env ]; then \
		cp .env.example.env; \
	fi
	echo "Make sure you have the correct values in the .env file!"

# App commands

build:
	docker-compose build --no-cache 

start:
	docker-compose up -d

make-migrations:
	docker-compose exec app src/manage.py makemigrations

migrate:
	docker-compose exec app src/manage.py migrate

deps-export:
	poetry export --with dev --without-hashes -f requirements.txt -o requirements.txt


# Front end commands

build-fe:
	docker-compose -f docker-compose.frontend.yml build --no-cache 

start-fe:
	docker-compose -f docker-compose.frontend.yml -p email-creator-fe up -d

#  Connect docker container networks to proxy requests from frontend to backend
setup-dev-network:
	-docker network create email-creator-network 2>/dev/null || true && \ 
	docker network connect email-creator-network email-creator-app-1 && \
	docker network connect email-creator-network email-creator-fe-frontend-1

