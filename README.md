# Portfolio Backend

NestJS + TypeORM + PostgreSQL backend for a developer portfolio.

## What this repo now provides

- PostgreSQL as the authoritative data source
- Dockerized local database
- Environment validation at startup
- Modular NestJS structure for portfolio data
- TypeORM migration support
- Seed data for local development
- Public portfolio read endpoints
- Protected-contact-ready architecture
- Redis-ready service boundaries for a future caching phase

## Setup

### 1. Configure environment

Copy `.env.example` to `.env` and adjust values if needed.

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run migrations

```bash
npm run migration:run
```

### 5. Seed the database

```bash
npm run seed
```

### 6. Start the API

```bash
npm run start:dev
```

## Verification

- PostgreSQL should be reachable on port `5432`
- Database name should be `Portfolio`
- NestJS should start on port `3000`
- `GET /` returns a simple health response

## Available scripts



- `npm run build`
- `npm run start:dev`
- `npm run migration:generate`
- `npm run migration:run`
- `npm run migration:revert`
- `npm run seed`

## Notes

- `.env` is ignored by Git
- `.env.example` contains safe placeholders
- Database credentials are read from environment variables
- `synchronize` is disabled for production-style migrations

## Next phase

Redis can be added later behind the service layer without changing the controller contracts.

