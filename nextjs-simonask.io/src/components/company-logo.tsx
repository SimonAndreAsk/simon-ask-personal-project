type CompanyLogoProps = {
  src?: string;
  alt: string;
  /** Shown in the circle when no image is set yet. */
  fallbackLetter: string;
  className?: string;
};

export function CompanyLogo({
  src,
  alt,
  fallbackLetter,
  className,
}: CompanyLogoProps) {
  return (
    <div
      className={[
        "size-12 shrink-0 overflow-hidden rounded-full bg-surface ring-1 ring-border/50 bg-background",
        "transition-[transform,box-shadow] duration-200 ease-out",
        "group-hover:scale-[1.05] group-hover:ring-open-green/45 group-hover:shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="size-12 object-cover"
        />
      ) : (
        <div
          className="flex size-12 items-center justify-center bg-surface/80 font-display text-sm text-muted"
          aria-hidden
        >
          {fallbackLetter}
        </div>
      )}
    </div>
  );
}
