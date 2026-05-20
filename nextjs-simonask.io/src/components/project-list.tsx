import { ArrowRight } from "lucide-react";
import { type SanityDocument } from "next-sanity";

import { ProjectComingSoonCard } from "@/components/project-coming-soon-card";
import { SiteIcon } from "@/components/site-icon";
import { urlFor } from "@/sanity/image";

function isDraftProject(project: SanityDocument) {
  return project._id.startsWith("drafts.");
}

export function ProjectList({ projects }: { projects: SanityDocument[] }) {
  return (
    <ul className="border-t border-border/40">
      {projects.map((project) => {
        const draft = isDraftProject(project);
        const href = typeof project.url === "string" ? project.url : "";
        const thumbUrl =
          project.image && urlFor(project.image)
            ? urlFor(project.image)?.width(160).height(160).fit("crop").url()
            : null;

        return (
          <li key={project._id} className="border-b border-border/40">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-4 py-5 transition-colors hover:text-open-green"
            >
              {thumbUrl ? (
                <img
                  src={thumbUrl}
                  alt={
                    typeof project.title === "string"
                      ? `${project.title} thumbnail`
                      : "Project thumbnail"
                  }
                  width={64}
                  height={64}
                  className="mt-0.5 size-16 shrink-0 rounded-md object-cover"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green sm:text-xl">
                    {project.title}
                  </h3>
                  {draft && (
                    <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs text-open-green">
                      Draft
                    </span>
                  )}
                </div>
                {typeof project.summary === "string" && project.summary.trim() ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-foreground/80">
                    {project.summary}
                  </p>
                ) : null}
              </div>
              <SiteIcon
                icon={ArrowRight}
                className="mt-1 shrink-0 text-muted opacity-0 transition-[opacity,transform,color] group-hover:translate-x-0.5 group-hover:text-open-green group-hover:opacity-100"
              />
            </a>
          </li>
        );
      })}
      <ProjectComingSoonCard />
    </ul>
  );
}
