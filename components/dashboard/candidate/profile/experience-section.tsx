"use client";

import { useTranslations } from "next-intl";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { CandidateProfileValues } from "@/types/candidate";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Briefcase } from "lucide-react";

interface ExperienceSectionProps {
  form: UseFormReturn<CandidateProfileValues>;
}

export function ExperienceSection({ form }: ExperienceSectionProps) {
  const t = useTranslations("Dashboard.candidate.profile.form");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20">
            <Briefcase className="w-4 h-4 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold">{t("experience")}</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ company: "", jobTitle: "", period: "" })}
          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("experience")}
        </Button>
      </div>
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white/20 hover:text-red-400"
              onClick={() => remove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`experience.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.company")}</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#050508]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.jobTitle")}</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#050508]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.period`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.period")}</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#050508]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
