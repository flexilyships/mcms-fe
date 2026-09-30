"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onJoinClick: () => void;
}

export function Navbar({ onJoinClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-36 h-10">
            <Image
              src="/assets/logo.png"
              alt="FLEXY"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-12 text-sm font-semibold text-slate-700">
          <button
            onClick={() => scrollToSection("hero")}
            className=" transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("challenges")}
            className=" transition-colors cursor-pointer"
          >
            Challenges
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className=" transition-colors cursor-pointer"
          >
            How it works
          </button>
        </nav>

        <div className="hidden md:flex items-center">
          <button
            onClick={onJoinClick}
            className="px-6 py-2.5 rounded-lg bg-[#3167D9] hover:bg-blue-700 text-white font-medium text-sm transition-all duration-200 shadow-xs cursor-pointer"
          >
            Join the Waitlist
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onJoinClick}
            className="px-4 py-2 text-xs font-semibold rounded-md bg-[#3167D9] text-white shadow-xs cursor-pointer"
          >
            Join the Waitlist
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700  rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 pt-4 pb-6 space-y-4 shadow-lg">
          <button
            onClick={() => scrollToSection("hero")}
            className="block w-full text-left py-2 text-base font-semibold text-slate-800 "
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("challenges")}
            className="block w-full text-left py-2 text-base font-semibold text-slate-800 "
          >
            Challenges
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="block w-full text-left py-2 text-base font-semibold text-slate-800 "
          >
            How it works
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onJoinClick();
              }}
              className="w-full py-3 rounded-lg bg-[#3167D9] text-white font-semibold text-center hover:bg-blue-700 transition-colors"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
