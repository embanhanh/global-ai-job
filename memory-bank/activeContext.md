# Active Context

## Current Focus

Dự án đã hoàn thành thiết kế và triển khai database schema cho **Recruiter Dashboard** trên Supabase. Trọng tâm tiếp theo là kết nối dữ liệu thực tế giữa FE và BE, sau đó là triển khai **Candidate Dashboard** và hệ thống **AI Resume Parser**.

## Recent Changes

- **Job Detail Command Center**:
  - **Applicants Tab**: Bảng ứng viên chuyên sâu với tìm kiếm (debounced 500ms), lọc theo vòng (Hiring Stages), và phân trang Server-First.
  - **Job Content Tab**: Hiển thị đầy đủ thông tin: Job Type, Location, Salary, Requirements và AI Scoring/Suggestions.
  - **Hiring Workflow**: Kanban Board cho phép kéo thả ứng viên giữa các bước. Cơ chế DND sử dụng `useRef` để theo dõi `initialStage`, đảm bảo cập nhật DB chính xác.
- **Database & Sync**: Đồng bộ hóa `stage` ứng viên qua Server Actions, trigger `revalidatePath` để giữ dữ liệu FE luôn mới.

## Next Steps

1.  **AI Resume Parser**: Xây dựng logic phân tích CV sang Markdown và trích xuất dữ liệu bằng Vercel AI SDK.
2.  **Job Analytics Tab**: Triển khai biểu đồ và báo cáo hiệu quả tuyển dụng cho từng job.
3.  **Candidate Dashboard**: Thiết kế và triển khai dashboard cho ứng viên (Tìm việc, Quản lý CV).
4.  **Social Login**: Tích hợp Google và Github OAuth.

## Active Decisions & Considerations

- **Server-First Pagination**: Sử dụng URL search parameters để quản lý trạng thái trang, giúp hỗ trợ SEO và chia sẻ liên kết tốt hơn.
- **Reusable Components**: Tách `Pagination` và `SearchInput` ra làm các component dùng chung (`components/shared` và `components/dashboard`) để tái sử dụng cho các module khác (như Talent Search).
- **Zod Schema Evolution**: Chuyển đổi mảng chuỗi đơn thuần sang mảng đối tượng trong `useFieldArray` để quản lý ID và giá trị tốt hơn trong form React.
