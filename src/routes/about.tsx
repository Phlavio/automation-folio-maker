import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Philip Augustine B. Cadungog" },
      {
        name: "description",
        content:
          "Philip Augustine B. Cadungog is a software developer in Dumaguete working across full stack web development and n8n automation.",
      },
      { property: "og:title", content: "About — Philip Augustine B. Cadungog" },
      {
        property: "og:description",
        content: "Software developer in Dumaguete, working across web development and automation.",
      },
    ],
  }),
  component: AboutPage,
});

const toolkit = [
  { group: "Front end", items: ["React", "TypeScript", "Tailwind CSS", "TanStack Query"] },
  { group: "Back end", items: ["Node.js", "PostgreSQL", "REST APIs", "Auth & RLS"] },
  { group: "Automation", items: ["n8n", "Webhooks", "Cron & queues", "NocoDB"] },
  { group: "Ways of working", items: ["Typed boundaries", "Small releases", "Written handover"] },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="label-mono">About</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
      <p className="label-mono mt-3">
        {site.headline} · {site.location}
      </p>

      <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-sm leading-relaxed text-foreground/90">
          <p>
            I'm a software developer based in Dumaguete City. Most of my work sits in two places at
            once: building web applications, and building the automation that keeps the work around
            them from piling up.
          </p>
          <p>
            On the web side that means full stack delivery — interface, API, and database designed
            together rather than bolted on afterwards. On the automation side it means n8n
            workflows: order handling, lead routing, reporting, and the dozens of small handoffs
            that quietly consume a team's week.
          </p>
          <p>
            I care about systems you can still reason about in six months. That usually looks like
            validating data where it enters, making every job safe to retry, and writing enough
            documentation that the next person — or the client's own team — can take it over.
          </p>
          <p>
            The project list on this site is fed straight from my own database, which is a small
            example of the same idea: update it once, in the place where the work actually happens.
          </p>
        </div>

        <div className="space-y-8">
          {toolkit.map((section) => (
            <div key={section.group}>
              <p className="label-mono">{section.group}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item} className="border-l border-border pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
