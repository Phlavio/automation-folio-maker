import { createFileRoute, Link } from "@tanstack/react-router";
import { notes } from "@/lib/notes";

export const Route = createFileRoute("/notes/")({
  head: () => ({
    meta: [
      { title: "Notes — Development & Automation" },
      {
        name: "description",
        content:
          "Short field notes on n8n automation, integrations, and full stack development by Philip Cadungog.",
      },
      { property: "og:title", content: "Notes — Development & Automation" },
      {
        property: "og:description",
        content: "Short field notes on automation, integrations, and full stack development.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="label-mono">Notes</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Field notes from the build
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Short pieces on the patterns I keep reaching for.
      </p>

      <ul className="mt-12 divide-y divide-border border-y border-border">
        {sorted.map((note) => (
          <li key={note.slug}>
            <Link
              to="/notes/$slug"
              params={{ slug: note.slug }}
              className="group block py-7 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="label-mono">
                  {new Date(note.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                <span className="label-mono text-primary">{note.tags[0]}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                {note.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
