# # Bước 1: Sử dụng image refinedev/node:18
# FROM refinedev/node:18 AS base

# # Bước 2: Bước phụ thuộc
# FROM base AS deps

# RUN apk add --no-cache libc6-compat

# # Cài đặt pnpm
# RUN npm install -g pnpm

# # Bước 3: Thiết lập thư mục làm việc
# WORKDIR /stl/fe

# # Bước 4: Sao chép các file cấu hình vào thư mục làm việc
# COPY package.json pnpm-lock.yaml* yarn.lock* package-lock.json* .npmrc* ./

# # Kiểm tra xem package.json có được sao chép hay không
# RUN ls -la /stl/fe

# # Bước 5: Cài đặt các dependency
# RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
#   elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# # Bước 6: Bước xây dựng
# FROM base AS builder

# # Cài đặt pnpm trong bước builder
# RUN npm install -g pnpm

# # Thiết lập lại thư mục làm việc
# WORKDIR /stl/fe

# # Chép các node_modules từ bước deps
# COPY --from=deps /stl/fe/node_modules ./node_modules

# # Bước 7: Sao chép toàn bộ mã nguồn vào thư mục làm việc
# COPY . .

# # Kiểm tra xem mã nguồn đã được sao chép chưa
# RUN ls -la /stl/fe

# # Bước 8: Xây dựng ứng dụng
# RUN pnpm run build

# # Bước 9: Bước chạy
# FROM base AS runner

# # Cài đặt pnpm trong bước runner
# RUN npm install -g pnpm

# ENV NODE_ENV production

# # Thiết lập lại thư mục làm việc
# WORKDIR /stl/fe

# # Sao chép các file cần thiết vào thư mục làm việc
# COPY --from=builder /stl/fe/public ./public

# RUN mkdir .next
# RUN chown refine:nodejs .next

# # Chỉ copy thư mục static nếu standalone không tồn tại
# COPY --from=builder --chown=refine:nodejs /stl/fe/.next/static ./.next/static

# USER refine

# EXPOSE 2000

# ENV PORT 2000
# ENV HOSTNAME "0.0.0.0"

# CMD ["pnpm", "run", "start"]\

# Bước 1: Sử dụng image refinedev/node:18
FROM refinedev/node:18

# Bước 2: Cài đặt pnpm
RUN npm install -g pnpm

# Bước 3: Thiết lập thư mục làm việc
WORKDIR /stl/fe

# Bước 4: Sao chép các file cấu hình vào thư mục làm việc
COPY package.json pnpm-lock.yaml* yarn.lock* package-lock.json* .npmrc* ./

# Bước 5: Cài đặt các dependency
RUN pnpm install --frozen-lockfile

# Bước 6: Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Bước 7: Xây dựng ứng dụng
RUN pnpm run build

# Bước 8: Thiết lập biến môi trường và chạy ứng dụng
ENV NODE_ENV production
ENV PORT 2000
EXPOSE 2000

# Chỉ cần chạy lệnh start mà không cần gán PORT trong CMD
CMD ["pnpm", "run", "start"]

