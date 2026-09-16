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
