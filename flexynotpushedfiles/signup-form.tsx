"use client";

import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { CircleHelp } from "lucide-react";
import { createSignup, checkSlugAvailability } from "@/services/signup-service";
import {
  PENDING_SIGNUP_EMAIL_KEY,
  SIGNUP_PLAN_ID,
  signupFormSchema,
  type SignupFormValues,
} from "@/types/signup";
import { extractErrorMessage } from "@/lib/utils";
import { isReservedSlug, isValidSlug, workspaceUrlToSlug } from "@/lib/slug";
import { persistTenantSlug } from "@/lib/auth-storage";
import { useDebouncedValue } from "@/lib/utils";
import { Button, FormField, Input, PasswordInput, TextLink } from "@/components/ui";
import { AuthCard } from "@/components/auth/auth-card";
import {
  WorkspaceUrlField,
  type SlugAvailabilityStatus,
} from "@/components/auth/workspace-url-field";

interface SignupFormProps {
  onVerificationSent: () => void;
  disabled?: boolean;
}

export function SignupForm({ onVerificationSent, disabled }: SignupFormProps) {
  const [showWhy, setShowWhy] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      workspaceUrl: "",
    },
  });

  const workspaceUrl = watch("workspaceUrl");
  const slug = workspaceUrlToSlug(workspaceUrl ?? "");
  const debouncedSlug = useDebouncedValue(slug, 500);
  const isTyping = slug !== debouncedSlug;
  const slugLooksValid = isValidSlug(debouncedSlug);

  const slugQuery = useQuery({
    queryKey: ["signup-slug", debouncedSlug],
    queryFn: () => checkSlugAvailability(debouncedSlug),
    enabled: slugLooksValid && !disabled && !isTyping,
    staleTime: 30_000,
    retry: false,
  });

  const slugStatus = resolveSlugStatus({
    slug,
    isTyping,
    isValid: isValidSlug(slug),
    isFetching: slugQuery.isFetching,
    available: slugQuery.data?.available,
  });

  const mutation = useMutation({
    mutationFn: createSignup,
    onSuccess: (_data, variables) => {
      sessionStorage.setItem(PENDING_SIGNUP_EMAIL_KEY, variables.email);
      persistTenantSlug(variables.slug);
      onVerificationSent();
    },
    onError: (error: unknown) => {
      const message = extractErrorMessage(error);
      const lower = message.toLowerCase();

      if (lower.includes("email")) {
        setError("email", { type: "server", message });
      } else if (lower.includes("slug") || lower.includes("workspace")) {
        setError("workspaceUrl", { type: "server", message });
      }

      toast.error(message);
    },
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (values) => {
    const nextSlug = workspaceUrlToSlug(values.workspaceUrl);

    if (!isValidSlug(nextSlug)) {
      setError("workspaceUrl", {
        type: "validate",
        message: nextSlug.length === 0 ? "Required" : "Use letters, numbers, and hyphens only",
      });
      return;
    }

    if (isTyping || slugQuery.isFetching) {
      setError("workspaceUrl", {
        type: "validate",
        message: "Please wait while we check this workspace URL",
      });
      return;
    }

    if (slugQuery.data && slugQuery.data.available === false) {
      setError("workspaceUrl", {
        type: "validate",
        message: slugQuery.data.suggested
          ? `Already taken. Try ${slugQuery.data.suggested}`
          : "This workspace URL is taken",
      });
      return;
    }

    mutation.mutate({
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      companyName: values.companyName.trim(),
      slug: nextSlug,
      planId: SIGNUP_PLAN_ID,
    });
  };

  const isPending = mutation.isPending || disabled;

  return (
    <AuthCard className="lg:px-8 lg:py-7 xl:px-9">
      <div className="mb-5 hidden lg:block">
        <h1 className="text-[26px] font-bold tracking-tight text-black">Create an Account</h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          Already Have An Account? <TextLink href="/login">Log in</TextLink>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName?.message}>
          <Input
            id="fullName"
            placeholder="ex. John Doe"
            autoComplete="name"
            disabled={isPending}
            error={Boolean(errors.fullName)}
            {...register("fullName")}
          />
        </FormField>

        <FormField label="Your email" htmlFor="email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="ex. email@johndoe.com"
            autoComplete="email"
            disabled={isPending}
            error={Boolean(errors.email)}
            {...register("email")}
          />
        </FormField>

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
            disabled={isPending}
            error={Boolean(errors.password)}
            {...register("password")}
          />
        </FormField>

        <FormField
          label="Company Name"
          htmlFor="companyName"
          required
          requiredClassName="max-lg:hidden"
          error={errors.companyName?.message}
        >
          <Input
            id="companyName"
            placeholder="ex. Vessel Ready"
            autoComplete="organization"
            disabled={isPending}
            error={Boolean(errors.companyName)}
            {...register("companyName")}
          />
        </FormField>

        <FormField
          label="Workspace URL"
          htmlFor="workspaceUrl"
          required
          requiredClassName="lg:hidden"
          error={errors.workspaceUrl?.message}
          extraLabel={
            <span className="relative ml-1.5 hidden items-center gap-1 lg:inline-flex">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#1B6DFF]"
                onClick={() => setShowWhy((open) => !open)}
                onBlur={() => setTimeout(() => setShowWhy(false), 150)}
              >
                Why
                <CircleHelp className="size-3.5" />
              </button>
              {showWhy && (
                <span className="absolute top-6 left-0 z-20 w-56 rounded-lg bg-white p-3 text-left text-xs leading-relaxed font-normal text-slate-600 shadow-lg">
                  This becomes your unique workspace address, for example vesselready.flexy.com.
                </span>
              )}
            </span>
          }
        >
          <Controller
            name="workspaceUrl"
            control={control}
            render={({ field }) => (
              <WorkspaceUrlField
                id="workspaceUrl"
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                disabled={isPending}
                error={Boolean(errors.workspaceUrl) || slugStatus === "taken"}
                status={slugStatus}
                onChange={(next) => {
                  field.onChange(next);
                  if (errors.workspaceUrl) clearErrors("workspaceUrl");
                }}
              />
            )}
          />
        </FormField>

        {!errors.workspaceUrl && slugStatus !== "idle" && (
          <div className="-mt-2">
            <SlugStatusMessage
              status={slugStatus}
              suggestion={slugQuery.data?.suggested}
              onUseSuggestion={(next) => {
                setValue("workspaceUrl", next, { shouldValidate: true, shouldDirty: true });
                clearErrors("workspaceUrl");
              }}
            />
          </div>
        )}

        <Button type="submit" fullWidth isLoading={mutation.isPending} disabled={isPending} className="mt-3">
          {mutation.isPending ? "Creating account..." : "Create an Account"}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-white lg:hidden">
        Already Have An Account?{" "}
        <TextLink href="/login" className="text-[#5BA3FF] hover:no-underline">
          Log in
        </TextLink>
      </p>
    </AuthCard>
  );
}

