# Wool Power Enterprise Web App

Premium crochet e-commerce storefront with secure admin access, structured architecture, and 3D-styled premium UI.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- CSS Modules + global design tokens
- `jose` for JWT session handling
- `zod` for server-side validation

## Project Structure

```text
src/
  app/                      # routes and layouts
    (shop)/
    (admin)/
  backend/
    actions/                # server actions
    constants/              # shared business constants
    security/               # auth/rate-limit helpers
  config/                   # site-wide config
  frontend/
    components/             # reusable UI blocks
    context/                # React state providers
public/                     # static brand/product assets
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   copy .env.example .env.local
   ```
3. Set strong values in `.env.local`:
   - `NEXTAUTH_SECRET` (32+ chars)
   - `ADMIN_PASSWORD` (16+ chars recommended)
   - Optional: `ADMIN_HOSTNAME=admin.yourdomain.com`
4. Run app:
   ```bash
   npm run dev
   ```

## Security Notes

- Admin route is protected by JWT + middleware/proxy checks.
- Login has validation, timing-safe comparison, and in-memory rate limiting.
- Security headers are enabled in `next.config.ts`.
- Never commit real secrets; use `.env.local` locally only.

## Production Checklist

- Use HTTPS at the edge/load balancer.
- Rotate secrets regularly.
- Add persistent datastore + managed auth provider for multi-admin environments.
- Add audit logging and centralized monitoring.

## Admin Subdomain Setup

The app supports isolated admin access via subdomain.

- Public shop: `https://yourdomain.com`
- Admin panel: `https://admin.yourdomain.com`

### 1) DNS

Create an `A`/`CNAME` record for `admin.yourdomain.com` pointing to the same server as the main app (or dedicated admin server if you split later).

### 2) Environment

Set:

```env
ADMIN_HOSTNAME=admin.yourdomain.com
```

### 3) Reverse Proxy (Nginx example)

```nginx
server {
  server_name yourdomain.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

server {
  server_name admin.yourdomain.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

With this setup, admin subdomain traffic is automatically redirected into the secure admin login flow.
# Wool-Power
