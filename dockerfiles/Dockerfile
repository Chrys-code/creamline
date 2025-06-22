# ------------------------
# Base Python stage
# ------------------------
FROM python:3.13-alpine3.21 AS base

RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

# Environment setup
ENV PYTHONPATH=/app/src \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install Python and Postgres build deps
RUN apk add --no-cache \
    build-base \
    libpq \
    libpq-dev \
    python3-dev \
    musl-dev \
    curl \
    git

# Install pip deps
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# ------------------------
# Frontend build stage
# ------------------------
FROM node:24.2-alpine AS builder

WORKDIR /src
COPY src/frontend/. .
RUN npm ci --silent
RUN npm run build

# ------------------------
# Nginx stage
# ------------------------
FROM nginx:alpine
COPY --from=builder /src/dist /usr/share/nginx/html    

# ------------------------
# Django stage
# ------------------------
FROM base AS final

WORKDIR /app

RUN apk add --no-cache nginx

COPY src /app/src

RUN python3 /app/src/manage.py collectstatic --noinput

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8080"]