"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { JobCard } from "@/components/shared/job-card";
import { motion, AnimatePresence } from "framer-motion";
import { HeartOff } from "lucide-react";
// Mock data
const initialSavedJobs = [
  {
    id: "1",
    title: "Senior AI Engineer",
    company: { name: "Google DeepMind", logo: null },
    location: "London, UK",
    type: "Full-time",
    salary: "$120k - $180k",
    postedAt: "2 days ago",
  },
  {
    id: "4",
    title: "Frontend Developer (Next.js)",
    company: { name: "Vercel", logo: null },
    location: "Remote",
    type: "Contract",
    salary: "$80k - $120k",
    postedAt: "5 days ago",
  },
];
export default function SavedJobsPage() {
  const t = useTranslations("Dashboard.candidate.savedJobs");
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const handleUnsave = (jobId: string) => {
    // Optimistic UI Update
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));

    // In real app, call Server Action here
    // If it fails, revert the state
    console.log("Unsaving job:", jobId);
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      </div>
      <AnimatePresence mode="popLayout">
        {savedJobs.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {savedJobs.map((job) => (
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
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/30 transition-all duration-200"
                    title={t("unsave")}
                  >
                    <HeartOff className="w-4 h-4" />
                  </button>
                </div>
                <JobCard
                  job={{
                    id: job.id,
                    title: job.title,
                    location: job.location,
                    job_type: job.type,
                    salary_range: job.salary,
                    created_at: new Date().toISOString(),
                    company_id: "",
                    recruiter_id: "",
                    status: "active",
                    views_count: 0,
                    company: {
                      id: "",
                      name: job.company.name,
                      logo_url: job.company.logo,
                      website: null,
                      description: null,
                      location: null,
                      industry: null,
                      created_at: new Date().toISOString(),
                    },
                    description: null,
                    requirements: null,
                    benefits: null,
                    hiring_steps: null,
                    category: null,
                    level: null,
                    updated_at: new Date().toISOString(),
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center space-y-4"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <HeartOff className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/40 font-medium">{t("empty")}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
