import { Check, Loader2, X } from "lucide-react";

type AuthStatus = "success" | "error" | "loading";

const styles: Record<AuthStatus, { ring: string; fill: string }> = {
  success: { ring: "bg-[#D9E8FF]", fill: "bg-[#1B6DFF]" },
  error: { ring: "bg-[#FDECEC]", fill: "bg-[#E53935]" },
  loading: { ring: "bg-[#D9E8FF]", fill: "bg-transparent" },
};

export function AuthStatusIcon({ status }: { status: AuthStatus }) {
  const { ring, fill } = styles[status];

  return (
    <div className={`mx-auto flex size-23 items-center justify-center rounded-full ${ring}`}>
      {status === "loading" ? (
        <Loader2 className="size-10 animate-spin text-[#1B6DFF]" />
      ) : (
        <div className={`flex size-16 items-center justify-center rounded-full ${fill}`}>
          {status === "success" ? (
            <Check className="size-9 text-white" strokeWidth={3} />
          ) : (
            <X className="size-9 text-white" strokeWidth={3} />
          )}
        </div>
      )}
    </div>
  );
}
