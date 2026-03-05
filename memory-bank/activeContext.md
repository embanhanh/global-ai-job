## Current Focus

Dự án đã hoàn thành việc refactor toàn diện các trang công khai (Home, Job Listing, Job Detail) và các component dùng chung theo tiêu chuẩn `vibe-next-rules.md`. Trọng tâm hiện tại chuyển sang **Candidate Dashboard**, hệ thống **AI Resume Parser** và hoàn thiện các tính năng nâng cao cho **Recruiter Dashboard**.

## Recent Changes

- **Public Job Pages**:
  - Triển khai **Home Page** với Hero section sống động, Stats section và Featured Jobs.
  - **Job Listing Page Refactor**:
    - Mô-đun hóa thành các component nhỏ: `JobSearchHeader`, `JobFilters`, `JobListHeader`, `JobListEmpty`.
    - Triển khai lọc, tìm kiếm và phân trang hoàn toàn qua URL `searchParams` (Server-First).
    - Loại bỏ hoàn toàn `any` type, chuẩn hóa `JobSearchParams` interface.
    - Sửa lỗi layout overlap giữa header tìm kiếm và danh sách công việc.
  - **Shared Components Refactor**:
    - `LanguageSwitcher`, `HomeHero`, `JobCard` đã được quốc tế hóa 100% (không còn hardcoded strings).
    - `JobCard` hỗ trợ format ngày tháng theo locale (`vi` / `enUS`).
- **Data Integration**: Thay thế mock data bằng dữ liệu thực từ Supabase trong toàn bộ luồng Public Jobs.

- **Candidate Dashboard & RBAC**:
  - **Full Dashboard Implementation**: Hoàn thành toàn bộ các trang: Overview, Applications, Saved Jobs, Profile, và Settings cho Ứng viên.
  - **RBAC System**: Triển khai `RoleGuard` và `UserRole` enum để phân quyền truy cập.
  - **Layout Isolation**: Tách biệt layout cho Recruiter và Candidate, sửa lỗi rò rỉ Header/Sidebar giữa các vai trò.
  - **i18n Expansion**: Hoàn thiện 100% bản dịch cho Candidate Dashboard và Header role-aware.
  - **Type Sync**: Chuẩn hóa types và schemas giữa các module Candidate và Jobs.

- **Job Detail Command Center**:
  - **Applicants Tab**: Bảng ứng viên chuyên sâu với tìm kiếm (debounced 500ms), lọc theo vòng (Hiring Stages), và phân trang Server-First.
  - **Job Content Tab**: Hiển thị đầy đủ thông tin: Job Type, Location, Salary, Requirements và AI Scoring/Suggestions.
  - **Hiring Workflow**: Kanban Board cho phép kéo thả ứng viên giữa các bước. Cơ chế DND sử dụng `useRef` để theo dõi `initialStage`, đảm bảo cập nhật DB chính xác.
- **Job Application System Refactor**:
  - **Modular UI**: Split `ApplyJobDialog` into `ApplyForm` to adhere to line-count limits and improve maintainability.
  - **Clean Architecture**: Moved data fetching from `ApplyJobDialog` (client `useEffect`) to `JobDetailPage` (Server Component) to comply with Server-First rules.
  - **Independent Storage Model**: Personal information (`full_name`, `email`, `phone`) is now stored directly in the `applications` record during submission.
  - **Type Management**: Centrally located application schemas and interfaces in `types/applications.ts`.
  - **i18n & UX**: 100% translated validation/UI strings. Profile data is now pre-fetched on the server for instant dialog population.

- **Auth & Security Simplification (RLS-First)**:
  - **RLS Reliance**: Removed redundant server-side `auth.getUser()` and manual `user.id` filtering in Server Actions. The system now trusts database-level security boundaries.
  - **Database Defaults**: Implemented `DEFAULT auth.uid()` for critical foreign keys (`candidate_id` in applications, `recruiter_id` in jobs, `profile_id` in recruiter_companies) to automate ownership assignment.
  - **Minimal Server Logic**: Server Actions are now more concise, focusing on business logic while Postgres/RLS handles the "who can do what".

## Next Steps

1.  **AI Resume Parser Internal Logic**: Hoàn thiện logic xử lý file thật (PDF to Markdown) thay vì mock.
2.  **Job Analytics Tab**: Triển khai biểu đồ và báo cáo hiệu quả tuyển dụng cho từng job.
3.  **Real Data Integration**: Kết nối Candidate Dashboard với real database (Applications, Saved Jobs).
4.  **Social Login**: Tích hợp Google và Github OAuth.

- **RLS-First Security**: Chuyển từ việc kiểm tra Auth thủ công trong code sang tin cậy hoàn toàn vào Row Level Security (RLS) và Database Defaults. Điều này giúp giảm độ phức tạp của Server Actions và đảm bảo bảo mật ở tầng sâu nhất.
- **Application Info Snapshoting**: Lưu thông tin cá nhân trực tiếp vào bản ghi ứng tuyển (`applications`) thay vì đồng bộ ngược lại Profile. Quyết định này giúp giữ Profile nguyên bản và tăng tính linh hoạt cho ứng viên khi nộp đơn.
- **Form Schema Centralization**: Di chuyển toàn bộ Zod Schemas liên quan đến form ứng tuyển vào thư mục `types/` để đảm bảo tính tái sử dụng và sạch sẽ cho component UI.
