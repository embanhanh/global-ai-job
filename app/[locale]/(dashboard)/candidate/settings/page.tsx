"use client";

import { useTranslations } from "next-intl";
import { Bell, Lock, Globe, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const t = useTranslations("Dashboard.candidate.settings");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  const sections = [
    {
      id: "account",
      title: t("account.title"),
      description: t("account.description"),
      icon: Lock,
      color: "bg-violet-500/10 border-violet-500/20 text-violet-400",
      content: (
        <div className="space-y-4 pt-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-white/5 bg-white/5"
          >
            <Globe className="w-4 h-4" />
            {t("account.changeEmail")}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-white/5 bg-white/5"
          >
            <Lock className="w-4 h-4" />
            {t("account.changePassword")}
          </Button>
        </div>
      ),
    },
    {
      id: "notifications",
      title: t("notifications.title"),
      description: t("notifications.description"),
      icon: Bell,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      content: (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-sm">
              {t("notifications.emailNotifications")}
            </span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-sm">
              {t("notifications.pushNotifications")}
            </span>
            <Switch defaultChecked />
          </div>
        </div>
      ),
    },
    {
      id: "privacy",
      title: t("privacy.title"),
      description: t("privacy.description"),
      icon: Shield,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      content: (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-sm">{t("privacy.publicProfile")}</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-sm">{t("privacy.showExperience")}</span>
            <Switch defaultChecked />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl border border-white/5 bg-[#0a0a14]/40 flex flex-col h-full"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-2xl border ${section.color}`}>
                <section.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{section.title}</h3>
                <p className="text-sm text-white/40">{section.description}</p>
              </div>
            </div>
            <div className="flex-1">{section.content}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-violet-600 hover:bg-violet-700 text-white px-8 h-12 rounded-xl font-bold text-lg shadow-lg shadow-violet-500/20"
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("save")}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              {t("save")}
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
