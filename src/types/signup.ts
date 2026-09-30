import { z } from "zod";

export const PENDING_SIGNUP_EMAIL_KEY = "flexy_pending_signup_email";

/** Temporary plan until billing selection is wired. */
export const SIGNUP_PLAN_ID = "cmua1w7be00005kuodlnz0xwj";

export const signupFormSchema = z.object({
  fullName: z.string().trim().min(1, "Required").min(2, "Full name is required"),
  email: z.string().trim().min(1, "Required").email("Invalid email address"),
  password: z.string().min(1, "Required").min(8, "Minimum length is 8 characters."),
  companyName: z.string().trim().min(1, "Required").min(2, "Company name is required"),
  workspaceUrl: z.string().trim().min(1, "Required"),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  slug: string;
  planId: string;
}

export interface SignupResponse {
  message?: string;
  expiresAt?: number;
  reference?: string;
}

export interface SlugAvailabilityResponse {
  available: boolean;
  suggested?: string;
}

export interface VerifyEmailResponse {
  reference?: string;
  checkoutUrl?: string;
  provider?: string;
  message?: string;
}

export interface ResendVerificationResponse {
  message?: string;
  expiresAt?: string | number;
}
