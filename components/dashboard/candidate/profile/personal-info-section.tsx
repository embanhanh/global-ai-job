"use client";

import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { CandidateProfileValues } from "@/types/candidate"; // Updated path
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

interface PersonalInfoSectionProps {
  form: UseFormReturn<CandidateProfileValues>;
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  const t = useTranslations("Dashboard.candidate.profile.form");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="p-2 rounded-lg bg-violet-600/10 border border-violet-500/20">
          <User className="w-4 h-4 text-violet-400" />
        </div>
        <h2 className="text-xl font-bold">{t("personalInfo")}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.fullName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("labels.fullName")}
                  className="bg-white/5 border-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.email")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("labels.email")}
                  className="bg-white/5 border-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.phone")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("labels.phone")}
                  className="bg-white/5 border-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("labels.jobTitle")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("labels.jobTitle")}
                  className="bg-white/5 border-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("labels.bio")}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t("labels.bio")}
                className="bg-white/5 border-white/10 min-h-[120px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
