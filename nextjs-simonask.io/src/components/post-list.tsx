import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type SanityDocument } from "next-sanity";

import { SiteIcon } from "@/components/site-icon";
import { formatDate } from "@/lib/format";

function isDraftPost(post: SanityDocument) {
  return post._id.startsWith("drafts.");
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

        return (
          <li key={post._id} className="border-b border-border/40">
            <Link
              href={`/${post.slug.current}`}
              className="group block py-5 transition-colors hover:text-open-green"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h2 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-open-green sm:text-xl">
                      {post.title}
                    </h2>
                    {draft && (
                      <span className="rounded-full border border-open-green/40 bg-open-green/10 px-2 py-0.5 text-xs text-open-green">
                        Draft
                      </span>
                    )}
                  </div>
                  <time
                    dateTime={post.publishedAt}
                    className="mt-1.5 block text-sm text-muted tabular-nums"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                <SiteIcon
                  icon={ArrowRight}
                  className="mt-0.5 shrink-0 text-muted opacity-0 transition-[opacity,transform,color] group-hover:translate-x-0.5 group-hover:text-open-green group-hover:opacity-100"
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
