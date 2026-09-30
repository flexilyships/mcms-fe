import type { ReactNode } from "react";
import { AuthBackground } from "@/components/auth/auth-background";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthCard } from "@/components/auth/auth-card";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: ReactNode;
  blurred?: boolean;
  mobileHeader?: ReactNode;
  desktopHeader?: ReactNode;
  cardFooter?: ReactNode;
  afterCard?: ReactNode;
  cardClassName?: string;
}

export function AuthShell({
  children,
  blurred = false,
  mobileHeader,
  desktopHeader,
  cardFooter,
  afterCard,
  cardClassName,
}: AuthShellProps) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden text-white">
      <AuthBackground />

      <div
        className={cn(
          "relative min-h-dvh px-5 py-10 sm:px-8",
          blurred && "pointer-events-none select-none blur-[7px]"
        )}
      >
        <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-130 flex-col justify-center">
          {mobileHeader && <div className="mb-8 lg:hidden">{mobileHeader}</div>}

          <AuthCard className={cardClassName}>
            {desktopHeader && <div className="mb-8 hidden lg:block">{desktopHeader}</div>}
            {children}
            {cardFooter}
          </AuthCard>

          {afterCard}
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
