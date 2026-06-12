#!/usr/bin/env bash
set -euo pipefail

echo "Generating Prisma client..."
pnpm db:generate

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Pushing schema to database..."
  pnpm db:push
else
  echo "DATABASE_URL not set, skipping db:push"
fi

echo "Building packages..."
pnpm --filter @repo/database build
pnpm --filter @repo/api build

echo "Build complete."
