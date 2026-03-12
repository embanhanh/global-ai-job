"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  children: React.ReactNode;
  delay?: number;
}

export function SettingsCard({
  id,
  title,
  description,
  icon: Icon,
  color,
  children,
  delay = 0,
}: SettingsCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-8 rounded-3xl border border-border bg-card/40 flex flex-col h-full backdrop-blur-xl"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-2xl border ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </motion.div>
  );
}
