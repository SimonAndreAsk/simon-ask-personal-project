import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ArticleBody } from "@/components/article-body";
import { formatDate } from "@/lib/format";
import { client } from "@/sanity/client";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`;

const options = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(SLUGS_QUERY, {}, options);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument | null>(
    POST_QUERY,
    { slug },
    options,
  );

  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: `An article by Simon Ask, published ${formatDate(post.publishedAt)}.`,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument | null>(
    POST_QUERY,
    { slug },
    options,
  );

  if (!post) notFound();

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(630).fit("crop").url()
    : null;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <Link
        href="/#articles"
        className="mb-10 inline-flex text-sm text-muted transition-colors hover:text-foreground"
      >
        ← All articles
      </Link>

      <article>
        <header className="mb-10">
          <time
            dateTime={post.publishedAt}
            className="text-sm text-muted tabular-nums"
          >
            {formatDate(post.publishedAt)}
          </time>
          <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
        </header>

        {postImageUrl && (
          <img
            src={postImageUrl}
            alt=""
            className="mb-10 aspect-[16/9] w-full rounded-lg object-cover"
            width={1200}
            height={630}
          />
        )}

        <ArticleBody value={post.body} />
      </article>
    </main>
  );
}
