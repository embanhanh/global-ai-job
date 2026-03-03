"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AIJDAssistantProps {
  onSuggest: (suggestion: string) => void;
  currentTitle: string;
}

export function AIJDAssistant({ onSuggest, currentTitle }: AIJDAssistantProps) {
  const t = useTranslations("Dashboard.recruiter.jobs.aiAssistant");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation with translated template
    setTimeout(() => {
      const template =
        `## ${t("suggestion.title", { title: currentTitle || "..." })}\n\n` +
        `### ${t("suggestion.requirements")}:\n` +
        `- ${t("suggestion.req1")}\n` +
        `- ${t("suggestion.req2")}\n` +
        `- ${t("suggestion.req3")}\n\n` +
        `### ${t("suggestion.benefits")}:\n` +
        `- ${t("suggestion.ben1")}\n` +
        `- ${t("suggestion.ben2")}\n` +
        `- ${t("suggestion.ben3")}`;

      setSuggestion(template);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="bg-linear-to-br from-violet-600/10 to-indigo-600/10 border-violet-500/20 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-violet-400" />
        <h3 className="font-semibold text-white">{t("title")}</h3>
      </div>
      <p className="text-sm text-white/60 leading-relaxed">
        {t("description")}
      </p>

      <AnimatePresence mode="wait">
        {suggestion ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            key="suggestion"
            className="space-y-4"
          >
            <div className="p-4 rounded-xl bg-[#0a0a14]/60 border border-white/5 text-sm text-white/50 max-h-[200px] overflow-y-auto whitespace-pre-wrap">
              {suggestion}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onSuggest(suggestion)}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t("useThis")}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSuggestion(null)}
                className="border-white/10 text-white hover:bg-white/5"
              >
                {t("cancel")}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="generate"
          >
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white group"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  {t("generate")}
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
