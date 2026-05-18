import { PortableText, type PortableTextComponents } from "next-sanity";

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
};

export function ArticleBody({ value }: { value: unknown }) {
  if (!Array.isArray(value)) return null;

  return (
    <div className="article-body">
      <PortableText value={value} components={components} />
    </div>
  );
}
