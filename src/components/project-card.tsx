import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categoryLabel, type Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group relative flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary/60"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="label-mono text-primary">{categoryLabel(project.category)}</span>
        {project.year ? <span className="label-mono">{project.year}</span> : null}
      </div>

      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="mt-5 aspect-[16/9] w-full border border-border object-cover"
        />
      ) : null}

      <h3 className="mt-5 text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      {project.techStack.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <li
              key={tech}
              className="border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors group-hover:text-primary">
        Case notes
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
