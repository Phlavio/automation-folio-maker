export type Note = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string[];
};

export const notes: Note[] = [
  {
    slug: "idempotent-n8n-workflows",
    title: "Making n8n workflows idempotent",
    date: "2026-08-12",
    summary:
      "Retries are inevitable. A short pattern for keying every workflow run so a replay never double-charges, double-emails, or double-writes.",
    tags: ["n8n", "automation", "reliability"],
    body: [
      "Every automation eventually runs twice. A webhook is retried, someone clicks the button again, or a node fails halfway through and you replay the execution. If the workflow is not idempotent, the second run does real damage.",
      "The pattern I reach for: derive a deterministic key from the payload — order id, invoice number, message id — and write it to a small dedupe table before doing any outward-facing work. If the insert conflicts, stop the branch early and exit successfully.",
      "That single guard turns a fragile workflow into one you can retry without thinking. It also makes debugging much calmer, because replaying a failed execution is no longer a decision that needs a meeting.",
    ],
  },
  {
    slug: "webhooks-before-polling",
    title: "Reach for webhooks before polling",
    date: "2026-06-30",
    summary:
      "Polling schedules are easy to write and expensive to live with. When a provider offers events, take them.",
    tags: ["integrations", "architecture"],
    body: [
      "A five-minute cron that fetches everything and diffs it feels productive on day one. By month three it is the slowest, noisiest part of the system, and it still misses changes that happen and revert inside the window.",
      "Webhooks flip the cost: the provider tells you what changed, once, with the payload attached. Add signature verification, a queue, and the dedupe key from above, and the whole integration becomes cheaper and more accurate at the same time.",
      "Keep a slow reconciliation job as a safety net — daily, not every five minutes — for the events that inevitably get lost.",
    ],
  },
  {
    slug: "typed-boundaries-full-stack",
    title: "Typed boundaries pay for themselves",
    date: "2026-05-04",
    summary:
      "Validate at the edges — forms, webhooks, third-party APIs — and the middle of your app gets quiet.",
    tags: ["typescript", "full stack"],
    body: [
      "Most runtime bugs I have chased were shape bugs: a field that was a string yesterday and null today, an API that returns an object instead of an array when there is exactly one result.",
      "Parsing untrusted input at the boundary with a schema means the failure happens where the data enters, with a message that names the field. Everything downstream can then be plain, boring, well-typed code.",
      "It is also the cheapest documentation you will ever write: the schema is the contract, and it cannot drift from the implementation without breaking the build.",
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}
