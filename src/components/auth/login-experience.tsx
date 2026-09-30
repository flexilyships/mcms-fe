"use client";

import { AuthBrandMark } from "@/components/auth/auth-brand-mark";
import { AuthHeading } from "@/components/auth/auth-heading";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { TextLink } from "@/components/ui";

export function LoginExperience() {
  return (
    <AuthShell
      mobileHeader={
        <div className="flex flex-col items-center">
          <AuthBrandMark />
          <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-white">
            Login to Flexy
          </h1>
        </div>
      }
      desktopHeader={<AuthHeading title="Login to Flexy" align="center" />}
      cardFooter={
        <p className="mt-6 hidden text-center text-sm text-[#6B7280] lg:block">
          Already Have An Account? <TextLink href="/signup">Create an account</TextLink>
        </p>
      }
      afterCard={
        <p className="mt-5 text-center text-sm text-white lg:hidden">
          Don&apos;t have an account?{" "}
          <TextLink href="/signup" className="text-[#5BA3FF] hover:no-underline">
            Create an account
          </TextLink>
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
