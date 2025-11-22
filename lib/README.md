# Prisma Database Setup

This project uses Prisma with PostgreSQL for database management.

## Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"
```

For Vercel deployment, the `DATABASE_URL` will be automatically set from your Vercel Postgres database.

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Run Migrations

```bash
# Create a new migration
npx prisma migrate dev --name init

# Or push schema changes directly (for development)
npx prisma db push
```

### 4. View Database (Optional)

```bash
npx prisma studio
```

## Schema

The database schema includes:
- **Brand**: Film brands with name, location, and coating information
- **Film**: Films with ISO, development process, availability, and formats
- **FilmToParent**: Parent-child relationships between films

## Usage

Import the database functions:

```typescript
import { getAllFilms, getFilmById } from "@/app/utils/database";

// Get all films with relationships
const films = await getAllFilms();

// Get a single film by ID
const film = await getFilmById(1);
```

## Vercel Deployment

1. Add a Postgres database in your Vercel project
2. The `DATABASE_URL` environment variable will be automatically set
3. Run migrations during build or use `prisma db push` in your build command

