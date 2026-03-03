"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

export function ForgotForm() {
  const t = useTranslations("Auth.forgotPassword");
  const tLogin = useTranslations("Auth.login");
  const tError = useTranslations("Errors");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const forgotSchema = z.object({
    email: z.string().email({ message: tError("invalidEmail") }),
  });

  type ForgotValues = z.infer<typeof forgotSchema>;

  const form = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotValues) {
    setIsLoading(true);
    console.log(values);
    // TODO: Implement Supabase reset password logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
  }

  if (isSent) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{t("successTitle")}</h1>
          <p className="text-white/50 text-sm">{t("successMessage")}</p>
        </div>
        <Link href="/login" className="block">
          <Button
            variant="outline"
            className="w-full border-white/10 text-white"
          >
            {t("backToLogin")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
        <p className="text-white/50 text-sm">{t("subtitle")}</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70" htmlFor="email">
            {tLogin("email")}
          </label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            disabled={isLoading}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-400">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-500 text-white h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            t("submit")
          )}
        </Button>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-white/40 hover:text-white transition-colors"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t("backToLogin")}
        </Link>
      </div>
    </div>
  );
}
