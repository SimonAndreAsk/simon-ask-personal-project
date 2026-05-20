import type { ProfileEntry } from "@/lib/profile";

type ProfileTimelineProps = {
  entries: ProfileEntry[];
  emptyMessage: string;
};

export function ProfileTimeline({ entries, emptyMessage }: ProfileTimelineProps) {
  if (entries.length === 0) {
    return <p className="leading-relaxed text-muted">{emptyMessage}</p>;
  }

  return (
    <ul className="border-t border-border/40">
      {entries.map((entry) => (
        <li
          key={`${entry.title}-${entry.period ?? entry.subtitle ?? ""}`}
          className="border-b border-border/40 py-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            {entry.href ? (
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg tracking-tight text-foreground transition-colors hover:text-open-green sm:text-xl"
              >
                {entry.title}
              </a>
            ) : (
              <h3 className="font-display text-lg tracking-tight text-foreground sm:text-xl">
                {entry.title}
              </h3>
            )}
            {entry.period ? (
              <span className="text-sm text-muted tabular-nums">{entry.period}</span>
            ) : null}
          </div>
          {entry.subtitle ? (
            <p className="mt-1 text-sm text-foreground/90">{entry.subtitle}</p>
          ) : null}
          {entry.description ? (
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              {entry.description}
            </p>
          ) : entry.details && entry.details.length > 0 ? (
            entry.details.length === 1 ? (
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                {entry.details[0]}
              </p>
            ) : (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted marker:text-muted/60">
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )
          ) : null}
        </li>
      ))}
    </ul>
  );
}
