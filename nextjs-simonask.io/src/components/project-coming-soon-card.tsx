export function ProjectComingSoonCard() {
  return (
    <li className="border-b border-border/40 py-5">
      <div className="flex gap-4">
        <div
          className="mt-0.5 flex size-16 shrink-0 items-center justify-center rounded-md border border-dashed border-border/70 bg-surface/60 text-xs font-medium tracking-wide text-muted uppercase"
          aria-hidden
        >
          Soon
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg leading-snug tracking-tight text-foreground sm:text-xl">
            Coming soon
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            More projects are on the way — case studies and repos will land here
            as they ship.
          </p>
        </div>
      </div>
    </li>
  );
}
