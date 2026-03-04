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
- [x] User Profile setup (Database Table & Sync).
- [x] Khởi tạo Database Schema cho Recruiter Dashboard (Jobs, Companies, Applications).

### Phase 3: Dashboard & AI Features

- [x] Candidate Dashboard UI Layout.
- [x] Recruiter Dashboard (Overview, Jobs, Applicants, Search) - UI & Database.
- [ ] Resume Upload & AI Markdown Parser.
- [x] Job Posting & Editing Logic (UI & AI Assistant).
- [x] Search & Pagination for Jobs.
- [x] **Job Detail Command Center** (Applicants, Content, Workflow).
- [ ] Job Analytics & Reporting.

## Current Status

- **Hệ thống**: Stable (Auth & UI).
- **Recruiter Dashboard**: Đã hoàn thiện chức năng CRUD Job và **Job Detail Command Center** (với Applicants Table & Kanban Board).
- **Tính năng xác thực**: Đã hoạt động (Sử dụng Supabase Auth).
- **Backend**: Supabase client đã config, Auth actions đã tích hợp, Schema đồng bộ.

## Known Issues

- Cần đảm bảo `SearchInput` render đồng quán giữa Server và Client khi có default value phức tạp.
- Tiếp tục rà soát xóa các file legacy từ `create-next-app` nếu còn.
