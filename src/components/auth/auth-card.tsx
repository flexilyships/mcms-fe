import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full min-w-0 lg:rounded-[24px] lg:bg-[#F3F4F6] lg:px-10 lg:py-12 lg:shadow-[0_20px_50px_rgba(0,0,0,0.18)]",
        className
      )}
    >
      {children}
    </div>
  );
}
