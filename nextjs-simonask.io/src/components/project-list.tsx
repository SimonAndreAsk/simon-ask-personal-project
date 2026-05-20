import { ArrowRight } from "lucide-react";
import { type SanityDocument } from "next-sanity";

import { GithubIcon, SiteIcon } from "@/components/site-icon";
import { ProjectTags } from "@/components/project-tags";
import { isGithubProjectUrl, projectLinkLabel } from "@/lib/project-link";
import { projectTagsFromSanity } from "@/lib/project-tags";
import { urlFor } from "@/sanity/image";

function isDraftProject(project: SanityDocument) {
  return project._id.startsWith("drafts.");
}

/** Wide crop for mobile thumb; object-cover also fills the desktop square thumb. */
const THUMB_FETCH_WIDTH = 320;
const THUMB_FETCH_HEIGHT = 200;

function projectThumbnail(project: SanityDocument): {
  src: string | null;
  alt: string;
} {
  const title =
    typeof project.title === "string" ? project.title : "Project";
  const alt =
    typeof project.image === "object" &&
    project.image !== null &&
    "alt" in project.image &&
    typeof project.image.alt === "string" &&
    project.image.alt.trim()
      ? project.image.alt
      : `${title} thumbnail`;

  if (!project.image || !urlFor(project.image)) {
    return { src: null, alt };
  }

  const src =
    urlFor(project.image)
      ?.width(THUMB_FETCH_WIDTH)
      .height(THUMB_FETCH_HEIGHT)
      .fit("crop")
      .auto("format")
      .quality(85)
      .url() ?? null;

  return { src, alt };
}

function projectSummary(project: SanityDocument): string | null {
  if (typeof project.summary === "string" && project.summary.trim()) {
    return project.summary.trim();
  }
  return null;
}

function projectAriaLabel(title: string, linkLabel: string, hasHref: boolean) {
  if (!hasHref) return title;
  return `${title} — ${linkLabel} (opens in new tab)`;
}

type ProjectDestinationProps = {
  linkLabel: string;
  showGithubIcon: boolean;
  className?: string;
  arrowClassName?: string;
};

function ProjectDestination({
  linkLabel,
  showGithubIcon,
  className = "",
  arrowClassName = "",
}: ProjectDestinationProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover:text-open-green",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showGithubIcon ? <GithubIcon className="size-4 shrink-0" /> : null}
      <span>{linkLabel}</span>
      <SiteIcon
        icon={ArrowRight}
        className={["size-4 shrink-0 transition-transform", arrowClassName]
          .filter(Boolean)
          .join(" ")}
      />
    </span>
  );
}

export function ProjectList({ projects }: { projects: SanityDocument[] }) {
  if (projects.length === 0) {
    return (
      <p className="leading-relaxed text-muted">
        I haven&apos;t listed a project here yet. Check back soon.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4 border-t border-border/40 sm:gap-0">
      {projects.map((project) => {
        const draft = isDraftProject(project);
        const href = typeof project.url === "string" ? project.url : "";
        const hasHref = Boolean(href);
        const { src: thumbUrl } = projectThumbnail(project);
        const linkLabel = hasHref ? projectLinkLabel(href) : "View project";
        const showGithubIcon = hasHref ? isGithubProjectUrl(href) : false;
        const title =
          typeof project.title === "string" ? project.title : "Project";
        const summary = projectSummary(project);
        const tags = projectTagsFromSanity(project.tags);

        return (
          <li key={project._id} className="sm:border-b sm:border-border/40">
            <a
              href={href || undefined}
              target={hasHref ? "_blank" : undefined}
              rel={hasHref ? "noopener noreferrer" : undefined}
              aria-label={projectAriaLabel(title, linkLabel, hasHref)}
              className={[
                "group flex flex-col rounded-xl bg-surface/40 px-4 py-5 ring-1 ring-border/50",
                "transition-colors hover:text-open-green",
                "sm:grid sm:grid-cols-[5rem_1fr] sm:items-start sm:gap-x-4 sm:rounded-none sm:bg-transparent sm:p-0 sm:py-5 sm:ring-0",
              ].join(" ")}
            >
              <div className="hidden aspect-square size-20 shrink-0 overflow-hidden rounded-xl bg-surface ring-1 ring-border/50 sm:block">
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt=""
                    className="size-full object-cover object-center"
                  />
                ) : (
                  <div
                    className="flex size-full items-center justify-center bg-surface/80 font-display text-lg text-muted sm:text-xl"
                    aria-hidden
                  >
                    {title.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                {tags.length > 0 ? <ProjectTags tags={tags} /> : null}
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green sm:text-xl">
                      {project.title}
                    </h3>
                    {draft && (
                      <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs text-open-green">
                        Draft
                      </span>
                    )}
                  </div>
                  {hasHref ? (
                    <ProjectDestination
                      linkLabel={linkLabel}
                      showGithubIcon={showGithubIcon}
                      className="hidden shrink-0 pt-0.5 opacity-0 transition-[opacity,color,transform] duration-200 group-hover:opacity-100 group-hover:text-open-green group-focus-visible:opacity-100 sm:inline-flex"
                      arrowClassName="group-hover:translate-x-0.5"
                    />
                  ) : null}
                </div>

                {summary ? (
                  <p className="line-clamp-2 text-sm leading-snug text-muted group-hover:text-foreground/80 sm:leading-relaxed">
                    {summary}
                  </p>
                ) : (
                  <p className="text-sm leading-snug text-muted group-hover:text-foreground/80 sm:leading-relaxed">
                    Open to see the repo or live site.
                  </p>
                )}

                {hasHref ? (
                  <ProjectDestination
                    linkLabel={linkLabel}
                    showGithubIcon={showGithubIcon}
                    className="mt-4 min-h-11 items-center sm:hidden"
                    arrowClassName="group-hover:translate-x-0.5"
                  />
                ) : null}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
