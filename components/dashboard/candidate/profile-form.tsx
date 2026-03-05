"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  candidateProfileSchema,
  type CandidateProfileValues,
} from "@/types/candidate";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { PersonalInfoSection } from "./profile/personal-info-section";
import { ExperienceSection } from "./profile/experience-section";
import { EducationSection } from "./profile/education-section";

interface ProfileFormProps {
  initialData?: Partial<CandidateProfileValues>;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const t = useTranslations("Dashboard.candidate.profile.form");

  const form = useForm<CandidateProfileValues>({
    resolver: zodResolver(candidateProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      bio: "",
      jobTitle: "",
      skills: [],
      experience: [],
      education: [],
      ...initialData,
    },
  });

  // Reset form when initialData changes (e.g. after AI parsing)
  useEffect(() => {
    if (initialData) {
      form.reset({
        ...form.getValues(),
        ...initialData,
      });
    }
  }, [initialData, form]);

  const onSubmit = (values: CandidateProfileValues) => {
    console.log("Submitting values:", values);
    // In real app, call Server Action here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <PersonalInfoSection form={form} />
        <ExperienceSection form={form} />
        <EducationSection form={form} />

        <div className="pt-8 border-t border-white/5 flex justify-end">
          <Button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 h-12 rounded-xl font-bold text-lg shadow-lg shadow-violet-500/20"
          >
            {t("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
