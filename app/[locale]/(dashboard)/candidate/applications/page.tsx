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
import { MessageSquare, MoreVertical, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CandidateApplication } from "@/types/candidate";

// Mock data
const mockApplications: CandidateApplication[] = [
  {
    id: "app1",
    job_title: "Senior AI Engineer",
    company: "Google DeepMind",
    applied_date: "2024-03-01",
    status: "interviewing",
  },
  {
    id: "app2",
    job_title: "Machine Learning Researcher",
    company: "OpenAI",
    applied_date: "2024-02-28",
    status: "inReview",
  },
  {
    id: "app3",
    job_title: "Full Stack Engineer",
    company: "Meta",
    applied_date: "2024-02-25",
    status: "applied",
  },
  {
    id: "app4",
    job_title: "Computer Vision Engineer",
    company: "Tesla",
    applied_date: "2024-02-20",
    status: "rejected",
  },
];

export default async function ApplicationsPage() {
  const t = await getTranslations("Dashboard.candidate.applications");

  const getStatusBadge = (status: CandidateApplication["status"]) => {
    switch (status) {
      case "applied":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            {t(`status.applied`)}
          </Badge>
        );
      case "inReview":
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
            {t(`status.inReview`)}
          </Badge>
        );
      case "interviewing":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            {t(`status.interviewing`)}
          </Badge>
        );
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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
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
              <TableHead className="text-right text-white/50 font-bold">
                {t("table.feedback")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockApplications.map((app) => (
              <TableRow
                key={app.id}
                className="border-white/5 hover:bg-white/2 transition-colors group"
              >
                <TableCell className="font-medium text-white">
                  {app.job_title}
                </TableCell>
                <TableCell className="text-white/60">{app.company}</TableCell>
                <TableCell className="text-white/40">
                  {app.applied_date}
                </TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell className="text-right">
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
                          <ExternalLink className="w-4 h-4" />
                          {t("table.actions.viewDetail")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
