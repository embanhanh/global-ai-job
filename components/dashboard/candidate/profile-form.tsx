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
import { useEffect, useActionState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { PersonalInfoSection } from "./profile/personal-info-section";
import { ExperienceSection } from "./profile/experience-section";
import { EducationSection } from "./profile/education-section";
import { SkillsSection } from "./profile/skills-section";
import { updateProfileAction } from "@/actions/profile.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  initialData?: Partial<CandidateProfileValues>;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const t = useTranslations("Dashboard.candidate.profile.form");
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(updateProfileAction, null);

  const form = useForm<CandidateProfileValues>({
    resolver: zodResolver(candidateProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      bio: "",
      jobTitle: "",
      skills: [],
      resumeUrl: "",
      experience: [],
      education: [],
      ...initialData,
    },
  });

  // Reset form when initialData changes (e.g. after AI parsing or server fetch)
  useEffect(() => {
    if (initialData) {
      form.reset({
        ...form.getValues(),
        ...initialData,
      });
    }
  }, [initialData, form]);

  useEffect(() => {
    if (state?.success) {
      toast.success(t("success"), {
        description: t("successDescription"),
      });
    } else if (state?.error) {
      toast.error(t("error"), {
        description: state.error,
      });
    }
  }, [state, t]);

  const onSubmit = async (values: CandidateProfileValues) => {
    try {
      let resumeUrl = values.resumeUrl;

      // If it's a File object, we need to upload it first
      if (values.resumeUrl instanceof File) {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("Not authenticated");

        const fileExt = values.resumeUrl.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, values.resumeUrl);

        if (uploadError) throw uploadError;
        resumeUrl = fileName;
      }

      startTransition(() => {
        formAction({
          ...values,
          resumeUrl: resumeUrl as string,
        });
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(t("error"));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Form validation errors:", errors);
          toast.error(t("error"), {
            description: "Please check the form for errors.",
          });
        })}
        className="space-y-12"
      >
        <PersonalInfoSection form={form} />
        <SkillsSection form={form} />
        <ExperienceSection form={form} />
        <EducationSection form={form} />

        <div className="pt-8 border-t border-white/5 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 h-12 rounded-xl font-bold text-lg shadow-lg shadow-violet-500/20 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
