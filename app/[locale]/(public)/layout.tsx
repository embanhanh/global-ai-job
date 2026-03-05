import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
