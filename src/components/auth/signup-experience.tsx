"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthBackground } from "@/components/auth/auth-background";
import { AuthBrandMark } from "@/components/auth/auth-brand-mark";
import { AuthFooter } from "@/components/auth/auth-footer";
import { SignupForm } from "@/components/auth/signup-form";
import {
  SignupSuccessModal,
  VerificationFailedModal,
  VerificationSentModal,
  VerifyingModal,
} from "@/components/auth/signup-modals";
import { resendVerificationEmail, verifySignupEmail } from "@/services/signup-service";
import { PENDING_SIGNUP_EMAIL_KEY } from "@/types/signup";
import { emailFromSignupToken } from "@/lib/jwt";
import { extractErrorMessage, cn } from "@/lib/utils";

type AuthModalState = "none" | "sent" | "verifying" | "success" | "failed";

interface SignupExperienceProps {
  verificationToken?: string | null;
}

export function SignupExperience({ verificationToken }: SignupExperienceProps) {
  const router = useRouter();
  const isVerifyFlow = verificationToken !== undefined;
  const [modal, setModal] = useState<AuthModalState>(isVerifyFlow ? "verifying" : "none");
  const [failMessage, setFailMessage] = useState(
    "Your verification link is invalid or has expired."
  );

  const resendMutation = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: () => {
      setModal("sent");
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error));
    },
  });

  useEffect(() => {
    if (!isVerifyFlow) return;

    if (!verificationToken) {
      setFailMessage("This verification link is missing or invalid.");
      setModal("failed");
      return;
    }

    let cancelled = false;
    setModal("verifying");

    verifySignupEmail(verificationToken)
      .then(() => {
        if (cancelled) return;
        sessionStorage.removeItem(PENDING_SIGNUP_EMAIL_KEY);
        setModal("success");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setFailMessage(
          extractErrorMessage(error) || "Your verification link is invalid or has expired."
        );
        setModal("failed");
      });

    return () => {
      cancelled = true;
    };
  }, [isVerifyFlow, verificationToken]);

  const resolveResendEmail = (): string | null => {
    const stored = sessionStorage.getItem(PENDING_SIGNUP_EMAIL_KEY);
    if (stored) return stored;
    if (verificationToken) return emailFromSignupToken(verificationToken);
    return null;
  };

  const handleResend = () => {
    const email = resolveResendEmail();
    if (!email) {
      toast.error("We could not find your email. Please sign up again.");
      return;
    }
    resendMutation.mutate(email);
  };

  const blurred = modal !== "none";

  return (
    <div className="relative min-h-dvh overflow-x-hidden text-white">
      <AuthBackground />

      <div
        className={cn(
          "relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-8 xl:px-16",
          blurred && "pointer-events-none select-none blur-[7px]"
        )}
      >
        <div className="hidden min-h-[calc(100dvh-4rem)] w-full max-w-130 flex-col justify-between self-stretch lg:flex lg:pr-10">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo.png"
                alt="FLEXY"
                width={160}
                height={44}
                className="h-10 w-auto object-contain object-left"
                priority
              />
            </Link>

            <h1 className="mt-12 text-[44px] leading-[1.12] font-light tracking-tight text-white xl:text-[52px]">
              Welcome.
              <br />
              Start your journey
              <br />
              with us, where
              <br />
              you can <span className="font-semibold italic">track</span>
              <br />
              <span className="font-semibold">vessels.</span>
            </h1>
          </div>

          <AuthFooter />
        </div>

        <div className="flex w-full flex-1 flex-col lg:max-w-120 xl:max-w-125">
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <AuthBrandMark />
            <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-white">
              Create an Account
            </h1>
          </div>

          <SignupForm disabled={blurred} onVerificationSent={() => setModal("sent")} />
        </div>
      </div>

      <VerificationSentModal open={modal === "sent"} onOk={() => setModal("none")} />
      <VerifyingModal open={modal === "verifying"} />
      <SignupSuccessModal open={modal === "success"} onProceed={() => router.push("/dashboard")} />
      <VerificationFailedModal
        open={modal === "failed"}
        message={failMessage}
        isResending={resendMutation.isPending}
        onResend={handleResend}
      />
    </div>
  );
}
