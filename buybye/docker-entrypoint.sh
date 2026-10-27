#!/bin/sh
set -e

echo "Applying migrations..."
npx prisma migrate deploy

echo "Seeding the database..."
npx prisma db seed

echo "Starting Next.js..."
exec npm run dev -- -H 0.0.0.0
