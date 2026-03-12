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

- [x] Candidate Dashboard UI Layout & Pages (Overview, My Applications, Profile, Saved Jobs, Settings).
- [x] Recruiter Dashboard (Overview, Jobs, Applicants, Search) - UI & Database.
- [x] RBAC System (RoleGuard, Role-aware Layouts).
- [x] i18n Completion for Dashboard modules.
- [x] Resume Upload & AI Markdown Parser (Real implementation).
- [x] Job Posting & Editing Logic (UI & AI Assistant).
- [x] Search & Pagination for Jobs (Server-First & Modular).
- [x] Refactor Public Components (`LanguageSwitcher`, `Hero`, `JobCard`) for Rule Compliance.
- [x] **Landing Page 3D & Animation Upgrade**: Tích hợp khối cầu 3D (R3F), migrate sang Anime.js v4, và refactor 100% i18n cho trang chủ (Stats, Top Employers).
- [x] **Public Company Directory & Detail**: Triển khai trang danh sách công ty và trang chi tiết (`/companies/[id]`) với filters, search, Skeletons (Zero CLS), JSON-LD Organization schema.
- [x] **Theme System Refactor**: Chuyển đổi toàn bộ UI sang kiến trúc hỗ trợ Light/Dark mode với CSS Variables đồng nhất, nâng cấp brand color palette (violet-indigo) trong `globals.css` và loại bỏ 100% hardcoded dark-only colors.
- [x] **Job Detail Command Center** (Applicants, Content, Workflow).
- [x] **Candidate Applications Real Data**: Kết nối bảng "My Applications" với Supabase, triển khai Zero CLS loading và error boundaries.
- [x] **Candidate Profile Real Data & Update**: Tích hợp dữ liệu thực, quản lý CV qua Supabase Storage, hỗ trợ kỹ năng, kinh nghiệm và học vấn. Tuân thủ 100% project rules (actions, services, loading, error).
- [x] **Shared Settings Page**: Triển khai trang cài đặt dùng chung cho cả Candidate & Recruiter với Optimistic UI, Debouncing, và RLS-based privacy.
- [x] **Saved Jobs Implementation**: Triển khai tính năng lưu việc làm với Optimistic UI, Server-First page refactor, và smooth unsave animations.
- [x] **Follow & Push Notification System**: Triển khai follows table, FCM integration, i18n-ready notifications và auto-topic subscription.
- [x] **Automated Notification Triggers**: Tự động thông báo khi có ứng tuyển mới hoặc tin tuyển dụng mới (Active). Hỗ trợ trigger khi Job chuyển từ Draft sang Active qua Edit/Toggle.
- [x] **Robust Auth & FCM Synchronization**: Triển khai Singleton Supabase Client, session-aware synchronization (`useLanguageSync`), và logout token clearance.
- [x] **Server-First Auth State Sync**: Refactor `LanguageSync` thành Server Component để truyền trực tiếp trạng thái đăng nhập cho client hook, giải quyết triệt để lỗi Client Supabase không lắng nghe được event sau Server Action login.
- [x] **Real-time FCM Topic Subscription**: Cập nhật action `toggleFollow` để sub/unsub trực tiếp vào FCM topic thay vì chỉ ghi nhận vào DB.
- [x] **Client-Side FCM Reception**: Lắng nghe `onMessage` (Firebase Messaging SDK) trong giao diện để hiển thị Toast và tăng số lượng thông báo chưa đọc theo thời gian thực (Foreground).
- [x] **Automated Activity Tracking System**: Logging activities dynamically via Postgres Triggers & Views instead of manual inserts inside Server Actions. Fixed security by creating `v_user_activities` with `security_invoker` and optimized profiles trigger to ignore login/DDB noise updates.
- [x] **Candidate Dashboard Stats**: Implemented filtering applications by stage and showing relevant stats on Candidate Dashboard with search params redirection.
- [x] **Route Protection and Sign-out**: Protected `/candidate` and `/recruiter` routes via `proxy.ts` middleware and handled strict `router.push('/')` after logout.
- [x] **Recruiter Jobs Management Extensions**: Bổ sung bộ lọc Status bằng URL SearchParams và Component `JobFilter` dựa trên shadcn, tối ưu hóa Card với action Quick Toggle Status. Fix lỗi cascading renders bằng cách loại bỏ hydration state.
- [x] **Next.js 15 Routing Compatibility**: Khắc phục dứt điểm lỗi crash `invalid input syntax for type uuid: "undefined"` khi truy cập trang chi tiết công ty bằng cách xử lý bất đồng bộ (`await`) cho dynamic `params` và thắt chặt validation tại Service layer.
- [x] **Natural Language Candidate Search**: Ứng dụng pgvector và Gemini để tìm kiếm ứng viên dùng ngôn ngữ tự nhiên, tính điểm tương đồng cosine với server actions.
- [ ] Job Analytics & Reporting (Next Focus)

1.  **AI Resume Parser Internal Logic**: Hoàn thiện logic xử lý file thật (PDF to Markdown) thay vì mock.
2.  **Job Analytics Tab**: Triển khai biểu đồ và báo cáo hiệu quả tuyển dụng cho từng job.
3.  **Social Login**: Tích hợp Google và Github OAuth.

## Current Status

- **Hệ thống**: Stable (Auth & UI).
- **Public Jobs & Companies**: Đã hoàn thiện refactor toàn diện (UI Theme, i18n, Zero CLS, Type-safe) cho mọi trang công khai.
- **Recruiter Dashboard**: Đã hoàn thiện chức năng CRUD Job, **Job Detail Command Center** và semantic search.
- **Tính năng xác thực**: Đã hoạt động (Sử dụng Supabase Auth).
- **Backend**: Supabase client đã config, Auth actions đã tích hợp, Schema đồng bộ với RLS policies và database defaults.

## Known Issues

- Cần đảm bảo `SearchInput` render đồng quán giữa Server và Client khi có default value phức tạp.
- Tiếp tục rà soát xóa các file legacy từ `create-next-app` nếu còn.
