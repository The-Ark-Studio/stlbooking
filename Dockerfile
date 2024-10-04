# Bước 1: Sử dụng image refinedev/node:18
FROM refinedev/node:18 AS base

# Bước 2: Bước phụ thuộc
FROM base AS deps

RUN apk add --no-cache libc6-compat

# Cài đặt pnpm
RUN npm install -g pnpm

# Bước 3: Thiết lập thư mục làm việc
WORKDIR /stl/fe

# Bước 4: Sao chép các file cấu hình vào thư mục làm việc
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Bước 5: Cài đặt các dependency
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Bước 6: Bước xây dựng
FROM base AS builder

# Thiết lập lại thư mục làm việc
WORKDIR /stl/fe

# Chép các node_modules từ bước deps
COPY --from=deps /stl/fe/node_modules ./node_modules

# Bước 7: Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Bước 8: Xây dựng ứng dụng
RUN npm run build

# Bước 9: Bước chạy
FROM base AS runner

ENV NODE_ENV production

# Thiết lập lại thư mục làm việc
WORKDIR /stl/fe

# Sao chép các file cần thiết vào thư mục làm việc
COPY --from=builder /stl/fe/public ./public

RUN mkdir .next
RUN chown refine:nodejs .next

COPY --from=builder --chown=refine:nodejs /stl/fe/.next/standalone ./
COPY --from=builder --chown=refine:nodejs /stl/fe/.next/static ./.next/static

USER refine

EXPOSE 2000

ENV PORT 2000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
