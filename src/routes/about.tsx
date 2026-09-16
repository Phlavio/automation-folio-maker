import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Philip Augustine B. Cadungog" },
      {
        name: "description",
        content:
          "Philip Augustine B. Cadungog is a full-stack software engineer building web applications, REST APIs, and AI-powered n8n automation workflows.",
      },
      { property: "og:title", content: "About — Philip Augustine B. Cadungog" },
      {
        property: "og:description",
        content: "Full-stack software engineer working across web development, APIs, and AI-powered automation.",
      },
    ],
  }),
  component: AboutPage,
});

const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "PHP", "Java", "C#", "SQL"] },
  { group: "Frontend", items: ["Vue.js", "React.js", "Twig.php", "HTML5", "CSS3", "Bootstrap"] },
  { group: "Backend", items: ["Laravel", "Spring Boot", "Node.js", "Express", "REST APIs"] },
  {
    group: "Automation & tools",
    items: ["n8n", "OpenAI", "Gemini", "OpenClaw", "Webhooks", "WordPress", "Git", "Figma"],
  },
];

const experience = [
  {
    role: "Workflow Automation Developer",
    company: "Sophi Outsourcing",
    dates: "Dec 2025 - Present",
    summary:
      "Build AI agents and monitored n8n workflows for data processing, content generation, customer support, and SEO. Connect CRMs, webhooks, cloud applications, OpenAI, and Gemini, while maintaining WordPress environments. Reduced manual process time by 70%.",
  },
  {
    role: "Full-Stack Developer (Freelance)",
    company: "Diamond Branding Co.",
    dates: "Jul - Aug 2025",
    summary:
      "Built a React and TypeScript affiliate marketing dashboard with real-time analytics, commission tracking, automated link generation, and user-facing and admin workflows.",
  },
  {
    role: "Information Technology Instructor",
    company: "Southern Tech College Foundation Incorporated",
    dates: "Mar 2025",
    summary:
      "Taught college-level Web Development and Computer-Based Accounting through hands-on, project-based instruction.",
  },
  {
    role: "Full-Stack Developer",
    company: "3 Clicks Cloud",
    dates: "Mar 2024 - Feb 2025",
    summary:
      "Delivered Vue.js and Spring Boot applications backed by MariaDB and RESTful APIs. Improved stability and performance through debugging, query refinement, and API enhancements within Agile teams.",
  },
  {
    role: "Web Developer Intern",
    company: "Miller Solutions Development",
    dates: "Jan - May 2023",
    summary:
      "Created and tested Figma UI/UX designs, supported client application development, built a portfolio site, and worked with Vue 3, TypeScript, API integration, and SQL data preparation.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-mono">About</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
          <p className="label-mono mt-3">
            Full-stack software engineer · {site.location}
          </p>
        </div>
        <Button asChild variant="outline">
          <a href="/Philip_Cadungog_Resume.pdf" download>
            <Download />
            Download resume
          </a>
        </Button>
      </div>

      <section className="mt-10 max-w-3xl space-y-5 text-sm leading-relaxed text-foreground/90">
        <p className="label-mono">Professional summary</p>
        <p>
          Full-stack software engineer with hands-on experience building RESTful APIs, scalable web
          applications, and AI-powered automation workflows using n8n, OpenAI, Gemini, and OpenClaw.
          I work across JavaScript/TypeScript, PHP, Java, Vue.js, and React to improve system
          stability and reduce manual effort through clean code and reliable API integrations.
        </p>
      </section>

      <section className="mt-14">
        <p className="label-mono">Core skills</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {skills.map((section) => (
            <div key={section.group}>
              <h2 className="font-medium">{section.group}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <p className="label-mono">Professional experience</p>
        <div className="mt-6 space-y-8">
          {experience.map((job) => (
            <article key={`${job.company}-${job.role}`} className="border-l border-border pl-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="font-medium">{job.role} · {job.company}</h2>
                <p className="label-mono">{job.dates}</p>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {job.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-10 border-t border-border pt-8 sm:grid-cols-2">
        <div>
          <p className="label-mono">Education</p>
          <h2 className="mt-3 font-medium">Bachelor of Science in Information Technology</h2>
          <p className="mt-1 text-sm text-muted-foreground">Silliman University · Dumaguete City</p>
        </div>
        <div>
          <p className="label-mono">Certification</p>
          <h2 className="mt-3 font-medium">Career Service Eligibility - Professional</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Civil Service Commission · General Rating: 85.10
          </p>
        </div>
      </section>
    </div>
  );
}
