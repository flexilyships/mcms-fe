"use client";

import { useSearchParams } from "next/navigation";
import { SignupExperience } from "@/components/auth/signup-experience";

export function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <SignupExperience verificationToken={token ?? ""} />;
}
