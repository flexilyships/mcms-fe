import { apiClient } from "@/lib/api-client";
import type { AuthTokens, LoginRequest } from "@/types/auth";

export async function login(data: LoginRequest): Promise<AuthTokens> {
  const headers: Record<string, string> = {};
  if (data.tenantSlug) {
    headers["x-tenant-slug"] = data.tenantSlug;
  }

  const response = await apiClient.post<AuthTokens>("/auth/login", data, { headers });
  return response.data;
}
