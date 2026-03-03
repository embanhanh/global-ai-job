# Active Context

## Current Focus

Dự án đã hoàn thành thiết kế và triển khai database schema cho **Recruiter Dashboard** trên Supabase. Trọng tâm tiếp theo là kết nối dữ liệu thực tế giữa FE và BE, sau đó là triển khai **Candidate Dashboard** và hệ thống **AI Resume Parser**.

## Recent Changes

- **Recruiter Dashboard Enhancements**:
  - **Job Search & Pagination**: Triển khai hệ thống tìm kiếm mượt mà với `SearchInput` (debounced) và component `Pagination` tái sử dụng, đồng bộ trạng thái qua URL.
  - **Job Editing**: Hoàn thiện tính năng chỉnh sửa tin tuyển dụng, sử dụng chung `JobForm` với thêm mới để tối ưu mã nguồn.
- **Form Improvements**: Cập nhật `JobRequirementsField` để hỗ trợ danh sách yêu cầu linh hoạt hơn (array of objects), đảm bảo type safety hoàn tuyệt đối với Zod.
- **i18n**: Bổ sung đầy đủ các keys cho trạng thái tìm kiếm (`noResults`) và các thông báo thành công/lỗi khi cập nhật dữ liệu.
- **Database Schema**: Cập nhật bảng `applications` và `profiles` với cột `created_at`, đồng bộ types.

## Next Steps

1.  **Candidate Dashboard**: Thiết kế và triển khai dashboard cho ứng viên (Tìm việc, Quản lý CV).
2.  **AI Resume Parser**: Xây dựng logic phân tích CV sang Markdown và trích xuất dữ liệu bằng Vercel AI SDK.
3.  **Social Login**: Tích hợp Google và Github OAuth.

## Active Decisions & Considerations

- **Server-First Pagination**: Sử dụng URL search parameters để quản lý trạng thái trang, giúp hỗ trợ SEO và chia sẻ liên kết tốt hơn.
- **Reusable Components**: Tách `Pagination` và `SearchInput` ra làm các component dùng chung (`components/shared` và `components/dashboard`) để tái sử dụng cho các module khác (như Talent Search).
- **Zod Schema Evolution**: Chuyển đổi mảng chuỗi đơn thuần sang mảng đối tượng trong `useFieldArray` để quản lý ID và giá trị tốt hơn trong form React.
