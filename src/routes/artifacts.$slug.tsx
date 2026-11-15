import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { artifacts, getArtifact, type Artifact } from "@/data/artifacts";
import { getStoryDirection } from "@/data/story-directions";
import { getMissionStory } from "@/data/mission-stories";
import { ArchiveImg } from "@/components/archive/ArchiveImg";
import { SiteFooter, SiteHeader } from "@/components/archive/SiteHeader";
import { useNarration, type NarrationItem } from "@/hooks/use-narration";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/artifacts/$slug")({
  loader: ({ params }) => {
    const artifact = getArtifact(params.slug);
    if (!artifact) throw notFound();
    return { artifact };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.artifact;
    if (!a) return { meta: [{ title: "Artifact not found — Echoes of Exploration" }, { name: "robots", content: "noindex" }] };
    const title = `${a.name} · ${a.mission} — Echoes of Exploration`;
    return {
      meta: [
        { title },
        { name: "description", content: a.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: a.summary },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.hero.src },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: a.hero.src },
      ],
    };
  },
  component: StoryPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl">This artifact isn't in the archive yet.</h1>
      <Link to="/archive" className="eyebrow text-primary">Back to the archive →</Link>
    </div>
  ),
});

function StoryPage() {
  const { artifact } = Route.useLoaderData();
  const storyDirection = getStoryDirection(artifact.slug);
  const chapters = useMemo(() => getMissionStory(artifact), [artifact]);
  const items = useMemo<NarrationItem[]>(
    () =>
      chapters.flatMap((c, ci) =>
        c.segments.map((s, si) => ({ chapterIndex: ci, segmentIndex: si, text: s.text, creative: s.kind === "creative" })),
      ),
    [artifact],
  );
  const n = useNarration(items);
  const active = items[n.current];
  const [captions, setCaptions] = useState(true);
  const [showChallengeAnswer, setShowChallengeAnswer] = useState(false);

  useEffect(() => {
    if (!n.playing || !active) return;
    document.getElementById(`seg-${active.chapterIndex}-${active.segmentIndex}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [n.playing, active]);

  const startChapter = (ci: number) => {
    const i = items.findIndex((it) => it.chapterIndex === ci);
    n.seek(i);
    if (!n.playing) n.play(i);
  };

  return (
    <div className="story-page min-h-screen">
      <SiteHeader />
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
        <ArchiveImg image={artifact.hero} eager className="absolute inset-0 h-full w-full [&_img]:animate-drift" />
        <div className="absolute inset-0 bg-overlay-hero" aria-hidden />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10">
          <div className="eyebrow animate-rise flex gap-4">
            <span className={artifact.destination === "Moon" ? "text-lunar" : artifact.destination === "Mars" ? "text-martian" : "text-primary"}>{artifact.destinationDetail ?? artifact.destination}</span>
            <span>{artifact.mission}</span>
            <span>{artifact.agency}</span>
          </div>
          <h1 className="animate-rise mt-4 max-w-4xl text-5xl leading-[1.02] md:text-7xl">{artifact.name}</h1>
          <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">{artifact.summary}</p>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:px-10">
          {artifact.keyDates.map((d) => (
            <div key={d.label}>
              <dt className="eyebrow">{d.label}</dt>
              <dd className="mt-2 font-display text-2xl">{d.date}</dd>
            </div>
          ))}
        </dl>
      </section>

      {artifact.specs && (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10" aria-labelledby="technical-profile">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <div><p className="eyebrow">Engineering dossier</p><h2 id="technical-profile" className="mt-2 text-3xl md:text-4xl">Inside the machine</h2></div>
            <p className="max-w-md text-sm text-muted-foreground">Specifications are shown only where a cited mission source supports them. Values may refer to launch mass, landed mass or a component; read the labels carefully.</p>
          </div>
          <dl className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {([ ["Mass / weight", artifact.specs.mass], ["Dimensions", artifact.specs.dimensions], ["Power", artifact.specs.power], ["Mobility / propulsion", artifact.specs.propulsion], ["Planned lifetime", artifact.specs.designLife], ["Science instruments", artifact.specs.instruments], ["Structure", artifact.specs.structure], ["Engineering note", artifact.specs.notes] ] as const).filter((item) => item[1]).map(([label, value]) => (
              <div key={label} className="bg-background p-5"><dt className="eyebrow">{label}</dt><dd className="mt-3 text-sm leading-relaxed text-foreground/85">{value}</dd></div>
            ))}
          </dl>
        </section>
      )}

      <section className="objective-mission-strip">
        <div className="objective-mission-inner">
          <article><p className="brief-kicker"><span>01</span> OBJECTIVE</p><p>{artifact.objective ?? artifact.summary}</p></article>
          <article><p className="brief-kicker"><span>02</span> MISSION</p><p>{artifact.missionOverview ?? chapters[0]?.segments.find((segment) => segment.kind === "fact")?.text ?? artifact.summary}</p></article>
        </div>
      </section>

      {storyDirection && (
        <section className="story-direction-panel border-y border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-12 md:px-10">
            <div className="md:col-span-5">
              <p className="eyebrow text-primary">Documentary story direction</p>
              <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{storyDirection.title}</h2>
              <p className="mt-5 text-xl leading-relaxed">{storyDirection.question}</p>
            </div>
            <div className="space-y-5 md:col-span-7">
              <article><p className="eyebrow">The investigation</p><p className="mt-2 leading-relaxed text-foreground/85">{storyDirection.lens}</p></article>
              <article><p className="eyebrow">Narration direction</p><p className="mt-2 leading-relaxed text-foreground/85">{storyDirection.voice}</p></article>
              <div className="border-t border-border pt-4">
                <p className="eyebrow">Chapter cues</p>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {storyDirection.chapters.map((cue) => (
                    <li key={cue.id} className="border-l border-primary/50 pl-3">
                      <p className="font-mono text-xs uppercase tracking-wider text-primary">{chapters.find((chapter) => chapter.id === cue.id)?.title ?? cue.id}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cue.cue}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <NarrationBar
        n={n}
        captions={captions}
        setCaptions={setCaptions}
        activeText={active?.text}
        activeCreative={active?.creative}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 md:px-10">
        <aside className="md:col-span-3">
          <nav aria-label="Chapters" className="md:sticky md:top-28">
            <p className="eyebrow mb-4">Chronology</p>
            <ol className="relative border-l border-border">
              {chapters.map((c, ci) => {
                const isActive = active?.chapterIndex === ci && (n.playing || n.current > 0);
                return (
                  <li key={c.id} className="relative pl-5 pb-5">
                    <span
                      className={cn(
                        "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-border bg-background",
                        isActive && "border-primary bg-primary",
                      )}
                      aria-hidden
                    />
                    <a href={`#${c.id}`} className={cn("block text-sm hover:text-primary", isActive && "text-primary")}>
                      <span className="font-mono text-xs text-muted-foreground">{String(ci + 1).padStart(2, "0")} </span>
                      {c.title}
                    </a>
                    {c.dateLabel && <span className="font-mono text-[0.7rem] text-muted-foreground">{c.dateLabel}</span>}
                    {n.supported && (
                      <button onClick={() => startChapter(ci)} className="eyebrow mt-1 block hover:text-primary">
                        ▸ Narrate
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <main className="md:col-span-9">
          {chapters.map((c, ci) => (
            <section key={c.id} id={c.id} className="scroll-mt-28 border-t border-border py-14 first:border-t-0 first:pt-0">
              <p className="eyebrow">
                Chapter {ci + 1}
                {c.dateLabel && <span className="ml-3 text-primary">{c.dateLabel}</span>}
              </p>
              <h2 className="mt-3 text-4xl md:text-5xl">{c.title}</h2>
              <div className="mt-8 max-w-[65ch] space-y-6">
                {c.segments.map((s, si) => {
                  const on = n.playing && active?.chapterIndex === ci && active?.segmentIndex === si;
                  return s.kind === "fact" ? (
                    <p
                      key={si}
                      id={`seg-${ci}-${si}`}
                      className={cn("text-lg leading-relaxed text-foreground/85 transition-colors", on && "text-foreground")}
                    >
                      {s.text}
                    </p>
                  ) : (
                    <blockquote
                      key={si}
                      id={`seg-${ci}-${si}`}
                      className={cn("border-l-2 border-creative/60 pl-6 transition-colors", on && "border-creative")}
                    >
                      <span className="eyebrow text-creative">Imagined voice · creative writing</span>
                      <p className="mt-2 font-display text-2xl italic leading-snug text-creative">“{s.text}”</p>
                    </blockquote>
                  );
                })}
              </div>
              {c.milestones && (
                <ol className="mt-10 grid max-w-3xl gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                  {c.milestones.map((m) => (
                    <li key={m.date + m.text} className="bg-background p-4">
                      <p className="font-mono text-xs text-primary">{m.date}</p>
                      <p className="mt-1 text-sm">{m.text}</p>
                    </li>
                  ))}
                </ol>
              )}
              {c.image && (
                <div className="mt-10">
                  <ArchiveImg image={c.image} className="aspect-[16/9] w-full" />
                  <p className="mt-3 text-sm text-muted-foreground">{c.image.alt}</p>
                </div>
              )}
            </section>
          ))}

          {artifact.components && artifact.components.length > 0 && (
            <section className="border-t border-border py-14">
              <p className="eyebrow">Inside the artifact</p>
              <h2 className="mt-3 text-4xl md:text-5xl">What was it made of?</h2>
              <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                {artifact.components.map((part, i) => (
                  <article key={part.name} className="bg-background p-6">
                    <p className="font-mono text-xs text-primary">COMPONENT {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 font-display text-2xl">{part.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{part.function}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {artifact.endingExplanation && (
            <section className="border-t border-border py-14">
              <p className="eyebrow">Mission ending · {artifact.endingType?.replaceAll("-", " ")}</p>
              <h2 className="mt-3 text-4xl md:text-5xl">How the mission ended</h2>
              <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-foreground/85">{artifact.endingExplanation}</p>
            </section>
          )}
          {artifact.challenge && (
            <section className="border-t border-border py-14">
              <p className="eyebrow">Field investigation · Student challenge</p>
              <div className="mt-5 max-w-3xl border border-primary/40 bg-card p-7 md:p-9">
                <h2 className="text-3xl md:text-4xl">Inspect the evidence.</h2>
                <p className="mt-5 text-xl leading-relaxed">{artifact.challenge.question}</p>
                <p className="mt-4 text-sm text-muted-foreground"><span className="font-mono text-primary">HINT /</span> {artifact.challenge.hint}</p>
                <button onClick={() => setShowChallengeAnswer((v) => !v)} className="mt-7 inline-flex items-center gap-3 border border-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground" aria-expanded={showChallengeAnswer}>
                  {showChallengeAnswer ? "Hide explanation" : "Reveal verified explanation"} <span aria-hidden>→</span>
                </button>
                {showChallengeAnswer && <div className="mt-6 border-t border-border pt-5"><p className="eyebrow text-primary">Verified explanation</p><p className="mt-3 leading-relaxed text-foreground/85">{artifact.challenge.answer}</p></div>}
              </div>
            </section>
          )}
          <StatusBlock artifact={artifact} />
          <Sources artifact={artifact} />
          <Related artifact={artifact} />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

function NarrationBar({
  n,
  captions,
  setCaptions,
  activeText,
  activeCreative,
}: {
  n: ReturnType<typeof useNarration>;
  captions: boolean;
  setCaptions: (v: boolean) => void;
  activeText?: string;
  activeCreative?: boolean;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-3 md:px-10">
        {n.supported ? (
          <>
            <button
              onClick={() => (n.playing ? n.pause() : n.play())}
              className="inline-flex h-10 items-center gap-2 rounded-sm bg-primary px-4 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
              aria-label={n.playing ? "Pause narration" : "Play narration"}
            >
              {n.playing ? "❚❚ Pause" : "▶ Listen"}
            </button>
            <label className="eyebrow flex items-center gap-2">
              Speed
              <select
                value={n.rate}
                onChange={(e) => n.changeRate(Number(e.target.value))}
                className="rounded-sm border border-input bg-background px-2 py-1 font-mono text-xs text-foreground"
              >
                {[0.75, 1, 1.25, 1.5].map((r) => (
                  <option key={r} value={r}>{r}×</option>
                ))}
              </select>
            </label>
            <button onClick={() => setCaptions(!captions)} className="eyebrow hover:text-primary" aria-pressed={captions}>
              Captions {captions ? "on" : "off"}
            </button>
          </>
        ) : (
          <p className="eyebrow">Narration needs a browser with speech support. The full transcript is below.</p>
        )}
        {captions && n.playing && activeText && (
          <p
            aria-live="polite"
            className={cn("basis-full truncate text-sm md:basis-auto md:flex-1", activeCreative ? "italic text-creative" : "text-foreground/85")}
          >
            {activeCreative && <span className="eyebrow mr-2 text-creative">Imagined</span>}
            {activeText}
          </p>
        )}
      </div>
    </div>
  );
}

function StatusBlock({ artifact }: { artifact: Artifact }) {
  return (
    <section className="border-t border-border py-14">
      <p className="eyebrow">Current status</p>
      <div className="mt-4 grid gap-6 rounded-sm border border-border bg-card p-8 md:grid-cols-3">
        <div>
          <p className="eyebrow">Evidence level</p>
          <p className="mt-2 font-mono text-sm text-primary">{artifact.status.kind}</p>
        </div>
        <div className="md:col-span-2">
          <p className="font-display text-2xl">{artifact.status.place}</p>
          <p className="mt-3 text-muted-foreground">{artifact.status.note}</p>
        </div>
      </div>
    </section>
  );
}

function Sources({ artifact }: { artifact: Artifact }) {
  return (
    <section className="border-t border-border py-14">
      <p className="eyebrow">Evidence & sources</p>
      <ul className="mt-6 space-y-3">
        {artifact.sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary">
              {s.label} ↗
            </a>
          </li>
        ))}
        <li>
          <a href={`https://images.nasa.gov/search?q=${encodeURIComponent(artifact.name)}`} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary">
            Search NASA Image and Video Library for this artifact ↗
          </a>
        </li>
      </ul>
      <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
        Passages marked “Imagined voice” are creative writing. They are not quotations, transmissions or records of any spacecraft.
      </p>
    </section>
  );
}

function Related({ artifact }: { artifact: Artifact }) {
  const rel = artifact.related.map((s) => artifacts.find((a) => a.slug === s)).filter(Boolean) as Artifact[];
  return (
    <section className="border-t border-border py-14">
      <p className="eyebrow">Continue through the archive</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {rel.map((a) => (
          <Link key={a.slug} to="/artifacts/$slug" params={{ slug: a.slug }} className="group block">
            <ArchiveImg image={a.hero} showCredit={false} className="aspect-[16/10]" />
            <p className="eyebrow mt-3">{a.destination} · {a.mission}</p>
            <p className="mt-1 font-display text-2xl group-hover:text-primary">{a.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
