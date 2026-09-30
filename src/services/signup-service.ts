import { apiClient } from "@/lib/api-client";
import type {
  ResendVerificationResponse,
  SignupRequest,
  SignupResponse,
  SlugAvailabilityResponse,
  VerifyEmailResponse,
} from "@/types/signup";

export async function createSignup(data: SignupRequest): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>("/signup", data);
  return response.data;
}

export async function checkSlugAvailability(slug: string): Promise<SlugAvailabilityResponse> {
  const response = await apiClient.get<SlugAvailabilityResponse>(
    `/signup/slug/${encodeURIComponent(slug)}`
  );
  return response.data;
}

export async function verifySignupEmail(token: string): Promise<VerifyEmailResponse> {
  const response = await apiClient.post<VerifyEmailResponse>("/signup/verify-email", undefined, {
    params: { token },
  });
  return response.data;
}

export async function resendVerificationEmail(email: string): Promise<ResendVerificationResponse> {
  const response = await apiClient.post<ResendVerificationResponse>("/signup/resend-email-token", {
    email,
  });
  return response.data;
}
