import { contactEmail, contactMailto } from "@/lib/contact";

export function OpenForWorkBadge() {
  return (
    <a
      href={contactMailto}
      title={`Email ${contactEmail}`}
      aria-label={`Contact me at ${contactEmail} — open for work`}
      className="group inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-surface/50 px-3.5 py-2 text-sm font-medium text-foreground shadow-sm transition-[color,box-shadow,border-color,transform] hover:border-open-green/50 hover:bg-surface/80 hover:text-open-green hover:shadow-md active:scale-[0.98]"
    >
      <span className="open-for-work-dot size-2 shrink-0 rounded-full bg-open-green" />
      Open for work
      <span
        className="text-muted transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-open-green"
        aria-hidden
      >
        →
      </span>
    </a>
  );
}
