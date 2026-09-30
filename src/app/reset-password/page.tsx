import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordExperience } from "@/components/auth/reset-password-experience";

export const metadata: Metadata = {
  title: "Change Password | Flexy",
  description: "Choose a new password for your Flexy account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordExperience />
    </Suspense>
  );
}
