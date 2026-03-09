Dự án đã hoàn thành việc triển khai hệ thống **Follow & Push Notification**, đồng thời refactor toàn diện các trang công khai và dashboard theo tiêu chuẩn `vibe-next-rules.md`. Trọng tâm hiện tại là hoàn thiện logic **AI Resume Parser** (PDF to Markdown), triển khai hệ thống **Automated Activity Tracking**, và xử lý triệt để các lỗi môi trường (server vs client) trong hệ thống service.

## Recent Changes.

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
- **Candidate Dashboard Integration**:
  - **Applications Page**: Thay thế dữ liệu mock bằng dữ liệu thực từ Supabase.
  - **Service Layer**: Triển khai `getApplicationsByCandidate` với nested joins (`jobs`, `companies`).
  - **UX Enhancement**: Thêm skeleton loading (`loading.tsx`) để đạt **Zero CLS** và trạng thái Empty State.
  - **Navigation**: Tích hợp `Link` từ `i18n/navigation` để chuyển hướng mượt mà đến chi tiết công việc.
- **Candidate Profile & CV Management Integration**:
  - **RSC-First Refactor**: Chuyển trang Profile sang Server Component để fetch dữ liệu profile ban đầu, sử dụng pattern mapping dữ liệu tại page để giữ service layer nguyên bản.
  - **Dynamic CV Management**: Triển khai giao diện thông minh: hiển thị link xem CV nếu đã có, và cho phép "Thay đổi CV" để upload file mới lên Supabase storage (`resumes` bucket).
  - **Skills Management**: Bổ sung `SkillsSection` và cập nhật `candidateProfileSchema` để hỗ trợ quản lý danh sách kỹ năng chuyên môn.
  - **Rules Compliance**: Bổ sung đầy đủ `loading.tsx` (Skeleton) và `error.tsx` cho router-level để đảm bảo Zero CLS và trải nghiệm người dùng tốt nhất.
  - **Refactoring Strategy**: Di chuyển toàn bộ logic mutation (`updateProfile`) từ service layer sang `actions/profile.actions.ts` để tuân thủ quy tắc: Actions xử lý mutations, Services xử lý queries.
  - **Database Fix**: Sử dụng Supabase MCP để phát hiện và bổ sung các cột thiếu (`skills`, `experience`, `education`) trực tiếp vào bảng `profiles`.
- **Shared Settings Page Implementation**:
  - **Unified Component**: Triển khai `SettingsForm` dùng chung cho cả Candidate và Recruiter, tuân thủ nghiêm ngặt quy tắc 150 dòng thông qua việc tách nhỏ thành `SettingsCard`, `ConfirmPrivacyDialog` và hook `useSettingsForm`.
  - **Optimistic UI with Transition**: Sử dụng `useOptimistic` kết hợp với `startTransition` để cập nhật UI tức thì và tránh lỗi "state update outside transition".
  - **Debounced Server Updates**: Tích hợp `useDebouncedCallback` (1s) để giảm tải cho server khi người dùng thay đổi settings liên tục.
  - **Type-Safe Schema**: Định nghĩa `UserSettings` và `userSettingsSchema` (Zod), loại bỏ hoàn toàn `any` trong toàn bộ luồng settings.
  - **Zero CLS & Resilience**: Bổ sung `loading.tsx` (Skeleton) và `error.tsx` cho cả hai route settings.
  - **Automated Defaults**: Thêm trigger Postgres `on_profile_created_settings` để tự động khởi tạo JSONB settings cho profile mới.
  - **RLS-based Privacy**: Cập nhật RLS policy để ẩn profile ứng viên nếu `publicProfile` là false.
