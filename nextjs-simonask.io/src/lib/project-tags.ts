export type ProjectTag = {
  _id: string;
  label: string;
  backgroundColor: string;
};

type SanityColor = {
  hex?: string;
};

function normalizeHex(color: string): string | null {
  const trimmed = color.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9A-Fa-f]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return null;
}

export function colorValueToHex(value: unknown): string | null {
  if (typeof value === "string") return normalizeHex(value);
  if (value && typeof value === "object") {
    const color = value as SanityColor;
    if (typeof color.hex === "string") return normalizeHex(color.hex);
  }
  return null;
}

/** Relative luminance (sRGB) — pick readable text on colored tag backgrounds. */
export function contrastingTagTextColor(backgroundHex: string): string {
  const hex = normalizeHex(backgroundHex);
  if (!hex) return "var(--foreground)";

  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;

  const toLinear = (channel: number) =>
    channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;

  const luminance =
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  return luminance > 0.45 ? "#1c1917" : "#f4f3ef";
}

export function projectTagsFromSanity(tags: unknown): ProjectTag[] {
  if (!Array.isArray(tags)) return [];

  return tags
    .map((tag) => {
      if (!tag || typeof tag !== "object") return null;
      const record = tag as Record<string, unknown>;
      const id = typeof record._id === "string" ? record._id : null;
      const label =
        typeof record.label === "string" ? record.label.trim() : null;
      const backgroundColor = colorValueToHex(record.backgroundColor);

      if (!id || !label || !backgroundColor) return null;

      return { _id: id, label, backgroundColor };
    })
    .filter((tag): tag is ProjectTag => tag !== null);
}
