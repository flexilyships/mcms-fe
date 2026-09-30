"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export function AuthModal({ open, children, className }: AuthModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-5">
      <div className="absolute inset-0 bg-[#071428]/45 backdrop-blur-[6px]" />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full max-w-115 min-w-0 rounded-[28px] bg-white px-6 py-9 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:px-10 sm:py-10",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function AuthModalButton({
  children,
  onClick,
  disabled,
  isLoading,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      isLoading={isLoading}
      fullWidth
      className="mt-7 font-medium"
    >
      {children}
    </Button>
  );
}
