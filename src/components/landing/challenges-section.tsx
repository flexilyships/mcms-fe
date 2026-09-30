import {
  CalendarDays,
  ScrollText,
  FolderSync,
  RefreshCw,
  Timer,
  Shield,
} from "lucide-react";



const challenges = [
  {
    icon: CalendarDays,
    title: "Missed Renewals",
    description:
      "Track expired certificates and documents so you can renew them before they impact operations.",
  },
  {
    icon: ScrollText,
    title: "Expired Certificates",
    description:
      "View all expired certificates in one place and renew them before they disrupt your operations.",
  },
  {
    icon: FolderSync,
    title: "Scattered Documents",
    description:
      "Stop searching through emails and folders. Access all your important maritime documents from one place.",
  },
  {
    icon: RefreshCw,
    title: "Last-Minute Compliance",
    description:
      "Avoid last-minute compliance issues by tracking certificates, renewals, and inspections in one place.",
  },
  {
    icon: Timer,
    title: "Operational Delays",
    description:
      "Prevent document-related delays by ensuring certificates and compliance records are always up to date.",
  },
  {
    icon: Shield,
    title: "Inspection Readiness",
    description:
      "Prepare for inspections with confidence by keeping all required documentation in one secure location.",
  },
];

export function ChallengesSection() {
  return (
    <section id="challenges" className="py-20 bg-[#F5F7FA] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-[28px] sm:text-5xl font-semibold text-[#000000] tracking-tight">
            Compliance shouldn’t live in spreadsheets.
          </h2>
          <p className="text-sm sm:text-base text-[#5A625E]">
            Managing certificates and crew documentation manually can lead to:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {challenges.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all duration-200 space-y-3.5"
              >
                <div className="size-10 rounded-lg  text-[#3167D9] flex items-center justify-center">
                  <Icon className="size-8" />
                </div>
                <h3 className="text-lg font-semibold text-[#000000]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#5A625E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
