# Copilot Instructions for AI Agents

This project is a Next.js app bootstrapped with `create-next-app` and uses the `/app` directory for routing and page components. Follow these guidelines to be productive and consistent with project conventions:

## Architecture & Structure

- **App Directory**: All routing and main UI logic is in `app/`. The entry point is `app/page.tsx`, with global layout in `app/layout.tsx`.
- **Global Styles**: Use `app/globals.css` for site-wide styles. Component-specific styles should be colocated or use CSS modules if added.
- **Lib Directory**: Place shared utilities in `lib/` (e.g., `lib/utils.ts`).
- **Public Assets**: Static files (SVGs, images) are in `public/`.

## Developer Workflows

- **Start Dev Server**: Use `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`).
- **Hot Reloading**: Edits to files in `app/` auto-update the browser.
- **No Custom Test/Build Scripts**: Standard Next.js build/test commands apply unless otherwise documented.

## Patterns & Conventions

- **TypeScript**: All code is TypeScript-first. Use types and interfaces for props and shared data.
- **Component Structure**: Prefer functional components. Place page components in `app/`, shared components in `components/` (if created).
- **Font Optimization**: Uses `next/font` for font loading (see `README.md`).
- **Config Files**: Project config is in root (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, etc.).

## Integration & Dependencies

- **Next.js**: Core framework. See [Next.js docs](https://nextjs.org/docs/app) for advanced features.
- **No Custom API/Backend**: No `/api` directory or backend logic present by default.

## Examples

- To add a new page: create a file in `app/` (e.g., `app/about.tsx`).
- To add a utility: add to `lib/utils.ts` and import where needed.

## References

- See `README.md` for getting started, dev commands, and deployment.
- For new conventions, update this file to keep AI agents aligned.
