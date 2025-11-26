# Juweria Project — Technology & Deployment Notes

## Overview
The platform is split into a React/Vite frontend (`src/`) and an Express/PostgreSQL backend (`server/`). Axios is used for all HTTP calls and both apps share the same `.env`-driven base URL convention so they can be deployed independently.

## Frontend Stack
- React 19 + TypeScript + Vite 7
- React Router 7 for routing
- Tailwind CSS for styling + custom utility classes
- Framer Motion / `motion` for animation
- Recharts for data visualizations (budget pie)
- Axios client wrapper (`src/api/axiosClient.ts`) that reads `VITE_API_URL`

### Key Commands
- `npm install` — install deps
- `npm run dev` — Vite dev server
- `npm run build` — type-check + production build (`dist/`)
- `npm run preview` — serve the production build locally

### Required Frontend Env
Create a `.env` (or host-specific config) with:
```
VITE_API_URL=https://your-backend-domain.com/api
```

- ## Backend Stack
- Node 20 + Express 4
- PostgreSQL via `pg`
- JWT auth with `jsonwebtoken`
- Password hashing with `bcryptjs` (pure JS, Render-friendly)
- `swagger-jsdoc` + `swagger-ui-express` for live API docs at `/docs`
- `dotenv` for configuration
- `nodemon` for hot-reload dev loop

### Key Commands
- `cd server && npm install`
- `npm run dev` — start with nodemon
- `npm run start` — production start (via plain node)

### Required Backend Env
Either provide a single `DATABASE_URL` or discrete PG vars. Minimum:
```
JWT_SECRET=change-me
DATABASE_URL=postgres://user:pass@host:5432/juweria
# or PGHOST / PGUSER / PGPASSWORD / PGDATABASE / PGPORT
```

## Deployment Checklist
1. **Backend**
   - Provision PostgreSQL + set env vars.
   - Run `npm install`, then `npm run start`.
   - Expose the API under `https://<backend>/api`.
   - Serve Swagger via the built-in `/docs` UI (backed by `swagger-jsdoc`). `/docs.json` exposes the raw spec if your instructor needs a downloadable artifact.
2. **Frontend**
   - Set `VITE_API_URL` to the deployed backend URL.
   - Run `npm run build`; deploy the `dist/` folder (e.g., Netlify, Vercel, S3).
   - Verify all protected routes work via the live site (register, login, CRUD screens).
3. **Smoke Tests**
   - Register + login via the hosted UI (ensures API + cookies + JWT are aligned).
   - Hit `/api/donations/summary`, `/api/activities`, `/api/hygiene` using a REST client to confirm aggregates and protected endpoints.
   - Load the deployed Swagger URL to ensure documentation is reachable.

## Additional Notes
- Database schema is bootstrapped automatically at server start (`server/index.js`), and manual SQL lives in `server/sql/init.sql`.
- Hygiene and resource tables are created lazily if missing; no extra migration tooling is required.
- The `docs/swagger.yaml` file mirrors the current REST surface and should be published (e.g., SwaggerHub) before submitting the final project.
- The auto-generated docs at `/docs` are derived from inline annotations in `server/routes/*.js`; regenerate or export the JSON if you need a static copy.

## Submission Checklist
1. **GitHub**
   - Initialise two public repos (e.g., `juweria-frontend`, `juweria-backend`).
   - Copy this workspace into separate folders (`frontend/`, `server/`), run `git init`, commit, then `git remote add origin <repo-url>` and `git push -u origin main`.
   - Enable GitHub Pages (frontend) only if you want an alternate static host; Render/Vercel is fine otherwise.
2. **Documentation Packet**
   - Export this `docs/technology-stack.md` (or link the file in both READMEs).
   - Add the deployed URLs + Swagger endpoint to each README under a “Submission” section.
   - If the instructor needs a PDF, print this Markdown using VSCode/Markdown preview.
3. **Links to Share**
   - Frontend live URL (e.g., `https://juweria-frontend.onrender.com`).
   - Backend live URL (e.g., `https://juweria-backend.onrender.com/api`).
   - Swagger UI URL (`https://juweria-backend.onrender.com/docs`) and JSON (`/docs.json`).
   - Public GitHub repo links for both codebases.

