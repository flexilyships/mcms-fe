/**
 * Decodes a JWT payload without verifying the signature.
 * Used only to recover the signup email for resend after a failed verification.
 */
export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;

    const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const json = globalThis.atob(padded);
    const payload: unknown = JSON.parse(json);

    if (typeof payload !== "object" || payload === null) return null;
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function emailFromSignupToken(token: string): string | null {
  const payload = decodeJwtPayload(token);
  if (typeof payload?.email !== "string" || !payload.email) return null;
  return payload.email;
}
