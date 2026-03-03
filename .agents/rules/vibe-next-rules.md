---
trigger: always_on
---

# AI Coding Rules: AI-Powered Recruitment System

## 🎯 Project Context & Tech Stack

- **System**: Multi-language (VI/EN) Recruitment System (AI Summary & CV Filtering).
- **Framework**: Next.js 15 (App Router) - Server-First Architecture.
- **Styling**: Tailwind CSS & Shadcn UI.
- **Backend/Auth**: Supabase (Database & Auth).
- **AI Engine**: Vercel AI SDK (LLM integration).
- **i18n**: next-intl (VI/EN).

---

## 🏗️ 1. Server-First & Performance

- **Rule**: Default to **React Server Components (RSC)**.
- **Constraint**: Use `'use client'` ONLY for:
  - Interaction (onClick, onChange).
  - React Hooks (`useState`, `useEffect`, `useContext`).
  - Browser APIs.
- **UI Orchestration**: Always implement `loading.tsx` (Suspense) and `error.tsx` for every route segment.
- **Goal**: Minimize Client Bundle, maximize SEO, and secure Backend logic.

---

## 🛡️ 2. Type Safety & Validation

- **Strict Typing**: Absolutely **NO `any`**. Use explicit `interface` or `type`.
- **Validation**: Every data object from Forms or APIs MUST be parsed via **Zod** schema.
- **Database**: Use types generated from **Supabase CLI** to ensure schema synchronization.
- **Goal**: Catch errors at compile-time; ensure data integrity between DB and UI.

---

## 🌍 3. Internationalization (i18n)

- **Rule**: **NO HARDCODED TEXT**.
- **Workflow**:
  - All display strings must reside in `messages/[locale].json`.
  - Use `useTranslations` (client) or `getTranslations` (server) from `next-intl`.
- **Naming**: Use descriptive keys (e.g., `Dashboard.Statistics.totalCandidates`).

---

## 🤖 4. AI Integrity & Privacy

- **Processing**: Always parse CV files (PDF/Docx) to **Markdown** format before sending to LLM.
- **Constraint**: Strict **Privacy-first**. Anonymize PII (Personal Identifiable Information) in logs.
- **Logic**: Use Vercel AI SDK `streamText` or `generateObject` for structured CV extraction.

---

## 🧹 5. Clean Code & Architecture

- **Separation of Concerns**:
  - **Components**: Presentation only. No direct DB/API calls.
  - **Actions**: All mutations/queries must stay in `/actions` or `/services`.
- **Component Rules**:
  - Max **150 lines** per file. If exceeded, split into sub-components.
  - No "Prop Drilling": Use Component Composition or Context.
- **Constants**: No magic strings/numbers. Use `/lib/constants.ts` or `/types/enums.ts`.
- **Coding Style**:
  - Use **Early Returns** to avoid deeply nested `if/else`.
  - Server Actions must return a consistent format: `{ success: boolean, data?: T, error?: string }`.

---

## 🛠️ 6. Workflow & Best Practices

- **Git**: Write commit messages in **Conventional Commits** (feat:, fix:, chore:).
- **Tailwind**: Use `cn()` utility from Shadcn for dynamic class merging.
- **Icons**: Use `lucide-react`.

---

> **Note to AI**: If you encounter a task that violates these rules (e.g., adding a hardcoded string or a 200-line component), please alert the user and suggest a refactor according to these standards.
