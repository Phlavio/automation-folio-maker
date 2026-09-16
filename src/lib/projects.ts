import { z } from "zod";

export const projectSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  title: z.string(),
  slug: z.string(),
  summary: z.string().default(""),
  description: z.string().default(""),
  techStack: z.array(z.string()).default([]),
  category: z.string().default("web"),
  coverImage: z.string().nullable().default(null),
  liveUrl: z.string().nullable().default(null),
  repoUrl: z.string().nullable().default(null),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  year: z.string().nullable().default(null),
});

export type Project = z.infer<typeof projectSchema>;

export type ProjectsResult = {
  projects: Project[];
  source: "nocodb" | "sample";
  error: string | null;
};

export const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Order-to-invoice automation",
    slug: "order-to-invoice-automation",
    summary:
      "An n8n pipeline that turns paid store orders into invoices, receipts, and a bookkeeping row without anyone touching a spreadsheet.",
    description:
      "A webhook receives the paid-order event, validates and de-duplicates it, generates the invoice PDF, emails the customer, and appends the transaction to the accounting sheet. Failed runs land in a review queue with the original payload attached, so nothing is silently lost.",
    techStack: ["n8n", "PostgreSQL", "Node.js", "Stripe API"],
    category: "automation",
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
    featured: true,
    order: 1,
    year: "2026",
  },
  {
    id: "2",
    title: "Field service dashboard",
    slug: "field-service-dashboard",
    summary:
      "A full stack scheduling dashboard for a service team: jobs, technicians, routes, and a customer-facing status page.",
    description:
      "React front end with role-based access, a Postgres schema behind row-level security, and a job assignment view built for a dispatcher working at speed. Customers get a public tracking link that updates as the technician progresses.",
    techStack: ["React", "TypeScript", "Postgres", "Tailwind"],
    category: "web",
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
    featured: true,
    order: 2,
    year: "2025",
  },
  {
    id: "3",
    title: "Lead intake and routing",
    slug: "lead-intake-and-routing",
    summary:
      "Every inbound lead enriched, scored, routed to the right person, and logged in the CRM within seconds.",
    description:
      "Form submissions and inbox messages are normalised into one shape, enriched from public sources, scored against a simple rubric, and pushed to the owner's queue with a Slack ping. Duplicate people and companies are merged instead of stacked.",
    techStack: ["n8n", "Airtable", "Slack API"],
    category: "automation",
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
    featured: true,
    order: 3,
    year: "2025",
  },
  {
    id: "4",
    title: "Inventory sync service",
    slug: "inventory-sync-service",
    summary:
      "A small service that keeps stock levels consistent across a storefront, a warehouse system, and a marketplace listing.",
    description:
      "Event-driven sync with a reconciliation job as a safety net, written so a replayed event can never oversell. Includes an operator view showing every write, its source, and its outcome.",
    techStack: ["Node.js", "Redis", "REST APIs"],
    category: "web",
    coverImage: null,
    liveUrl: null,
    repoUrl: null,
    featured: false,
    order: 4,
    year: "2024",
  },
];

export function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function categoryLabel(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("auto")) return "Automation";
  if (normalized.includes("web")) return "Web";
  return category;
}
