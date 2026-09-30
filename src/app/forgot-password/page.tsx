import type { Metadata } from "next";
import { ForgotPasswordExperience } from "@/components/auth/forgot-password-experience";

export const metadata: Metadata = {
  title: "Forget Password | Flexy",
  description: "Reset your Flexy account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordExperience />;
}
