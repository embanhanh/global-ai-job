# System Patterns

## Architecture

- **Next.js 16 (App Router)**: Sử dụng kiến trúc hiện đại nhất của Next.js.
- **Server-First Strategy**: Mặc định sử dụng React Server Components (RSC). `use client` chỉ dùng cho các form tương tác và hooks.
- **Locale-based Routing**: Toàn bộ routes nằm trong `[locale]` dynamic segment.

## Key Technical Decisions

1.  **i18n Implementation**: Sử dụng `next-intl` kèm theo file `proxy.ts` (thay thế cho `middleware.ts` truyền thống trong Next.js 16) để xử lý định tuyến ngôn ngữ.
2.  **Authentication**: Tích hợp **Supabase Auth** cho Email/Password và Social Logins (Google, Github).
3.  **Styling**: Sử dụng **Tailwind CSS v4** với cấu trúc tinh gọn, bỏ qua `tailwind.config.js` để tối ưu hóa PostCSS.
4.  **Components**: Tùy biến **Shadcn UI** thủ công để tương thích hoàn toàn với Tailwind v4 và phong cách Glassmorphism.

## Design Patterns

- **Shared Components**: Tách biệt các logic UI chung như `AuthCard`, `SocialAuth` để tái sử dụng trên nhiều trang Auth.
- **Form Patterns**: Sử dụng `react-hook-form` kết hợp với `zod` để validate dữ liệu ở phía Client, đồng bộ với translations message từ i18n.
- **Pagination & Search Pattern**:
  - **Server-driven**: Trạng thái tìm kiếm và trang hiện tại được lưu trên URL (searchParams).
  - **Shared UI**: Thành phần `Pagination` được thiết kế linh hoạt cho nhiều bảng dữ liệu. `SearchInput` sử dụng debouncing (500ms) để giảm tải cho server.
  - **Server Actions**: `getJobs` hỗ trợ range-query trong Supabase để lấy dữ liệu theo trang hiệu quả.
- **AI Interaction**: Toàn bộ CV được parse sang Markdown giúp AI (Vercel AI SDK) xử lý context tốt hơn.
- **Database Architecture**:
  - Sử dụng Supabase làm DB chính với PostgreSQL.
  - Áp dụng Row Level Security (RLS) triệt để để phân quyền dữ liệu giữa Recruiter và Candidate.
  - Sử dụng bảng trung gian `recruiter_companies` để quản lý quyền truy cập của nhà tuyển dụng vào dữ liệu công ty.

## Folder Structure Highlights

- `/app/[locale]/(auth)`: Nhóm các route phục vụ xác thực.
- `/messages`: Chứa file JSON bản dịch (`vi.json`, `en.json`).
- `/components/forms`: Tập hợp các logic form xác thực phức tạp.
- `/i18n`: Chứa cấu hình routing và navigation logic.
