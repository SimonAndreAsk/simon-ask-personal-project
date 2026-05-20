import { type SanityDocument } from "next-sanity";

import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { GetInTouchSection } from "@/components/get-in-touch-section";
import { HeroContactActions } from "@/components/hero-contact-actions";
import { OpenForWorkBadge } from "@/components/open-for-work-badge";
import { PostList } from "@/components/post-list";
import { ProjectList } from "@/components/project-list";
import { SectionLink } from "@/components/section-link";
import { sanityFetch } from "@/sanity/load";
import { POSTS_QUERY, PROJECTS_QUERY } from "@/sanity/queries";
import { SITE_SECTIONS, sectionHref } from "@/lib/sections";

const introLinkClass = "intro-inline-link";

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const [posts, projects] = await Promise.all([
    sanityFetch<SanityDocument[]>(POSTS_QUERY, {}, options),
    sanityFetch<SanityDocument[]>(PROJECTS_QUERY, {}, options),
  ]);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-14 sm:px-8 sm:py-20">
      <section className="mb-20 sm:mb-24">
        <OpenForWorkBadge />
        <h1
          id="intro"
          className="page-section-title mt-10 font-display text-4xl leading-[1.12] tracking-tight text-foreground sm:text-5xl"
        >
          Hi, I&apos;m Simon.
        </h1>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          Digital analytics specialist — explore{" "}
          <SectionLink href={sectionHref(SITE_SECTIONS.writing)} className={introLinkClass}>
            writing
          </SectionLink>
          {", "}
          <SectionLink href={sectionHref(SITE_SECTIONS.projects)} className={introLinkClass}>
            projects
          </SectionLink>
          {", "}
          <SectionLink href={sectionHref(SITE_SECTIONS.experience)} className={introLinkClass}>
            experience
          </SectionLink>
          {", "}
          <SectionLink href={sectionHref(SITE_SECTIONS.education)} className={introLinkClass}>
            education
          </SectionLink>
          {", or "}
          <SectionLink href={sectionHref(SITE_SECTIONS.getInTouch)} className={introLinkClass}>
            get in touch
          </SectionLink>
          .
        </p>
        <HeroContactActions />
      </section>

      <ExperienceSection />

      <EducationSection />

      <section className="mb-20 sm:mb-24">
        <h2
          id="projects"
          className="page-section-title font-display text-2xl tracking-tight text-foreground"
        >
          Projects
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
          Things I&apos;ve shipped or shaped — each entry links out to a repo,
          demo, or write-up.
        </p>
        <div className="mt-8">
          <ProjectList projects={projects} />
        </div>
      </section>

      <section>
        <h2
          id="writing"
          className="page-section-title font-display text-2xl tracking-tight text-foreground"
        >
          Writing
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
          Longer notes and build logs — useful if you&apos;re deciding whether
          we&apos;re a fit.
        </p>
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
      </section>

      <GetInTouchSection />
    </main>
  );
}
