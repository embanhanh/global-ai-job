# Progress

## What Works

- [x] Khởi tạo Project Next.js 16 + Tailwind v4.
- [x] Cấu hình Đa ngôn ngữ (VI/EN) với `next-intl`.
- [x] Giao diện Landing Page (Welcome Screen).
- [x] Giao diện Chọn vai trò (Candidate/Recruiter).
- [x] Form Đăng ký/Đăng nhập với validation Zod.
- [x] Giao diện Quên mật khẩu & Đặt lại mật khẩu.
- [x] Branding i18n nhất quán (Global AI Jobs).

## Left to Build

### Phase 2: Core Auth & Logic

- [x] Tích hợp Supabase Auth (Sign in / Sign up).
- [x] Logout functionality (Server Action).
- [x] Session management (SSR compatible / middleware).
- [x] Xử lý xác nhận Email và lỗi i18n ("Email not confirmed").
- [ ] User Profile setup (Database Table & Sync).

### Phase 3: Dashboard & AI Features

- [ ] Candidate Dashboard.
- [ ] Recruiter Dashboard.
- [ ] Resume Upload & AI Markdown Parser.
- [ ] Job Posting Logic.

## Current Status

- **Hệ thống**: Stable (Auth & UI).
- **Tính năng xác thực**: Đã hoạt động (Sử dụng Supabase Auth).
- **Backend**: Supabase client đã config, Auth actions đã tích hợp.

## Known Issues

- Zod validation message cần chuyển schema vào trong React Component để dịch trực tiếp (Đã xử lý cho các form chính).
- Cần dọn dẹp thêm các file legacy nếu còn sót lại từ `create-next-app`.