- **Saved Jobs Feature Implementation**:
  - **Interactive Job Header**: Tích hợp nút "Lưu" vào `JobDetailHeader`, sử dụng `useOptimistic` để phản hồi tức thì và `toggleSaveJobAction` để xử lý persistence.
  - **RSC Saved Jobs Page**: Refactor toàn diện trang "Saved Jobs" từ Client sang Server Component, fetch dữ liệu qua `getSavedJobsByCandidate`.
  - **Optimistic Unsave Experience**: Triển khai `SavedJobsClient` với `AnimatePresence` (framer-motion) để card việc làm biến mất mượt mà khi người dùng bỏ lưu, kết hợp hoàn hảo giữa logic Server và trải nghiệm Client.
  - **Robust Handling**: Bổ sung `loading.tsx` (Skeleton) đồng nhất layout và `error.tsx` chuyên biệt cho route Saved Jobs.
  - **i18n & RBAC**: Hoàn thiện toàn bộ bản dịch và giới hạn tính năng chỉ dành cho `CANDIDATE`.
- **Follow & Push Notification System**:
  - **Database schema**: Triển khai các bảng `follows` và `notifications` (i18n-ready metadata).
  - **FCM Integration**: Tích hợp Firebase Client & Admin SDK để đẩy thông báo qua Browser.
  - **Foreground Reception**: Tích hợp `onMessage` vào `NotificationBell` để nhận push notifications real-time khi user đang hoạt động (kèm Toast UI và đếm unread).
  - **Multilingual Topics**: Tự động đăng ký người dùng vào các topic theo công ty và ngôn ngữ (vd: `company_[id]_[locale]`). Quản trị trực tiếp việc sub/unsub real-time trên FCM thông qua action `toggleFollow`.
  - **Robust Synchronization (`useLanguageSync`)**:
    - Refactor hook sử dụng `supabase.auth.onAuthStateChange` kết hợp với explicit session tracking (`session.user.id`).
    - Đảm bảo đồng bộ hóa topic và token ngay lập tức khi đăng nhập, chuyển đổi tài khoản hoặc thay đổi ngôn ngữ.
    - **Heartbeat Monitoring**: Thêm log nhịp tim (15s) và high-visibility logs (Emoji) để kiểm tra trạng thái hoạt động của hook trong Browser Console.
    - **Logout Sync**: Triển khai action `clearFCMToken` để xóa token trong Database khi người dùng đăng xuất, ngăn chặn việc gửi thông báo đến thiết bị đã thoát.
    - **Server-First Auth State Sync**: Refactor `LanguageSync` thành Server Component để tự động fetch session và truyền `userId` xuống client, giải quyết vấn đề trình duyệt không nhận được event `onAuthStateChange` từ các thao tác login/logout bằng Server Actions (`actions/auth.ts`).
  - **Singleton Supabase Client**: Chuyển đổi Supabase client ở phía trình duyệt sang pattern Singleton (`lib/supabase/client.ts`) để đảm bảo tất cả các component dùng chung một Auth listener và state duy nhất.
  - **Environment Safety Refactor**: Tách biệt logic truy vấn cho Server và Client trong hệ thống Service để tránh lỗi `next/headers`.
  - **i18n Fixed**: Xử lý triệt để các lỗi `MISSING_MESSAGE` và `INSUFFICIENT_PATH` thông qua phân tích của `next-mcp`.
  - **Automated Triggers**: Triển khai cơ chế tự động gửi thông báo:
    - Khi ứng viên apply (`applyToJob` -> thông báo trực tiếp cho Nhà tuyển dụng).
    - Khi bài đăng mới ở trạng thái active (`createJob` -> thông báo qua FCM Topics cho Followers).
    - Khi bài đăng chuyển từ các trạng thái khác ("draft", "closed") sang "active" (xử lý qua `updateJob` và `updateJobStatus`).

- **Automated Activity Tracking System**:
  - **PostgreSQL Triggers & Views**: Centralized activity logging using an `audit_log` table and `process_audit_log` function triggered automatically on INSERT/UPDATE/DELETE across `applications`, `follows`, and `profiles`.
  - **Zero-Mutation Server Actions**: Completely removed the need for manual tracking inserts in Next.js Server Actions.
  - **View Security Integration**: Đảm bảo view `v_user_activities` hoạt động vói `security_invoker = true` để kế thừa RLS từ bảng `audit_log`. Cập nhật Service layer bằng việc kiểm tra `session` để loại bỏ rò rỉ dữ liệu activity giữa các user.
  - **Trigger Optimization**: Refactor `audit_profiles_trigger` bằng cách tự tạo một function tùy chỉnh để BỎ QUA các lần cập nhật hệ thống (như login fetch `fcm_token` hay `preferred_lang`), qua đó loại bỏ spam log không cần thiết.
  - **Shared Dashboard UI**: Implemented Server Component `RecentActivity` that translates activity keys using `next-intl` and dynamically formats metadata, integrated into both Candidate and Recruiter dashboards.

