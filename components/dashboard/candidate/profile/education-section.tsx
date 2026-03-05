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
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface EducationSectionProps {
  form: UseFormReturn<CandidateProfileValues>;
}

export function EducationSection({ form }: EducationSectionProps) {
  const t = useTranslations("Dashboard.candidate.profile.form");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-600/10 border border-emerald-500/20">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold">{t("education")}</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ school: "", degree: "", period: "" })}
          className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("education")}
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
                name={`education.${index}.school`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.school")}</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#050508]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.degree")}</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#050508]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.period`}
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
