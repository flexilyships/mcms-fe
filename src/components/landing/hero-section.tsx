"use client";

import Image from "next/image";

interface HeroSectionProps {
  onJoinClick: () => void;
}

export function HeroSection({ onJoinClick }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#3167D9] min-h-132.25 sm:min-h-167.5 lg:min-h-175 flex lg:items-center py-16  lg:py-24"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/landingPage/landingHero.png"
          alt="Flexy Maritime Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark overlay for mobile readability */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0A2246]/95 via-[#0A2246]/75 to-transparent z-1 lg:hidden" />

      <div className="hidden lg:block absolute inset-0 z-5 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="cyanGlow"
              filterUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1000"
              height="1000"
            >
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M 744 225 L 744 310 L 595 310"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            filter="url(#cyanGlow)"
          />

          <path
            d="M 772 405 L 595 405"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            filter="url(#cyanGlow)"
          />

          <path
            d="M 742 568 L 595 568"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            filter="url(#cyanGlow)"
          />

          <path
            d="M 744 765 L 744 660 L 595 660"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            filter="url(#cyanGlow)"
          />

          {/* Target Nodes on Ship */}
          {/* Node 1: Bow */}
          <g transform="translate(595, 310)">
            <circle r="7" fill="none" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.9" />
            <circle r="3.5" fill="#2DD4BF" filter="url(#cyanGlow)" />
          </g>

          {/* Node 2: Upper Deck */}
          <g transform="translate(595, 405)">
            <circle r="7" fill="none" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.9" />
            <circle r="3.5" fill="#2DD4BF" filter="url(#cyanGlow)" />
          </g>

          {/* Node 3: Lower Deck */}
          <g transform="translate(595, 568)">
            <circle r="7" fill="none" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.9" />
            <circle r="3.5" fill="#2DD4BF" filter="url(#cyanGlow)" />
          </g>

          <g transform="translate(595, 660)">
            <circle r="7" fill="none" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.9" />
            <circle r="3.5" fill="#2DD4BF" filter="url(#cyanGlow)" />
          </g>
        </svg>

        <div
          className="absolute top-[20.5%] left-[66.4%] transform -translate-y-1/2 border border-[#2DD4BF] rounded-lg bg-[#041A38]/70 backdrop-blur-md text-white font-medium text-sm xl:text-base px-5 py-2.5 shadow-[0_0_15px_rgba(45,212,191,0.25)] hover:border-[#5EEAD4] transition-all pointer-events-auto"
        >
          Document Management
        </div>

        <div
          className="absolute top-[40.5%] left-[77.2%] transform -translate-y-1/2 border border-[#2DD4BF] rounded-lg bg-[#041A38]/70 backdrop-blur-md text-white font-medium text-sm xl:text-base px-5 py-2.5 shadow-[0_0_15px_rgba(45,212,191,0.25)] hover:border-[#5EEAD4] transition-all pointer-events-auto"
        >
          Compliance Monitoring
        </div>

        <div
          className="absolute top-[56.8%] left-[74.2%] transform -translate-y-1/2 border border-[#2DD4BF] rounded-lg bg-[#041A38]/70 backdrop-blur-md text-white font-medium text-sm xl:text-base px-5 py-2.5 shadow-[0_0_15px_rgba(45,212,191,0.25)] hover:border-[#5EEAD4] transition-all pointer-events-auto"
        >
          Expiration Tracking
        </div>

        <div
          className="absolute top-[78.5%] left-[65.4%] transform -translate-y-1/2 border border-[#2DD4BF] rounded-lg bg-[#041A38]/70 backdrop-blur-md text-white font-medium text-sm xl:text-base px-5 py-2.5 shadow-[0_0_15px_rgba(45,212,191,0.25)] hover:border-[#5EEAD4] transition-all pointer-events-auto"
        >
          Fleet &amp; Crew Readiness
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-xl lg:max-w-xl xl:max-w-2xl text-left space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Never let an expired document stop your vessel.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed font-normal">
            Flexy helps maritime operators, manage vessel and crew documentation, monitor compliance, track certificate expirations and renewals, and identify potential risks before they become costly problems.
          </p>

          <div className="pt-2">
            <button
              onClick={onJoinClick}
              className="px-7 py-3.5 rounded-lg bg-white text-[#3167D9] font-bold text-sm sm:text-base hover:bg-blue-50 transition-all duration-200 shadow-lg cursor-pointer"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

