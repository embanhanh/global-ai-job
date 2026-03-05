"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FileCheck, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ApplyValues, createApplySchema } from "@/types/applications";

interface ApplyFormProps {
  initialData: {
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string | null;
  };
  onSubmit: (values: ApplyValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  isUploading: boolean;
}

export function ApplyForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  isUploading,
}: ApplyFormProps) {
  const t = useTranslations("Landing.jobs.detail");
  const form = useForm<ApplyValues>({
    resolver: zodResolver(createApplySchema(t)),
    defaultValues: {
      fullName: initialData.fullName,
      email: initialData.email,
      phone: initialData.phone,
      resumeOption: initialData.resumeUrl ? "current" : "new",
      coverLetter: "",
    },
  });

  const resumeOption = form.watch("resumeOption");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("applyDialog.fullName")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("applyDialog.fullNamePlaceholder")}
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
                <FormLabel>{t("applyDialog.email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("applyDialog.emailPlaceholder")}
                    className="bg-white/5 border-white/10"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("applyDialog.phone")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("applyDialog.phonePlaceholder")}
                  className="bg-white/5 border-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 pt-2">
          <Label className="text-sm font-medium">
            {t("applyDialog.resume")}
          </Label>
          <FormField
            control={form.control}
            name="resumeOption"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    {initialData.resumeUrl && (
                      <div className="flex items-center space-x-3 rounded-xl border border-white/5 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                        <RadioGroupItem
                          value="current"
                          id="current"
                          className="border-violet-500 text-violet-500"
                        />
                        <Label
                          htmlFor="current"
                          className="flex flex-1 items-center gap-3 cursor-pointer"
                        >
                          <FileCheck className="w-5 h-5 text-emerald-400" />
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {t("applyDialog.useCurrentResume")}
                            </span>
                            <span className="text-xs text-slate-500 truncate max-w-[150px]">
                              {initialData.resumeUrl}
                            </span>
                          </div>
                        </Label>
                      </div>
                    )}
                    <div className="flex items-center space-x-3 rounded-xl border border-white/5 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                      <RadioGroupItem
                        value="new"
                        id="new"
                        className="border-violet-500 text-violet-500"
                      />
                      <Label
                        htmlFor="new"
                        className="flex flex-1 items-center gap-3 cursor-pointer"
                      >
                        <Upload className="w-5 h-5 text-violet-400" />
                        <span className="font-medium">
                          {t("applyDialog.uploadNewResume")}
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {resumeOption === "new" && (
            <FormField
              control={form.control}
              name="resumeFile"
              render={({
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                field: { onChange, value: _unusedValue, ...field },
              }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => onChange(e.target.files)}
                      className="bg-white/5 border-white/10 file:bg-violet-600 file:text-white file:border-0 file:rounded-md file:mr-4 file:px-3 file:py-1 cursor-pointer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("applyDialog.coverLetter")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("applyDialog.coverLetterPlaceholder")}
                  className="bg-white/5 border-white/10 min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="text-slate-400 hover:text-white hover:bg-white/5"
          >
            {t("applyDialog.cancel")}
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-violet-600 hover:bg-violet-500 text-white px-8 font-bold min-w-[140px]"
          >
            {t(
              isUploading
                ? "applyDialog.uploading"
                : isLoading
                  ? "applyDialog.applying"
                  : "applyDialog.submit",
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
