"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { submitWaitlist } from "@/services/waitlist-service";
import { waitlistSchema, WaitlistInput } from "@/types/waitlist";
import { extractErrorMessage } from "@/lib/utils";

export function WaitlistFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      companyName: "",
      phone: "",
      email: "",
      fleetSize: 1,
      notes: "",
      referral: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitWaitlist,
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Successfully joined the Flexy waitlist!");
      reset();
    },
    onError: (error: any) => {
      const errorMsg = extractErrorMessage(error);
      toast.error(errorMsg);
    },
  });

  const onSubmit: SubmitHandler<WaitlistInput> = (data) => {
    const payload: WaitlistInput = {
      ...data,
      fleetSize: data.fleetSize && Number(data.fleetSize) > 0 ? Number(data.fleetSize) : 1,
      notes: data.notes || "",
      referral: data.referral || "",
    };
    mutation.mutate(payload);
  };

  return (
    <section id="waitlist-form" className="py-16 sm:py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3167D9] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Join The Waitlist
              </h2>

              {submitted ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">You&apos;re on the list!</h3>
                  <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                    Thank you for your interest in Flexy. We will reach out as soon as our maritime platform opens early access.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-full bg-white text-blue-600 font-semibold text-xs hover:bg-blue-50 transition-colors"
                  >
                    Submit Another Response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-lg border border-white   text-xs sm:text-sm placeholder-white focus:outline-none transition-all"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-200 mt-1 pl-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register("companyName")}
                        type="text"
                        placeholder="Enter Company name"
                        className="w-full px-4 py-3 rounded-lg  border border-white  text-xs sm:text-sm placeholder-white focus:outline-none transition-all"
                      />
                      {errors.companyName && (
                        <p className="text-xs text-red-200 mt-1 pl-1">
                          {errors.companyName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="Enter Phone Number"
                      className="w-full px-4 py-3 rounded-lg border border-white text-xs sm:text-sm placeholder-white focus:outline-none transition-all"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-200 mt-1 pl-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Enter Email"
                      className="w-full px-4 py-3 rounded-lg border border-white text-xs sm:text-sm placeholder-white focus:outline-none transition-all"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-200 mt-1 pl-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      {...register("notes")}
                      rows={3}
                      placeholder="Add note"
                      className="w-full px-4 py-3 rounded-lg border border-white text-xs sm:text-sm placeholder-white focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-3.5 rounded-lg bg-white text-[#3167D9] font-bold text-sm hover:bg-blue-50 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        Submitting...
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/assets/landingPage/workers.png"
                  alt="Flexy Team"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
