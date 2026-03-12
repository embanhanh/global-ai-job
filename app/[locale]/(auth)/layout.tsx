import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Background ambient glows — theme-aware via CSS vars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ background: "var(--hero-glow)" }}
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ background: "var(--hero-glow)" }}
        />
      </div>

      <main className="relative z-10">{children}</main>
    </div>
  );
}
