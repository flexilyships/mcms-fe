import Image from "next/image";
import { FolderUp, FolderGit2, FolderClock, FolderCheck } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: FolderUp,
    title: "Upload Document",
    description:
      "Store vessel certificates and crew documents in one centralized location.",
    badgeBg: "bg-[#3167D9]",
  },
  {
    number: "2",
    icon: FolderGit2,
    title: "Track Automatically",
    description:
      "Track expiration dates, document status, vessels, and crew compliance.",
    badgeBg: "bg-[#6F4BE5]",
  },
  {
    number: "3",
    icon: FolderClock,
    title: "Get Alerted",
    description:
      "Receive timely notifications before important documents expire.",
    badgeBg: "bg-[#209C8F]",
  },
  {
    number: "4",
    icon: FolderCheck,
    title: "Stay Ready",
    description:
      "Know exactly what needs attention and keep operations moving.",
    badgeBg: "bg-[#3167D9]",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            A simpler way to manage compliance, track expirations, and keep your vessels and crew ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center relative group">
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 rounded-full ${step.badgeBg} text-white flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon className="w-9 h-9" />
                  </div>
                  <div className={`${step.badgeBg} absolute -top-1 -right-1 w-7 h-7 rounded-full   text-white text-xs font-extrabold flex items-center justify-center border-2 border-white shadow-xs`}>
                    {step.number}
                  </div>
                </div>

                <h3 className="text-[24px] font-bold text-[#12141D] mb-2">{step.title}</h3>
                <p className="text-[16px]  text-[#8A8A8A] leading-relaxed max-w-62.5 sm:max-w-xs">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 -right-4 translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-10">
                    <Image
                      src="/assets/landingPage/how_arrow.png"
                      alt="Connecting Arrow"
                      width={72}
                      height={15}
                      className="w-auto h-auto object-contain"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
