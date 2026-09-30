import type { Metadata } from "next";
import { SignupExperience } from "@/components/auth/signup-experience";

export const metadata: Metadata = {
  title: "Create an Account | Flexy",
  description: "Create your Flexy workspace to track vessels, crew, and compliance.",
};

export default function SignupPage() {
  return <SignupExperience />;
}
