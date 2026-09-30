import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, "Required").email("Enter a valid email address"),
  password: z.string().min(1, "Required"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export interface LoginRequest {
  email: string;
  password: string;
  tenantSlug?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
