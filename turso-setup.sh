#!/bin/bash
# Turso Database Setup for CasePrep
# Install Turso CLI: curl -sSfL https://get.tur.so/install.sh | bash

set -e

echo "🗄️  Setting up Turso database for CasePrep..."

# Create database
turso db create caseprep
echo "✅ Database created"

# Get the URL
DB_URL=$(turso db show caseprep --url)
echo "📍 Database URL: $DB_URL"

# Create auth token
AUTH_TOKEN=$(turso db tokens create caseprep)
echo "🔑 Auth token created"

echo ""
echo "Add these to your .env (and Vercel environment variables):"
echo ""
echo "TURSO_DATABASE_URL=$DB_URL"
echo "TURSO_AUTH_TOKEN=$AUTH_TOKEN"
echo ""
echo "Then run the Better Auth migration:"
echo "  npx @better-auth/cli migrate"
