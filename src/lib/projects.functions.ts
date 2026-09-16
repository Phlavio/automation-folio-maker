import { createServerFn } from "@tanstack/react-start";
import { projectSchema, sampleProjects, type Project, type ProjectsResult } from "./projects";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pick(row: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    const match = Object.keys(row).find((k) => k.toLowerCase() === key.toLowerCase());
    if (match !== undefined && row[match] !== null && row[match] !== "") return row[match];
  }
  return undefined;
}

function asString(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  // NocoDB attachment columns arrive as arrays of objects with url/signedUrl.
  if (Array.isArray(value) && value.length > 0) {
    const first = value[0] as Record<string, unknown>;
    const url = first?.["signedUrl"] ?? first?.["url"] ?? first?.["path"];
    if (typeof url === "string") return url;
  }
  return null;
}

function asList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string")
    return value
      .split(/[,;|]/)
      .map((v) => v.trim())
      .filter(Boolean);
  return [];
}

function asBool(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") return ["true", "1", "yes", "y"].includes(value.toLowerCase());
  return false;
}

function normalizeRow(row: Record<string, unknown>, index: number): Project | null {
  const title = asString(pick(row, ["Title", "Name", "Project"]));
  if (!title) return null;

  const parsed = projectSchema.safeParse({
    id: asString(pick(row, ["Id", "ID", "id"])) ?? `${index}`,
    title,
    slug: asString(pick(row, ["Slug"])) ?? slugify(title),
    summary: asString(pick(row, ["Summary", "Excerpt", "Tagline"])) ?? "",
    description: asString(pick(row, ["Description", "Details", "Body"])) ?? "",
    techStack: asList(pick(row, ["TechStack", "Tech Stack", "Tech", "Tags", "Stack"])),
    category: asString(pick(row, ["Category", "Type"])) ?? "web",
    coverImage: asString(pick(row, ["CoverImage", "Cover Image", "Cover", "Image", "Thumbnail"])),
    liveUrl: asString(pick(row, ["LiveUrl", "Live Url", "Live URL", "Url", "Link", "Demo"])),
    repoUrl: asString(pick(row, ["RepoUrl", "Repo Url", "Repo", "Github", "GitHub"])),
    featured: asBool(pick(row, ["Featured"])),
    order: Number(asString(pick(row, ["Order", "Sort", "Position"])) ?? index + 1) || index + 1,
    year: asString(pick(row, ["Year", "Date"])),
  });

  return parsed.success ? parsed.data : null;
}

export const listProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProjectsResult> => {
    const baseUrl = process.env["NOCODB_BASE_URL"]?.replace(/\/+$/, "");
    const tableId = process.env["NOCODB_TABLE_ID"];
    const token = process.env["NOCODB_API_TOKEN"];

    if (!baseUrl || !tableId || !token) {
      return {
        projects: sampleProjects,
        source: "sample",
        error: "NocoDB is not configured yet, so sample projects are shown.",
      };
    }

    try {
      const url = new URL(`${baseUrl}/api/v2/tables/${tableId}/records`);
      url.searchParams.set("limit", "200");

      const response = await fetch(url, {
        headers: { "xc-token": token, accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        const body = await response.text();
        console.error(`NocoDB request failed [${response.status}]: ${body}`);
        return {
          projects: sampleProjects,
          source: "sample",
          error: `Could not reach NocoDB (status ${response.status}). Showing sample projects.`,
        };
      }

      const payload = (await response.json()) as { list?: Record<string, unknown>[] };
      const rows = Array.isArray(payload.list) ? payload.list : [];

      const projects = rows
        .filter((row) => {
          const published = pick(row, ["Published", "Publish", "Live", "Visible"]);
          return published === undefined ? true : asBool(published);
        })
        .map(normalizeRow)
        .filter((p): p is Project => p !== null);

      if (projects.length === 0) {
        return {
          projects: sampleProjects,
          source: "sample",
          error: "NocoDB returned no published rows. Showing sample projects.",
        };
      }

      return { projects, source: "nocodb", error: null };
    } catch (error) {
      console.error("NocoDB fetch error", error);
      return {
        projects: sampleProjects,
        source: "sample",
        error: "NocoDB is unreachable from the internet right now. Showing sample projects.",
      };
    }
  },
);
