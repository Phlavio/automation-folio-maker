# Portfolio Builder Studio

Make me a portfolio website, i am a full stack web developer, I also an automation developer using n8n, and i want to easily update the projects/works i made through nocodb(local)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cbfd857f-e8af-4bf1-8c2e-616fb623469f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Supabase setup

Projects are stored in Supabase. The public site reads only published rows,
and `/admin` requires a Supabase Auth email/password before it can create,
edit, or delete projects. Never put a service-role key in `.env`.

1. Create a Supabase project.
2. In **SQL Editor**, run the SQL below.
3. In **Authentication → Users**, create your admin email and password.
4. Copy `.env.example` to `.env` in the project root and fill in the Supabase
   URL and anon key in both pairs of variables.
5. Build and start the app:

```sh
npm install
npm run build
npm start
```

`npm start` loads the root `.env` file automatically. Restart after changing
environment values.

```sql
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  description text not null default '',
  tech_stack text[] not null default '{}',
  category text not null default 'web',
  cover_image text,
  live_url text,
  repo_url text,
  featured boolean not null default false,
  published boolean not null default true,
  display_order integer not null default 0,
  year text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Anyone can read published projects"
  on public.projects for select
  using (published = true or auth.uid() is not null);

create policy "Signed-in admins can insert projects"
  on public.projects for insert to authenticated
  with check (true);

create policy "Signed-in admins can update projects"
  on public.projects for update to authenticated
  using (true) with check (true);

create policy "Signed-in admins can delete projects"
  on public.projects for delete to authenticated
  using (true);
```

The admin page is intentionally at `/admin`, but the URL alone is not the
security boundary: Supabase Auth and RLS protect the data.

## Phil Social Automation legal pages and Render

Public, unauthenticated file-based routes:

- `/terms`: Terms of Service, effective November 18, 2026.
- `/privacy`: Privacy Policy, effective November 18, 2026.

Both routes use the existing site shell and footer. They have independent page
metadata and no project-data loader or Supabase authentication dependency.
The privacy page deliberately displays operator-confirmation notices. Before
submitting the URLs for review or connecting other people's accounts, confirm:

- Actual TikTok OAuth scopes and account fields collected.
- Credential storage, who can access it, and token refresh/revocation handling.
- Security controls actually enabled; do not assume encryption or log redaction.
- Workflow execution history, temporary media, logs, backups, and all providers.
- Retention criteria and the actual deletion process, including backups,
  identity checks, response timing, and legal retention exceptions.
- Additional data uses or sharing, and whether Render receives any TikTok data.

Update the marked text to match the verified implementation. These pages do
not guarantee TikTok approval or establish that the publishing workflow meets
all TikTok requirements. App eligibility and posting UX are separate review
questions. See TikTok's official registration and content-sharing documentation:

- https://developers.tiktok.com/doc/getting-started-create-an-app/
- https://developers.tiktok.com/doc/content-sharing-guidelines/

### Serving the routes on Render

This is a TanStack Start SSR application using Nitro's `node-server` preset,
not a static SPA. The production entry is `.output/server/index.mjs`.
For a Render **Web Service**, use `npm install && npm run build` as the build
command and `node .output/server/index.mjs` as the start command, with any
existing application environment variables configured in Render. Nitro uses
Render's `PORT`. The existing `npm start` also works when a root `.env` file
exists; it explicitly requires that file.

The Node server handles `/terms` and `/privacy` on a fresh request or reload;
no catch-all rewrite to `/index.html` is needed. Do not change this deployment
to a Render Static Site or add a SPA rewrite. No Render blueprint is checked
into this repository, so the live Render service type, dashboard commands,
and auto-deploy setting must be verified separately. A local production check
validates the repository's server behavior, not the live dashboard settings.
No automatic deployment is performed by this change.

### TikTok verification files

Vite/Nitro copies `public/` files to `.output/public/` and serves them at their
matching root paths, before application routing. Once TikTok provides the real
verification file, put it in `public/` with **exactly the supplied filename and
contents**. For a root-level file its URL is:

`https://philipdev.onrender.com/<exact-filename-from-TikTok>`

If TikTok specifies a nested path, reproduce that path under `public/`. Do not
put the file under `src/routes/` or alter its extension. Only use the public
verification artifact provided by TikTok, never an app secret or OAuth token.
No placeholder TikTok file is included in this repository.

Rebuild and deploy through your normal workflow after adding the real file.
Open the exact URL without signing in and verify HTTP 200, the original file
contents, and that the response is the file rather than the portfolio HTML or
a redirect. An existing harmless asset such as `/pc-logo.svg` can be used to
check public-file serving before TikTok provides a verification file.

After deployment, verify fresh requests and refreshes at both URLs:

- https://philipdev.onrender.com/terms
- https://philipdev.onrender.com/privacy

Also check both footer links on mobile and desktop. Publishing these pages
and verifying their URLs does not itself authorize or implement TikTok OAuth.
