import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/archive/SiteHeader";

export const Route = createFileRoute("/method")({
  head: () => ({
    meta: [
      { title: "Method & Sources — Echoes of Exploration" },
      { name: "description", content: "How the archive separates documented fact, uncertainty and creative narration." },
      { property: "og:title", content: "Method & Sources — Echoes of Exploration" },
      { property: "og:description", content: "How we separate documented fact from creative narration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MethodPage,
});

const rules = [
  ["Facts", "Dates, events and findings come from NASA mission records and official archives, linked at the end of every story."],
  ["Imagined voice", "Short first-person passages give an artifact a voice. They are creative writing, always labelled, and never presented as transmissions or quotations."],
  ["Location", "We say where an artifact remains only when imagery or mission records support it, and state its evidence level."],
  ["Images & video", "Use the linked NASA Image and Video Library and official mission archives to verify each asset. Image credits and original source pages are linked beside media; search links are provided where a specific asset has not yet been selected."],
  ["Collection scope", "This is a growing, curated 25-record collection, not a complete inventory of every human-made object on the Moon or Mars. Mission and artifact totals are not published as global counts until a consistent counting method and complete inventory are verified. Research snapshot: 11 November 2026."],
  ["Mission endings", "Intentional impact, communication loss, power loss, immobilization, remote shutdown and discarded-by-design are distinct outcomes. Loss of contact is not described as physical destruction without evidence."],
  ["Narration", "Audio uses your browser's built-in speech voice, so it varies by device. A full transcript is always on the page."],
];

function MethodPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-36 md:px-10">
        <p className="eyebrow">Method</p>
        <h1 className="mt-3 text-5xl leading-tight">Honest about what is known — and what isn't.</h1>
        <dl className="mt-14">
          {rules.map(([t, d]) => (
            <div key={t} className="grid gap-2 border-t border-border py-8 md:grid-cols-3">
              <dt className="font-display text-2xl">{t}</dt>
              <dd className="leading-relaxed text-muted-foreground md:col-span-2">{d}</dd>
            </div>
          ))}
        </dl>
      </main>
      <SiteFooter />
    </div>
  );
}
