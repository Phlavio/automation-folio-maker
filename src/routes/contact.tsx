import { createFileRoute } from "@tanstack/react-router";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Philip Cadungog" },
      {
        name: "description",
        content:
          "Get in touch with Philip Cadungog about full stack web development or n8n automation work.",
      },
      { property: "og:title", content: "Contact — Philip Cadungog" },
      {
        property: "og:description",
        content: "Get in touch about web development or n8n automation work.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="label-mono">Contact</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Let's talk</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Email is the fastest way to reach me. Tell me what you're building or which process is
        costing you time, and I'll reply with how I'd approach it.
      </p>

      <a
        href={`mailto:${site.email}`}
        className="mt-10 flex items-center justify-between gap-4 border border-border bg-card p-6 transition-colors hover:border-primary/60"
      >
        <div>
          <p className="label-mono">Email</p>
          <p className="mt-1.5 font-mono text-sm text-foreground">{site.email}</p>
        </div>
        <Mail className="h-5 w-5 text-primary" />
      </a>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-4 border border-border p-5 transition-colors hover:border-primary/60"
        >
          <div>
            <p className="label-mono">LinkedIn</p>
            <p className="mt-1.5 text-sm">philcads-dev</p>
          </div>
          <Linkedin className="h-4 w-4 text-primary" />
        </a>
        <a
          href={site.links.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-4 border border-border p-5 transition-colors hover:border-primary/60"
        >
          <div>
            <p className="label-mono">GitHub</p>
            <p className="mt-1.5 text-sm">Code & experiments</p>
          </div>
          <Github className="h-4 w-4 text-primary" />
        </a>
      </div>

      <p className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        {site.location} · works with teams in any timezone
      </p>
    </div>
  );
}
