"use client";

import { useFieldArray, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, GripVertical } from "lucide-react";
import { JobFormValues } from "@/types/jobs";
import { motion, AnimatePresence } from "framer-motion";

interface JobHiringStepsFieldProps {
  control: Control<JobFormValues>;
  t: (key: string) => string;
}

export function JobHiringStepsField({ control, t }: JobHiringStepsFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hiring_steps",
  });

  const handleAddStep = () => {
    append({
      id: `step_${Date.now()}`,
      label: "",
      color: "slate",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-white/70">
          {t("labels.hiringSteps")}
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddStep}
          className="border-white/10 hover:bg-white/5 text-xs h-8"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          {t("hiringSteps.add")}
        </Button>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 group"
            >
              <div className="flex-1 flex items-center gap-2 bg-white/3 rounded-lg px-3 py-2 border border-white/5 group-hover:border-white/10 transition-colors">
                <GripVertical className="w-4 h-4 text-white/10" />
                <Input
                  {...control.register(`hiring_steps.${index}.label`)}
                  placeholder={t("hiringSteps.placeholder")}
                  className="bg-transparent border-none p-0 h-auto text-sm text-white focus-visible:ring-0 placeholder:text-white/20"
                />
                {/* Hidden ID & Color fields to satisfy type requirements */}
                <input
                  type="hidden"
                  {...control.register(`hiring_steps.${index}.id`)}
                />
                <input
                  type="hidden"
                  {...control.register(`hiring_steps.${index}.color`)}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="text-white/20 hover:text-red-400 hover:bg-red-400/10 h-9 w-9"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>

        {fields.length === 0 && (
          <p className="text-xs text-white/30 italic py-2">
            {t("hiringSteps.empty")}
          </p>
        )}
      </div>
    </div>
  );
}
