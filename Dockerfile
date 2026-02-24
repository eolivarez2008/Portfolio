# --- Stage 1: Dépendances ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npm install

# --- Stage 2: Build ---
FROM node:20-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY

ARG NEXT_PUBLIC_UPTIME_KUMA_PUBLIC_URL
ENV NEXT_PUBLIC_UPTIME_KUMA_PUBLIC_URL=$NEXT_PUBLIC_UPTIME_KUMA_PUBLIC_URL

ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID

ARG ADMIN_SECRET
ENV ADMIN_SECRET=$ADMIN_SECRET

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG TURNSTILE_SECRET_KEY
ENV TURNSTILE_SECRET_KEY=$TURNSTILE_SECRET_KEY

ARG DISCORD_CONTACT_WEBHOOK_URL
ENV DISCORD_CONTACT_WEBHOOK_URL=$DISCORD_CONTACT_WEBHOOK_URL

ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate
RUN npm run build

# --- Stage 3: Runner ---
FROM node:20-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]