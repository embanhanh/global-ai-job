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
  - **Server-driven**: Trạng thái tìm kiếm và trang hiện tại được lưu trên URL (searchParams). Toàn bộ logic lọc và phân trang được xử lý thông qua việc đồng bộ URL để đảm bảo tính SEO và chia sẻ liên kết.
  - **Component Decomposition**: Tuân thủ nghiêm ngặt giới hạn 150 dòng bằng cách tách nhỏ các logic hiển thị (ví dụ: `JobFilters`, `JobSearchHeader`) ra khỏi page chính.
  - **Shared UI**: Thành phần `Pagination` được thiết kế linh hoạt cho nhiều bảng dữ liệu. `ApplicantTable` và `JobListing` đều sử dụng chung mô hình đồng bộ URL.
- **Drag-and-Drop (DND) Pattern**:
  - **Kanban Flow**: Sử dụng `@dnd-kit` cho bảng Kanban.
  - **State Tracking**: Sử dụng `useRef` (ví dụ `dragItemInitialStage`) để "chốt" giá trị ban đầu khi bắt đầu kéo, giải quyết xung đột khi state UI cập nhật trước Server Action trong `onDragEnd`.
  - **Optimistic UI**: Cập nhật state local (`applicants`) trong `onDragOver` để card di chuyển mượt mà, sau đó gọi Server Action trong `onDragEnd`.
- **Server Actions**: `getJobs` và `getApplicationsByJobId` hỗ trợ range-query trong Supabase để lấy dữ liệu theo trang hiệu quả.
- **AI Interaction**: Toàn bộ CV được parse sang Markdown giúp AI (Vercel AI SDK) xử lý context tốt hơn.
- **Database Architecture**:
  - Sử dụng Supabase làm DB chính với PostgreSQL.
  - **RLS-First Strategy**: Áp dụng Row Level Security (RLS) triệt để. Các quan hệ sở hữu được xác thực trực tiếp tại tầng database thông qua các chính sách (Policies), giúp tối giản hóa logic trong Server Actions.
  - **Automated Ownership**: Sử dụng `DEFAULT auth.uid()` cho các trường `candidate_id`, `recruiter_id`, và `profile_id` để tự động hóa việc gán quyền sở hữu khi tạo bản ghi mới.
  - **Application Snapshotting**: Hệ thống lưu bản sao thông tin cá nhân (`full_name`, `email`, `phone`) tại thời điểm ứng tuyển vào bảng `applications`. Điều này tách biệt hồ sơ ứng tuyển với Profile người dùng, cho phép thay đổi thông tin liên lạc mà không ảnh hưởng đến hồ sơ chính.
  - Sử dụng bảng trung gian `recruiter_companies` để quản lý quyền truy cập của nhà tuyển dụng vào dữ liệu công ty.
- **Role-Based Access Control (RBAC) Pattern**:
  - **UserRole Enum**: Định nghĩa tập trung các quyền (`ADMIN`, `RECRUITER`, `CANDIDATE`) trong `types/enums.ts`.
  - **RoleGuard Component**: Server Component (`components/shared/role-guard.tsx`) dùng để bảo vệ các phân đoạn UI nhạy cảm dựa trên role của session hiện tại.
- **Layout Isolation Pattern**:
  - **Route Group Layouts**: Tách biệt hoàn toàn layout cho từng role (ví dụ: `app/[locale]/(dashboard)/recruiter/layout.tsx` và `app/[locale]/(dashboard)/candidate/layout.tsx`).
  - **Clean Shared Layout**: Layout gốc `(dashboard)/layout.tsx` chỉ đóng vai trò là một pass-through wrapper, tránh rò rỉ UI (như header của nhà tuyển dụng hiện trên trang của ứng viên).
  - **Role-Aware Components**: Component dùng chung như `DashboardHeader` có khả năng tự thay đổi nội dung (tiêu đề, menu) dựa trên vai trò của người dùng được lấy từ `getCurrentRole()`.
- **i18n & Type Safety Pattern**:
  - **Zero-Hardcoded**: Tuyệt đối không để text cứng trong JSX. Sử dụng `useTranslations` (client) hoặc `getTranslations` (server).
  - **Strict Interface**: Sử dụng Zod hoặc explicit Interface cho toàn bộ props và data từ server để loại bỏ `any`.
  - **Locale-aware Assets**: Sử dụng các thư viện như `date-fns` kết hợp với locale của `next-intl` để định dạng thời gian chuẩn xác.

## Folder Structure Highlights

- `/app/[locale]/(auth)`: Nhóm các route phục vụ xác thực.
- `/messages`: Chứa file JSON bản dịch (`vi.json`, `en.json`).
- `/components`: Chứa các UI components, phân chia theo module (shared, dashboard, forms).
- `/actions`: Chứa các Server Actions cho mutations (insert, update, delete). Tuân thủ format trả về `{ success, data, error }`.
- `/services`: Chứa các query logic và tương tác trực tiếp với database (Supabase).
- `/types`: Định nghĩa các TypeScript interfaces, enums và Zod schemas dùng chung toàn ứng dụng.
- `/i18n`: Chứa cấu hình routing và navigation logic.
