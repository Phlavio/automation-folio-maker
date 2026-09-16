import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getNote } from "@/lib/notes";

export const Route = createFileRoute("/notes/$slug")({
  loader: ({ params }) => {
    const note = getNote(params.slug);
    if (!note) throw notFound();
    return { title: note.title, summary: note.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Note unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Notes`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
      ],
    };
  },
  component: NoteDetail,
});

function NoteDetail() {
  const { slug } = Route.useParams();
  const note = getNote(slug);

  if (!note) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight">Note not found</h1>
        <Link to="/notes" className="mt-4 inline-block font-mono text-xs text-primary">
          Back to notes
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        to="/notes"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Notes
      </Link>

      <p className="label-mono mt-8">
        {new Date(note.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">{note.title}</h1>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-foreground/90">
        {note.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <ul className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
        {note.tags.map((tag) => (
          <li
            key={tag}
            className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
