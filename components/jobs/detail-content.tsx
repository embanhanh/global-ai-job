import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface JobDetailContentProps {
  job: {
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    postedAt: string;
    description: string;
    requirements: string[];
    benefits: string[];
  };
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  const t = useTranslations("Landing.jobs.detail");

  return (
    <div className="lg:col-span-2 space-y-12">
      {/* Header Info */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Badge
            variant="outline"
            className="border-violet-500/30 text-violet-400 bg-violet-500/5 px-4 py-1"
          >
            {job.type}
          </Badge>
          <Badge
            variant="outline"
            className="border-white/10 text-white/40 px-4 py-1"
          >
            {t("seniorLevel")}
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
          {job.title}
        </h1>
        <div className="flex flex-wrap gap-6 text-white/40">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{job.postedAt}</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* Description */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white">{t("description")}</h3>
        <p className="text-lg text-white/60 leading-relaxed italic border-l-4 border-violet-500/30 pl-6">
          {job.description}
        </p>
      </section>

      {/* Requirements */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white">{t("requirements")}</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {job.requirements.map((req, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 group hover:border-violet-500/30 transition-all"
            >
              <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
              <span className="text-white/60 group-hover:text-white transition-colors">
                {req}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Benefits */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white">{t("benefits")}</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {job.benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10 group hover:border-violet-400 transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-violet-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#050816]" />
              </div>
              <span className="text-white/60 group-hover:text-white transition-colors">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
