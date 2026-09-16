import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { projectsQueryOptions } from "@/lib/projects-query";
import { categoryLabel, sortProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Philip Cadungog" },
      {
        name: "description",
        content:
          "Web applications and n8n automation projects built by Philip Cadungog, filterable by category and technology.",
      },
      { property: "og:title", content: "Projects — Philip Cadungog" },
      {
        property: "og:description",
        content: "Web applications and n8n automation projects built by Philip Cadungog.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQueryOptions),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data } = useSuspenseQuery(projectsQueryOptions);
  const [category, setCategory] = useState("all");
  const [tech, setTech] = useState("all");

  const projects = useMemo(() => sortProjects(data.projects), [data.projects]);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(projects.map((p) => p.category.toLowerCase())))],
    [projects],
  );
  const techs = useMemo(
    () => ["all", ...Array.from(new Set(projects.flatMap((p) => p.techStack))).sort()],
    [projects],
  );

  const filtered = projects.filter(
    (p) =>
      (category === "all" || p.category.toLowerCase() === category) &&
      (tech === "all" || p.techStack.includes(tech)),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="label-mono">Work</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Web applications and automation builds. Everything here is managed in my own database, so
        this list updates as I ship.
      </p>

      {data.source === "sample" ? (
        <p className="mt-6 border border-signal/40 bg-signal/10 px-4 py-3 font-mono text-xs text-signal">
          {data.error}
        </p>
      ) : null}

      <div className="mt-10 space-y-4 border-y border-border py-5">
        <FilterRow
          label="Category"
          options={categories}
          value={category}
          onChange={setCategory}
          format={(v) => (v === "all" ? "All" : categoryLabel(v))}
        />
        <FilterRow
          label="Tech"
          options={techs}
          value={tech}
          onChange={setTech}
          format={(v) => (v === "all" ? "All" : v)}
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No projects match that combination yet.
        </p>
      ) : null}
    </div>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
  format,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  format: (value: string) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="label-mono w-20">{label}</span>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
            value === option
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {format(option)}
        </button>
      ))}
    </div>
  );
}
