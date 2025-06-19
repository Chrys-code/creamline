setup:
	@if [ ! -f .env ]; then \
		cp .env.example.env; \
	fi
	echo "Make sure you have the correct values in the .env file!"

start:
	docker-compose up

make-migrations:
	docker-compose exec backend src/manage.py makemigrations

migrate:
	docker-compose exec backend src/manage.py migrate

deps-export:
	poetry export --with dev --without-hashes -f requirements.txt -o requirements.txt

