import { GithubIcon, iconLinkClass } from "@/components/site-icon";
import { githubProfileUrl } from "@/lib/contact";

export function GithubIconLink() {
  return (
    <a
      href={githubProfileUrl}
      target="_blank"
      rel="me noreferrer noopener"
      className={iconLinkClass}
      aria-label="Simon Ask on GitHub"
    >
      <GithubIcon />
    </a>
  );
}