- **Recruiter Job Management Extensions**:
  - **Quick Job Status Toggle**: Bổ sung Menu Items (Đóng/Mở lại tin) ngay trên `JobCard`. Sử dụng Server Actions qua `useTransition`, tích hợp `toast` (Sonner), và phản hồi i18n chuẩn mực cho hai ngôn ngữ (vi, en).
  - **Status Filtering via URL**: Mở rộng `getRecruiterJobs` để lọc theo tham số `status` (active / draft / closed). Khai báo component `JobFilter` dựa trên shadcn `Select` có thể tự động sync filter qua searchParams (URL-driven approach).

## Next Steps

1.  **AI Resume Parser Internal Logic**: Hoàn thiện logic xử lý file thật (PDF to Markdown) thay vì mock.
2.  **Job Analytics Tab**: Triển khai biểu đồ và báo cáo hiệu quả tuyển dụng cho từng job.
3.  **Social Login**: Tích hợp Google và Github OAuth.
4.  **Recruiter Talent Search**: Nâng cấp công cụ tìm kiếm ứng viên bằng AI.

## Decisions & Patterns

- **RLS-First Security**: Chuyển từ việc kiểm tra Auth thủ công trong code sang tin cậy hoàn toàn vào Row Level Security (RLS) và Database Defaults. Điều này giúp giảm độ phức tạp của Server Actions và đảm bảo bảo mật ở tầng sâu nhất.
- **Mutation/Query Separation**: Khẳng định quy tắc tách biệt: `services/` chỉ chứa logic truy vấn dữ liệu (read-only), trong khi `actions/` chịu trách nhiệm cho mọi thay đổi trạng thái (mutations) và revalidation.
- **Application Info Snapshoting**: Lưu thông tin cá nhân trực tiếp vào bản ghi ứng tuyển (`applications`) thay vì đồng bộ ngược lại Profile. Quyết định này giúp giữ Profile nguyên bản và tăng tính linh hoạt cho ứng viên khi nộp đơn.
- **Form Schema Centralization**: Di chuyển toàn bộ Zod Schemas liên quan đến form ứng tuyển và profile vào thư mục `types/` để đảm bảo tính tái sử dụng và sạch sẽ cho component UI.
- **Next.js Error Boundaries**: Ưu tiên sử dụng `error.tsx` kết hợp với việc `throw error` trong Server Components thay vì xử lý lỗi inline UI. Điều này giúp tách biệt logic nghiệp vụ và logic hiển thị lỗi, đồng thời cung cấp cơ chế cứu vãn (reset/retry) tự động của Next.js.
- **RSC-Client Bridge Pattern**: Sử dụng một component Client wrapper (`ProfileClient`) để bao bọc các form phức tạp cần trạng thái tương tác cao (như AI CV Parser/CV Upload) trong khi vẫn duy trì việc fetch dữ liệu gốc từ Server Component.
- **Optimistic-Debounce Pattern**: Kết hợp `useOptimistic` để phản hồi UI tức thì với `useDebouncedCallback` để trì hoãn việc gọi API. Điều này cân bằng giữa trải nghiệm người dùng mượt mà và hiệu năng hệ thống, đồng thời đảm bảo tính toàn vẹn dữ liệu bằng cách đồng bộ trạng thái cuối cùng sau khi người dùng ngừng tương tác.
- **Postgres-First Defaults**: Ưu tiên sử dụng Database Triggers và Default values (như `on_profile_created_settings`) để đảm bảo tính nhất quán của dữ liệu ngay cả khi bản ghi được tạo từ bên ngoài ứng dụng.
