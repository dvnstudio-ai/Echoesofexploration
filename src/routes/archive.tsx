import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { artifacts } from "@/data/artifacts";
import { ArtifactRow } from "@/components/archive/ArtifactRow";
import { SiteFooter, SiteHeader } from "@/components/archive/SiteHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "The Archive — Echoes of Exploration" },
      { name: "description", content: "Browse NASA spacecraft and hardware left on the Moon, Mars, asteroids and deep space." },
      { property: "og:title", content: "The Archive — Echoes of Exploration" },
      { property: "og:description", content: "NASA artifacts and silent spacecraft across the Moon, Mars, asteroids and deep space, told chronologically with sources." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArchivePage,
});

const filters = ["All", "Moon", "Mars", "Other"] as const;
const endingFilters = ["All endings", "intentional-impact", "power-loss", "communication-loss", "immobilized", "decommissioned", "discarded-by-design", "still-scientifically-useful", "accidental-atmospheric-loss"] as const;
const endingLabels: Record<string, string> = {
  "intentional-impact": "Intentional impact", "power-loss": "Power loss", "communication-loss": "Communication lost",
  "immobilized": "Immobilized", "decommissioned": "Remote shutdown", "discarded-by-design": "Discarded by design",
  "still-scientifically-useful": "Still scientifically useful", "accidental-atmospheric-loss": "Accidental atmospheric loss",
};

function ArchivePage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [q, setQ] = useState("");
  const [ending, setEnding] = useState<(typeof endingFilters)[number]>("All endings");
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return artifacts
      .filter((a) => filter === "All" || a.destination === filter)
      .filter((a) => ending === "All endings" || a.endingType === ending)
      .filter((a) => !term || `${a.name} ${a.mission} ${a.agency} ${a.endingType ?? ""}`.toLowerCase().includes(term));
  }, [filter, ending, q]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-10">
        <p className="eyebrow">The Archive</p>
        <h1 className="mt-3 max-w-3xl text-5xl leading-tight md:text-6xl">What we left behind, and how it got there.</h1>
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter by destination" className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors",
                  filter === f ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="w-full md:w-64">
            <span className="sr-only">Filter by mission ending</span>
            <select value={ending} onChange={(e) => setEnding(e.target.value as (typeof endingFilters)[number])} className="w-full rounded-sm border border-input bg-background px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
              {endingFilters.map((f) => <option key={f} value={f}>{f === "All endings" ? f : endingLabels[f]}</option>)}
            </select>
          </label>
          <label className="w-full md:w-80">
            <span className="sr-only">Search artifacts or missions</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search artifact or mission…"
              className="w-full rounded-sm border border-input bg-transparent px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="font-mono uppercase tracking-[0.16em]">{list.length} of {artifacts.length} investigations</p>
          <p>Curated records · Research snapshot: 13 Nov 2026</p>
        </div>
        <div className="mt-5">
          {list.map((a, i) => <ArtifactRow key={a.slug} artifact={a} index={i} />)}
          {list.length === 0 && <p className="border-t border-border py-16 text-muted-foreground">No artifacts match that search.</p>}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
