import { useState } from "react";
import type { ArchiveImage } from "@/data/artifacts";
import { cn } from "@/lib/utils";

export function ArchiveImg({
  image,
  className,
  eager,
  showCredit = true,
}: {
  image: ArchiveImage;
  className?: string;
  eager?: boolean;
  showCredit?: boolean;
}) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  return (
    <figure className={cn("relative overflow-hidden bg-muted", className)}>
      {state !== "error" ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setState("ok")}
          onError={() => setState("error")}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700",
            state === "ok" ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center">
          <span className="eyebrow">Image unavailable — {image.alt}</span>
        </div>
      )}
      {state === "loading" && <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden />}
      {image.kind !== "photograph" && (
        <span className="absolute left-3 top-3 rounded-sm bg-background/85 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-creative">
          {image.kind === "illustration" ? "Artist's concept" : image.kind === "map" ? "Map" : "Context image · not artifact"}
        </span>
      )}
      {showCredit && (
        <figcaption className="absolute bottom-2 right-3 font-mono text-[0.6rem] uppercase tracking-widest text-foreground/70">
          <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
            {image.credit} ↗
          </a>
        </figcaption>
      )}
    </figure>
  );
}
