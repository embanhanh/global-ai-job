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
- **Optimistic-Debounce Pattern**:
  - **Immediate Feedback**: Sử dụng `useOptimistic` bên trong `startTransition` để cập nhật trạng thái UI ngay lập tức khi người dùng click (ví dụ: Toggle switches).
  - **Controlled Calls**: Sử dụng `useDebouncedCallback` để gộp các yêu cầu API lại, chỉ thực hiện cập nhật database sau một khoảng thời gian chờ (delay) nhất định. Pattern này cực kỳ hữu hiệu cho các settings thay đổi liên tục.
  - **Transition Safety**: Toàn bộ cập nhật optimistic phải được bọc trong `startTransition` để đảm bảo tuân thủ cơ chế render của React 18+.
- **Drag-and-Drop (DND) Pattern**:
  - **Kanban Flow**: Sử dụng `@dnd-kit` cho bảng Kanban.
  - **State Tracking**: Sử dụng `useRef` (ví dụ `dragItemInitialStage`) để "chốt" giá trị ban đầu khi bắt đầu kéo, giải quyết xung đột khi state UI cập nhật trước Server Action trong `onDragEnd`.
  - **Optimistic UI**: Cập nhật state local (`applicants`) trong `onDragOver` để card di chuyển mượt mà, sau đó gọi Server Action trong `onDragEnd`.
- **CV & Storage Pattern**:
  - **Supabase Storage**: Sử dụng bucket `resumes` để lưu trữ file CV của ứng viên.
  - **Client-Side Upload**: Thực hiện upload file trực tiếp từ Client Component (sử dụng Supabase Client) trước khi gọi Server Action để lưu URL/Path vào database.
- **Server Actions & Logic Separation**:
  - **Mutations via Actions**: Mọi thao tác thay đổi dữ liệu (Insert, Update, Delete) bắt buộc phải nằm trong `/actions`.
  - **Queries via Services**: Logic truy vấn dữ liệu phức tạp hoặc reuse được tách vào `/services`.
  - **Revalidation**: Sử dụng `revalidatePath` trong actions để đảm bảo UI cập nhật dữ liệu mới nhất sau khi mutation thành công.
- **AI Interaction**: Toàn bộ CV được parse sang Markdown giúp AI (Vercel AI SDK) xử lý context tốt hơn.
- **Database Architecture**:
  - Sử dụng Supabase làm DB chính với PostgreSQL.
  - **RLS-First Strategy**: Áp dụng Row Level Security (RLS) triệt để. Các quan hệ sở hữu được xác thực trực tiếp tại tầng database thông qua các chính sách (Policies), giúp tối giản hóa logic trong Server Actions.
  - **Automated Ownership**: Sử dụng `DEFAULT auth.uid()` cho các trường `candidate_id`, `recruiter_id`, và `profile_id` để tự động hóa việc gán quyền sở hữu khi tạo bản ghi mới.
  - **Application Snapshotting**: Hệ thống lưu bản sao thông tin cá nhân (`full_name`, `email`, `phone`) tại thời điểm ứng tuyển vào bảng `applications`. Điều này tách biệt hồ sơ ứng tuyển với Profile người dùng, cho phép thay đổi thông tin liên lạc mà không ảnh hưởng đến hồ sơ chính.
  - **Postgres-First Logic**:
    - **Triggers**: Sử dụng trigger (như `on_profile_created_settings`) để tự động khởi tạo các trường dữ liệu mặc định phức tạp (JSONB) ngay tại tầng DB, đảm bảo dữ liệu luôn hợp lệ dù được tạo qua UI hay console.
    - **RLS-based Privacy**: Tích hợp logic nghiệp vụ nhạy cảm (như việc ẩn profile ứng viên) trực tiếp vào RLS logic: `USING ((settings->'privacy'->>'publicProfile')::boolean = true OR auth.uid() = id)`.
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
- **Error Handling Pattern**:
  - **Router-level Boundaries**: Sử dụng `error.tsx` cho từng phân đoạn route quan trọng (Dashboard, Job Details).
  - **Server-to-Error-Boundary Flow**: Các Server Components không tự bắt lỗi để hiển thị UI lỗi cục bộ mà thực hiện `throw new Error()`. Điều này kích hoạt Next.js Error Boundary, giúp đồng nhất trải nghiệm người dùng và cung cấp sẵn cơ chế retry thông qua hàm `reset()`.
  - **Global Error Logging**: `error.tsx` chịu trách nhiệm log lỗi ra các service giám sát (Sentry/Console) trước khi hiển thị UI cho người dùng.
- **AnimatePresence Layout Pattern**:
  - **PopLayout Smoothness**: Sử dụng `AnimatePresence mode="popLayout"` kết hợp với `layout` prop của framer-motion trong các grid danh sách (như Saved Jobs). Điều này giúp các item còn lại tự động tái sắp xếp vị trí một cách mượt mà khi một item bị xóa khỏi DOM, tránh hiện tượng "nhảy" layout đột ngột.
  - **Client-Wrapper Strategy**: Duy trì Server Component cho việc fetch dữ liệu gốc, nhưng bọc danh sách bằng một Client Component mỏng (`SavedJobsClient`) để quản lý các trạng thái animation và optimistic feedback cục bộ.

## Folder Structure Highlights

- `/app/[locale]/(auth)`: Nhóm các route phục vụ xác thực.
- `/messages`: Chứa file JSON bản dịch (`vi.json`, `en.json`).
- `/components`: Chứa các UI components, phân chia theo module (shared, dashboard, forms).
- `/actions`: Chứa các Server Actions cho mutations (insert, update, delete). Tuân thủ format trả về `{ success, data, error }`.
- `/services`: Chứa các query logic và tương tác trực tiếp với database (Supabase).
- `/types`: Định nghĩa các TypeScript interfaces, enums và Zod schemas dùng chung toàn ứng dụng.
- `/i18n`: Chứa cấu hình routing và navigation logic.
