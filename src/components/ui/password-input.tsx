"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { inputSurfaceClass } from "@/components/ui/input";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  error?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, className, disabled, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className={cn(inputSurfaceClass(error), "flex min-w-0 items-center pr-3", className)}>
        <input
          ref={ref}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 lg:text-slate-800 lg:placeholder:text-[#C0C4CC]"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((open) => !open)}
          className="shrink-0 cursor-pointer text-white lg:text-[#9CA3AF]"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
