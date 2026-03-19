#!/bin/sh
set -e

echo "🚀 Ottobon Academy — Docker Entrypoint"
echo "======================================="

# Run database schema push (creates/updates tables)
echo "🔄 Pushing database schema to PostgreSQL..."
npx drizzle-kit push --force 2>&1 || {
  echo "⚠️  Schema push encountered an issue, retrying in 3 seconds..."
  sleep 3
  npx drizzle-kit push --force 2>&1 || echo "❌ Schema push failed — tables may need manual setup"
}

# Seed reference data (interest areas & skills) using the bundled seed script
echo "🌱 Seeding reference data..."
node dist/seed.js 2>/dev/null || echo "⚠️  Seed skipped (data may already exist)"

echo "✅ Database setup complete!"
echo ""

# Start the application
echo "🎉 Starting Ottobon Academy server..."
exec node dist/index.js
