import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global AI Job Board",
  description: "AI-powered multilingual recruitment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
