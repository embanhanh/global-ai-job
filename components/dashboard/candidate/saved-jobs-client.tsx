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
                  className="p-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10 text-white/40 hover:text-rose-400 hover:bg-rose-400/10 hover:border-rose-400/30 transition-all duration-200"
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
          className="flex flex-col items-center justify-center py-24 text-center space-y-4 bg-white/5 border border-white/10 rounded-3xl"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <HeartOff className="w-10 h-10 text-white/20" />
          </div>
          <p className="text-white/40 font-medium">{t("empty")}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
