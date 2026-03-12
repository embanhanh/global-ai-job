"use client";

import { JobWithCompany } from "@/types/database";
import { JobCard } from "@/components/shared/job-card";
import { motion, AnimatePresence } from "framer-motion";
import { HeartOff } from "lucide-react";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toggleSaveJobAction } from "@/actions/jobs.actions";
import { toast } from "sonner";

interface SavedJobsClientProps {
  initialJobs: JobWithCompany[];
}

export function SavedJobsClient({ initialJobs }: SavedJobsClientProps) {
  const t = useTranslations("Dashboard.candidate.savedJobs");
  const [jobs, setJobs] = useState(initialJobs);
  const [, startTransition] = useTransition();

  const handleUnsave = async (jobId: string) => {
    // Optimistic UI Update for animation
    const previousJobs = [...jobs];
    setJobs((prev) => prev.filter((job) => job.id !== jobId));

    startTransition(async () => {
      const result = await toggleSaveJobAction(jobId);
      if (result.success) {
        toast.success(t("unsaveSuccess") || "Job removed from saved");
      } else {
        toast.error(result.error || "Failed to unsave job");
        setJobs(previousJobs); // Rollback
      }
    });
  };

  return (
    <AnimatePresence mode="popLayout">
      {jobs.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => handleUnsave(job.id)}
                  className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all duration-200"
                  title={t("unsave")}
                >
                  <HeartOff className="w-4 h-4" />
                </button>
              </div>
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center space-y-4 bg-muted/50 border border-border rounded-3xl"
        >
          <div className="w-20 h-20 rounded-full bg-background border border-border flex items-center justify-center">
            <HeartOff className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <p className="text-muted-foreground font-medium">{t("empty")}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
