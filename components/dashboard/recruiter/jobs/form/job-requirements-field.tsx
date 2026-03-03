"use client";

import { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { JobFormValues } from "@/types/jobs";

interface JobRequirementsFieldProps {
  control: Control<JobFormValues>;
  t: (key: string) => string;
}

export function JobRequirementsField({
  control,
  t,
}: JobRequirementsFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements",
  });

  const [inputValue, setInputValue] = useState("");

  const handleAddRequirement = () => {
    if (inputValue.trim()) {
      append({ value: inputValue.trim() });
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddRequirement();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white/80">{t("labels.requirements")}</Label>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("placeholders.requirements")}
            className="bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50"
          />
          <Button
            type="button"
            onClick={handleAddRequirement}
            className="bg-white/10 hover:bg-white/20 text-white h-11 px-4"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1.5 rounded-full text-sm group transition-all hover:bg-violet-500/20"
          >
            <span>{field.value}</span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="hover:text-violet-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
