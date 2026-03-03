# Active Context

## Current Focus

Dự án đã hoàn tất việc tích hợp Supabase Auth (SSR) và xử lý tốt luồng xác nhận Email. Trọng tâm tiếp theo là triển khai User Profile và Dashboard.

## Recent Changes

- **Supabase Auth Integration**: Triển khai xong SSR client (server, client, middleware), Auth actions (`signIn`, `signUp`, `signOut`) và tích hợp vào form UI.
- **User Navigation**: Thêm component `UserNav` và `dropdown-menu` để hiển thị trạng thái người dùng trên Header.
- **i18n & Branding**: Hoàn thiện bộ dịch (VI/EN) cho các thông báo và nhãn nhãn trong Auth flows.
- **Session Management**: Xử lý logic cập nhật session trong `proxy.ts` tương thích với `next-intl`.

## Next Steps

1.  **User Profile setup**: Xây dựng bảng `profiles` và logic đồng bộ người dùng.
2.  **Dashboard Development**: Thiết kế và triển khai trang dashboard cho Candidate và Recruiter.
3.  **Role-based Redirect**: Hoàn thiện logic điều hướng về dashboard sau đăng nhập dựa trên role.
4.  **Social Login**: Tích hợp Google và Github OAuth.

## Active Decisions & Considerations

- **Branding**: Sử dụng `Global AI Jobs` cho tên hiển thị ngắn và `Global AI Job Board` cho tên đầy đủ.
- **Zod Localization**: Giữ schema bên trong component để tận dụng hook `useTranslations` cho thông báo lỗi.
