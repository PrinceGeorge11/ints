# IIT Onboarding (Render-ready Monorepo)

This repo contains:
- `apps/web` — Vite + React + Tailwind frontend (multilingual, protected dashboard, IIT styling)
- `apps/api` — Express API with cookie auth (demo in-memory store; ready to swap for a DB)

## Blueprint deploy (Render)
1) Push this repo to GitHub.
2) In Render → **New → Blueprint** → connect the repo.
3) After first deploy, update env vars:
   - Web (`apps/web`): `VITE_API_BASE_URL = https://<your-api>.onrender.com/api`
   - API (`apps/api`):  `WEB_ORIGIN = https://<your-web>.onrender.com`
4) Redeploy both services.

## Local Dev
```bash
# Web
cd apps/web
npm i
npm run dev

# API
cd ../api
npm i
npm start
```
