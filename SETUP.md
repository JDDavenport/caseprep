# CasePrep AI — Setup Guide

## What's Already Done
- ✅ Better Auth (email/password + Google OAuth)
- ✅ Stripe Checkout integration ($9/mo subscription)
- ✅ Webhook endpoint for subscription status
- ✅ Auth + subscription gating on /api/analyze
- ✅ Rate limiting: 50 analyses per month per subscriber
- ✅ Landing page with pricing + sign-up CTA
- ✅ Sign in/sign up/dashboard pages
- ✅ SQLite database (auto-created as auth.db)

## What JD Needs to Do

### 1. Stripe Setup (Required)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **test** Secret Key and Publishable Key
3. Create a product + price:
   - Product: "CasePrep Pro" → $9/month recurring
   - Copy the Price ID (starts with `price_`)
4. Set up webhook:
   - Go to Developers → Webhooks → Add endpoint
   - URL: `https://your-domain.com/api/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the webhook signing secret
5. Update `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   STRIPE_PRICE_ID=price_...
   ```

### 2. Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID
3. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google` (and your production URL)
4. Update `.env`:
   ```
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```

### 3. OpenAI Key
```
OPENAI_API_KEY=sk-...
```

### 4. For Production (Vercel)
- Add all env vars to Vercel project settings
- **Important:** SQLite won't work on Vercel serverless. For production, switch to:
  - Turso (free tier, SQLite over HTTP)
  - Vercel Postgres
  - PlanetScale
- Update `src/lib/auth.ts` and `src/lib/subscription.ts` with the production DB adapter

## Running Locally
```bash
npm install
npm run dev  # runs on port 3000
```

## Auth Flow
1. User signs up at /sign-up
2. Redirected to /pricing
3. Clicks "Get Started" → /sign-up or /dashboard
4. On dashboard, clicks "Subscribe" → Stripe Checkout
5. After payment, webhook updates subscription status
6. User can now use /analyze (up to 50/month)
