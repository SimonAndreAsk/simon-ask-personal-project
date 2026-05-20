import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type SanityDocument } from "next-sanity";

import { SiteIcon } from "@/components/site-icon";
import { formatDate } from "@/lib/format";
import { readingMinutes, truncateExcerpt } from "@/lib/post-excerpt";
import { urlFor } from "@/sanity/image";

function isDraftPost(post: SanityDocument) {
  return post._id.startsWith("drafts.");
}

const THUMB_WIDTH_MOBILE = 128;
const THUMB_HEIGHT_MOBILE = 90;
const READ_LABEL = "Read article";

function postThumbnail(post: SanityDocument): {
  src: string | null;
  alt: string;
} {
  const title = typeof post.title === "string" ? post.title : "Article";
  const alt =
    typeof post.image === "object" &&
    post.image !== null &&
    "alt" in post.image &&
    typeof post.image.alt === "string" &&
    post.image.alt.trim()
      ? post.image.alt
      : `${title} cover`;

  if (!post.image || !urlFor(post.image)) {
    return { src: null, alt };
  }

  const src =
    urlFor(post.image)
      ?.width(THUMB_WIDTH_MOBILE * 2)
      .height(THUMB_HEIGHT_MOBILE * 2)
      .fit("crop")
      .auto("format")
      .quality(85)
      .url() ?? null;

  return { src, alt };
}

function postExcerpt(post: SanityDocument): string | null {
  const raw =
    typeof post.excerpt === "string" && post.excerpt.trim()
      ? post.excerpt.trim()
      : typeof post.excerptText === "string" && post.excerptText.trim()
        ? post.excerptText.trim()
        : null;

  if (!raw) return null;
  return truncateExcerpt(raw);
}

export function PostList({ posts }: { posts: SanityDocument[] }) {
  if (posts.length === 0) {
    return (
      <p className="leading-relaxed text-muted">
        I haven&apos;t published anything here yet. Check back soon.
      </p>
    );
  }

  return (
    <ul className="border-t border-border/40">
      {posts.map((post) => {
        const draft = isDraftPost(post);
        const slug =
          typeof post.slug === "object" &&
          post.slug !== null &&
          "current" in post.slug &&
          typeof post.slug.current === "string"
            ? post.slug.current
            : "";
        const href = slug ? `/${slug}` : "#";
        const { src: thumbUrl, alt: thumbAlt } = postThumbnail(post);
        const excerpt = postExcerpt(post);
        const readMinutes =
          typeof post.excerptText === "string" && post.excerptText.trim()
            ? readingMinutes(post.excerptText)
            : excerpt
              ? readingMinutes(excerpt)
              : null;
        const title = typeof post.title === "string" ? post.title : "Article";

        return (
          <li key={post._id} className="border-b border-border/40">
            <Link
              href={href}
              className="group flex flex-col gap-3 py-5 transition-colors hover:text-open-green sm:grid sm:grid-cols-[5rem_1fr] sm:items-start sm:gap-x-4"
            >
              <div
                className="aspect-[10/7] w-32 shrink-0 overflow-hidden rounded-xl bg-surface ring-1 ring-border/50 sm:w-20"
              >
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={thumbAlt}
                    width={THUMB_WIDTH_MOBILE}
                    height={THUMB_HEIGHT_MOBILE}
                    className="size-full object-cover object-center"
                  />
                ) : (
                  <div
                    className="flex size-full items-center justify-center bg-surface/80 font-display text-2xl text-muted sm:text-xl"
                    aria-hidden
                  >
                    {title.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green sm:text-xl">
                        {post.title}
                      </h3>
                      {draft && (
                        <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs text-open-green">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted tabular-nums">
                      {post.publishedAt ? (
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      ) : null}
                      {readMinutes ? (
                        <>
                          <span aria-hidden className="text-border">
                            ·
                          </span>
                          <span>{readMinutes} min read</span>
                        </>
                      ) : null}
                    </p>
                  </div>
                  <span
                    className="hidden shrink-0 items-center gap-1 pt-0.5 text-sm font-medium text-muted transition-[color,transform] duration-200 group-hover:text-open-green sm:inline-flex"
                    aria-hidden
                  >
                    <span>{READ_LABEL}</span>
                    <SiteIcon
                      icon={ArrowRight}
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
                {excerpt ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-foreground/80">
                    {excerpt}
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-muted group-hover:text-foreground/80">
                    Open to read the full article.
                  </p>
                )}
                <span
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors group-hover:text-open-green sm:hidden"
                  aria-hidden
                >
                  <span>{READ_LABEL}</span>
                  <SiteIcon icon={ArrowRight} className="size-4 shrink-0" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
