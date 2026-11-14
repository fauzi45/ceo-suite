# Login Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Slice the Figma login screen into a responsive `/login` page (desktop + mobile) built from atomic-design components, with react-hook-form + zod validation and no API.

**Architecture:** Reuse existing atoms (`Button`, `Checkbox`, `Input`, `Logo`, `Icon`) and the `FormField` molecule. Add one atom (`TextLink`), two molecules (`PasswordField`, `AuthHeader`), one template (`AuthLayout`) and one organism (`LoginForm`). The page only composes `AuthLayout` + `AuthHeader` + `LoginForm`. Behavior is verified with Storybook play functions (already run by `npx vitest run`) plus a small node-side unit project for the zod schema.

**Tech Stack:** Next.js 16.4 (App Router, `cacheComponents`), React 19, Tailwind v4 tokens in `src/app/globals.css`, Storybook 10 + `@storybook/addon-vitest`, `react-hook-form`, `zod`, `@hookform/resolvers`.

**Spec:** `docs/superpowers/specs/2026-11-14-login-page-design.md`

## Global Constraints

- `AGENTS.md`: this Next.js has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing the page and any `"use client"` component.
- Atomic design folders: `src/components/{atoms,molecules,organisms,templates}/<Name>/<Name>.tsx` plus `<Name>.stories.tsx`; every new component is exported from `src/components/index.ts` (add a `// Templates` section).
- Use existing design tokens only (`text-heading-*`, `text-body`, `text-caption`, `primary-*`, `neutral-*`, `error-*`, `focus-border`/`focus-ring`); no hard-coded hex.
- Styling helper is `cn` from `@/lib/cn`; stories use `import type { Meta, StoryObj } from "@storybook/nextjs-vite"` and `title: "<Layer>/<Name>"`.
- Validation messages are English. No API calls, no session/token, no redirect after submit.
- Figma source: `Take Home Test` › page `Web` › section `Login & Sign Up` › frame `home` (1920×1061, node-id `2047-3575`). Read exact spacing/font sizes/button width from Figma when building; Figma has no mobile frame, so mobile is our own design: single column, 16px side margin, full-width Sign In, smaller title.
- Commit per task on branch `feat/login`.

## Review Focus

- Submitting an empty form shows both "Email is required" and "Password is required" at once (not one at a time).
- Email with surrounding spaces (`"  a@b.co  "`) is accepted after trim; `"a@b"` is rejected.
- The eye button never submits the form, keeps the typed password, and exposes its state to assistive tech (`aria-label` + `aria-pressed`).
- While submitting, Sign In is disabled/loading so a double click or Enter cannot submit twice.
- At 320px width there is no horizontal scroll and a very long email does not overflow the field.

---

### Task 1: Dependencies, zod schema, unit-test project

**Files:**
- Modify: `package.json`, `vitest.config.ts`
- Create: `src/lib/validations/auth.ts`, `src/lib/validations/auth.test.ts`

**Interfaces:**
- Produces: `loginSchema` (zod object), `type LoginFormValues = z.infer<typeof loginSchema>` with fields `email: string`, `password: string`, `rememberMe: boolean`.

- [ ] **Step 1: Install** `react-hook-form`, `zod`, `@hookform/resolvers` with `npm install`. Expected: all three appear in `dependencies`.
- [ ] **Step 2: Add a second vitest project** named `unit` in `vitest.config.ts` (node environment, `include: ["src/**/*.test.ts"]`) next to the existing `storybook` project. Run `npx vitest run --project unit`; expected: "No test files found" (no failure from config).
- [ ] **Step 3: Write failing tests** in `src/lib/validations/auth.test.ts`: `loginSchema.safeParse` on (a) `{email:"", password:"", rememberMe:false}` fails with messages "Email is required" and "Password is required" for paths `email` and `password`; (b) `email:"a@b"` fails with "Enter a valid email address"; (c) `email:"  user@example.com  "` succeeds and `data.email === "user@example.com"`; (d) valid email + password `"x"` succeeds. Run; expected FAIL (module missing).
- [ ] **Step 4: Implement** `loginSchema` in `src/lib/validations/auth.ts`: `email` is `z.string().trim().min(1, "Email is required").pipe(z.email("Enter a valid email address"))`, `password` is `z.string().min(1, "Password is required")`, `rememberMe` is `z.boolean()`; export `LoginFormValues`.
- [ ] **Step 5: Run** `npx vitest run --project unit`; expected PASS (4 tests).
- [ ] **Step 6: Commit** `feat: add react-hook-form, zod and login schema`.

### Task 2: `eye-off` icon