function resolveSlugStatus(input: {
  slug: string;
  isTyping: boolean;
  isValid: boolean;
  isFetching: boolean;
  available?: boolean;
}): SlugAvailabilityStatus {
  if (!input.slug) return "idle";
  if (isReservedSlug(input.slug) && !input.isTyping) return "taken";
  if (input.slug.length > 0 && !input.isValid && !input.isTyping) return "invalid";
  if (input.isTyping || input.isFetching) return "checking";
  if (input.available === true) return "available";
  if (input.available === false) return "taken";
  return "idle";
}

function SlugStatusMessage({
  status,
  suggestion,
  onUseSuggestion,
}: {
  status: SlugAvailabilityStatus;
  suggestion?: string;
  onUseSuggestion: (value: string) => void;
}) {
  if (status === "checking") {
    return <p className="text-xs text-white/55 lg:text-[#9CA3AF]">Checking availability...</p>;
  }

  if (status === "available") {
    return <p className="text-xs text-emerald-400 lg:text-emerald-600">This workspace URL is available</p>;
  }

  if (status === "invalid") {
    return (
      <p className="text-xs text-[#E53935]">
        Use at least 2 characters: lowercase letters, numbers, and hyphens
      </p>
    );
  }

  if (status === "taken") {
    return (
      <p className="text-xs text-[#E53935]">
        This workspace URL is taken
        {suggestion ? (
          <>
            . Try{" "}
            <button
              type="button"
              className="font-medium underline"
              onClick={() => onUseSuggestion(suggestion)}
            >
              {suggestion}
            </button>
          </>
        ) : null}
      </p>
    );
  }

  return null;
}
