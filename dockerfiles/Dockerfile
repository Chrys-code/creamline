# ------------------------
# Base Python stage
# ------------------------
FROM python:3.13-alpine3.21

WORKDIR /app

# Environment setup
ENV PYTHONPATH=/app

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
COPY /src/services/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY src/services/ .