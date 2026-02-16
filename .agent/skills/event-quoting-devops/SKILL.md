---
name: event-quoting-devops
description: Guides the configuration of DevOps practices, environment variables, CI/CD, and deployment strategies for the project.
---

# Event Quoting DevOps Skill

This skill ensures the project is deployable, maintainable, and secure from Day 1.

## Environment Variables

**Rule**: Never commit secrets. Use `.env` for local and secrets management in production.

### Required Variables
*   `NODE_ENV`: `development` | `staging` | `production`.
*   `DATABASE_URL`: Connection string for PostgreSQL.
*   `PORT`: Server port.
*   `JWT_SECRET`: For admin authentication.
*   `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS`: For sending emails.

### `.env.example`
Maintain an up-to-date example file with dummy values committed to the repo.

## Scripts (package.json)

Standardize the developer interface.

```json
"scripts": {
  "dev": "next dev",           // Start localdev
  "build": "next build",       // Build for prod
  "start": "next start",       // Run prod build
  "lint": "eslint .",          // Check code style
  "test": "jest",              // Run unit tests (especially Pricing Engine)
  "db:migrate": "prisma migrate deploy", // Apply DB changes
  "db:generate": "prisma generate"       // Update client
}
```

## Deployment Strategy

### Staging vs Production
*   **Staging**: Deploys automatically on push to `develop` branch. Uses a separate DB.
*   **Production**: Deploys on Release Tag or manual approval from `main`.

### Hosting (VPS / Docker)
For a cost-effective, controllable setup:

1.  **Dockerize**: Create a `Dockerfile` for the app.
2.  **Orchestration**: Use `docker-compose.yml` to define App + DB (if local) + Reverse Proxy (Nginx/Traefik).

**Sample `Dockerfile` (Node/Next.js)**:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

## CI/CD (Automation)

*   **GitHub Actions**: Recommended for running `npm test` and `npm run lint` on every Pull Request.
*   **n8n Integration**: Use n8n Webhooks to trigger specific operational tasks (e.g., "New Deployment Notification" to Slack/WhatsApp).
