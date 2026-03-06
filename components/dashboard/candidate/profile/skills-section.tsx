"use client";

import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { CandidateProfileValues } from "@/types/candidate";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, X, Plus } from "lucide-react";
import { useState } from "react";

interface SkillsSectionProps {
  form: UseFormReturn<CandidateProfileValues>;
}

export function SkillsSection({ form }: SkillsSectionProps) {
  const t = useTranslations("Dashboard.candidate.profile.form");
  const [newSkill, setNewSkill] = useState("");

  const skills = form.watch("skills") || [];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      form.setValue("skills", [...skills, newSkill.trim()], {
        shouldDirty: true,
        shouldValidate: true,
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      "skills",
      skills.filter((s) => s !== skillToRemove),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <div className="p-2 rounded-lg bg-emerald-600/10 border border-emerald-500/20">
          <Cpu className="w-4 h-4 text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold">{t("labels.skills")}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder={
              t("labels.addSkillPlaceholder") ||
              "Add a skill (e.g. React, Node.js)"
            }
            className="bg-white/5 border-white/10"
          />
          <Button
            type="button"
            onClick={addSkill}
            variant="outline"
            className="border-white/10 hover:bg-white/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("labels.add") || "Add"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border-violet-500/20 px-3 py-1 gap-2 text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-slate-500 italic">
              {t("labels.noSkills") || "No skills added yet"}
            </p>
          )}
        </div>
        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
