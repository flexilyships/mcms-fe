"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { AuthHeading } from "@/components/auth/auth-heading";
import { AuthShell } from "@/components/auth/auth-shell";
import { LinkSentModal } from "@/components/auth/password-modals";
import { requestPasswordReset } from "@/services/password-service";
import { Button, FormField, Input } from "@/components/ui";

const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Required").email("Enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const copy = {
  title: "Forget Password",
  subtitle: "Enter your email and we will send you a resent link",
};

export function ForgotPasswordExperience() {
  const router = useRouter();
  const [linkSent, setLinkSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => setLinkSent(true),
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Unable to send reset link.");
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = (values) => {
    mutation.mutate(values.email.trim().toLowerCase());
  };

  return (
    <>
      <AuthShell
        blurred={linkSent}
        mobileHeader={<AuthHeading title={copy.title} subtitle={copy.subtitle} tone="light" />}
        desktopHeader={<AuthHeading title={copy.title} subtitle={copy.subtitle} />}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <FormField
            label="Your email"
            htmlFor="email"
            required
            error={errors.email?.message}
          >
            <Input
              id="email"
              type="email"
              placeholder="ex. email@johndoe.com"
              autoComplete="email"
              disabled={mutation.isPending}
              error={Boolean(errors.email)}
              {...register("email")}
            />
          </FormField>

          <div className="space-y-3">
            <Button type="submit" fullWidth isLoading={mutation.isPending}>
              {mutation.isPending ? "Sending..." : "Send me the link"}
            </Button>
            <Button type="button" variant="secondary" fullWidth onClick={() => router.push("/login")}>
              Cancel
            </Button>
          </div>
        </form>
      </AuthShell>

      <LinkSentModal
        open={linkSent}
        onOk={() => {
          setLinkSent(false);
          router.push("/reset-password?token=demo");
        }}
      />
    </>
  );
}
