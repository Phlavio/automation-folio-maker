import { createServerFn } from "@tanstack/react-start";
import { projectSchema, sampleProjects, type Project, type ProjectsResult } from "./projects";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeRow(row: Record<string, unknown>, index: number): Project | null {
  const parsed = projectSchema.safeParse({
    id: row.id ?? `${index}`,
    title: row.title,
    slug: row.slug ?? slugify(String(row.title ?? "")),
    summary: row.summary ?? "",
    description: row.description ?? "",
    techStack: row.tech_stack ?? [],
    category: row.category ?? "web",
    coverImage: row.cover_image ?? null,
    liveUrl: row.live_url ?? null,
    repoUrl: row.repo_url ?? null,
    featured: row.featured ?? false,
    order: row.display_order ?? index + 1,
    year: row.year ?? null,
  });

  return parsed.success ? parsed.data : null;
}

export const listProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProjectsResult> => {
    const baseUrl = process.env["SUPABASE_URL"]?.replace(/\/+$/, "");
    const anonKey = process.env["SUPABASE_ANON_KEY"];

    if (!baseUrl || !anonKey) {
      return {
        projects: sampleProjects,
        source: "sample",
        error: "Supabase is not configured yet, so sample projects are shown.",
      };
    }

    try {
      const url = new URL(`${baseUrl}/rest/v1/projects`);
      url.searchParams.set(
        "select",
        "id,title,slug,summary,description,tech_stack,category,cover_image,live_url,repo_url,featured,display_order,year",
      );
      url.searchParams.set("published", "eq.true");
      url.searchParams.set("order", "display_order.asc,title.asc");

      const response = await fetch(url, {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        console.error(`Supabase request failed [${response.status}]: ${await response.text()}`);
        return {
          projects: sampleProjects,
          source: "sample",
          error: `Could not reach Supabase (status ${response.status}). Showing sample projects.`,
        };
      }

      const rows = (await response.json()) as Record<string, unknown>[];
      const projects = rows.map(normalizeRow).filter((p): p is Project => p !== null);

      return projects.length > 0
        ? { projects, source: "supabase", error: null }
        : {
            projects: sampleProjects,
            source: "sample",
            error: "Supabase returned no published rows. Showing sample projects.",
          };
    } catch (error) {
      console.error("Supabase fetch error", error);
      return {
        projects: sampleProjects,
        source: "sample",
        error: "Supabase is unreachable right now. Showing sample projects.",
      };
    }
  },
);
