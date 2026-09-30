import Image from "next/image";

export function AuthBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Image
        src="/assets/auth/signup-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
    </div>
  );
}
