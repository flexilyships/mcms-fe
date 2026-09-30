"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

export function AuthFooter() {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div className="mt-10 hidden w-full items-center justify-between text-sm text-white/55 lg:flex">
      <nav className="flex items-center gap-2">
        <span>Terms</span>
        <span>·</span>
        <span>Privacy</span>
        <span>·</span>
        <span>Docs</span>
        <span>·</span>
        <span>Helps</span>
      </nav>

      <div className="relative">
        <button
          type="button"
          onClick={() => setLangOpen((open) => !open)}
          className="inline-flex items-center gap-2 text-white/70 hover:text-white"
        >
          <Globe className="size-4" />
          English
          <ChevronDown className="size-4" />
        </button>
        {langOpen && (
          <div className="absolute right-0 bottom-8 min-w-35 rounded-lg bg-white py-1 text-slate-700 shadow-lg">
            <span className="block px-3 py-2 text-sm font-medium">English</span>
          </div>
        )}
      </div>
    </div>
  );
}
