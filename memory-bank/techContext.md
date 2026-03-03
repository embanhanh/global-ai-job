# Tech Context

## Core Technologies

- **Frontend**: Next.js 16.1.6 (App Router), React 19.
- **Styling**: Tailwind CSS v4, Framer Motion (animations), Lucide React (icons).
- **Internationalization**: `next-intl`.
- **Backend/Auth**: Supabase (@supabase/supabase-js).
- **AI**: Vercel AI SDK (@ai-sdk/google).
- **Forms & Validation**: `react-hook-form`, `zod`, `@hookform/resolvers`.

## Development Setup

- **Package Manager**: npm / yarn.
- **Locale Routing**: Cấu hình trong `proxy.ts` và `next.config.ts`.
- **Tailwind v4**: Kích hoạt qua `@tailwindcss/postcss`.

## Technical Constraints

- **Strict Typing**: Không sử dụng `any`. Toàn bộ types phải được định nghĩa rõ ràng.
- **Server Components**: Ưu tiên tối đa RSC để giảm client bundle size.
- **No Hardcoded Strings**: 100% text hiển thị phải thông qua `next-intl`.
- **Component Size**: Giới hạn mỗi component tối đa 150 dòng (theo Vibe Rules).

## Integration Patterns

- **Supabase**: Sử dụng client-side supabase client cho Auth và server-side client cho database operations.
- **AI SDK**: Sử dụng `generateObject` cho trích xuất dữ liệu CV có cấu trúc.
