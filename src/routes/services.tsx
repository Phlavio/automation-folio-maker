import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Web Development & n8n Automation" },
      {
        name: "description",
        content:
          "Full stack web development, n8n workflow automation, and systems integration services by Philip Cadungog.",
      },
      { property: "og:title", content: "Services — Web Development & n8n Automation" },
      {
        property: "og:description",
        content: "Full stack web development and n8n workflow automation services.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    index: "01",
    title: "Full stack web development",
    body: "From a blank repository to a deployed product: interface, API, database schema, and the deployment pipeline around it.",
    points: [
      "React and TypeScript front ends",
      "APIs, auth, and role-based access",
      "Postgres schema design and migrations",
      "Dashboards and internal tools",
    ],
  },
  {
    index: "02",
    title: "n8n automation",
    body: "Workflows that take the repetitive parts of a business off people's plates, built to survive retries and provider outages.",
    points: [
      "Self-hosted and cloud n8n workflows",
      "Idempotent, replay-safe pipelines",
      "Error queues and alerting",
      "Documented handover so your team can edit",
    ],
  },
  {
    index: "03",
    title: "Systems integration",
    body: "Making the tools you already pay for agree with each other, so one record does not exist in four different states.",
    points: [
      "Webhook and third-party API integration",
      "Data sync and reconciliation jobs",
      "Migrations between platforms",
      "Reporting pipelines",
    ],
  },
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="label-mono">Services</p>
      <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Build the software, then automate what surrounds it
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        I work with small teams and founders who need both halves: a product that works and the
        plumbing behind it that keeps running without supervision.
      </p>

      <div className="mt-14 space-y-px bg-border">
        {services.map((service) => (
          <section key={service.index} className="bg-background py-10">
            <div className="grid gap-6 md:grid-cols-[6rem_1fr_1fr]">
              <p className="label-mono text-primary">{service.index}</p>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              </div>
              <ul className="space-y-2.5">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 border border-border bg-card p-8">
        <h2 className="text-lg font-semibold tracking-tight">Got something in mind?</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Tell me the manual process that keeps eating your week, and I'll tell you what it would
          take to remove it.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start a conversation
        </Link>
      </div>
    </div>
  );
}
