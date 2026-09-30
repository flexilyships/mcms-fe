"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { AuthHeading } from "@/components/auth/auth-heading";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordChangedModal } from "@/components/auth/password-modals";
import { resetPassword } from "@/services/password-service";
import { Button, FormField, PasswordInput } from "@/components/ui";

const resetPasswordSchema = z
  .object({
    password: z.string().min(1, "Required").min(8, "Minimum length is 8 characters."),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const copy = {
  title: "Change Password",
  subtitle: "Enter a new password for your account",
};

export function ResetPasswordExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => setSuccess(true),
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Unable to change password.");
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordValues> = (values) => {
    mutation.mutate({ token, password: values.password });
  };

  return (
    <>
      <AuthShell
        blurred={success}
        mobileHeader={<AuthHeading title={copy.title} subtitle={copy.subtitle} tone="light" />}
        desktopHeader={<AuthHeading title={copy.title} subtitle={copy.subtitle} />}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <FormField
            label="Password"
            htmlFor="password"
            required
            error={errors.password?.message}
            hint="Minimum length is 8 characters."
          >
            <PasswordInput
              id="password"
              placeholder="Enter password"
              autoComplete="new-password"
              disabled={mutation.isPending}
              error={Boolean(errors.password)}
              {...register("password")}
            />
          </FormField>

          <FormField
            label="Repeat Password"
            htmlFor="confirmPassword"
            error={errors.confirmPassword?.message}
          >
            <PasswordInput
              id="confirmPassword"
              placeholder="Enter password"
              autoComplete="new-password"
              disabled={mutation.isPending}
              error={Boolean(errors.confirmPassword)}
              {...register("confirmPassword")}
            />
          </FormField>

          <div className="space-y-3 pt-1">
            <Button type="submit" fullWidth isLoading={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Reset Password"}
            </Button>
            <Button type="button" variant="secondary" fullWidth onClick={() => router.push("/login")}>
              Back
            </Button>
          </div>
        </form>
      </AuthShell>

      <PasswordChangedModal open={success} onProceed={() => router.push("/login")} />
    </>
  );
}
