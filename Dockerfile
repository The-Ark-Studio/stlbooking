# Bước 1: Sử dụng image refinedev/node:18
FROM refinedev/node:18 AS base

# Bước 2: Bước phụ thuộc
FROM base AS deps

RUN apk add --no-cache libc6-compat

# Bước 3: Thiết lập thư mục làm việc
WORKDIR /stl/fe

# Bước 4: Sao chép các file cấu hình vào thư mục làm việc
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Bước 5: Cài đặt các dependency
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm install --frozen-lockfile; \
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
RUN pnpm run build

# Bước 9: Bước chạy
FROM base AS runner

# Thiết lập lại thư mục làm việc
WORKDIR /stl/fe

# Sao chép các file cần thiết vào thư mục làm việc
COPY --from=builder /stl/fe/public ./public

# Tạo thư mục .next và thay đổi quyền sở hữu
RUN mkdir -p .next && chown -R refine:nodejs .next

# Sao chép các file cần thiết từ bước builder
COPY --from=builder --chown=refine:nodejs /stl/fe/.next/standalone ./
COPY --from=builder --chown=refine:nodejs /stl/fe/.next/static ./.next/static

# Chuyển sang user refine
USER refine

# Mở port 2000
EXPOSE 2000

# Thiết lập các biến môi trường
ENV NODE_ENV production
ENV PORT 2000
ENV HOSTNAME "0.0.0.0"

# Lệnh khởi động
CMD ["node", "server.js"]
