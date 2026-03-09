import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare, MoreVertical, ExternalLink, Inbox } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CandidateApplication } from "@/types/candidate";
import { getApplicationsByCandidate } from "@/services/applications.service";
import { format } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string }>;
}) {
  const t = await getTranslations("Dashboard.candidate.applications");
  const locale = await getLocale();
  const dateLocale = locale === "vi" ? vi : enUS;

  const { stage } = await searchParams;

  const { data: applications, error } = await getApplicationsByCandidate({
    stage,
  });

  if (error) {
    throw new Error(error);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sourcing":
      case "applied":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            {t(`status.applied`)}
          </Badge>
        );
      case "screening":
      case "inReview":
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
            {t(`status.inReview`)}
          </Badge>
        );
      case "interview":
      case "interviewing":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            {t(`status.interviewing`)}
          </Badge>
        );
      case "offer":
      case "offered":
        return (
          <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold">
            {t(`status.offered`)}
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
            {t(`status.rejected`)}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <div className="flex gap-2">
          <Link
            href="/candidate/applications"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              !stage
                ? "bg-white/10 text-white border-white/20"
                : "bg-transparent text-white/50 border-white/5 hover:bg-white/5 hover:text-white",
            )}
          >
            {t("filter.all")}
          </Link>
          <Link
            href="/candidate/applications?stage=interview"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              stage === "interview"
                ? "bg-white/10 text-white border-white/20"
                : "bg-transparent text-white/50 border-white/5 hover:bg-white/5 hover:text-white",
            )}
          >
            {t("filter.interview")}
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#0a0a14]/40 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-white/50 font-bold">
                {t("table.job")}
              </TableHead>
              <TableHead className="text-white/50 font-bold">
                {t("table.company")}
              </TableHead>
              <TableHead className="text-white/50 font-bold">
                {t("table.date")}
              </TableHead>
              <TableHead className="text-white/50 font-bold">
                {t("table.status")}
              </TableHead>
              <TableHead className="text-right text-white/50 font-bold px-6">
                {t("table.feedback")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications && applications.length > 0 ? (
              (applications as CandidateApplication[]).map((app) => (
                <TableRow
                  key={app.id}
                  className="border-white/5 hover:bg-white/2 transition-colors group"
                >
                  <TableCell className="font-medium text-white">
                    {app.jobs?.title}
                  </TableCell>
                  <TableCell className="text-white/60">
                    {app.jobs?.companies?.name}
                  </TableCell>
                  <TableCell className="text-white/40">
                    {format(new Date(app.applied_date), "dd MMM, yyyy", {
                      locale: dateLocale,
                    })}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(app.stage || "applied")}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-violet-400 hover:text-violet-300 hover:bg-violet-400/10 gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="hidden md:inline">
                          {t("table.feedback")}
                        </span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/40 hover:text-white"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[#12121e] border-white/10 text-white"
                        >
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer gap-2">
                            <Link
                              href={`/jobs/${app.jobs?.id}`}
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {t("table.actions.viewDetail")}
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableCell colSpan={5} className="h-[200px] text-center">
                  <div className="flex flex-col items-center justify-center text-white/40 gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <Inbox className="w-6 h-6" />
                    </div>
                    <span>{t("noApplications") || "No applications yet"}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
