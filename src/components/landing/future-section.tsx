"use client";

import Image from "next/image";

export function FutureSection() {
  return (
    <section className="py-20 bg-[#F5F7FA] text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden ">
              <picture className="w-full h-full block relative">
                <source media="(max-width: 767px)" srcSet="/assets/landingPage/ship_mobile.png" />
                <Image
                  src="/assets/landingPage/ship_desktop.png"
                  alt="The Future of Maritime Compliance"
                  fill
                  className="object-contain object-center"
                />
              </picture>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-[1.2]">
              The Future of Maritime Compliance Starts Here.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
              Get ahead of expiring certificates, missing documents, and critical compliance requirements with Flexy. Join the waitlist and be among the first to experience a simpler way to keep your vessels and crew ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
