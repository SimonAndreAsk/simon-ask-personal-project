import { CompanyLogo } from "@/components/company-logo";
import type { ProfileEntry } from "@/lib/profile";

type ProfileTimelineProps = {
  entries: ProfileEntry[];
  emptyMessage: string;
  /** Vertical connector between logo nodes (experience section). */
  showProgressLine?: boolean;
};

function logoFallbackLetter(entry: ProfileEntry): string {
  const alt = entry.logo?.alt?.trim();
  if (alt) return alt.charAt(0).toUpperCase();
  return entry.title.charAt(0).toUpperCase();
}

export function ProfileTimeline({
  entries,
  emptyMessage,
  showProgressLine = false,
}: ProfileTimelineProps) {
  if (entries.length === 0) {
    return <p className="leading-relaxed text-muted">{emptyMessage}</p>;
  }

  const showLogos = entries.some((entry) => entry.logo);

  return (
    <ul className="border-t border-border/40">
      {entries.map((entry, index) => {
        const isLast = index === entries.length - 1;
        const showConnector =
          showProgressLine && showLogos && entry.logo && !isLast;

        return (
        <li
          key={`${entry.title}-${entry.period ?? entry.subtitle ?? ""}`}
          className={[
            "group cursor-default border-b border-border/40 py-5 transition-colors duration-200",
            showLogos
              ? "grid grid-cols-[3rem_1fr] items-stretch gap-x-4"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {showLogos && entry.logo ? (
            <div className="flex flex-col items-center">
              <CompanyLogo
                src={entry.logo.src}
                alt={entry.logo.alt}
                fallbackLetter={logoFallbackLetter(entry)}
                className="relative z-10 bg-background"
              />
              {showConnector ? (
                <div
                  className="mt-0 w-px min-h-6 flex-1 bg-gradient-to-b from-border/80 via-border/50 to-border/80 transition-colors duration-200 group-hover:from-open-green/35 group-hover:via-open-green/20 group-hover:to-border/60"
                  aria-hidden
                />
              ) : null}
            </div>
          ) : showLogos ? (
            <span className="size-12 shrink-0" aria-hidden />
          ) : null}
          <div className="min-w-0">
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
                <h3 className="font-display text-lg tracking-tight text-foreground transition-colors duration-200 group-hover:text-open-green sm:text-xl">
                  {entry.title}
                </h3>
              )}
              {entry.period ? (
                <span className="text-sm text-muted tabular-nums">{entry.period}</span>
              ) : null}
            </div>
            {entry.subtitle ? (
              <p className="mt-1 text-sm text-foreground/90 transition-colors duration-200 group-hover:text-foreground">
                {entry.subtitle}
              </p>
            ) : null}
            {entry.description ? (
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-foreground/75">
                {entry.description}
              </p>
            ) : entry.details && entry.details.length > 0 ? (
              entry.details.length === 1 ? (
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-foreground/75">
                  {entry.details[0]}
                </p>
              ) : (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted transition-colors duration-200 marker:text-muted/60 group-hover:text-foreground/75">
                  {entry.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )
            ) : null}
          </div>
        </li>
        );
      })}
    </ul>
  );
}
