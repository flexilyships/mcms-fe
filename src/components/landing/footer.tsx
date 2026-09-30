import Image from "next/image";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-100 text-slate-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-12 justify-between">
          <div className="md:col-span-6 space-y-3">
            <div className="relative w-36 h-10">
              <Image
                src="/assets/logo.png"
                alt="FLEXY"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#8A8A8A] max-w-sm leading-relaxed">
              One platform to keep your vessels, crew, and compliance on track.
            </p>
          </div>

          <div className="flex md:gap-16 gap-8 flex-col md:flex-row">
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-[#12141D] tracking-wider uppercase">Product</h4>
              <ul className="space-y-2 text-xs  sm:text-sm text-[#8A8A8A]">
                <li>
                  <button
                    onClick={() => scrollToSection("hero")}
                    className=" text-start transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("challenges")}
                    className=" text-start transition-colors cursor-pointer"
                  >
                    Challenges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className=" text-start transition-colors cursor-pointer"
                  >
                    How it works
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-[#12141D] tracking-wider uppercase">Company</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#8A8A8A]">
                <li>
                  <span className=" cursor-not-allowed">About Us</span>
                </li>
                <li>
                  <span className=" cursor-not-allowed">Careers</span>
                </li>
                <li>
                  <span className=" cursor-not-allowed">Contact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
