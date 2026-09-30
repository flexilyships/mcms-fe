import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  companyName: z.string().min(2, "Company name is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  fleetSize: z.number(),
  notes: z.string(),
  referral: z.string(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export interface WaitlistResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}
