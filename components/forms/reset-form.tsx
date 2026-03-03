"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ResetForm() {
  const t = useTranslations("Auth.resetPassword");
  const tError = useTranslations("Errors");
  const [isLoading, setIsLoading] = useState(false);

  const resetSchema = z
    .object({
      password: z.string().min(6, {
        message: tError("passwordMin", { count: 6 }),
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tError("passwordsMatch"),
      path: ["confirmPassword"],
    });

  type ResetValues = z.infer<typeof resetSchema>;

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetValues) {
    setIsLoading(true);
    console.log(values);
    // TODO: Implement Supabase update password logic
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
        <p className="text-white/50 text-sm">{t("subtitle")}</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-white/70"
            htmlFor="password"
          >
            {t("newPassword")}
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
    </div>
  );
}
