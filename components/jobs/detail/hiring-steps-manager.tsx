"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Plus, X, GripVertical } from "lucide-react";
import { HiringStep } from "@/types/jobs";
import { updateJob } from "@/actions/jobs.actions";
import { useTranslations } from "next-intl";

interface HiringStepsManagerProps {
  jobId: string;
  steps: HiringStep[];
  onSave: (steps: HiringStep[]) => void;
}

export function HiringStepsManager({
  jobId,
  steps: initialSteps,
  onSave,
}: HiringStepsManagerProps) {
  const t = useTranslations("Dashboard.recruiter.jobs.detail.workflow");
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<HiringStep[]>(initialSteps);
  const [newLabel, setNewLabel] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAddStep = () => {
    if (!newLabel.trim()) return;
    const id = newLabel.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    setSteps((prev) => [
      ...prev,
      { id, label: newLabel.trim(), color: "slate" },
    ]);
    setNewLabel("");
  };

  const handleRemoveStep = (id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    const { success } = await updateJob(jobId, {
      hiring_steps: steps as unknown as import("@/types/database").Json,
    });
    setSaving(false);
    if (success) {
      onSave(steps);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="border-white/10 hover:bg-white/5 text-white/60 hover:text-white"
        onClick={() => setOpen(true)}
      >
        <Settings className="w-4 h-4 mr-2" />
        {t("customizeSteps")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0f0f1a] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {t("customizeSteps")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 bg-white/3 rounded-lg px-3 py-2 border border-white/5"
                >
                  <GripVertical className="w-4 h-4 text-white/20" />
                  <span className="flex-1 text-sm text-white/80">
                    {step.label}
                  </span>
                  <button
                    onClick={() => handleRemoveStep(step.id)}
                    className="text-white/30 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex gap-2">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddStep()}
              placeholder={t("stepLabel")}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 flex-1"
            />
            <Button
              onClick={handleAddStep}
              size="sm"
              className="bg-violet-600 hover:bg-violet-500"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-white/10 text-white/60"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {saving ? t("saving") : t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
