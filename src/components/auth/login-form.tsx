"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { login } from "@/services/auth-service";
import { loginFormSchema, type LoginFormValues } from "@/types/auth";
import { persistSession, persistTenantSlug, resolveTenantSlug } from "@/lib/auth-storage";
import { extractErrorMessage } from "@/lib/utils";
import { Button, FormField, Input, PasswordInput } from "@/components/ui";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (tokens, variables) => {
      persistSession(tokens, variables.tenantSlug);
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const message = extractErrorMessage(error);
      if (message.toLowerCase().includes("password") || message.toLowerCase().includes("credential")) {
        setError("password", { type: "server", message });
      }
      toast.error(message);
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    const tenantSlug = resolveTenantSlug(searchParams);
    if (tenantSlug) persistTenantSlug(tenantSlug);

    mutation.mutate({
      email: values.email.trim().toLowerCase(),
      password: values.password,
      tenantSlug,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full min-w-0 space-y-5" noValidate>
      <FormField
        label="Username or email"
        htmlFor="email"
        required
        requiredClassName="hidden lg:inline"
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder="ex. John Doe"
          autoComplete="username"
          disabled={mutation.isPending}
          error={Boolean(errors.email)}
          {...register("email")}
        />
      </FormField>

      <div>
        <FormField
          label="Password"
          htmlFor="password"
          required
          requiredClassName="hidden lg:inline"
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder="Enter password"
            autoComplete="current-password"
            disabled={mutation.isPending}
            error={Boolean(errors.password)}
            {...register("password")}
          />
        </FormField>
        <Link
          href="/forgot-password"
          className="mt-2 block text-right text-sm leading-5 text-[#D0D5DD] lg:text-[#1B6DFF]"
        >
          Forget Password?
        </Link>
      </div>

      <Button type="submit" fullWidth isLoading={mutation.isPending} className="mt-1">
        {mutation.isPending ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
