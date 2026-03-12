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
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface PersonalInfoSectionProps {
  form: UseFormReturn<CandidateProfileValues>;
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  const t = useTranslations("Dashboard.candidate.profile.form");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <User className="w-4 h-4 text-primary" />
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
                  className="bg-accent/50 border-border"
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
                  className="bg-accent/50 border-border"
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
                  className="bg-accent/50 border-border"
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
                  className="bg-accent/50 border-border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resumeUrl"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>{t("labels.resumeUrl")}</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="flex items-center gap-4 p-4 bg-accent/50 border border-border rounded-lg">
                    <div className="flex-1 truncate">
                      <a
                        href={
                          typeof field.value === "string"
                            ? field.value.startsWith("http")
                              ? field.value
                              : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${field.value}`
                            : field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
                      >
                        <span className="truncate max-w-[200px]">
                          {field.value instanceof File
                            ? field.value.name
                            : t("labels.viewCV")}
                        </span>
                      </a>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive/80"
                      onClick={() => {
                        field.onChange("");
                      }}
                    >
                      {t("labels.replaceCV")}
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="bg-accent/50 border-border cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Store the file object temporarily on the field
                        // We will handle the upload in the parent form
                        field.onChange(file);
                      }
                    }}
                  />
                )}
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
                className="bg-accent/50 border-border min-h-[120px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
