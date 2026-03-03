# Active Context

## Current Focus

Dự án vừa hoàn thành giai đoạn khởi tạo cơ bản và thiết kế luồng Auth UI. Trọng tâm hiện tại là đảm bảo hệ thống đa ngôn ngữ hoạt động ổn định và nhất quán về thương hiệu.

## Recent Changes

- **Auth UI Implementation**: Hoàn thành giao diện cho Login, Register, Role Selection, Forgot Password và Reset Password.
- **i18n Standardization**: Chuyển đổi toàn bộ branding hardcode và thông báo lỗi/thành công sang hệ thống `next-intl`.
- **Tailwind v4 Optimization**: Fix các lỗi hiển thị do cú pháp v4 (vd: gradient, opacity).
- **Project Structure**: Thiết lập xong `[locale]` routing với `proxy.ts`.

## Next Steps

1.  **Supabase Auth Integration**: Hiện thực hóa logic đăng nhập/đăng ký bằng Supabase thay vì chỉ console log placeholder.
2.  **Role-based Redirect**: Sau khi Auth thành công, điều hướng người dùng về đúng dashboard (Candidate hoặc Recruiter).
3.  **UI Feedback**: Thêm Toast notifications cho các hành động gửi form.
4.  **Dashboard Setup**: Khởi tạo cấu trúc giao diện cho bảng điều khiển.

## Active Decisions & Considerations

- **Branding**: Sử dụng `Global AI Jobs` cho tên hiển thị ngắn và `Global AI Job Board` cho tên đầy đủ.
- **Zod Localization**: Giữ schema bên trong component để tận dụng hook `useTranslations` cho thông báo lỗi.
