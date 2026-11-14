import { Link } from "@tanstack/react-router";
import type { Artifact } from "@/data/artifacts";
import { ArchiveImg } from "./ArchiveImg";

export function ArtifactRow({ artifact, index }: { artifact: Artifact; index: number }) {
  return (
    <article className="group grid gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-10">
      <Link
        to="/artifacts/$slug"
        params={{ slug: artifact.slug }}
        className="md:col-span-5"
        aria-label={`Open the story of ${artifact.name}`}
      >
        <ArchiveImg
          image={artifact.hero}
          showCredit={false}
          className="aspect-[4/3] [&_img]:transition-transform [&_img]:duration-[1.2s] group-hover:[&_img]:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-col md:col-span-7">
        <div className="eyebrow flex flex-wrap gap-x-4 gap-y-1">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className={artifact.destination === "Moon" ? "text-lunar" : artifact.destination === "Mars" ? "text-martian" : "text-primary"}>
            {artifact.destination}
          </span>
          <span>{artifact.mission}</span>
          {artifact.endingType && <span className="text-foreground/60">{artifact.endingType.replaceAll("-", " ")}</span>}
        </div>
        <h3 className="mt-3 text-3xl md:text-4xl">
          <Link to="/artifacts/$slug" params={{ slug: artifact.slug }} className="hover:text-primary">
            {artifact.name}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{artifact.summary}</p>
        <dl className="mt-6 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
          {artifact.keyDates.slice(0, 3).map((d) => (
            <div key={d.label}>
              <dt className="eyebrow">{d.label}</dt>
              <dd className="mt-1 font-mono text-sm">{d.date}</dd>
            </div>
          ))}
        </dl>
        <Link
          to="/artifacts/$slug"
          params={{ slug: artifact.slug }}
          className="mt-8 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary"
        >
          Read the story <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
