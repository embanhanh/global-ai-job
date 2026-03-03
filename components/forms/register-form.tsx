"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { SocialAuth } from "@/components/shared/social-auth";

export function RegisterForm() {
  const t = useTranslations("Auth.register");
  const tLogin = useTranslations("Auth.login");
  const tError = useTranslations("Errors");
  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = z
    .object({
      email: z.string().email({ message: tError("invalidEmail") }),
      password: z.string().min(6, {
        message: tError("passwordMin", { count: 6 }),
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tError("passwordsMatch"),
      path: ["confirmPassword"],
    });

  type RegisterValues = z.infer<typeof registerSchema>;

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterValues) {
    setIsLoading(true);
    console.log(values);
    // TODO: Implement Supabase sign-up logic here
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
        <p className="text-white/50 text-sm">{t("subtitle")}</p>
      </div>

      <SocialAuth isLoading={isLoading} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0e0e1e] px-2 text-white/30">
            {tLogin("divider")}
          </span>
        </div>
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

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-white/70"
            htmlFor="password"
          >
            {tLogin("password")}
          </label>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-xs text-red-400">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-white/70"
            htmlFor="confirmPassword"
          >
            {t("confirmPassword")}
          </label>
          <Input
            id="confirmPassword"
            type="password"
            disabled={isLoading}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-xs text-red-400">
              {form.formState.errors.confirmPassword.message}
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

      <div className="text-center text-sm text-white/40">
        {t("haveAccount")}{" "}
        <Link
          href="/login"
          className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
        >
          {t("login")}
        </Link>
      </div>
    </div>
  );
}
