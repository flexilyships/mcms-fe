import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link href={href} className={cn("font-medium text-[#1B6DFF] hover:underline", className)}>
      {children}
    </Link>
  );
}
