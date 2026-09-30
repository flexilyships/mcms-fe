import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  requiredClassName?: string;
  extraLabel?: ReactNode;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required,
  requiredClassName,
  extraLabel,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-center text-sm font-medium text-white lg:text-[#111827]"
      >
        {label}
        {required && <span className={cn("ml-0.5 text-[#E53935]", requiredClassName)}>*</span>}
        {extraLabel}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-[#E53935]">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-white/55 lg:text-[#9CA3AF]">{hint}</p>
      ) : null}
    </div>
  );
}
