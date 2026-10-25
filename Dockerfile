
FROM oven/bun:1-slim AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile


FROM oven/bun:1-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build


FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    HOME=/home/appuser

# Create an unprivileged runtime user
RUN groupadd --system --gid 10001 appuser \
    && useradd --system --uid 10001 --gid 10001 \
       --home-dir /home/appuser --create-home \
       --shell /usr/sbin/nologin appuser

# Copy only the production build artifacts
COPY --from=builder --chown=10001:10001 /app/public ./public
COPY --from=builder --chown=10001:10001 /app/.next/standalone ./
COPY --from=builder --chown=10001:10001 /app/.next/static ./.next/static

# Run as non-root
USER 10001:10001

EXPOSE 3000

CMD ["bun", "server.js"]
