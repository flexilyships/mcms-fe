import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginPageClient } from "@/components/auth/login-page-client";

export const metadata: Metadata = {
  title: "Login to Flexy",
  description: "Log in to your Flexy workspace to manage vessels, crew, and compliance.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageClient />
    </Suspense>
  );
}
