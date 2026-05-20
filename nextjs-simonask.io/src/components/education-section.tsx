import { ProfileTimeline } from "@/components/profile-timeline";
import { education } from "@/lib/profile";

export function EducationSection() {
  return (
    <section className="mb-20 sm:mb-24">
      <h2
        id="education"
        className="page-section-title font-display text-2xl tracking-tight text-foreground"
      >
        Education
      </h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
        Formal training behind the analytics work.
      </p>
      <div className="mt-8">
        <ProfileTimeline entries={education} emptyMessage="" />
      </div>
    </section>
  );
}
