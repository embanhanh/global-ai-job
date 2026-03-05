"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CandidateProfileValues } from "@/types/candidate";

interface AiCvParserProps {
  onParseComplete: (data: Partial<CandidateProfileValues>) => void;
}

export function AiCvParser({ onParseComplete }: AiCvParserProps) {
  const t = useTranslations("Dashboard.candidate.profile.cvParser");
  const [isScanning, setIsScanning] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsScanning(true);
      console.log("Parsing file:", file.name);

      // MOCK AI Analysis logic
      setTimeout(() => {
        const mockResult: Partial<CandidateProfileValues> = {
          fullName: "Alex Johnson",
          email: "alex.johnson@example.com",
          phone: "0123456789",
          jobTitle: "Senior AI Engineer",
          bio: "Experienced AI Engineer with a strong background in Machine Learning and Natural Language Processing. Passionate about building intelligent systems that solve real-world problems.",
          skills: [
            "React",
            "Next.js",
            "TypeScript",
            "Python",
            "PyTorch",
            "LLMs",
          ],
          experience: [
            {
              company: "TechAI Solutions",
              jobTitle: "AI Specialist",
              period: "2021 - Present",
              description:
                "Led the development of multiple AI-driven features...",
            },
            {
              company: "Innovation Hub",
              jobTitle: "Junior Developer",
              period: "2019 - 2021",
              description: "Developed and maintained web applications...",
            },
          ],
          education: [
            {
              school: "Stanford University",
              degree: "M.S. in Computer Science",
              period: "2017 - 2019",
            },
          ],
        };

        onParseComplete(mockResult);
        setIsScanning(false);
      }, 4000);
    },
    [onParseComplete],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFileName(file.name);
        handleUpload(file);
      }
    },
    [handleUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isScanning ? (
          <div
            key="dropzone"
            {...getRootProps({
              className: cn(
                "relative cursor-pointer group py-12 px-6 rounded-3xl border-2 border-dashed transition-all duration-300",
                isDragActive
                  ? "border-violet-500 bg-violet-500/5"
                  : "border-white/10 hover:border-violet-500/50 hover:bg-white/5",
              ),
            })}
          >
            <input {...getInputProps()} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-violet-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{t("title")}</h3>
                <p className="text-white/40 max-w-xs">{t("description")}</p>
              </div>
              {fileName && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  {fileName}
                </div>
              )}
            </motion.div>
            {isDragActive && (
              <div className="absolute inset-0 bg-violet-600/10 rounded-2xl flex items-center justify-center backdrop-blur-[2px]">
                <p className="text-violet-400 font-bold">{t("dropActive")}</p>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="py-12 px-6 rounded-3xl border-2 border-violet-500/30 bg-violet-500/5 flex flex-col items-center text-center gap-6"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-violet-500/20 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-violet-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{t("scanning")}</h3>
              <p className="text-white/40">{t("extracting")}</p>
            </div>
            <div className="w-full max-w-xs h-1 px-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="h-full bg-linear-to-r from-violet-600 to-indigo-600 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
