import { cn } from "@/lib/utils";

interface AuthHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function AuthHeading({
  title,
  subtitle,
  align = "left",
  tone = "dark",
}: AuthHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn(align === "center" && "text-center")}>
      <h1
        className={cn(
          "font-bold tracking-tight",
          isDark ? "text-[32px] text-black" : "text-[28px] font-semibold text-white"
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className={cn("mt-2 text-sm", isDark ? "text-[#6B7280]" : "text-white/70")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
