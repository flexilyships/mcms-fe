const RESERVED_SLUGS = new Set([
  "www",
  "api",
  "admin",
  "app",
  "mail",
  "mcdms",
  "ene",
  "staging",
  "localhost",
]);

/**
 * Turns the Workspace URL field into the tenant slug the API expects.
 * "VesselReady.com" → "vesselready", "My Fleet" → "my-fleet"
 */
export function workspaceUrlToSlug(value: string): string {
  let slug = value.trim().toLowerCase();
  slug = slug.replace(/^https?:\/\//, "").replace(/^www\./, "");
  slug = slug.split("/")[0] ?? slug;
  slug = slug.replace(/\.(com|net|org|io|co|app|dev|ng)$/i, "");
  slug = slug
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug;
}

export function isValidSlug(slug: string): boolean {
  if (slug.length < 2 || slug.length > 80) return false;
  if (RESERVED_SLUGS.has(slug)) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
