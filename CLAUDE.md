@AGENTS.md

## Project workflow

- The site uses the localized App Router under `src/app/[locale]/`; localized copy lives in `src/i18n/messages/en.json` and `src/i18n/messages/sv.json`.
- Shared page chrome is in `src/app/[locale]/layout.tsx`; reusable UI is in `src/components/`, with Sass modules alongside components where applicable.
- Site-wide content and settings live in `src/resources/`. Before following older template documentation, verify paths against the current source tree.
- For visual mismatches, trace the rendered route and component first, then inspect the served DOM and computed styles in the browser before changing unrelated components or restarting the server. Confirm the correct locale and running server when the preview appears stale.
- Follow `AGENTS.md` for the installed Next.js documentation requirement. Use `npm run build` for a production build; CI linting uses `npx eslint . --ext .js,.jsx,.ts,.tsx`.
