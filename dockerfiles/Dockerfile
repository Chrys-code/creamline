# ------------------------
# Base Python stage
# ------------------------
FROM python:3.13

WORKDIR /app

# Environment setup
ENV PYTHONPATH=/app

# Install Python and Postgres build deps
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    python3-dev \
    musl-dev \
    curl \
    git \
    gettext
    
# Install pip deps
COPY /src/services/requirements.txt .
RUN python3 -m pip install --upgrade pip && python3 -m pip install -r requirements.txt

COPY src/services/ .