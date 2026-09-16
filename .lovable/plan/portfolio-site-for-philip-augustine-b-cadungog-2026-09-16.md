# Portfolio site for Philip Augustine B. Cadungog

A personal portfolio — software developer (full stack + n8n automation), Dumaguete based — with the projects section pulled live from your own NocoDB.

## Pages

- **Home** — intro, headline, short pitch, featured projects, links to LinkedIn/GitHub.
- **Projects** — full list from NocoDB, filterable by tag/tech, each with detail view.
- **Services** — web development and n8n automation offerings.
- **About** — background, skills, tools.
- **Notes** — short posts about automation and development.
- **Contact** — direct email link plus LinkedIn.

Each page gets its own title/description for search and link previews.

## Projects from NocoDB

The site reads your NocoDB table through a small server-side function, so your database token never reaches the browser. Expected columns (I'll match whatever you have, this is the default shape):

`Title`, `Slug`, `Summary`, `Description`, `TechStack`, `Category` (web / automation), `CoverImage`, `LiveUrl`, `RepoUrl`, `Featured`, `Published`, `Order`

Only rows marked Published appear. Results are cached briefly so the site stays fast.

**Important limitation to decide on:** your NocoDB runs on your own machine, so the published site cannot reach it from the internet. Two ways forward:

1. Expose NocoDB with a tunnel or public URL (Cloudflare Tunnel, Tailscale Funnel, ngrok) and give me that base URL + an API token. Then the live site always shows current data.
2. Keep it local-only for now. The site runs against sample projects, and switching to your real data later is just filling in the URL and token.

I'll build it so either works: if NocoDB is unreachable, the Projects page falls back to bundled sample entries instead of erroring.

## What I need from you

- NocoDB base URL (or tunnel URL), table name, and an API token — I'll ask for the token through the secure secret form, never in chat.
- Your GitHub URL and the email address for the contact link.
- Your LinkedIn: I have `linkedin.com/in/philcads-dev/`.

## Design

Before writing the site I'll show you three visual directions to pick from, then build the chosen one.

## Technical notes

- TanStack Start routes: `/`, `/projects`, `/projects/$slug`, `/services`, `/about`, `/notes`, `/notes/$slug`, `/contact`.
- `src/lib/projects.functions.ts` — `createServerFn` calling the NocoDB v2 Data API (`/api/v2/tables/{tableId}/records`) with the `xc-token` header read from `process.env` inside the handler.
- Loader + TanStack Query (`ensureQueryData` / `useSuspenseQuery`) for project reads; typed with Zod so bad rows are skipped rather than crashing the page.
- Notes content stored in-repo as typed data (no CMS) unless you'd rather manage them in NocoDB too.
- No Lovable Cloud needed: no database, auth, or forms on our side.
