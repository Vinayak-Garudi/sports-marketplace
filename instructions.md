# Project Instructions & Guidelines

## Development Philosophy

This is a Next.js 15 project using the App Router with a strong emphasis on Server-Side Rendering (SSR) and Server Components.

## Core Principles

### 1. Server-First Approach

- **Default to Server Components**: All components should be Server Components unless client-side interactivity is absolutely required
- **Minimize Client Components**: Only use `'use client'` directive when necessary for:
  - Event handlers (onClick, onChange, etc.)
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (localStorage, window, etc.)
- **Client Component Strategy**: When client-side logic is needed, create small, isolated client components and compose them within server components
- **Never wrap unnecessarily**: Avoid wrapping entire pages or large components with `'use client'` - extract only the interactive parts

### 2. UI Component Library

#### Shadcn/ui Reference

- **Always refer to**: [Shadcn/ui Documentation](https://ui.shadcn.com/docs) before implementing any UI components
- **Installation**: Use `npx shadcn@latest add [component-name]` to add new components
- **Available Components**: Check the docs for pre-built components like:
  - Button, Card, Input, Select, Switch
  - Tooltip, Popover, Dialog, Alert
  - Form components, Navigation, etc.
- **Customization**: Components are copied into your project and can be customized in `components/ui/`
- **Custom Wrappers**: Use `components/custom/` for wrapped/extended versions of shadcn components

### 3. Component Architecture

#### File Organization

```
app/                    # App Router pages (Server Components by default)
components/
  ├── ui/              # Shadcn components (base)
  ├── custom/          # Custom wrapped components
  └── [Feature]*.tsx   # Feature-specific components
lib/                   # Utility functions, API handlers
types/                 # TypeScript type definitions
```

#### Component Patterns

- **Server Components**:
  - Fetch data directly
  - No `'use client'` directive
  - Can import and use client components
- **Client Components**:
  - Start with `'use client'`
  - Handle interactivity
  - Keep as small as possible
  - Cannot import server components

### 4. Data Fetching & State Management

- **Server-side**: Use async/await directly in Server Components
- **Client-side**: Use React hooks only when necessary
- **Forms**: Use Server Actions with `'use server'` directive for form submissions
- **APIs**: Centralize API calls in `lib/api.ts`
- **Utility Functions**: Check `lib/` folder for existing utilities before creating new ones:
  - `lib/api.ts` - API request helpers (e.g., `apiRequest`)
  - `lib/localStorage.ts` - Local storage utilities
  - `lib/authHandler.ts` - Authentication helpers
  - `lib/data.ts` - Data management and mock data
  - `lib/utils.ts` - General utility functions (cn, formatters, etc.)

### 5. Routing & Navigation

- **App Router**: All routes in `app/` directory
- **Dynamic Routes**: Use `[param]` folders
- **Server Actions**: Define inline or in separate files with `'use server'`
- **Navigation**: Use Next.js `<Link>` component for client-side navigation

### 6. Styling

- **Tailwind CSS**: Primary styling solution
- **Class Utilities**: Use `cn()` utility from `lib/utils.ts` for conditional classes
- **Dark Mode**: Support both light and dark themes using Tailwind's dark mode
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### 7. TypeScript

- **Strict Mode**: Enable strict type checking
- **Type Definitions**: Store in `types/` directory
- **Prop Types**: Always define interfaces for component props
- **Avoid `any`**: Use proper types or `unknown` when type is unclear

### 8. Performance Optimization

- **Code Splitting**: Leverage automatic code splitting with App Router
- **Image Optimization**: Use Next.js `<Image>` component when possible
- **Lazy Loading**: Use dynamic imports for heavy client components
- **Caching**: Utilize Next.js caching strategies for data fetching

### 9. Authentication & Authorization

- **Cookies**: Use `next/headers` cookies() for server-side auth checks
- **Middleware**: Implement route protection in `middleware.ts`
- **Server Actions**: Mark auth handlers with `'use server'`
- **Client Storage**: Minimize use of localStorage/sessionStorage

### 10. Error Handling

- **Error Boundaries**: Use `error.tsx` files for error handling
- **Not Found**: Use `not-found.tsx` for 404 pages
- **Loading States**: Use `loading.tsx` for loading UI
- **Form Validation**: Validate on both client and server

### 11. Best Practices

#### Do's

✅ Keep Server Components as the default
✅ Use Server Actions for mutations
✅ Refer to Shadcn/ui docs before creating custom UI
✅ Extract interactive parts into small client components
✅ Use proper TypeScript types
✅ Handle errors gracefully
✅ Add loading states
✅ Make components accessible
✅ Use semantic HTML
✅ Test responsive design
✅ Check `lib/` folder for existing utility functions before writing new ones

#### Don'ts

❌ Don't use `'use client'` on entire pages
❌ Don't create custom UI components without checking Shadcn first
❌ Don't nest client components unnecessarily
❌ Don't use inline styles (use Tailwind)
❌ Don't ignore TypeScript errors
❌ Don't forget to handle loading/error states
❌ Don't use `any` type
❌ Don't forget to validate user input
❌ Don't expose sensitive data to client

### 12. Code Review Checklist

Before considering any task complete:

- [ ] Is this a Server Component unless interactivity is required?
- [ ] Have I checked Shadcn/ui for existing components?
- [ ] Have I checked `lib/` folder for existing utility functions?
- [ ] Are client components as small as possible?
- [ ] Are all props properly typed?
- [ ] Is error handling implemented?
- [ ] Does it work in both light and dark mode?
- [ ] Is it responsive across devices?
- [ ] Are there any console errors/warnings?
- [ ] Is the code properly formatted?

### 13. Common Patterns

#### Server Component with Client Child

```tsx
// page.tsx (Server Component)
import ClientButton from "./ClientButton";

export default async function Page() {
  const data = await fetchData(); // Server-side data fetching

  return (
    <div>
      <h1>{data.title}</h1>
      <ClientButton /> {/* Client component for interactivity */}
    </div>
  );
}
```

#### Server Action Form

```tsx
// form.tsx (Client Component)
"use client";

export function Form() {
  async function handleSubmit(formData: FormData) {
    "use server";
    // Server action logic
  }

  return <form action={handleSubmit}>...</form>;
}
```

#### Using Shadcn Components

```tsx
// Always import from shadcn and wrap if needed
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Use as-is or extend in custom/
```

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Server Components](https://react.dev/reference/react/use-client)

---

**Remember**: When in doubt, keep it server-side and check Shadcn/ui first!
