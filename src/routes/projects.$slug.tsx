import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projectsQueryOptions } from "@/lib/projects-query";
import { categoryLabel } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(projectsQueryOptions);
    const project = data.projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { title: project.title, summary: project.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} — Philip Cadungog`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(projectsQueryOptions);
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block font-mono text-xs text-primary">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Projects
      </Link>

      <p className="label-mono mt-8 text-primary">
        {categoryLabel(project.category)}
        {project.year ? ` · ${project.year}` : ""}
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{project.summary}</p>

      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt={project.title}
          className="mt-10 w-full border border-border object-cover"
        />
      ) : null}

      {project.description ? (
        <div className="mt-10 space-y-4 border-t border-border pt-8 text-sm leading-relaxed text-foreground/90">
          {project.description.split(/\n{2,}|\r\n\r\n/).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {project.techStack.length > 0 ? (
        <div className="mt-10">
          <p className="label-mono">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.liveUrl || project.repoUrl ? (
        <div className="mt-10 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Live site <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Source <Github className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
