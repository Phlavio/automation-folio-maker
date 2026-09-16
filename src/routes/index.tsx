import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Workflow, Code2, Boxes } from "lucide-react";
import { projectsQueryOptions } from "@/lib/projects-query";
import { sortProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Philip Cadungog — Full Stack & n8n Automation Developer" },
      {
        name: "description",
        content:
          "Software developer in Dumaguete building full stack web applications and n8n automations that remove manual work.",
      },
      { property: "og:title", content: "Philip Cadungog — Full Stack & n8n Automation Developer" },
      {
        property: "og:description",
        content:
          "Software developer in Dumaguete building full stack web applications and n8n automations that remove manual work.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  component: Home,
});

const capabilities = [
  {
    icon: Code2,
    title: "Full stack web apps",
    body: "Product interfaces, APIs, and data models built as one system — typed end to end, deployed and monitored.",
  },
  {
    icon: Workflow,
    title: "n8n automation",
    body: "Workflows that move data between the tools a business already pays for, with retries and dedupe built in.",
  },
  {
    icon: Boxes,
    title: "Integrations",
    body: "Webhooks, third-party APIs, and internal services stitched together so records stay consistent everywhere.",
  },
];

function Home() {
  const { data } = useSuspenseQuery(projectsQueryOptions);
  const featured = sortProjects(data.projects).filter((p) => p.featured).slice(0, 3);
  const shown = featured.length > 0 ? featured : sortProjects(data.projects).slice(0, 3);

  return (
    <div>
      <section className="grid-canvas border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="label-mono">
            {site.headline} — {site.location}
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            I build web applications, then{" "}
            <span className="text-primary">automate the work around them.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.pitch}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              View projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.title} className="bg-card p-6">
              <item.icon className="h-5 w-5 text-primary" />
              <h2 className="mt-4 text-base font-semibold tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
          <div>
            <p className="label-mono">Selected work</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Recent projects</h2>
          </div>
          <Link
            to="/projects"
            className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
          >
            All projects
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
