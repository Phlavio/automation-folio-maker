import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { projectSchema, type Project } from "@/lib/projects";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Philip Cadungog" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

type FormState = Omit<Project, "id"> & { id?: string };

const emptyForm: FormState = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  techStack: [],
  category: "web",
  coverImage: null,
  liveUrl: null,
  repoUrl: null,
  featured: false,
  order: 0,
  year: null,
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [techStackInput, setTechStackInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setMessage("Supabase is not configured.");
      setLoading(false);
      return;
    }
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) =>
      setSession(nextSession),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && supabase) void loadProjects();
  }, [session]);

  async function loadProjects() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order")
      .order("title");
    if (error) setMessage(error.message);
    else
      setProjects(
        data.map((row) =>
          projectSchema.parse({
            id: row.id,
            title: row.title,
            slug: row.slug,
            summary: row.summary ?? "",
            description: row.description ?? "",
            techStack: row.tech_stack ?? [],
            category: row.category,
            coverImage: row.cover_image,
            liveUrl: row.live_url,
            repoUrl: row.repo_url,
            featured: row.featured,
            order: row.display_order,
            year: row.year,
          }),
        ),
      );
  }

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error?.message ?? "");
  }

  async function saveProject(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    const techStack = techStackInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const payload = {
      title: form.title,
      slug:
        form.slug ||
        form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      summary: form.summary,
      description: form.description,
      tech_stack: techStack,
      category: form.category,
      cover_image: form.coverImage,
      live_url: form.liveUrl,
      repo_url: form.repoUrl,
      featured: form.featured,
      display_order: form.order,
      year: form.year,
    };
    const query = form.id
      ? supabase.from("projects").update(payload).eq("id", form.id)
      : supabase.from("projects").insert(payload);
    const { error } = await query;
    if (error) setMessage(error.message);
    else {
      setMessage("Project saved.");
      setForm(emptyForm);
      setTechStackInput("");
      await loadProjects();
    }
  }

  async function deleteProject(id: string) {
    if (!supabase || !window.confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    setMessage(error?.message ?? "Project deleted.");
    if (!error) await loadProjects();
  }

  if (loading) return <div className="mx-auto max-w-6xl px-6 py-16">Loading…</div>;
  if (!session) {
    return (
      <div className="mx-auto max-w-md px-6 py-24">
        <p className="label-mono">Private admin</p>
        <h1 className="mt-3 text-3xl font-semibold">Sign in</h1>
        <form onSubmit={signIn} className="mt-8 space-y-4">
          <input
            className="w-full border border-border bg-transparent p-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border border-border bg-transparent p-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-primary px-4 py-2 font-mono text-xs uppercase text-primary-foreground">
            Sign in
          </button>
        </form>
        {message ? <p className="mt-4 text-sm text-signal">{message}</p> : null}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="label-mono">Private admin</p>
          <h1 className="mt-3 text-3xl font-semibold">Projects</h1>
        </div>
        <button
          onClick={() => void supabase?.auth.signOut()}
          className="border border-border px-3 py-2 font-mono text-xs"
        >
          Sign out
        </button>
      </div>
      <form
        onSubmit={saveProject}
        className="mt-10 grid gap-3 border-y border-border py-6 md:grid-cols-2"
      >
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Year"
          value={form.year ?? ""}
          onChange={(e) => setForm({ ...form, year: e.target.value || null })}
        />
        <input
          className="border border-border bg-transparent p-3 md:col-span-2"
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />
        <textarea
          className="min-h-32 border border-border bg-transparent p-3 md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Tech stack (comma separated)"
          value={techStackInput}
          onChange={(e) => setTechStackInput(e.target.value)}
        />
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Display order"
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
        />
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Cover image URL"
          value={form.coverImage ?? ""}
          onChange={(e) => setForm({ ...form, coverImage: e.target.value || null })}
        />
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Live URL"
          value={form.liveUrl ?? ""}
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value || null })}
        />
        <input
          className="border border-border bg-transparent p-3"
          placeholder="Repository URL"
          value={form.repoUrl ?? ""}
          onChange={(e) => setForm({ ...form, repoUrl: e.target.value || null })}
        />
        <label className="flex items-center gap-2 p-3">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />{" "}
          Featured
        </label>
        <div className="md:col-span-2">
          <button className="bg-primary px-4 py-2 font-mono text-xs uppercase text-primary-foreground">
            {form.id ? "Update project" : "Add project"}
          </button>
          {form.id ? (
            <button
              type="button"
              onClick={() => setForm(emptyForm)}
              className="ml-3 border border-border px-4 py-2 font-mono text-xs"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
      {message ? <p className="mt-4 text-sm text-signal">{message}</p> : null}
      <div className="mt-8 space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between border border-border p-4"
          >
            <div>
              <strong>{project.title}</strong>
              <p className="text-xs text-muted-foreground">
                {project.category} · {project.featured ? "Featured" : "Not featured"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setForm(project);
                  setTechStackInput(project.techStack.join(", "));
                }}
                className="border border-border px-3 py-1 font-mono text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => void deleteProject(project.id)}
                className="border border-signal px-3 py-1 font-mono text-xs text-signal"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
