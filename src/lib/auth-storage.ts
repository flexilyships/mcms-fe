export const AUTH_TOKEN_KEY = "flexy_auth_token";
export const REFRESH_TOKEN_KEY = "flexy_refresh_token";
export const TENANT_SLUG_KEY = "flexy_tenant_slug";

const RESERVED_SUBDOMAINS = new Set(["www", "api", "admin", "app", "staging", "localhost"]);

export function persistTenantSlug(slug: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TENANT_SLUG_KEY, slug);
}

export function getStoredTenantSlug(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TENANT_SLUG_KEY);
}

export function persistSession(
  tokens: { accessToken: string; refreshToken: string },
  tenantSlug?: string
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  if (tenantSlug) persistTenantSlug(tenantSlug);
}

export function tenantSlugFromHost(hostname: string): string | null {
  const host = hostname.split(":")[0] ?? hostname;
  const parts = host.split(".");
  if (parts.length < 3) return null;
  const subdomain = parts[0]?.toLowerCase();
  if (!subdomain || RESERVED_SUBDOMAINS.has(subdomain)) return null;
  return subdomain;
}

export function resolveTenantSlug(searchParams?: URLSearchParams | null): string | undefined {
  const fromQuery =
    searchParams?.get("tenantSlug") ?? searchParams?.get("tenant") ?? searchParams?.get("slug");
  if (fromQuery && fromQuery.trim().length >= 2) return fromQuery.trim().toLowerCase();

  const stored = getStoredTenantSlug();
  if (stored) return stored;

  if (typeof window !== "undefined") {
    const fromHost = tenantSlugFromHost(window.location.hostname);
    if (fromHost) return fromHost;
  }

  return undefined;
}
