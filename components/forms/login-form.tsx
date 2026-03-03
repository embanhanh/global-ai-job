"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { useState, useTransition } from "react";
import { SocialAuth } from "@/components/shared/social-auth";
import { signIn } from "@/actions/auth";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

export function LoginForm() {
  const t = useTranslations("Auth.login");
  const tError = useTranslations("Errors");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const locale = useLocale();

  const loginSchema = z.object({
    email: z.string().email({ message: tError("invalidEmail") }),
    password: z.string().min(6, {
      message: tError("passwordMin", { count: 6 }),
    }),
  });

  type LoginValues = z.infer<typeof loginSchema>;

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    startTransition(async () => {
      const result = await signIn({ ...values, locale });
      if (result?.success) {
        toast.success(t("successTitle") || "Welcome back!", {
          description:
            t("successDescription") || "You have successfully logged in.",
        });
        router.push("/");
        router.refresh();
      } else if (result?.error) {
        console.log("Login error:", result.error);
        if (result.error === "Email not confirmed") {
          toast.error(tError("emailNotConfirmed"));
          setServerError(tError("emailNotConfirmed"));
        } else {
          setServerError(result.error);
          toast.error(tError("loginFailed") || "Login failed");
        }
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
        <p className="text-white/50 text-sm">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <SocialAuth disabled={isPending} />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0e0e1e] px-2 text-white/30">
            {t("divider")}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {serverError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{serverError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70" htmlFor="email">
            {t("emailLabel")}
          </label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isPending}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 focus:border-violet-500/50 focus:ring-violet-500/20"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-400">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              className="text-sm font-medium text-white/70"
              htmlFor="password"
            >
              {t("passwordLabel")}
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            disabled={isPending}
            className="bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50 focus:ring-violet-500/20"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-xs text-red-400">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-500 text-white h-11"
          disabled={isPending}
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            t("submit")
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-white/40">
        {t("noAccount")}{" "}
        <Link
          href="/role-selection"
          className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
        >
          {t("register")}
        </Link>
      </div>
    </motion.div>
  );
}
