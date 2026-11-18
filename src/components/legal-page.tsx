import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl break-words px-6 py-16">
      <p className="label-mono">Phil Social Automation</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Effective date: <time dateTime="2026-11-18">November 18, 2026</time>
      </p>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">{children}</div>
      <section
        aria-labelledby="legal-contact"
        className="mt-8 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground"
      >
        <h2 id="legal-contact" className="text-xl font-semibold tracking-tight text-foreground">
          Contact
        </h2>
        <p className="mt-3">
          Phil Social Automation is operated by {site.name}, Philippines. For questions or data
          requests, email{" "}
          <a className="text-primary underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          . Do not send passwords, access tokens, or refresh tokens by email.
        </p>
      </section>
      <nav aria-label="Legal pages" className="mt-10 flex flex-wrap gap-6 text-sm">
        <Link to="/terms" className="text-primary underline underline-offset-4">
          Terms of Service
        </Link>
        <Link to="/privacy" className="text-primary underline underline-offset-4">
          Privacy Policy
        </Link>
      </nav>
    </article>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