**Files:**
- Create: `public/icons/eye-off.svg`
- Modify: `src/components/atoms/Icon/Icon.tsx` (add `"eye-off"` after `"eye"` in `ICON_NAMES`), `docs/design-system.md` (add a row to the Icon table)

**Interfaces:**
- Produces: `IconName` now includes `"eye-off"`.

- [ ] **Step 1: Download** `https://api.iconify.design/mdi/eye-off-outline.svg` to `public/icons/eye-off.svg` (same source family as `eye` = `mdi:eye-outline`); confirm the file uses `currentColor` like the other icons, otherwise set `fill`/`stroke` to `currentColor`.
- [ ] **Step 2: Add** `"eye-off"` to `ICON_NAMES`; add the doc row (`eye-off.svg | tidak ada di Figma (padanan untuk toggle password) | mdi:eye-off-outline`).
- [ ] **Step 3: Verify** `npx vitest run` passes (the `Icons` foundation story renders every name).
- [ ] **Step 4: Commit** `feat: add eye-off icon`.

### Task 3: `TextLink` atom

**Files:**
- Create: `src/components/atoms/TextLink/TextLink.tsx`, `src/components/atoms/TextLink/TextLink.stories.tsx`
- Modify: `src/components/index.ts`

**Interfaces:**
- Produces: `TextLink(props: TextLinkProps)` where `TextLinkProps = Omit<ComponentProps<typeof Link>, "className"> & { className?: string }` (Link from `next/link`). Renders `text-caption font-medium text-primary-800`, `hover:text-primary-600`, `active:text-primary-900`, visible focus ring `focus-visible:ring-4 focus-visible:ring-primary-100`.

- [ ] **Step 1: Write the story** `Default` (children "Forgot Password", `href="#"`) and `Matrix` is not needed. Run `npx vitest run`; expected FAIL (component missing).
- [ ] **Step 2: Implement** `TextLink` per interface and export it (with its props type) under `// Atoms` in `components/index.ts`.
- [ ] **Step 3: Run** `npx vitest run`; expected PASS.
- [ ] **Step 4: Commit** `feat: add TextLink atom`.

### Task 4: `PasswordField` molecule

**Files:**
- Create: `src/components/molecules/PasswordField/PasswordField.tsx`, `PasswordField.stories.tsx`
- Modify: `src/components/index.ts`

**Interfaces:**
- Consumes: `FormField`, `FormFieldProps` (`molecules/FormField`), `Icon` with `"eye"` / `"eye-off"`.
- Produces: `PasswordField = forwardRef<HTMLInputElement, Omit<FormFieldProps, "type" | "suffix" | "trailingIcon">>`. Internal `visible` state toggles the input `type` between `"password"` and `"text"`. The toggle is a `<button type="button">` passed as `FormField`'s `suffix`, with `aria-label` "Show password"/"Hide password" and `aria-pressed={visible}`, showing `eye` when hidden and `eye-off` when visible, 20px, `text-neutral-400`.

- [ ] **Step 1: Write failing story + play function** `Toggle`: render with `defaultValue="secret"`; assert the input has `type="password"`; click the button named "Show password"; assert `type="text"`, button now named "Hide password" with `aria-pressed="true"`, value still `"secret"`. Run `npx vitest run`; expected FAIL.
- [ ] **Step 2: Implement** `PasswordField` per interface; export under `// Molecules`.
- [ ] **Step 3: Run** `npx vitest run`; expected PASS.
- [ ] **Step 4: Commit** `feat: add PasswordField molecule`.

### Task 5: `AuthHeader` molecule

**Files:**
- Create: `src/components/molecules/AuthHeader/AuthHeader.tsx`, `AuthHeader.stories.tsx`
- Modify: `src/components/index.ts`

**Interfaces:**
- Consumes: `Logo` (`height` prop).
- Produces: `AuthHeader({ title, subtitle, className }: { title: string; subtitle?: string; className?: string })`. Renders centered `Logo`, `<h1>` title (bold, size per Figma "Book your Room Now!", one step smaller below `md`), and subtitle paragraph in `text-caption text-neutral-500`-equivalent per Figma. Only one `<h1>` exists.

- [ ] **Step 1: Write the story** `Default` with title "Book your Room Now!" and subtitle "Please logged in to flexible and easy access."; add a play assertion that `getByRole("heading", { level: 1 })` has that text. Run `npx vitest run`; expected FAIL.
- [ ] **Step 2: Implement** per interface (read sizes/colors from Figma `Title` frame); export under `// Molecules`.
- [ ] **Step 3: Run** `npx vitest run`; expected PASS.
- [ ] **Step 4: Commit** `feat: add AuthHeader molecule`.

