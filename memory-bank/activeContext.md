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
- **Database & Sync**: Đồng bộ hóa `stage` ứng viên qua Server Actions, trigger `revalidatePath` để giữ dữ liệu FE luôn mới.

## Next Steps

1.  **AI Resume Parser Internal Logic**: Hoàn thiện logic xử lý file thật (PDF to Markdown) thay vì mock.
2.  **Job Analytics Tab**: Triển khai biểu đồ và báo cáo hiệu quả tuyển dụng cho từng job.
3.  **Real Data Integration**: Kết nối Candidate Dashboard với real database (Applications, Saved Jobs).
4.  **Social Login**: Tích hợp Google và Github OAuth.

## Active Decisions & Considerations

- **Server-First Pagination**: Sử dụng URL search parameters để quản lý trạng thái trang, giúp hỗ trợ SEO và chia sẻ liên kết tốt hơn.
- **Reusable Components**: Tách `Pagination` và `SearchInput` ra làm các component dùng chung (`components/shared` và `components/dashboard`) để tái sử dụng cho các module khác (như Talent Search).
- **Zod Schema Evolution**: Chuyển đổi mảng chuỗi đơn thuần sang mảng đối tượng trong `useFieldArray` để quản lý ID và giá trị tốt hơn trong form React.
