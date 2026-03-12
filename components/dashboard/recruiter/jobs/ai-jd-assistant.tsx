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
    <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">{t("title")}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
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
            <div className="p-4 rounded-xl bg-accent/50 border border-border text-sm text-muted-foreground max-h-[200px] overflow-y-auto whitespace-pre-wrap">
              {suggestion}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onSuggest(suggestion)}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t("useThis")}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSuggestion(null)}
                className="border-border text-foreground hover:bg-accent"
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
              className="w-full bg-accent/50 hover:bg-accent border border-border text-foreground group"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
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