### Task 6: `AuthLayout` template

**Files:**
- Create: `src/components/templates/AuthLayout/AuthLayout.tsx`, `AuthLayout.stories.tsx`
- Modify: `src/components/index.ts` (new `// Templates` section)

**Interfaces:**
- Produces: `AuthLayout({ children, className }: { children: ReactNode; className?: string })`. Full-height (`min-h-dvh`) page background `background/25` (`#FCFCFD`, use existing `--color-background` or neutral-25 token), pink radial glow at the top center (primary-50/100 gradient, per Figma), content column centered with `max-w-[320px]`-equivalent form width from Figma, `px-4` side margin below `md`, vertical padding per Figma. Must not cause horizontal scroll at 320px.

- [ ] **Step 1: Write the story** `Default` with placeholder children, plus a `Mobile` story using `parameters.viewport` for a 375px viewport. Run `npx vitest run`; expected FAIL.
- [ ] **Step 2: Implement** per interface; export it.
- [ ] **Step 3: Run** `npx vitest run`; expected PASS.
- [ ] **Step 4: Commit** `feat: add AuthLayout template`.

### Task 7: `LoginForm` organism

**Files:**
- Create: `src/components/organisms/LoginForm/LoginForm.tsx` (`"use client"`), `LoginForm.stories.tsx`
- Modify: `src/components/index.ts`

**Interfaces:**
- Consumes: `loginSchema`, `LoginFormValues` (Task 1); `FormField`, `PasswordField`, `Checkbox`, `Button` (`fullWidth` below `md` via class, `disabled` + `iconLeft="loading"` while submitting), `TextLink`.
- Produces: `LoginForm({ onSubmit, className }: { onSubmit?: (values: LoginFormValues) => void | Promise<void>; className?: string })`. Uses `useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "", rememberMe: false } })`. Without `onSubmit` it simulates a login with an ~800ms delay. Fields: Email (`type="email"`, `autoComplete="email"`, placeholder `you@example.com`, label "Email" with required marker), Password (`autoComplete="current-password"`, label "Password" with required marker), row with `Checkbox` "Remember me" and `TextLink` "Forgot Password" (`href="/forgot-password"`), `Button` "Sign In" (`type="submit"`), footer "Don't have an account?" + `TextLink` "Sign Up Here" (`href="/sign-up"`). The form has `noValidate`; errors come from zod only and are passed as `errorText`.

- [ ] **Step 1: Write failing stories with play functions** (use `fn()`, `userEvent`, `within`, `expect` from `storybook/test`): (a) `EmptySubmit`: click "Sign In" → both "Email is required" and "Password is required" visible, `onSubmit` not called. (b) `InvalidEmail`: type `a@b` + password, submit → "Enter a valid email address". (c) `ValidSubmit`: type `  user@example.com  ` + `secret`, tick Remember me, submit → `onSubmit` called once with `{ email: "user@example.com", password: "secret", rememberMe: true }`. (d) `NoDoubleSubmit`: `onSubmit` returns a pending promise; click Sign In twice → called once and the button is disabled. Run `npx vitest run`; expected FAIL.
- [ ] **Step 2: Implement** `LoginForm` per interface; export under `// Organisms`. Disable the button from `formState.isSubmitting`.
- [ ] **Step 3: Run** `npx vitest run`; expected PASS (all four stories).
- [ ] **Step 4: Commit** `feat: add LoginForm organism`.

### Task 8: `/login` page and responsive verification

**Files:**
- Create: `src/app/login/page.tsx`

**Interfaces:**
- Consumes: `AuthLayout`, `AuthHeader`, `LoginForm`. Exports `metadata` with title "Sign In | CEO Suite" and a default server component (no client code in the page itself).

- [ ] **Step 1: Read** the Next.js guide for pages/metadata under `node_modules/next/dist/docs/`, then write the page composing `AuthLayout` > `AuthHeader` (title "Book your Room Now!", subtitle "Please logged in to flexible and easy access.") > `LoginForm`.
- [ ] **Step 2: Run** `npm run build`; expected: succeeds with `/login` listed as a route.
- [ ] **Step 3: Visual check** with `npm run dev` and Chrome at `http://localhost:3000/login`: compare 1440px against Figma frame `home` (logo glow, spacing, button width) and check 375px and 320px (single column, full-width Sign In, no horizontal scroll, long email does not overflow). Fix any mismatch in the owning component, not in the page.
- [ ] **Step 4: Run** `npx vitest run` (all projects); expected all pass.
- [ ] **Step 5: Commit** `feat: add login page`.
