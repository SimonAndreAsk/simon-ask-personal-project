const MIN_DURATION_MS = 350;
const MAX_DURATION_MS = 900;
const MS_PER_PX = 0.6;

let activeFrame: number | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/** Target scrollY so scroll-margin-top on the section lines up under the sticky header. */
function getSectionScrollTop(target: HTMLElement): number {
  const marginTop = parseFloat(getComputedStyle(target).scrollMarginTop);
  const offset = Number.isFinite(marginTop) ? marginTop : 0;
  const top = target.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, top - offset);
}

function cancelActiveScroll(): void {
  if (activeFrame !== null) {
    cancelAnimationFrame(activeFrame);
    activeFrame = null;
  }
}

function animateScrollTo(end: number): void {
  const start = window.scrollY;
  const distance = end - start;

  if (Math.abs(distance) < 1) {
    window.scrollTo(0, end);
    return;
  }

  const duration = Math.min(
    MAX_DURATION_MS,
    Math.max(MIN_DURATION_MS, Math.abs(distance) * MS_PER_PX),
  );
  let startTime: number | null = null;

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) {
      activeFrame = requestAnimationFrame(step);
    } else {
      activeFrame = null;
    }
  };

  activeFrame = requestAnimationFrame(step);
}

/** Smooth-scroll to a home-page section (JS animation — reliable on desktop Windows). */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  const end = getSectionScrollTop(target);
  cancelActiveScroll();

  if (prefersReducedMotion()) {
    window.scrollTo(0, end);
    return;
  }

  animateScrollTo(end);
}

export function parseSectionHash(href: string): {
  path: string;
  id: string | null;
} {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return { path: href || "/", id: null };
  }
  const path = href.slice(0, hashIndex) || "/";
  const id = href.slice(hashIndex + 1) || null;
  return { path, id };
}
