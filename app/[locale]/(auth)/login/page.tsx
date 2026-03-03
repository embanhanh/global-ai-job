import { LoginForm } from "@/components/forms/login-form";
import { AuthCard } from "@/components/shared/auth-card";
import { Link } from "@/i18n/navigation";
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("Common");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Link href="/" className="mb-8 flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">
          {t("brand")}
        </span>
      </Link>

      <AuthCard>
        <LoginForm />
      </AuthCard>
    </div>
  );
}
