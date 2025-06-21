# Email Creator

A block based email template editor. Email templates can be built on a block-by-block basis. These blocks can be many types starting from rich text through image blocks to more complex layouts. Some features are ordering, image sizing, colour selection etc..

## Requirements

- Docker desktop
- Poetry

## Installation

### Notes: 
- There are 2 apps you might need: The app (backend that serves frontend) & a separate frontend
- The app build provides the whole app as backend that serves frontend from ./src/frontend/dist build
- The frontend build provides frontend with hot-reload separately 
- Makefile contains all the necessary commands to build and start

### Steps:
Follow the commands in terminal:

#### Starting the app:
- (Start Docker)
- make build
- make start
- make migrate

#### Starting frontend separately:
- Depends on "Starting the app"
- make build-fe
- make start-fe

In order to reflect the changes of frontend you made during development you will have to build the frontend app and refresh the app itself at port: 8080

## Migration:

### Steps:
Follow the commands in terminal:

- make make-migrations
- make migrate
