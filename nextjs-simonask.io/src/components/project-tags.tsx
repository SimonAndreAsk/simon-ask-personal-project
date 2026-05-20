import {
  contrastingTagTextColor,
  type ProjectTag,
} from "@/lib/project-tags";

export function ProjectTags({ tags }: { tags: ProjectTag[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tools used">
      {tags.map((tag) => (
        <li key={tag._id}>
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium leading-snug"
            style={{
              backgroundColor: tag.backgroundColor,
              color: contrastingTagTextColor(tag.backgroundColor),
            }}
          >
            {tag.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
