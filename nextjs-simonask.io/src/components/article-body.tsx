import { type SanityImageSource } from "@sanity/image-url";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { urlFor } from "@/sanity/image";

type CalloutValue = { tone?: string; text?: string };
type FigureValue = {
  caption?: string;
  image?: SanityImageSource & { alt?: string };
};
type CodeBlockValue = { language?: string; code?: string };

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="article-h2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="article-h3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="article-blockquote">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="article-p">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="article-ul">{children}</ul>,
    number: ({ children }) => <ol className="article-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const external = href.startsWith("http");

      return (
        <a
          href={href}
          className="article-link"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="article-inline-code">{children}</code>
    ),
  },
  types: {
    callout: ({ value }) => {
      const callout = value as CalloutValue;
      if (!callout.text) return null;

      const tone = callout.tone ?? "note";

      return (
        <aside className={`article-callout article-callout--${tone}`} role="note">
          <p className="article-callout-text">{callout.text}</p>
        </aside>
      );
    },
    figure: ({ value }) => {
      const figure = value as FigureValue;
      if (!figure.image) return null;

      const imageUrl = urlFor(figure.image)?.width(1200).url();
      const alt = figure.image.alt ?? figure.caption ?? "";

      if (!imageUrl) return null;

      return (
        <figure className="article-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={alt} className="article-figure-img" />
          {figure.caption ? (
            <figcaption className="article-figure-caption">{figure.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      const block = value as CodeBlockValue;
      if (!block.code) return null;

      return (
        <pre className="article-code-block" data-language={block.language ?? "text"}>
          <code>{block.code}</code>
        </pre>
      );
    },
  },
};

export function ArticleBody({ value }: { value: unknown }) {
  if (!Array.isArray(value)) return null;

  return (
    <div className="article-body">
      <PortableText value={value} components={components} />
    </div>
  );
}
