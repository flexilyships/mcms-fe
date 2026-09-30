import Image from "next/image";

export function AuthBrandMark() {
  return (
    <div className="relative h-16 w-16 overflow-hidden">
      <Image
        src="/assets/logo.png"
        alt="FLEXY"
        width={192}
        height={64}
        className="absolute top-0 left-0 h-16 w-auto max-w-none object-left"
        priority
      />
    </div>
  );
}
