"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  trailing?: ReactNode;
}

export const inputSurfaceClass = (error?: boolean) =>
  cn(
    "h-12 w-full rounded-xl text-sm outline-none transition-shadow",
    "bg-white/10 text-white placeholder:text-white/40",
    "lg:rounded-lg lg:bg-white lg:text-slate-800 lg:placeholder:text-[#C0C4CC]",
    "focus-within:ring-2 focus-within:ring-[#1B6DFF]/70 lg:focus-within:ring-[#93C5FD]",
    error && "ring-1 ring-[#E53935]"
  );

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, trailing, className, disabled, ...props }, ref) => {
    if (trailing) {
      return (
        <div className={cn(inputSurfaceClass(error), "flex min-w-0 items-center pr-3", className)}>
          <input
            ref={ref}
            disabled={disabled}
            className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 lg:text-slate-800 lg:placeholder:text-[#C0C4CC]"
            {...props}
          />
          <span className="shrink-0 text-white lg:text-[#9CA3AF]">{trailing}</span>
        </div>
      );
    }

    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(inputSurfaceClass(error), "px-4", className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
