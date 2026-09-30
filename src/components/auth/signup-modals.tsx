"use client";

import { AuthModal, AuthModalButton } from "@/components/auth/auth-modal";
import { AuthStatusIcon } from "@/components/auth/auth-status-icon";
import { PaperPlaneIcon } from "@/components/auth/paper-plane-icon";

export function VerificationSentModal({
  open,
  onOk,
}: {
  open: boolean;
  onOk: () => void;
}) {
  return (
    <AuthModal open={open}>
      <PaperPlaneIcon className="mx-auto h-21 w-21" />
      <h2 className="mt-6 text-[22px] font-bold tracking-tight text-black sm:text-[24px]">
        Verification Link Sent
      </h2>
      <p className="mt-2 text-sm leading-relaxed wrap-break-word text-[#8A8A8A]">
        Please check your email inbox for the link sent from us.
      </p>
      <AuthModalButton onClick={onOk}>Ok</AuthModalButton>
    </AuthModal>
  );
}

export function SignupSuccessModal({
  open,
  onProceed,
}: {
  open: boolean;
  onProceed: () => void;
}) {
  return (
    <AuthModal open={open}>
      <AuthStatusIcon status="success" />
      <h2 className="mt-6 text-[22px] font-bold tracking-tight text-black sm:text-[24px]">
        Successfully
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A]">
        Your account has been created successfully.
      </p>
      <AuthModalButton onClick={onProceed}>Proceed to Dashboard</AuthModalButton>
    </AuthModal>
  );
}

export function VerificationFailedModal({
  open,
  message,
  isResending,
  onResend,
}: {
  open: boolean;
  message: string;
  isResending: boolean;
  onResend: () => void;
}) {
  return (
    <AuthModal open={open}>
      <AuthStatusIcon status="error" />
      <h2 className="mt-6 text-[22px] font-bold tracking-tight text-black sm:text-[24px]">
        Verification Failed
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A]">{message}</p>
      <AuthModalButton onClick={onResend} isLoading={isResending}>
        {isResending ? "Sending..." : "Resend Verification Link"}
      </AuthModalButton>
    </AuthModal>
  );
}

export function VerifyingModal({ open }: { open: boolean }) {
  return (
    <AuthModal open={open}>
      <AuthStatusIcon status="loading" />
      <h2 className="mt-6 text-[22px] font-bold tracking-tight text-black sm:text-[24px]">
        Verifying your email
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A]">
        Please wait while we confirm your account.
      </p>
    </AuthModal>
  );
}
