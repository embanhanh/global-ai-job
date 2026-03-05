"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { applyToJob } from "@/actions/applications.actions";
import { createClient } from "@/lib/supabase/client";
import { ApplyForm } from "./apply-form";
import { ApplyValues } from "@/types/applications";

interface ApplyJobDialogProps {
  jobId: string;
  jobTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  profileData?: {
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string | null;
  } | null;
}

export function ApplyJobDialog({
  jobId,
  jobTitle,
  open,
  onOpenChange,
  onSuccess,
  profileData,
}: ApplyJobDialogProps) {
  const t = useTranslations("Landing.jobs.detail");
  const [isApplying, setIsApplying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const supabase = createClient();

  const handleUpload = async (file: File) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, file);

    if (uploadError) throw uploadError;
    return fileName;
  };

  const onSubmit = async (values: ApplyValues) => {
    try {
      setIsApplying(true);
      let resumeUrl = profileData?.resumeUrl || "";

      if (values.resumeOption === "new" && values.resumeFile?.[0]) {
        setIsUploading(true);
        resumeUrl = await handleUpload(values.resumeFile[0]);
        setIsUploading(false);
      } else if (values.resumeOption === "current") {
        resumeUrl = profileData?.resumeUrl || "";
      }

      const result = await applyToJob(jobId, {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        resumeUrl,
        coverLetter: values.coverLetter,
      });

      if (result.success) {
        toast.success(t("notifications.success"));
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error(t(`notifications.${result.error || "error"}`));
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error(t("notifications.error"));
    } finally {
      setIsApplying(false);
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-slate-900 border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t("applyDialog.title", { title: jobTitle })}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {t("applyDialog.description")}
          </DialogDescription>
        </DialogHeader>

        {profileData ? (
          <ApplyForm
            initialData={profileData}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
            isLoading={isApplying}
            isUploading={isUploading}
          />
        ) : (
          <div className="py-8 text-center text-slate-400">
            {t("notifications.loginRequired")}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
