"use client";

import { Loader2, ShieldCheck, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";
import { inputSurfaceClass } from "@/components/ui/input";

export type SlugAvailabilityStatus = "idle" | "checking" | "available" | "taken" | "invalid";

interface WorkspaceUrlFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  status: SlugAvailabilityStatus;
  name?: string;
  onBlur?: () => void;
}

export function WorkspaceUrlField({
  id,
  value,
  onChange,
  disabled,
  error,
  status,
  name,
  onBlur,
}: WorkspaceUrlFieldProps) {
  const previewSlug = value.trim() || "your-company";
  const previewUrl = `https://${previewSlug}.flexy.com`;

  return (
    <div className={cn(inputSurfaceClass(error), "flex min-w-0 items-stretch overflow-hidden")}>
      <input
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(sanitizeSlugInput(event.target.value))}
        onBlur={onBlur}
        disabled={disabled}
        placeholder="your-company"
        autoComplete="off"
        spellCheck={false}
        className="h-full min-w-0 flex-[1.1] bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/40 lg:text-slate-800 lg:placeholder:text-[#C0C4CC]"
      />

      <span
        className="flex min-w-0 flex-[1.4] items-center truncate border-l border-white/15 px-2 text-[11px] text-white/45 lg:border-slate-200 lg:text-xs lg:text-[#9CA3AF]"
        title={previewUrl}
      >
        {previewUrl}
      </span>

      <span className="flex shrink-0 items-center pr-2.5">
        <AvailabilityIcon status={status} />
      </span>
    </div>
  );
}

function AvailabilityIcon({ status }: { status: SlugAvailabilityStatus }) {
  if (status === "checking") {
    return <Loader2 className="size-5 animate-spin text-white/70 lg:text-[#9CA3AF]" />;
  }

  if (status === "available") {
    return <ShieldCheck className="size-5 text-emerald-400 lg:text-emerald-500" />;
  }

  if (status === "taken" || status === "invalid") {
    return <ShieldX className="size-5 text-[#E53935]" />;
  }

  return <ShieldCheck className="size-5 text-white/35 lg:text-[#D1D5DB]" />;
}

function sanitizeSlugInput(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .slice(0, 80);
}
